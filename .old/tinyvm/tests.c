#include <inttypes.h>
#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <string.h>

#include "mmu.h"
#define PAGE_ACTIVE       (1<<22)
#define PAGE_SUPERVISOR   (1<<23)
#define PAGE_UNWRITABLE   (1<<24)
#define PAGE_UNEXECUTABLE (1<<25)

#include "computer.h"

const char* test;

#define ASSERT_EQ(EXP1, EXP2) { \
    if((EXP1) == (EXP2)) { \
        printf("."); \
    } else { \
        printf("\n\n=== %s ===\n", test); \
        printf(__FILE__ ":%d: failed assertion: " #EXP1 " == " #EXP2 "\n", __LINE__); \
        printf("  Result from left side: 0x%" PRIx64 "\n", (uint64_t)(EXP1)); \
        printf("  Result from right side: 0x%" PRIx64 "\n", (uint64_t)(EXP2)); \
        exit(EXIT_FAILURE); \
    } \
}

#define ASSERT_EQS(EXP1, EXP2) { \
    if(strcmp((EXP1), (EXP2)) == 0) { \
        printf("."); \
    } else { \
        printf("\n\n=== %s ===\n", test); \
        printf(__FILE__ ":%d: failed assertion: " #EXP1 " == " #EXP2 "\n", __LINE__); \
        printf("  Result from left side: %s\n", (EXP1)); \
        printf("  Result from right side: %s\n", (EXP2)); \
        exit(EXIT_FAILURE); \
    } \
}


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

void abort_handler(int s) __attribute__((noreturn));
void abort_handler(int s)
{
    printf("\n\n=== %s ===\n", test);
    abort();
    exit(s);
}


static void test_mmu(MMU* mmu)
{
    //MMU* mmu = mmu_init(255 * 1024);
    uint8_t* data = mmu_physical_data(mmu);

    test = "Memory initialization";
    ASSERT_EQ(mmu_size(mmu), 256 * 1024);
    ASSERT_EQ(mmu_vmem_page(mmu).active, false);

    test = "Memory endianess";
    data[0] = 0x00;
    data[1] = 0x2A;
    uint16_t v = mmu_get16(mmu, 0x0);
    ASSERT_EQ(v, 0x2A00);
    mmu_set16(mmu, 0x2, 0x2A00);
    ASSERT_EQ(mmu_get8(mmu, 0x2), 0x00);
    ASSERT_EQ(mmu_get8(mmu, 0x3), 0x2A);

    test = "Activate virtual memory";
    mmu_set_vmem(mmu, (0x4 | PAGE_ACTIVE));
    ASSERT_EQ(mmu_vmem_page(mmu).active, true);
    ASSERT_EQ(mmu_vmem_page(mmu).page, 4);

    test = "Creating virtual pages";

    // setup page directory
    uint32_t dir_addr = 0x4 * mmu_page_size(mmu) + (0x2AF*4);
    mmu_set32(mmu, dir_addr, (0x1F | PAGE_ACTIVE));
    ASSERT_EQ(data[dir_addr], 0x1F);
    Page dir = mmu_directory_page(mmu, 0x2AF, NULL);
    ASSERT_EQ(dir.active, true);
    ASSERT_EQ(dir.supervisor, false);
    ASSERT_EQ(dir.page, 0x1F);

    uint32_t tbl_addr = 0x1F * mmu_page_size(mmu) + (0xD1*4);
    mmu_set32(mmu, tbl_addr, (0x2B | PAGE_ACTIVE));
    ASSERT_EQ(data[tbl_addr], 0x2B);
    Page tbl = mmu_table_page(mmu, 0x2AF, 0xD1, NULL);
    ASSERT_EQ(tbl.active, true);
    ASSERT_EQ(tbl.unwritable, false);
    ASSERT_EQ(tbl.unexecutable, false);
    ASSERT_EQ(tbl.page, 0x2B);
    ASSERT_EQ(tbl.page * mmu_page_size(mmu) + 0x234, 0x2B234);

    test = "Test translating physical to logical";
    ASSERT_EQ(mmu_translate_to_physical(mmu, 0xABCD1234, NULL), 0x2B234);
    
    test = "Test reading from virtual memory";
    data[0x2B234] = 0xFE;
    ASSERT_EQ(mmu_get8(mmu, 0xABCD1234), 0xFE);

    test = "Test writing to virtual memory";
    mmu_set8(mmu, 0xABCD1234, 0xAB);
    ASSERT_EQ(mmu_get8(mmu, 0xABCD1234), 0xAB);
    ASSERT_EQ(data[0x2B234], 0xAB);

    test = "Test page directory active";
    mmu_set8(mmu, dir_addr+2, mmu_get8(mmu, dir_addr+2) & ~(1 << 6));  // disable directory
    dir = mmu_directory_page(mmu, 0x2AF, NULL);
    ASSERT_EQ(dir.active, false);
    ASSERT_EQ(mmu_get8(mmu, 0xABCD1234), 0x0);  // try to access invalid address
    ASSERT_EQ(mmu_error(mmu), OUT_OF_BOUNDS);
    mmu_clear_error(mmu);
    mmu_set8(mmu, dir_addr+2, mmu_get8(mmu, dir_addr+2) | (1 << 6));  // reenable directory
    ASSERT_EQ(mmu_get8(mmu, 0xABCD1234), 0xAB);  // try to access invalid address
    
    test = "Test page table active";
    mmu_set8(mmu, tbl_addr+2, mmu_get8(mmu, tbl_addr+2) & ~(1 << 6));  // disable directory
    tbl = mmu_table_page(mmu, 0x2AF, 0xD1, NULL);
    ASSERT_EQ(tbl.active, false);
    ASSERT_EQ(mmu_get8(mmu, 0xABCD1234), 0x0);  // try to access invalid address
    ASSERT_EQ(mmu_error(mmu), OUT_OF_BOUNDS);
    mmu_clear_error(mmu);
    mmu_set8(mmu, tbl_addr+2, mmu_get8(mmu, tbl_addr+2) | (1 << 6));  // reenable directory
    ASSERT_EQ(mmu_get8(mmu, 0xABCD1234), 0xAB);  // try to access invalid address

    test = "Test supervisor access";
    mmu_get8(mmu, 0xABCD1234);
    ASSERT_EQ(mmu_error(mmu), NO_ERRORS);
    mmu_set32(mmu, dir_addr, (0x1F | PAGE_ACTIVE | PAGE_SUPERVISOR));  // set supervisor mode
    mmu_get8(mmu, 0xABCD1234);
    ASSERT_EQ(mmu_error(mmu), UNAUTHORIZED_USER_ACCESS);
    mmu_clear_error(mmu);
    mmu_set32(mmu, dir_addr, (0x1F | PAGE_ACTIVE));  // undo supervisor

    test = "Test read-only page";
    mmu_set8(mmu, 0xABCD1234, 0x1);
    ASSERT_EQ(mmu_error(mmu), NO_ERRORS);
    mmu_set32(mmu, tbl_addr, (0x2B | PAGE_ACTIVE | PAGE_UNWRITABLE));
    mmu_set8(mmu, 0xABCD1234, 0x1);
    ASSERT_EQ(mmu_error(mmu), UNAUTHORIZED_WRITE);
    mmu_clear_error(mmu);

    test = "Test executable page";
    mmu_set32(mmu, tbl_addr, (0x2B | PAGE_ACTIVE | PAGE_UNEXECUTABLE));
    mmu_get_opcode(mmu, 0xABCD1234);
    ASSERT_EQ(mmu_error(mmu), UNAUTHORIZED_EXECUTION);
    mmu_clear_error(mmu);

    test = "Test GPF";
    mmu_set32(mmu, dir_addr, (0x3CA | PAGE_ACTIVE));
    mmu_get8(mmu, 0xABCD1234);
    ASSERT_EQ(mmu_error(mmu), OUT_OF_BOUNDS);
    mmu_clear_error(mmu);
    mmu_set32(mmu, dir_addr, (0x1F | PAGE_ACTIVE));

    test = "Test debugging info (physical -> logical)";
    Page physical_page = mmu_physical_page_from_logical(mmu, 0xABCD1);
    ASSERT_EQ(physical_page.page, 0x2B);
    physical_page = mmu_physical_page_from_logical(mmu, 0xABCD2);
    ASSERT_EQ(physical_page.mapped, false);

    test = "Test debugging info (logical -> physical)";
    Page* logical_pages;
    int n = mmu_logical_pages_from_physical(mmu, 0x2b, &logical_pages);
    ASSERT_EQ(n, 1);
    ASSERT_EQ(logical_pages[0].page, 0xABCD1);
    free(logical_pages);

    //mmu_free(&mmu);
}


int main()
{
    signal(SIGABRT, abort_handler);

    test = "Create computer";
    Computer* cp = computer_init("tinyvm_a1.conf");
    ASSERT_EQS(computer_name(cp), "TinyVM a1");

    test_mmu(computer_mmu(cp));

    computer_free(&cp);
    printf("\nAll tests ok :)\n");
}

// vim: ts=4:sw=4:sts=4:expandtab
