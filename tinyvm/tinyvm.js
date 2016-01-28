'use strict';

class TinyVM {

    constructor(ram_kb) {
        this.mboard = new Motherboard();
        this.mboard.setRAM(new RAM(ram_kb));
        this.mboard.addDevice(new BIOS());
    }

}

const tinyvm = new TinyVM(256);  // TODO

// vim: ts=4:sw=4:sts=4:expandtab
