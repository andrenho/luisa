'use strict';

// registers
const MDEV  = 0xF0000000,
      MVER  = 0xF0000001,
      MINT  = 0xF0000002,
      MERR  = 0xF0000004,
      MSUP  = 0xF0000005,
      RAMSZ = 0xF0000008,
      VMEM  = 0xF000000C,
      MNAME = 0xF00000E0;

// errors
const MMU_NO_ERRORS     = 0x0,
      MMU_OUT_OF_BOUNDS = 0x1,
      MMU_PAGE_FAULT    = 0x2,
      MMU_UNAUTH_WRITE  = 0x4,
      MMU_UNAUTH_EXEC   = 0x8,
      MMU_UNAUTH_ACCESS = 0x10;

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
        if(a === (MDEV - DEV_REG_ADDR)) {
            return 0x01;  // MMU
        } else if(a === (MVER - DEV_REG_ADDR)) {
            return this.version;
        } else if(a === (MINT - DEV_REG_ADDR)) {
            return this.interrupt;
        } else if(a === (MERR - DEV_REG_ADDR)) {
            return this.last_error;
        } else if(a === (MSUP - DEV_REG_ADDR)) {
            return this.supervisorMode ? 0x1 : 0x0;
        } else if(a >= (RAMSZ - DEV_REG_ADDR) && a <= (RAMSZ - DEV_REG_ADDR + 4)) {
            return toU32(this.ram.memSize)[a - 0x8];
        } else if(a >= (VMEM - DEV_REG_ADDR) && a <= (VMEM - DEV_REG_ADDR + 4)) {
            return toU32(this.vmem.directory | ((this.vmem.active ? 1 : 0) << 16))[a - 0xC];
        } else if(a >= (MNAME - DEV_REG_ADDR) && a < (MNAME - DEV_REG_ADDR + this.dev_name.length)) {
            return this.dev_name[a - 0xE0].charCodeAt();
        } else {
            return 0;
        }
    }


    setReg(a, v) {
        if(a === (MINT - DEV_REG_ADDR)) {
            this.interrupt = v;
        } else if(a === (MERR - DEV_REG_ADDR)) {
            this.last_error = v;
        } else if(a === (MSUP - DEV_REG_ADDR)) {
            this.supervisorMode = (v ? true : false);
        } else if(a === (VMEM - DEV_REG_ADDR)) {
            this.vmem.directory = v | (this.vmem.directory & 0xFF00);
        } else if(a === (VMEM - DEV_REG_ADDR + 1)) {
            this.vmem.directory = (this.vmem.directory & 0xFF) | (v << 8);
        } else if(a === (VMEM - DEV_REG_ADDR + 2)) {
            this.vmem.active = (v > 0) ? true : false;
        }
    }


    setReg32(addr, value) {
        this.setReg(addr, value & 0xff);
        this.setReg(addr+1, (value >> 8) & 0xff);
        this.setReg(addr+2, (value >> 16) & 0xff);
        this.setReg(addr+3, value >> 24);
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


    set32(addr, value) {
        this.set(addr, value & 0xff);
        this.set(addr+1, (value >> 8) & 0xff);
        this.set(addr+2, (value >> 16) & 0xff);
        this.set(addr+3, value >> 24);
    }


    translate(addr) {
        return {
            addr: 0,
            active: true,
            supervisorOnly: false,
            writable: true,
            executable: false,
        }
    }


    //
    // DEBUG
    //

    initDebug() {
        // setup vmem_directory field
        document.getElementById('vmem_directory').memoryData.afterUpdate = n => this.vmemChanged();

        //document.getElementById('

        // create memory map table
        /*
        this.vpages_td = [];
        let vpages = document.getElementById('mmu_virtual_pages');
        for(let y=0; y<(32*32); ++y) {
            let tr = vpages.appendChild(document.createElement('tr'));
            for(let x=0; x<32; ++x) {
                let td = document.createElement('td');
                td.className = 'page mmu_inactive';
                td.title = 'MMU page: 0x' + toHex(y * 32 + x) + '   /   MMU address: 0x' + toHex((y * 32 + x) * 0x1000);
                tr.appendChild(td);
                this.vpages_td.push(td);
            }
            vpages.appendChild(tr);
        }

        // create RAM table
        let r = 0;
        this.ram_pages_td = [];
        let rpages = document.getElementById('mmu_ram_pages');
        while(1) {
            let tr = rpages.appendChild(document.createElement('tr'));
            for(let x=0; x<32; ++x) {
                let td = document.createElement('td');
                td.className = 'page mmu_inactive';
                tr.appendChild(td);
                this.ram_pages_td.push(td);
                r += 0x1000;
                if(r > this.ram.memSize) {
                    break;
                }
            }
            rpages.appendChild(tr);
            if(r > this.ram.memSize) {
                break;
            }
        }
        */
    }


    vmemChanged() {
        this.vmem.active = document.getElementById('vmem_active').value == '1' ? true : false;
        this.vmem.directory = document.getElementById('vmem_directory').memoryData.value();
        this.updateDebug();
    }


    updateDebug()
    {
        this.ram.updateDebug();

        [].forEach.call(document.getElementsByClassName('mmu_reg'), e => {
            e.memoryData.update();
        });
        document.getElementById('mmu_memory').memoryTable.update();

        document.getElementById('vmem_active').value = this.vmem.active ? '1' : '0';
        document.getElementById('vmem_directory').memoryData.setValue(this.vmem.directory);

        //document.getElementById('mmu_disabled').style.display = this.vmem.active ? 'none' : 'block';
        //document.getElementById('mmu_enabled').style.display = this.vmem.active ? 'block' : 'none';

        // this.updatePages();
    }


    updatePages()
    {
        for(let i in this.vpages_td) {
            // TODO
        }
    }
    

    //
    // TESTS
    //

    static runTests(section) {
        const te = new TestEnvironment(section);

        let m = new MMU(256);

        te.test('Basic translation (VMem inactive)',
                [ [ t => t.translate(0xABCD).addr, '=', 0xABCD, m ] ]);
        
        te.test('Out of bounds',
                [ [ t => {
                    t.get(0xE0000000);
                    return t.getReg(MERR - DEV_REG_ADDR);
                }, '=', MMU_OUT_OF_BOUNDS, m ] ]);
        
        te.test('Activate virtual memory',
                [ [ t => { 
                    t.setReg32((VMEM - DEV_REG_ADDR), 0x4 | (1 << 16));
                    return t.vmem.active;
                  }, '=', true, m ] ]);

        te.test('Page fault',
                [ [ t => {
                    t.get(0xE0000000);
                    return t.getReg(MERR - DEV_REG_ADDR);
                }, '=', MMU_PAGE_FAULT, m ] ]);
        
        m.ram.set32(0x4ABC, 0x1F | (1 << 16));
        m.ram.set32(0x1F344, 0x2B | (1 << 16) | (1 << 18));

        te.test('Memory location translation',
                [ [ t => t.translate(0xABCD1234).addr, '=', 0x2B234, m ] ]);

        te.test('Accessing virtual memory', [
            [ t => { 
                t.set(0xABCD1234, 0x42);
                return t.ram.get(0x2B234);
            }, '=', 0x42, m ],
            [ t => t.get(0xABCD1234), '=', 0x42, m ]
        ]);

        te.test('Set supervisor mode', [
            [ t => {
                t.setReg((MSUP - DEV_REG_ADDR), 0x1);
                return t.supervisorMode;
            }, '=', true, m ]
        ]);

        te.test('Access data in supervisor mode', [
            [ t => {
                t.get(0xABCD1234);
                return t.getReg(MERR - DEV_REG_ADDR);
            }, '=', MMU_UNAUTH_WRITE, m ],
            [ t => {
                t.setReg(MERR - DEV_REG_ADDR, MMU_NO_ERRORS);
                t.ram.set32(0x4ABC, t.ram.get32(0x4ABC) | (1 << 17));
                return t.getReg(MERR - DEV_REG_ADDR);
            }, '=', MMU_NO_ERRORS, m ]
        ]);

        m.setReg((MSUP - DEV_REG_ADDR), 0x0);

        te.test('Write data in unwritable', [
            [ t => {
                t.ram.set32(0x1F344, 0x2B | (1 << 16));
                t.set(0xABCD1234, 0xFF);
                return t.getReg(MERR - DEV_REG_ADDR);
            }, '=', MMU_UNAUTH_WRITE, m ],
            [ t => t.get(0xABCD1234), '=', 0x42, m ]
        ]);
                
        te.test('Non-executable area', [
            [ t => {
                t.get(0xABCD1234, true);
                return t.getReg(MERR - DEV_REG_ADDR);
            }, '=', MMU_UNAUTH_EXEC, m ],
            [ t => {
                m.ram.set32(0x1F344, 0x2B | (1 << 16) | (1 << 18) | (1 << 19));
                t.get(0xABCD1234, true);
                return t.getReg(MERR - DEV_REG_ADDR);
            }, '=', MMU_NO_ERRORS, m ],
        ]);


        // TODO - test supervisor, writable, executable
    }

}

// vim: ts=4:sw=4:sts=4:expandtab
