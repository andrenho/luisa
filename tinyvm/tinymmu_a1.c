#include <stdint.h>
#include <stdlib.h>

static uint64_t size = 0;
static uint8_t* ph = NULL;

void mmu_init(uint64_t sz)
{
    size = sz;
    ph = malloc(sz);
}


const char* mmu_name()
{
    return "TinyMMU v1";
}


//
// physical
//
uint64_t mmu_ph_size()
{
    return size;
}


uint8_t mmu_ph_get8(uint64_t pos)
{
    return ph[pos];
}


// vim: ts=4:sw=4:sts=4:expandtab