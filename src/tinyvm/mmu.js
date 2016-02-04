'use strict';

class MMU {
    
    constructor(ram_size_kb) {
        this.ram = new RAM(ram_size_kb);
        this.supervisorMode = false;
        this.interrupt = 0x0;
        this.version = 1;
        this.last_error = 0;
        this.vmem = { active: false, directory: 0 };
        this.dev_name = 'TinyMMU';
    }


    name() {
        return 'MMU';
    }


    isMMU() { 
        return true; 
    }


    getReg(a) {
        if(a == 0x0) {
            return 0x01;  // MMU
        } else if(a == 0x1) {
            return this.version;
        } else if(a == 0x2) {
            return this.interrupt;
        } else if(a == 0x4) {
            return this.last_error;
        } else if(a == 0x5) {
            return this.supervisorMode ? 0x1 : 0x0;
        } else if(a >= 0x08 && a <= 0x0B) {
            return toU32(this.ram.memSize)[a - 0x8];
        } else if(a >= 0x0C && a <= 0x0F) {
            return toU32(this.vmem.directory | ((this.vmem.active ? 1 : 0) << 15))[a - 0xC];
        } else if(a >= 0xE0 && a < (0xE0 + this.dev_name.length)) {
            return this.dev_name[a - 0xE0].charCodeAt();
        } else {
            return 0;
        }
    }


    setReg(a, v) {
        if(a == 0x2) {
            this.interrupt = v;
        } else if(a == 0x4) {
            this.last_error = v;
        } else if(a == 0x5) {
            this.supervisorMode = (v ? true : false);
        }
    }


    get(addr) {
        if(this.vmem.active) {
            throw 'TODO'; // TODO
        } else {
            try {
                return this.ram.get(addr);
            } catch(e) {
                if(e === 'out of bounds') {
                    // TODO
                    return 0;
                }
            }
        }
    }


    set(addr, value) {
        if(this.vmem.active) {
            throw 'TODO'; // TODO
        } else {
            try {
                this.ram.set(addr, value);
            } catch(e) {
                if(e === 'out of bounds') {
                    // TODO
                }
            }
        }
    }


    vmemChanged() {
        console.log('x'); // TODO
    }


    //
    // DEBUG
    //

    updateDebug()
    {
        this.ram.updateDebug();

        [].forEach.call(document.getElementsByClassName('mmu_reg'), e => {
            e.memoryData.update();
        });
        document.getElementById('mmu_memory').memoryTable.update();

        document.getElementById('vmem_active').value = this.vmem.active ? '1' : '0';
        document.getElementById('vmem_directory').memoryData = this.vmem.directory;
    }
    
}

// vim: ts=4:sw=4:sts=4:expandtab
