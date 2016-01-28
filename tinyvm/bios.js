'use strict';

class BIOS {
    
    constructor() {
        // prepare register data
        this.reg_data = [ 0x6C, 0x00, 0x00, 0x01, 0xF0 ];

        // TODO - version information

        // load source
        let client = new XMLHttpRequest();
        client.open('GET', 'bios/bios.asm');
        client.onreadystatechange = () => console.log(client);
        client.send();

        // load binary
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

    getRAM(a) { return 0; }

    setRAM(a, v) { }
}


// vim: ts=4:sw=4:sts=4:expandtab
