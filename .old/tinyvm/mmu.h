#ifndef MMU_H_
#define MMU_H_

#include <stdbool.h>
#include <stdint.h>

typedef struct MMU MMU;

//
// initializtion
//
MMU* mmu_init(uint64_t physical_size);
void mmu_free(MMU** mmu);

uint64_t mmu_size(MMU* mmu);
uint32_t mmu_vmem(MMU* mmu);
void     mmu_set_vmem(MMU* mmu, uint32_t data);
uint8_t  mmu_get8(MMU* mmu, uint64_t pos);
uint8_t  mmu_get_opcode(MMU* mmu, uint64_t pos);
void     mmu_set8(MMU* mmu, uint64_t pos, uint8_t data);
bool     mmu_supervisor_mode(MMU* mmu);
void     mmu_set_supervisor_mode(MMU* mmu, bool v);

typedef enum {
    NO_ERRORS, OUT_OF_BOUNDS, UNAUTHORIZED_WRITE, UNAUTHORIZED_EXECUTION, UNAUTHORIZED_USER_ACCESS
} Error;
Error mmu_error(MMU* mmu);
void  mmu_clear_error(MMU* mmu);

//
// macros
//
#if __BYTE_ORDER__ == __ORDER_LITTLE_ENDIAN__
#  define mmu_get16(mmu, pos) (((uint16_t)mmu_get8(mmu, pos+1) << 8) | (uint16_t)mmu_get8(mmu, pos))
#  define mmu_get32(mmu, pos) (((uint32_t)mmu_get8(mmu, pos+3) << 24) | ((uint32_t)mmu_get8(mmu, pos+2) << 16) \
                             | ((uint32_t)mmu_get8(mmu, pos+1) << 8) | (uint32_t)mmu_get8(mmu, pos+0))
#  define mmu_set16(mmu, pos, data) { \
	mmu_set8(mmu, pos, data & 0xff); \
	mmu_set8(mmu, pos+1, data >> 8); \
}
#  define mmu_set32(mmu, pos, data) { \
	mmu_set8(mmu, pos, data & 0xff); \
	mmu_set8(mmu, pos+1, (data >> 8) & 0xff); \
	mmu_set8(mmu, pos+2, (data >> 16) & 0xff); \
	mmu_set8(mmu, pos+3, (data >> 24) & 0xff); \
}
#else
#  error Big-endian architectures not yet supported.
#endif

// 
// debugging information
// 
uint32_t mmu_page_size(MMU* mmu);
uint8_t* mmu_physical_data(MMU* mmu);

typedef union Page {
    struct {
        uint32_t page     :22;
        bool active       :1;
        bool supervisor   :1;
        bool unwritable   :1;
        bool unexecutable :1;
        bool error        :1;
        bool mapped       :1;
        uint8_t unused    :4;
    };
    uint32_t data;
} Page;

Page mmu_vmem_page(MMU* mmu);
Page mmu_directory_page(MMU* mmu, uint32_t dir_offset, uint8_t* logical_flags);
Page mmu_table_page(MMU* mmu, uint32_t dir_offset, uint32_t tbl_offset, uint8_t* logical_flags);

enum { SUPERVISOR = 0b1, UNWRITABLE = 0b10, UNEXECUTABLE = 0b100, NOT_ACTIVE = 0b1000, UNMAPPED = 0b10000 };
uint64_t mmu_translate_to_physical(MMU* mmu, uint64_t pos, uint8_t* logical_flags);

Page mmu_physical_page_from_logical(MMU* mmu, uint32_t log_page);
int mmu_logical_pages_from_physical(MMU* mmu, uint32_t ph_page, Page** pages);

#endif

// vim: ts=4:sw=4:sts=4:expandtab
