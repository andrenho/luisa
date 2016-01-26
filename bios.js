'use strict';

class BIOS {
    name() { return "BIOS"; }
    get(a) { return 0; }
    set(a,v) { }
    area_requested() { return 64 * 1024; }
    get_ram(a) { return 0; }
    set_ram(a, v) { }
}


// vim: ts=4:sw=4:sts=4:expandtab
