'use strict';

class TinyVM {

    constructor(ram_kb) {
        this.mboard = new Motherboard();
        this.mboard.addDevice(new MMU(ram_kb));

        const bios = new BIOS();
        this.mboard.addDevice(bios);
    }

    available() {
        for(let d of this.mboard.devices) {
            if(d.dev.available && !d.dev.available()) {
                return false;
            }
        }
        return true;
    }


    // 
    // DEBUG
    //

    updateDebug() {
        if(this.mboard.updateDebug) {
            this.mboard.updateDebug();
        }
        for(let d of this.mboard.devices) {
            if(d.dev.updateDebug) {
                d.dev.updateDebug();
            }
        }
    }

}

const tinyvm = new TinyVM(256);

// vim: ts=4:sw=4:sts=4:expandtab
