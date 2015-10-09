#include "tinyfs.h"

#include <stdio.h>
#include <stdlib.h>

int main(int argc, char** argv)
{
    if(argc != 3 && argc != 4) {
        fprintf(stderr, "Usage: %s DIRECTORY IMAGE_FILE [DISK_NAME]\n", argv[0]);
        exit(EXIT_FAILURE);
    }

    tinyfs_compile(argv[1], argv[2], argc == 3 ? "" : argv[3]);
}


// vim: ts=4:sw=4:sts=4:expandtab
