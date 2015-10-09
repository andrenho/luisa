#ifndef TINYFS_H_
#define TINYFS_H_

void tinyfs_compile(const char* orig_dir, const char* dest_img, const char* disk_name);
void tinyfs_uncompile(char* orig_img, char* dest_dir);

// TODO - file tree

#endif

// vim: ts=4:sw=4:sts=4:expandtab
