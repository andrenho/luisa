#ifndef COMPUTER_H_
#define COMPUTER_H_

#include "mmu.h"

typedef struct Computer Computer;
typedef struct MMU MMU;

Computer* computer_init(const char* cfg_file);
void computer_free(Computer** cp);

const char* computer_name(Computer* cp);
MMU* computer_mmu(Computer* cp);
char* computer_mmu_library(Computer* cp);

#endif

// vim: ts=4:sw=4:sts=4:expandtab
