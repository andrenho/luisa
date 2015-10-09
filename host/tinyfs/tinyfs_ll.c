#define _GNU_SOURCE 1

#include <assert.h>
#include <errno.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <sys/stat.h>
#include <string.h>

#include "tinyfs_ll.h"

typedef struct TinyFS {
    FILE* fd;
} TinyFS;


TinyFS*
tinyfs_load(const char* filename)
{
    TinyFS* tfs = calloc(sizeof(TinyFS), 1);
    tfs->fd = fopen(filename, "r+b");
    if(!tfs->fd) {
        perror("fopen");
    }
    return tfs;
}


void
tinyfs_unload(TinyFS** tfs_ptr)
{
    TinyFS* tfs = *tfs_ptr;
    fflush(tfs->fd);
    fclose(tfs->fd);
    free(tfs);
    *tfs_ptr = NULL;
}


//
// FILE ACCESS FUNCTIONS (LOW LEVEL)
//

void 
tinyfs_getstr(TinyFS* tfs, uint64_t pos, uint8_t* str, uint64_t sz)
{
    int n = fseek(tfs->fd, pos, SEEK_SET);
    if(n == -1) {
        perror("fseek");
    }
    memset(str, 0x0, sz);  // if reading goes after the end of file,
                           // the rest will be filled with zeros
    fread(str, 1, sz, tfs->fd);  // here, we ignore if the return is zero:
                                 // it just means we're past the end of file
}


void 
tinyfs_setstr(TinyFS* tfs, uint64_t pos, uint8_t* str, uint64_t sz)
{
    int n = fseek(tfs->fd, pos, SEEK_SET);
    if(n == -1) {
        perror("fseek");
    }
    size_t r = fwrite(str, 1, sz, tfs->fd);
    if(r < sz) {
        perror("fwrite");
    }
}


uint8_t
tinyfs_get8(TinyFS* tfs, uint64_t pos) {
    uint8_t c;
    tinyfs_getstr(tfs, pos, &c, 1);
    return c;
}


uint16_t
tinyfs_get16(TinyFS* tfs, uint64_t pos) {
    uint8_t c[2];
    tinyfs_getstr(tfs, pos, c, 2);
    return (uint16_t)c[0] | ((uint16_t)c[1] << 8);
}


uint32_t
tinyfs_get32(TinyFS* tfs, uint64_t pos) {
    uint8_t c[4];
    tinyfs_getstr(tfs, pos, c, 4);
    return (uint32_t)c[0] | ((uint32_t)c[1] << 8) | ((uint32_t)c[2] << 16) | ((uint32_t)c[3] << 24);
}


void
tinyfs_set8(TinyFS* tfs, uint64_t pos, uint8_t value) {
    tinyfs_setstr(tfs, pos, &value, 1);
}


void
tinyfs_set16(TinyFS* tfs, uint64_t pos, uint16_t value) {
    tinyfs_setstr(tfs, pos, (uint8_t*)&value, 2);
}


void
tinyfs_set32(TinyFS* tfs, uint64_t pos, uint32_t value) {
    tinyfs_setstr(tfs, pos, (uint8_t*)&value, 4);
}


// vim: ts=4:sw=4:sts=4:expandtab
