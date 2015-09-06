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


int mmu_ph_changed_last_step(uint64_t pos)
{
    (void) pos;
    return 0; // TODO
}


uint8_t mmu_ph_get8(uint64_t pos)
{
    return ph[pos];
}


void mmu_ph_set8(uint64_t pos, uint8_t data)
{
    ph[pos] = data;
}


// vim: ts=4:sw=4:sts=4:expandtab
