'use strict';

class MMU {
    
    constructor(ram_size_kb) {
        this.active = false;
        this.ram = new RAM(ram_size_kb);
    }


    name() {
        return 'MMU';
    }


    isMMU() { 
        return true; 
    }


    get(addr) {
        if(this.active) {
            throw 'TODO'; // TODO
        } else {
            try {
                return this.ram.get(addr);
            } catch(e) {
                if(e === 'out of bounds') {
                    throw 'TODO'; // TODO
                }
            }
        }
    }


    set(addr, value) {
        if(this.active) {
            throw 'TODO'; // TODO
        } else {
            try {
                this.ram.set(addr, value);
            } catch(e) {
                if(e === 'out of bounds') {
                    throw 'TODO'; // TODO
                }
            }
        }
    }
    
}

// vim: ts=4:sw=4:sts=4:expandtab
