'use strict';

class Motherboard {

    constructor(mem_size_kb) {
        this.mem_size_kb = mem_size_kb;
        this.reset();
    }

    reset() {
        this.mem = new Uint8Array(this.mem_size_kb * 1024);
        this.out_of_bounds = false;
    }

    set(addr, value) {
        if(addr === 0xFFFFFFFF) {
            this.out_of_bounds = ((value == 0) ? false : true);
        } else if(addr > this.mem_size_kb * 1024) { 
            this.out_of_bounds = true;
        } else {
            this.mem[addr] = value;
        }
    }

    get(addr) {
        if(addr === 0xFFFFFFFF) {
            return this.out_of_bounds ? 1 : 0;
        } else if(addr > this.mem_size_kb * 1024) { 
            this.out_of_bounds = true;
            return 0;
        } else {
            return this.mem[addr];
        }
    }

    set32(addr, value) {
        if(addr + 3 > this.mem_size_kb * 1024) { 
            this.out_of_bounds = true;
        } else {
            this.set(addr, value & 0xff);
            this.set(addr+1, (value >> 8) & 0xff);
            this.set(addr+2, (value >> 16) & 0xff);
            this.set(addr+3, value >> 24);
        }
    }

    get32(addr, value) {
        if(addr + 3 > this.mem_size_kb * 1024) { 
            this.out_of_bounds = true;
            return 0;
        } else {
            return (this.get(addr+3) << 24)   |
                   (this.get(addr+2) << 16) |
                   (this.get(addr+1) << 8)  |
                   this.get(addr);
        }
    }

    // 
    // tests
    //

    run_tests(section) {
        var te = new TestEnvironment(section);
        te.test('Memory amount (kB)',
                [ [ t => { return t.mem_size_kb; }, '=', 4, this ] ]);
        te.test('Getting/setting data (8-bit)',
                [ [ t => { t.set(0xAB, 42); return t.get(0xAB); }, '=', 42, this ] ]);
        te.test('Getting/setting data (32-bit)',
                [ [ t => { 
                        t.set(0x4, 0x01); 
                        t.set(0x5, 0x23); 
                        t.set(0x6, 0x45); 
                        t.set(0x7, 0x67); 
                        return t.get32(0x4);
                }, '=', 0x67452301, this ],
                  [ t => {
                        t.set32(0x8, 0x89ABCDEF);
                        return [ t.get(0x8), t.get(0xB) ];
                }, '=', [0xEF, 0x89], this ] ]);
        te.test('Out of bounds',
                [ 
                    [ t => { t.get(0xF0); return t.get(0xFFFFFFFF); }, '=', 0, this ],
                    [ t => { t.get(0xE000000); return t.get(0xFFFFFFFF); }, '=', 1, this ],
                ]);
        this.reset();
    }

}

// vim: ts=4:sw=4:sts=4:expandtab
