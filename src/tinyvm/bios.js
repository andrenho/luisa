'use strict';

class BIOS {
    
    constructor() {
        // prepare register data
        this.reg_data = [ 0x6C, 0x00, 0x00, 0x01, 0xF0 ];

        // TODO - version information

        this._loaded = { asm: false, bin: false };

        let self = this;
        
        // load source
        let cs = new XMLHttpRequest();
        cs.open('GET', 'bios/bios.asm');
        cs.onreadystatechange = () => {
            if(cs.readyState === XMLHttpRequest.DONE && cs.status === 200) {
                self.source = cs.response;
                self._loaded.asm = true;
            }
        };
        cs.send();

        // load binary
        let cb = new XMLHttpRequest();
        cb.open('GET', 'bios/bios.bin');
        cb.onreadystatechange = () => {
            if(cb.readyState === XMLHttpRequest.DONE && cb.status === 200) {
                if(cb.response.length > (64*1024)) {
                    throw "BIOS can't have more than 64 Kb";
                }
                self.bin = new Uint8Array(cb.response.length);
                for(let i=0; i<cb.response.length; ++i) {
                    self.bin[i] = cb.response[i].codePointAt(0);
                }
                self.bios_size = cb.response.length;
                self._loaded.bin = true;
            }
        }
        cb.send();
    }

    available() {
        return this._loaded.asm && this._loaded.bin;
    }

    name() { 
        return "BIOS"; 
    }

    get(a) {
        if(a >= this.reg_data.length) {
            return 0;
        } else {
            return this.reg_data[a];
        }
    }

    set(a,v) { }

    areaRequested() { return 64 * 1024; }

    getRAM(a) {
        if(a >= this.bios_size) {
            return 0;
        } else {
            return this.bin[a];
        }
    }

    setRAM(a, v) {
        if(a >= this.bios_size) {
            // TODO
        } else {
            this.bin[a] = v;
        }
    }
}


// vim: ts=4:sw=4:sts=4:expandtab
