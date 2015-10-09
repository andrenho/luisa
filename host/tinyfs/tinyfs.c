#define _GNU_SOURCE

#include "tinyfs.h"

#include <assert.h>
#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

#include <dirent.h>
#include <time.h>
#include <stddef.h>
#include <unistd.h>
#include <sys/param.h>  // for MIN
#include <sys/stat.h>

#include "tinyfs_ll.h"

#define SECTOR_SIZE 4096
#define CLUSTER_SIZE (SECTOR_SIZE * 1024)

typedef struct ClusterSector {
    uint32_t cluster;
    uint16_t sector;
} ClusterSector;

typedef struct Entry {
    char* name;
    bool directory;
    ClusterSector sector;
    size_t dt_sz;
    uint8_t* data;
    struct Entry** subentries;
} Entry;

typedef struct FileInformation {
    bool           exists          : 1;
    bool           directory       : 1;
    bool           executable      : 1;
    bool           link            : 1;
    uint16_t       unused          : 12;
} FileInformation;

typedef struct FileRecord {
    FileInformation fi;
    uint16_t        filename_length;
    uint16_t        cluster;
    uint16_t        sector;
    uint64_t        file_size;
    uint64_t        date_created;
    uint64_t        date_modified;
} FileRecord;


static ClusterSector 
get_sector(size_t i)
{
    uint32_t cluster = (i+2) / 0x400;
    uint16_t sector = (i+2+cluster) % 0x400;
    return (ClusterSector) { cluster, sector };
}


static int
add_directory(Entry* entries[], const char* orig_path, const char* path, size_t i, Entry** entry)
{
    // create entry
    entries[i] = calloc(sizeof(Entry), 1);
    entries[i]->name = strdup(path);
    entries[i]->directory = true;
    entries[i]->sector = get_sector(i);
    entries[i]->dt_sz = 0;
    entries[i]->data = NULL;
    entries[i]->subentries = calloc(sizeof(Entry*), 1);

    Entry* e_dir = entries[i];
    size_t n_subentries = 0;

    // allocate structures
    char* dbuf;
    asprintf(&dbuf, "%s%s", orig_path, path);
    long name_max = pathconf(dbuf, _PC_NAME_MAX);
    if(name_max == -1) name_max = 255;
    long len = offsetof(struct dirent, d_name) + name_max + 1;
    struct dirent *ep = malloc(len), *dptr;

    // search subdirectories
    DIR* dp = opendir(dbuf);
    assert(dp);
    while(readdir_r(dp, ep, &dptr), dptr) {
        if(strcmp(ep->d_name, "..") != 0 && strcmp(ep->d_name, ".") != 0) {
            char *new_path;
            if(strcmp(path, "/") == 0) {
                asprintf(&new_path, "/%s", ep->d_name);
            } else { 
                asprintf(&new_path, "%s/%s", path, ep->d_name);
            }
            if(ep->d_type == DT_DIR) {
                ++n_subentries;
                e_dir->subentries = realloc(e_dir->subentries, (n_subentries+1) * sizeof(Entry*));
                i = add_directory(entries, orig_path, new_path, i+1, &e_dir->subentries[n_subentries-1]);
                e_dir->subentries[n_subentries] = NULL;
            } else if(ep->d_type == DT_REG) {
                ++i;
                entries[i] = calloc(sizeof(Entry), 1);
                entries[i]->name = strdup(new_path);
                entries[i]->directory = false;
                entries[i]->sector = get_sector(i);
                entries[i]->dt_sz = 0;
                entries[i]->data = NULL;
                ++n_subentries;
                e_dir->subentries = realloc(e_dir->subentries, (n_subentries+1) * sizeof(Entry*));
                e_dir->subentries[n_subentries-1] = entries[i];
                e_dir->subentries[n_subentries] = NULL;
            }
            free(new_path);
        }
    }

    free(ep);
    free(dbuf);

    if(entry) {
        *entry = e_dir;
    }
    return i;
}


size_t
read_file_data(const char* orig_dir, Entry* entry)
{
    char* dbuf;
    asprintf(&dbuf, "%s%s", orig_dir, entry->name);

    struct stat s;
    stat(dbuf, &s);

    entry->dt_sz = s.st_size;
    entry->data = malloc(s.st_size);

    FILE* f = fopen(dbuf, "r");
    assert(f);
    size_t r = fread(entry->data, 1, s.st_size, f);
    assert(r == (size_t)s.st_size);
    fclose(f);

    free(dbuf);
    return s.st_size;
}


size_t
create_dir_data(Entry* entry)
{
    size_t i = 0;

    Entry* sub;
    while((sub = entry->subentries[i])) {
        assert(strlen(sub->name) > 1);
        char* filename = strrchr(sub->name, '/') + 1;

        // create record
        FileRecord fr = {
            .fi = (FileInformation) {
                .exists = true,
                .directory = sub->directory,
                .executable = false,  // TODO
                .link = false,        // TODO
                .unused = 0
            },
            .filename_length = strlen(sub->name),  // TODO - split
            .cluster = sub->sector.cluster,
            .sector = sub->sector.sector,
            .file_size = sub->dt_sz,
            .date_created = time(NULL),
            .date_modified = time(NULL),
        };

        // add record to sector
        size_t orig = entry->dt_sz;
        entry->dt_sz += sizeof(FileRecord) + strlen(filename) + 1;
        entry->data = realloc(entry->data, entry->dt_sz);
        memcpy(&entry->data[orig], &fr, sizeof(fr));                         // file record
        memcpy(&entry->data[orig + sizeof(fr)], filename, strlen(filename)); // file name
        entry->data[entry->dt_sz - 1] = 0;                                   // null termination  

        ++i;
    }

    return entry->dt_sz;
}


static ClusterSector
add_sectors(TinyFS* tfs, Entry* entries[], size_t i)
{
    size_t n_entries = i;

    ClusterSector boot = { 0, 0 };

    for(size_t j=0; j < n_entries; ++j) {
        Entry* entry = entries[j];
        ClusterSector sector = get_sector(j);
        for(size_t k=0; k < entry->dt_sz; k += SECTOR_SIZE) {
            // check for boot
            if(strcmp(entry->name, "/boot") == 0) {
                boot = entry->sector;
            }

            // store data
            tinyfs_setstr(tfs,
                    (sector.cluster * CLUSTER_SIZE) + (sector.sector * SECTOR_SIZE),
                    &entry->data[k], MIN(SECTOR_SIZE, entry->dt_sz - k));

            // store index
            if(entry->dt_sz - k > SECTOR_SIZE) {
                ClusterSector current = sector;
                sector = get_sector(i++);
                
                struct Index { uint8_t type: 2; uint16_t sector: 10; uint32_t cluster: 20; } idx = {
                    .cluster = sector.cluster,
                    .sector = sector.sector,
                    .type = (k == 0) ? 1 : 2,
                };
                assert(sizeof(idx) == 4);
                tinyfs_setstr(tfs, 
                        (CLUSTER_SIZE * current.cluster) + (4 * current.sector),
                        (uint8_t*)&idx, sizeof(idx));
            }
        }
    }

    return boot;
}


static void
add_disk_header(TinyFS* tfs, ClusterSector boot, size_t used_space, const char* disk_name, size_t root_sz)
{
    struct Index { uint16_t sector: 10; uint32_t cluster: 22; };
    struct DiskHeader {
        uint32_t fs_format;
        struct Index boot_sector;
        uint64_t disk_size;
        uint64_t used_space;
        char disk_name[23];
        uint32_t root_sector_sz;
        uint32_t root_date_created;
        uint32_t root_date_modified;
    } header = { 
        0, { boot.sector, boot.cluster }, 0, used_space, {}, root_sz, time(NULL), time(NULL) 
    };
    strncpy(header.disk_name, disk_name, MIN(23, strlen(disk_name)));
    tinyfs_setstr(tfs, 0, (uint8_t*)&header, sizeof(header));
}


void 
tinyfs_compile(const char* orig_dir, const char* dest_img, const char* disk_name)
{
    size_t used_space = 0u;

    fclose(fopen(dest_img, "w"));
    TinyFS* tfs = tinyfs_load(dest_img);

    // create entries and define a starting sector for each entry
    Entry* entries[60000];
    size_t i = 0;
    i = add_directory(entries, orig_dir, "/", i, NULL) + 1;

    // create the sector data for all entries
    for(size_t j=0; j<i; ++j) {
        if(!entries[j]->directory) {
            used_space += read_file_data(orig_dir, entries[j]);
        }
    }
    for(size_t j=0; j<i; ++j) {
        if(entries[j]->directory) {
            used_space += create_dir_data(entries[j]);
        }
    }
    
    // put the sectors in the disk
    ClusterSector boot = add_sectors(tfs, entries, i);
    add_disk_header(tfs, boot, used_space, disk_name, entries[0]->dt_sz);

    tinyfs_unload(&tfs);
}


void 
tinyfs_uncompile(char* orig_img, char* dest_dir)
{
    (void) orig_img;
    (void) dest_dir;
}


// vim: ts=4:sw=4:sts=4:expandtab
