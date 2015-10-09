#define _GNU_SOURCE 1

#include "computer.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
#include <unistd.h>

#include <dlfcn.h>
#include <confuse.h>

typedef struct Computer {
    char* name;
    MMU* mmu;

    char* mmu_lib;
    void* mmu_dl;
} Computer;


Computer* 
computer_init(const char* cfg_file)
{
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wdiscarded-qualifiers"
    cfg_opt_t mmu_opts[] = {
        CFG_INT("size_k", 0, CFGF_NONE),
        CFG_STR("lib", "", CFGF_NONE),
        CFG_END()
    };
    cfg_opt_t opts[] = {
        CFG_STR("name", "(empty)", CFGF_NONE),
        CFG_SEC("mmu", mmu_opts, CFGF_NONE),
        CFG_END()
    };
#pragma GCC diagnostic pop

    if(access(cfg_file, F_OK) == -1) {
        fprintf(stderr, "Could not find file `%s`.\n", cfg_file);
        abort();
    }

    cfg_t *cfg = cfg_init(opts, CFGF_NONE);
    if(cfg_parse(cfg, cfg_file) == CFG_PARSE_ERROR) {
        fprintf(stderr, "Invalid config file %s.\n", cfg_file);
        return NULL;
    }

    Computer* cp = calloc(sizeof(Computer), 1);
    cp->name = strdup(cfg_getstr(cfg, "name"));

    cfg_t* mmu_cfg = cfg_getsec(cfg, "mmu");
    cp->mmu_lib = strdup(cfg_getstr(mmu_cfg, "lib"));
    cp->mmu_dl = dlopen(cp->mmu_lib, RTLD_NOW | RTLD_GLOBAL | RTLD_DEEPBIND);
    if(!cp->mmu_dl) {
        fprintf(stderr, "Error loading library `%s`: %s\n", cp->mmu_lib, dlerror());
        abort();
    }
    MMU*(*mmu_init)(uint64_t) = dlsym(cp->mmu_dl, "mmu_init");
    if(!mmu_init) {
        fprintf(stderr, "Error loading function `mmu_init`: %s\n", dlerror());
        abort();
    }
    cp->mmu = mmu_init(cfg_getint(mmu_cfg, "size_k") * 1024);

    cfg_free(cfg);
    return cp;
}


void 
computer_free(Computer** cp_ptr)
{
    Computer* cp = *cp_ptr;

    ((void(*)(MMU**))dlsym(cp->mmu_dl, "mmu_free"))(&cp->mmu);
    free(cp->name);
    free(cp);
    *cp_ptr = NULL;
}


const char* computer_name(Computer* cp)
{
    return cp->name;
}


MMU* computer_mmu(Computer* cp)
{
    return cp->mmu;
}


char* computer_mmu_library(Computer* cp)
{
    return cp->mmu_lib;
}


// vim: ts=4:sw=4:sts=4:expandtab
