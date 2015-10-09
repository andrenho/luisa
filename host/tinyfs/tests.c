#define _GNU_SOURCE
#include <inttypes.h>
#include <fcntl.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <signal.h>
#include <time.h>
#include <unistd.h>
#include <sys/stat.h>

#include "tinyfs.h"
#include "tinyfs_ll.h"

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

#define ASSERT_NEQ(EXP1, EXP2) { \
    if((EXP1) != (EXP2)) { \
        printf("."); \
    } else { \
        printf("\n\n=== %s ===\n", test); \
        printf(__FILE__ ":%d: failed assertion: " #EXP1 " != " #EXP2 "\n", __LINE__); \
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


static void abort_handler(int s) __attribute__((noreturn));
static void abort_handler(int s)
{
    printf("\n\n=== %s ===\n", test);
    signal(SIGABRT, SIG_DFL);
    abort();
    exit(s);
}


static void test_ll()
{
    test = "Create tinyfs";
    remove("test_tfs");
    int f = creat("test_tfs", S_IRUSR | S_IWUSR | S_IRGRP | S_IWGRP | S_IROTH);
    ASSERT_NEQ(f, -1);
    close(f);
    TinyFS* tfs = tinyfs_load("test_tfs");
    ASSERT_NEQ(tfs, NULL);

    test = "Low level data access (8-bit)";
    ASSERT_EQ(tinyfs_get8(tfs, 0xFFF), 0x0);
    tinyfs_set8(tfs, 0xFFF, 0xFE);
    ASSERT_EQ(tinyfs_get8(tfs, 0xFFF), 0xFE);
    tinyfs_set8(tfs, 0xFFF, 0x0);

    test = "Low level data access (32-bit)";
    tinyfs_set32(tfs, 0x100, 0xCAFEBABE);
    ASSERT_EQ(tinyfs_get32(tfs, 0x100), 0xCAFEBABE);
    tinyfs_set32(tfs, 0x100, 0x0);
    ASSERT_EQ(tinyfs_get32(tfs, 0x100), 0x0);

    tinyfs_unload(&tfs);
    remove("test_tfs");
}



void test_tinyfs()
{
    remove("test_tfs");
    tinyfs_compile("testdir", "test_tfs", "TINYFS");
}



int main(int argc, char** argv)
{
    (void) argc;
    (void) argv;
    signal(SIGABRT, abort_handler);
    test_ll();
    test_tinyfs();
    printf("\nAll tests ok :)\n");
    exit(EXIT_SUCCESS);
}

// vim: ts=4:sw=4:sts=4:expandtab
