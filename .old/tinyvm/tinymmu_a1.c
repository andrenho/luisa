#include <assert.h>
#include <math.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdlib.h>

#include "mmu.h"

#define PAGE_SIZE 0x1000
#define PAGE_MASK 0x3FFFFF
#define PAGE_ACTIVE       (1<<22)
#define PAGE_SUPERVISOR   (1<<23)
#define PAGE_UNWRITEABLE  (1<<24)
#define PAGE_UNEXECUTABLE (1<<25)

typedef struct MMU {
    uint64_t size;
    uint32_t vmem;
    uint8_t* data;
    bool     supervisor;
    Error    error;
} MMU;


//
// physical access
//
#if __BYTE_ORDER__ == __ORDER_LITTLE_ENDIAN__
#  define mmu_ph_get8(mmu, pos) ((mmu)->data[pos])
#  define mmu_ph_get16(mmu, pos) ((uint16_t)((mmu)->data[pos+1] << 8) | (uint16_t)(mmu)->data[pos])
#  define mmu_ph_get32(mmu, pos) ((uint32_t)((mmu)->data[pos+3] << 24) | \
                                 (uint32_t)((mmu)->data[pos+2] << 16) | \
                                 (uint32_t)((mmu)->data[pos+1] << 8)  | \
                                 (uint32_t)((mmu)->data[pos]))
#  define mmu_ph_set8(mmu, pos, value) { (mmu)->data[pos] = value; }
#  define mmu_ph_set16(mmu, pos, value) { \
    (mmu)->data[pos] = value & 0xff; \
    (mmu)->data[pos+1] = value >> 8; \
}
#  define mmu_ph_set32(mmu, pos, value) { \
    (mmu)->data[pos] = value & 0xff; \
    (mmu)->data[pos+1] = (value >> 8) & 0xff; \
    (mmu)->data[pos+2] = (value >> 16) & 0xff; \
    (mmu)->data[pos+3] = (value >> 24) & 0xff; \
}
#else
#  error Big-endian architectures not yet supported.
#endif


// 
// initaliztion
//

MMU* 
mmu_init(uint64_t physical_size)
{
    MMU* mmu = malloc(sizeof(MMU));
    mmu->size = ceil(physical_size / (float)0x1000) * 0x1000;
    mmu->vmem = 0x0;
    mmu->data = calloc(mmu->size, 1);
    mmu->supervisor = false;
    mmu->error = NO_ERRORS;
    return mmu;
}


void 
mmu_free(MMU** mmu)
{
    free((*mmu)->data);
    free(*mmu);
    *mmu = NULL;
}


// 
// memory public access
// 
uint64_t 
mmu_size(MMU* mmu)
{
    return mmu->size;
}


uint32_t 
mmu_vmem(MMU* mmu)
{
    return mmu->vmem;
}


void 
mmu_set_vmem(MMU* mmu, uint32_t data)
{
    mmu->vmem = data;
}


uint64_t
mmu_translate_to_physical(MMU* mmu, uint64_t lpos, uint8_t* logical_flags)
{
    if(logical_flags) { *logical_flags = 0; }

    Page vmem = mmu_vmem_page(mmu);
    if(vmem.active) {
        uint64_t dir_idx = lpos >> 22,
                 tbl_idx = (lpos >> 12) & 0x3FF,
                 offset = lpos & 0x3FF;
        Page table = mmu_table_page(mmu, dir_idx, tbl_idx, logical_flags);
        if(table.error) {
            mmu->error = OUT_OF_BOUNDS;
            return 0;
        } else if(!table.active) {
            *logical_flags |= UNMAPPED;
            return lpos;
        }
        return table.page * PAGE_SIZE + offset;
    } else {
        *logical_flags |= NOT_ACTIVE;
        return lpos;
    }
}


uint8_t 
mmu_get8(MMU* mmu, uint64_t pos)
{
    uint8_t flags = 0;
    uint64_t ppos = mmu_translate_to_physical(mmu, pos, &flags);
    if(!mmu->supervisor && (flags & SUPERVISOR)) {
        mmu->error = UNAUTHORIZED_USER_ACCESS;
        return 0;
    } else if(ppos < mmu_size(mmu)) {
        return mmu->data[ppos];
    } else {
        mmu->error = OUT_OF_BOUNDS;
        return 0;
    }
}


uint8_t 
mmu_get_opcode(MMU* mmu, uint64_t pos)
{
    uint8_t flags = 0;
    uint64_t ppos = mmu_translate_to_physical(mmu, pos, &flags);
    if(!mmu->supervisor && (flags & SUPERVISOR)) {
        mmu->error = UNAUTHORIZED_USER_ACCESS;
        return 0;
    } else if(flags & UNEXECUTABLE) {
        mmu->error = UNAUTHORIZED_EXECUTION;
        return 0;
    } else if(ppos < mmu_size(mmu)) {
        return mmu->data[ppos];
    } else {
        mmu->error = OUT_OF_BOUNDS;
        return 0;
    }
}


void 
mmu_set8(MMU* mmu, uint64_t pos, uint8_t data)
{
    uint8_t flags = 0;
    uint64_t ppos = mmu_translate_to_physical(mmu, pos, &flags);
    if(flags & UNWRITABLE) {
        mmu->error = UNAUTHORIZED_WRITE;
        return;
    }
    if(ppos < mmu_size(mmu)) {
        mmu->data[ppos] = data;
    } else {
        mmu->error = OUT_OF_BOUNDS;
    }
}


Error 
mmu_error(MMU* mmu)
{
    return mmu->error;
}


void  
mmu_clear_error(MMU* mmu)
{
    mmu->error = NO_ERRORS;
}


bool     
mmu_supervisor_mode(MMU* mmu)
{
    return mmu->supervisor;
}


void     
mmu_set_supervisor_mode(MMU* mmu, bool v)
{
    mmu->supervisor = v;
}


//
// debugging information
//

uint32_t 
mmu_page_size(MMU* mmu)
{
    (void) mmu;
    return PAGE_SIZE;
}


uint8_t* 
mmu_physical_data(MMU* mmu)
{
    return mmu->data;
}


Page 
mmu_vmem_page(MMU* mmu)
{
    return (Page) { .data = mmu->vmem };
}


Page mmu_directory_page(MMU* mmu, uint32_t dir_offset, uint8_t* logical_flags)
{
    assert(dir_offset < 0x400);

    Page vmem = mmu_vmem_page(mmu);
    if(vmem.active) {
        uint32_t addr = vmem.page * PAGE_SIZE + (dir_offset*4);
        if(addr >= mmu_size(mmu)) {
            return (Page) { .error = true };
        }
        Page r = { .data = mmu_ph_get32(mmu, addr) };
        if(logical_flags && r.supervisor) {
            *logical_flags |= SUPERVISOR;
        }
        return r;
    } else {
        *logical_flags |= NOT_ACTIVE;
        return (Page) { .data = 0x0 };
    }
}


Page mmu_table_page(MMU* mmu, uint32_t dir_offset, uint32_t tbl_offset, uint8_t* logical_flags)
{
    assert(tbl_offset < 0x400);

    Page dir = mmu_directory_page(mmu, dir_offset, logical_flags);
    if(dir.error) {
        return (Page) { .error = true };
    } else if(dir.active) {
        uint32_t addr = dir.page * PAGE_SIZE + (tbl_offset*4);
        if(addr >= mmu_size(mmu)) {
            return (Page) { .error = true };
        }
        Page r = { .data = mmu_ph_get32(mmu, addr) };
        if(logical_flags) {
            if(r.unexecutable) {
                *logical_flags |= UNEXECUTABLE;
            }
            if(r.unwritable) {
                *logical_flags |= UNWRITABLE;
            }
        }
        return r;
    } else {
        *logical_flags |= NOT_ACTIVE;
        return (Page) { .data = 0x0 };
    }
}


Page 
mmu_physical_page_from_logical(MMU* mmu, uint32_t log_page)
{
    uint8_t flags;
    uint64_t addr = mmu_translate_to_physical(mmu, (uint64_t)log_page * PAGE_SIZE, &flags);
    return (Page) {
        .page = addr / PAGE_SIZE,
        .active = !(flags & NOT_ACTIVE),
        .supervisor = (flags & SUPERVISOR),
        .unwritable = (flags & UNWRITABLE),
        .unexecutable = (flags & UNEXECUTABLE),
        .mapped = !(flags & UNMAPPED),
    };
}


int 
mmu_logical_pages_from_physical(MMU* mmu, uint32_t ph_page, Page** pages)
{
    int n = 0;
    Page vmem = mmu_vmem_page(mmu);
    *pages = NULL;

    if(vmem.active) {
        for(uint64_t i=0; i<(PAGE_SIZE/4); ++i) {
            uint8_t flags = 0;
            Page dir = mmu_directory_page(mmu, i, &flags);
            if(dir.active) {
                for(uint64_t j=0; j<(PAGE_SIZE/4); ++j) {
                    Page tbl = mmu_table_page(mmu, i, j, &flags);
                    if(tbl.active) {
                        if(ph_page == tbl.page) {
                            (*pages) = realloc(*pages, sizeof(Page) * (n+1));
                            (*pages)[n].page = ((i << 22) | (j << 12)) / 0x1000;
                            (*pages)[n].active = !(flags & NOT_ACTIVE);
                            (*pages)[n].supervisor = (flags & SUPERVISOR);
                            (*pages)[n].unwritable = (flags & UNWRITABLE);
                            (*pages)[n].unexecutable = (flags & UNEXECUTABLE);
                            (*pages)[n].mapped = !(flags & UNMAPPED);
                            ++n;
                        }
                    }
                }
            }
        }
    }

    return n;
}


// vim: ts=4:sw=4:sts=4:expandtab
