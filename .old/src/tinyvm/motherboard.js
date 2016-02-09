'use strict';

const DEV_REG_ADDR = 0xF0000000;
const DEV_RAM_ADDR = 0xF0010000;

class Motherboard {

    constructor() {
        this.reset();
    }

    //
    // MOTHERBOARD MANAGEMENT
    //

    reset() {
        this.devices = [];
        this.mmu = null;
        this.bios = null;

        this._current = { reg: DEV_REG_ADDR, ram: DEV_RAM_ADDR }     // used for calculating the device memory areas
    }

    //
    // MEMORY MANAGEMENT
    //

    set(addr, value) {
        if(addr >= DEV_REG_ADDR && addr < DEV_RAM_ADDR) {
            for(let d of this.devices) {
                if(addr >= d.reg_area && addr < (d.reg_area + d.reg_size)) {
                    d.dev.setReg(addr - d.reg_area, value);
                    return;
                }
            }
            this.fireOutOfBoundsException();  // if not found
        } else if(addr >= DEV_RAM_ADDR) {
            for(let d of this.devices) {
                if(d.has_ram) {
                    if(addr >= d.ram_area && addr < (d.ram_area + d.ram_size)) {
                        d.dev.setRAM(addr - d.ram_area, value);
                        return;
                    }
                }
            }
            this.fireOutOfBoundsException();  // if not found
        } else {
            this.mmu.set(addr, value);
        }
    }

    get(addr) {
        if(addr >= DEV_REG_ADDR && addr < DEV_RAM_ADDR) {
            for(let d of this.devices) {
                if(addr >= d.reg_area && addr < (d.reg_area + d.reg_size)) {
                    return d.dev.getReg(addr - d.reg_area);
                }
            }
            this.fireOutOfBoundsException();  // if not found
            return 0;
        } else if(addr >= DEV_RAM_ADDR) {
            for(let d of this.devices) {
                if(d.has_ram) {
                    if(addr >= d.ram_area && addr < (d.ram_area + d.ram_size)) {
                        return d.dev.getRAM(addr - d.ram_area);
                    }
                }
            }
            this.fireOutOfBoundsException();  // if not found
            return 0;
        } else {
            return this.mmu.get(addr);
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

    fireOutOfBoundsException() {
        // TODO
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
        dev.mboard = this;
        
        if(typeof dev.isMMU === 'function' && dev.isMMU()) {
            this.mmu = dev;
        } else if(typeof dev.isBIOS === 'function' && dev.isBIOS()) {
            this.bios = dev;
        }

        return type;
    }

    _deviceType(dev) {
        if(dev.name && typeof dev.name === 'function' &&
           dev.getReg  && typeof dev.getReg  === 'function' &&
           dev.setReg  && typeof dev.setReg  === 'function') {
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
        if(this.mmu.ram) {
            s.push(`<tr>
                      <td class="area ram">RAM (physical memory)</td>
                      <td class="beginning"></td>
                      <td class="address">0x00000000</td>
                    </tr>`);
        }
        if(this.mmu.ram.memSize < 0xf0000000) {
            s.push(`<tr>
                      <td class="area invalid">Invalid access area</td>
                      <td class="beginning"></td>
                      <td class="address">0x` + toHex(this.mmu.ram.memSize, 8) + `
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
                  <td class="noborder"></td>
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

    static runTests(section) {
        const te = new TestEnvironment(section);

        let m = new Motherboard();

        class FakeMMU {
            constructor(n) { this.a = new Uint8Array(n * 1024); }
            name() { return ''; }
            getReg() { return 0; }
            setReg() {}
            avaliable() { return true; }
            isMMU() { return true; }
            get(n) { return this.a[n]; }
            set(n, v) { this.a[n] = v; }
        };
        m.addDevice(new FakeMMU(4));

        // test memory
        te.test('Getting/setting data (8-bit)',
                [ [ t => { t.set(0xAB, 42); return t.get(0xAB); }, '=', 42, m ] ]);
        te.test('Getting/setting data (32-bit)',
                [ [ t => {
                        t.set(0x4, 0x01);
                        t.set(0x5, 0x23);
                        t.set(0x6, 0x45);
                        t.set(0x7, 0x67);
                        return t.get32(0x4);
                }, '=', 0x67452301, m ],
                [ t => {
                        t.set32(0x8, 0x89ABCDEF);
                        return [ t.get(0x8), t.get(0xB) ];
                }, '=', [0xEF, 0x89], m ] ]);

        // test devices
        class FakeDevice {};
        te.test('Invalid device', [[ t => t.addDevice(new FakeDevice()), 'exception', null, m ]]);

        class Device {
            constructor() { m.x = 0; }
            name() { return "test"; }
            getReg(a) { if(a === 0) return m.x; else return 0; }
            setReg(a, v) { if(a === 0) m.x = v; }
        };
        te.test('Device memory access', [
            [ t => t.addDevice(new Device()), '=', 'Device', m ],
            [ t => {
                t.set(DEV_REG_ADDR + 256, 42);
                return t.get(DEV_REG_ADDR + 256);
            }, '=', 42, m ],
            // TODO - test out of bounds access
        ]);

        class RAMDevice {
            constructor() { m.x = 0; }
            name() { return ""; }
            getReg(a) { return 0; }
            setReg(a,v) { }
            areaRequested() { return 256; }
            getRAM(a) { if(a === 0) return this.x; else return 0; }
            setRAM(a, v) { if(a === 0) this.x = v; }
        }
        te.test('RAM Device memory access', [
            [ t => t.addDevice(new RAMDevice()), '=', 'RAMDevice', m ],
            [ t => {
                t.set(DEV_RAM_ADDR + 0, 42);
                return t.get(DEV_RAM_ADDR + 0);
            }, '=', 42, m ],
            // TODO - test out of bounds access
        ]);

        te.test('Devices addresses', [
            [ t => t.devices[0].reg_area, '=', DEV_REG_ADDR, m ],
            [ t => t.devices[1].reg_area, '=', DEV_REG_ADDR + 256, m ],
            [ t => t.devices[1].ram_area, '=', DEV_RAM_ADDR, m ],
        ]);

    }

}

// vim: ts=4:sw=4:sts=4:expandtab
