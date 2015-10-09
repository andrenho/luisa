#ifndef TINYFS_LL_H_
#define TINYFS_LL_H_

#include <stdbool.h>
#include <stdio.h>
#include <stdint.h>
#include <time.h>

typedef struct TinyFS TinyFS;

// tinyfs initialization
TinyFS* tinyfs_load(const char* filename);
void    tinyfs_unload(TinyFS** tfs_ptr);

// file access (low level)
void     tinyfs_getstr(TinyFS* tfs, uint64_t pos, uint8_t* str, uint64_t sz);
void     tinyfs_setstr(TinyFS* tfs, uint64_t pos, uint8_t* str, uint64_t sz);
uint8_t  tinyfs_get8(TinyFS* tfs, uint64_t pos);
uint16_t tinyfs_get16(TinyFS* tfs, uint64_t pos);
uint32_t tinyfs_get32(TinyFS* tfs, uint64_t pos);
void     tinyfs_set8(TinyFS* tfs, uint64_t pos, uint8_t value);
void     tinyfs_set16(TinyFS* tfs, uint64_t pos, uint16_t value);
void     tinyfs_set32(TinyFS* tfs, uint64_t pos, uint32_t value);

#endif

// vim: ts=4:sw=4:sts=4:expandtab
