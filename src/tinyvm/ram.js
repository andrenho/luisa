'use strict';

class RAM {

    constructor(memSizeKb) {
        this.memSizeKb = memSizeKb;
        this.memSize = memSizeKb * 1024;

        this.data = new Uint8Array(this.memSize);
    }


    name() {
        return 'RAM';
    }


    set(addr, value) {
        if(addr > this.memSize) {
            throw 'out of bounds';
        } else {
            this.data[addr] = value;
        }
    }


    set32(addr, value) {
        this.set(addr, value & 0xff);
        this.set(addr+1, (value >> 8) & 0xff);
        this.set(addr+2, (value >> 16) & 0xff);
        this.set(addr+3, value >> 24);
    }


    get(addr) {
        if(addr > this.memSize) {
            throw 'out of bounds';
        } else {
            return this.data[addr];
        }
    }


    //
    // DEBUG
    //

    updateDebug() {
        document.getElementById("ram_size_kb").innerHTML = this.memSizeKb;
        document.getElementById("ram_max_address").innerHTML = '0x' + toHex(this.memSize-1);
        document.getElementById("ram_memory_debug").memoryTable.update();
    }


    //
    // TESTS
    //

    static runTests(section) {
        const te = new TestEnvironment(section);

        let r = new RAM(4);

        // test memory
        te.test('Memory amount (kB)',
                [ [ t => t.memSizeKb, '=', 4, r ] ]);
        te.test('Getting/setting data',
                [ [ t => { t.set(0xAB, 42); return t.get(0xAB); }, '=', 42, r ] ]);
        te.test('Out of bounds',
                [ 
                    [ t => t.get(0xF0), '!exception', 0, r ],
                    [ t => t.get(0xE000000), 'exception', 'out of bounds', r ],
                ]);
    }

}

// vim: ts=4:sw=4:sts=4:expandtab
