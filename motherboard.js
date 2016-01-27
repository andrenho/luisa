'use strict';

const DEV_REG_ADDR = 0xF0000000;
const DEV_RAM_ADDR = 0xF0010000;
const OUT_OF_BOUNDS_REG = 0xFFFFFFFF;

class Motherboard {

    constructor(memSizeKb, naked) {
        this.memSizeKb = memSizeKb;
        this.memSize = memSizeKb * 1024;
        this._naked = naked;
        this.reset();
    }

    //
    // MOTHERBOARD MANAGEMENT
    //

    reset() {
        this.mem = new Uint8Array(this.memSizeKb * 1024);
        this.outOfBounds = false;
        this.devices = [];
        this.mmu = null;

        this._current = { reg: DEV_REG_ADDR, ram: DEV_RAM_ADDR }     // used for calculating the device memory areas

        // devices
        if(!this._naked) {
            this.addDevice(new BIOS());
        }
    }

    //
    // MEMORY MANAGEMENT
    //

    set(addr, value) {
        if(addr === OUT_OF_BOUNDS_REG) {
            this.outOfBounds = ((value == 0) ? false : true);
        } else if(addr >= DEV_REG_ADDR && addr < DEV_RAM_ADDR) {
            for(let d of this.devices) {
                if(addr >= d.reg_area && addr < (d.reg_area + d.reg_size)) {
                    d.dev.set(addr - d.reg_area, value);
                    return;
                }
            }
            this.outOfBounds = true;  // if not found
        } else if(addr >= DEV_RAM_ADDR) {
            for(let d of this.devices) {
                if(d.has_ram) {
                    if(addr >= d.ram_area && addr < (d.ram_area + d.ram_size)) {
                        d.dev.setRAM(addr - d.ram_area, value);
                        return;
                    }
                }
            }
            this.outOfBounds = true;  // if not found
        } else if(addr >= this.memSize) { 
            this.outOfBounds = true;
        } else {
            this.mem[addr] = value;
        }
    }

    get(addr) {
        if(addr === OUT_OF_BOUNDS_REG) {
            return this.outOfBounds ? 1 : 0;
        } else if(addr >= DEV_REG_ADDR && addr < DEV_RAM_ADDR) {
            for(let d of this.devices) {
                if(addr >= d.reg_area && addr < (d.reg_area + d.reg_size)) {
                    return d.dev.get(addr - d.reg_area);
                }
            }
            this.outOfBounds = true;  // if not found
        } else if(addr >= DEV_RAM_ADDR) {
            for(let d of this.devices) {
                if(d.has_ram) {
                    if(addr >= d.ram_area && addr < (d.ram_area + d.ram_size)) {
                        return d.dev.getRAM(addr - d.ram_area);
                    }
                }
            }
            this.outOfBounds = true;  // if not found
        } else if(addr >= this.memSize) { 
            this.outOfBounds = true;
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

    physicalSet(addr, value) {
        if(addr >= this.memSize) { 
            throw 'out of bounds';
        } else {
            this.mem[addr] = value;
        }
    }

    physicalGet(addr) {
        if(addr >= this.memSize) { 
            throw 'out of bounds';
        } else {
            return this.mem[addr];
        }
    }

    //
    // DEVICE MANAGEMENT
    //

    addDevice(dev) {
        const type = this._deviceType(dev);
        if(type == 'invalid') {
            throw 'Invalid device ' + dev;
        }
        if(this.devices.length === 255) {
            throw 'Maximum number of devices is 255.';
        }
        this.devices.push({ 
            dev: dev,
            reg_area: this._current.reg,
            reg_size: 256,
            has_ram: (type == 'RAMDevice'),
            ram_area: this._current.ram,
            ram_size: (type == 'RAMDevice') ? dev.areaRequested() : undefined,
        });
        this._current.reg += 256;
        if(type == 'RAMDevice') {
            this._current.ram += dev.areaRequested();
        }
        // TODO - area, mmu
        return type;
    }

    _deviceType(dev) {
        if(dev.name && typeof dev.name === 'function' &&
           dev.get  && typeof dev.get  === 'function' &&
           dev.set  && typeof dev.set  === 'function') {
            if(dev.areaRequested && typeof dev.areaRequested === 'function' &&
               dev.getRAM && typeof dev.getRAM === 'function' &&
               dev.setRAM && typeof dev.setRAM === 'function') {
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
    // DEBUGGING INFORMATION
    //

    mmapDebug() {
        // create HTML table
        let s = ['<table class="mmap">'];

        // TODO - check if virtual memory is active
        s.push(`<tr>
                  <td class="area ram">RAM (physical memory)</td>
                  <td class="beginning"></td>
                  <td class="address">0x00000000</td>
                </tr>`);
        if(this.memSize < 0xf0000000) {
            s.push(`<tr>
                      <td class="area invalid">Invalid access area</td>
                      <td class="beginning"></td>
                      <td class="address">0x` + toHex(this.memSize, 8) + `
                    </tr>`);
        }

        let pos = DEV_REG_ADDR
        for(let d of this.devices) {
            s.push(`<tr>
                      <td class="area devreg">` + d.dev.name() + `</td>
                      <td class="beginning"></td>
                      <td class="address">0x` + toHex(pos, 8) + `</td>
                    </tr>`);
            pos += 256;
        }
        if(pos < DEV_RAM_ADDR) {
            s.push(`<tr>
                      <td class="area invalid">Invalid access area</td>
                      <td class="beginning"></td>
                      <td class="address">0x` + toHex(pos, 8) + `
                    </tr>`);
        }

        pos = DEV_RAM_ADDR;
        for(let d of this.devices) {
            if(d.has_ram) {
                s.push(`<tr>
                          <td class="area devram">` + d.dev.name() + `</td>
                          <td class="beginning"></td>
                          <td class="address">0x` + toHex(pos, 8) + `</td>
                        </tr>`);
                pos += d.dev.areaRequested();
            }
        }
        s.push(`<tr>
                  <td class="area invalid">Invalid access area</td>
                  <td class="beginning"></td>
                  <td class="address">0x` + toHex(pos, 8) + `
                </tr>
                <tr>
                  <td class="area ob">OB register</td>
                  <td class="beginning"></td>
                  <td class="address">0xFFFFFFFF</td>
                </tr>
              </table>`);
        return s.join('');
    }

    set_ph_memDebug(id) {
        return this.memDebug.setInitialHTML(id);
    }

    //
    // TESTS
    //

    runTests(section) {
        const te = new TestEnvironment(section);

        // test memory
        te.test('Memory amount (kB)',
                [ [ t => t.memSizeKb, '=', 4, this ] ]);
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
        te.test('Invalid device', [[ t => t.addDevice(new FakeDevice()), 'exception', null, this ]]);

        class Device {
            constructor() { this.x = 0; }
            name() { return "test"; }
            get(a) { if(a === 0) return this.x; else return 0; }
            set(a, v) { if(a === 0) this.x = v; }
        };
        te.test('Device memory access', [
            [ t => t.addDevice(new Device()), '=', 'Device', this ],
            [ t => {
                t.set(DEV_REG_ADDR + 0, 42);
                return t.get(DEV_REG_ADDR + 0);
            }, '=', 42, this ],
            [ t => t.outOfBounds, '=', false, this ],
        ]);

        class RAMDevice {
            constructor() { this.x = 0; }
            name() { return ""; }
            get(a) { return 0; }
            set(a,v) { }
            areaRequested() { return 256; }
            getRAM(a) { if(a === 0) return this.x; else return 0; }
            setRAM(a, v) { if(a === 0) this.x = v; }
        }
        te.test('RAM Device memory access', [
            [ t => t.addDevice(new RAMDevice()), '=', 'RAMDevice', this ],
            [ t => {
                t.set(DEV_RAM_ADDR + 0, 42);
                return t.get(DEV_RAM_ADDR + 0);
            }, '=', 42, this ],
            [ t => t.outOfBounds, '=', false, this ],
        ]);

        te.test('Devices addresses', [
            [ t => t.devices[0].reg_area, '=', DEV_REG_ADDR, this ],
            [ t => t.devices[1].reg_area, '=', DEV_REG_ADDR + 256, this ],
            [ t => t.devices[1].ram_area, '=', DEV_RAM_ADDR, this ],
        ]);
    }

}

const tinyvm = new Motherboard(256);

// vim: ts=4:sw=4:sts=4:expandtab
