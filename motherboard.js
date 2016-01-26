'use strict';

const DEV_REG_ADDR = 0xF0000000;
const DEV_RAM_ADDR = 0xF0010000;
const OUT_OF_BOUNDS_REG = 0xFFFFFFFF;

class Motherboard {

    constructor(mem_size_kb) {
        this.mem_size_kb = mem_size_kb;
        this.mem_size = mem_size_kb * 1024;
        this.reset();
    }

    // 
    // MOTHERBOARD MANAGEMENT
    //

    reset() {
        this.mem = new Uint8Array(this.mem_size_kb * 1024);
        this.out_of_bounds = false;
        this.devices = [];
        this.mmu = null;

        this._current = { reg: DEV_REG_ADDR, ram: DEV_RAM_ADDR }     // used for calculating the device memory areas
    }

    //
    // MEMORY MANAGEMENT
    //

    set(addr, value) {
        if(addr === OUT_OF_BOUNDS_REG) {
            this.out_of_bounds = ((value == 0) ? false : true);
        } else if(addr >= DEV_REG_ADDR && addr < DEV_RAM_ADDR) {
            for(let d of this.devices) {
                if(addr >= d.reg_area && addr < (d.reg_area + d.reg_size)) {
                    d.dev.set(addr - d.reg_area, value);
                    return;
                }
            }
            this.out_of_bounds = true;  // if not found
        } else if(addr >= DEV_RAM_ADDR) {
            for(let d of this.devices) {
                if(d.has_ram) {
                    if(addr >= d.ram_area && addr < (d.ram_area + d.ram_size)) {
                        d.dev.set_ram(addr - d.ram_area, value);
                        return;
                    }
                }
            }
            this.out_of_bounds = true;  // if not found
        } else if(addr > this.mem_size) { 
            this.out_of_bounds = true;
        } else {
            this.mem[addr] = value;
        }
    }

    get(addr) {
        if(addr === OUT_OF_BOUNDS_REG) {
            return this.out_of_bounds ? 1 : 0;
        } else if(addr >= DEV_REG_ADDR && addr < DEV_RAM_ADDR) {
            for(let d of this.devices) {
                if(addr >= d.reg_area && addr < (d.reg_area + d.reg_size)) {
                    return d.dev.get(addr - d.reg_area);
                }
            }
            this.out_of_bounds = true;  // if not found
            // TODO
        } else if(addr >= DEV_RAM_ADDR) {
            for(let d of this.devices) {
                if(d.has_ram) {
                    if(addr >= d.ram_area && addr < (d.ram_area + d.ram_size)) {
                        return d.dev.get_ram(addr - d.ram_area, value);
                    }
                }
            }
            this.out_of_bounds = true;  // if not found
        } else if(addr > this.mem_size) { 
            this.out_of_bounds = true;
            return 0;
        } else {
            return this.mem[addr];
        }
    }

    set32(addr, value) {
        this.set(addr, value & 0xff);
        this.set(addr+1, (value >> 8) & 0xff);
        this.set(addr+2, (value >> 16) & 0xff);
        this.set(addr+3, value >> 24);
    }

    get32(addr, value) {
        return (this.get(addr+3) << 24) |
               (this.get(addr+2) << 16) |
               (this.get(addr+1) << 8)  |
               this.get(addr);
    }

    // 
    // DEVICE MANAGEMENT
    //

    add_device(dev) {
        let type = this._device_type(dev);
        if(type == 'invalid') {
            throw 'Invalid device ' + dev;
        }
        this.devices.push({ 
            dev: dev,
            reg_area: this._current.reg,
            reg_size: 256,
            has_ram: (type == 'RAMDevice'),
            ram_area: this._current.ram,
            ram_size: (type == 'RAMDevice') ? dev.area_requested() : undefined,
        });
        this._current.reg += 256;
        if(type == 'RAMDevice') {
            this._current.ram += dev.area_requested();
        }
        // TODO - area, mmu
        return type;
    }

    _device_type(dev) {
        if(dev.name && typeof dev.name === 'function' &&
           dev.get  && typeof dev.get  === 'function' &&
           dev.set  && typeof dev.set  === 'function') {
            if(dev.area_requested && typeof dev.area_requested === 'function' &&
               dev.get_ram && typeof dev.get_ram === 'function' &&
               dev.set_ram && typeof dev.set_ram === 'function') {
                return 'RAMDevice';
            } else if(dev.translate && typeof dev.translate === 'function') {
                return 'MMU';
            } else {
                return 'Device';
            }
        } else {
            return 'invalid';
        }
    }

    // 
    // TESTS
    //

    run_tests(section) {
        var te = new TestEnvironment(section);

        // test memory
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
                    [ t => { t.get(0xF0); return t.get(OUT_OF_BOUNDS_REG); }, '=', 0, this ],
                    [ t => { t.get(0xE000000); return t.get(OUT_OF_BOUNDS_REG); }, '=', 1, this ],
                ]);
        this.reset();

        // test devices
        class FakeDevice {};
        te.test('Invalid device', [[ t => { t.add_device(new FakeDevice()); }, 'exception', null, this ]]);

        class Device {
            constructor() { this.x = 0; }
            name() { return "test"; }
            get(a) { if(a === 0) return this.x; else return 0; }
            set(a, v) { if(a === 0) this.x = v; }
        };
        te.test('Device memory access', [
            [ t => { return t.add_device(new Device()); }, '=', 'Device', this ],
            [ t => {
                t.set(DEV_REG_ADDR + 0, 42);
                return t.get(DEV_REG_ADDR + 0);
            }, '=', 42, this ],
            [ t => { return t.out_of_bounds; }, '=', false, this ],
        ]);

        class RAMDevice {
            constructor() { this.x = 0; }
            name() { return ""; }
            get(a) { return 0; }
            set(a,v) { }
            area_requested() { return 256; }
            get_ram(a) { if(a === 0) return this.x; else return 0; }
            set_ram(a, v) { if(a === 0) this.x = v; }
        }
        te.test('RAM Device memory access', [
            [ t => { return t.add_device(new RAMDevice()); }, '=', 'RAMDevice', this ],
            [ t => {
                t.set(DEV_RAM_ADDR + 0, 42);
                return t.get(DEV_RAM_ADDR + 0);
            }, '=', 42, this ],
            [ t => { return t.out_of_bounds; }, '=', false, this ],
        ]);
    }

}

// vim: ts=4:sw=4:sts=4:expandtab
