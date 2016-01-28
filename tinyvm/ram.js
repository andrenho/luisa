'use strict';

class RAM {

    constructor(memSizeKb) {
        this.memSizeKb = memSizeKb;
        this.memSize = memSizeKb * 1024;

        this.data = new Uint8Array(this.size);
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


    get(addr) {
        if(addr > this.memSize) {
            throw 'out of bounds';
        } else {
            return this.data[addr];
        }
    }

    //
    // TESTS
    //

    runTests(section) {
        const te = new TestEnvironment(section);

        // test memory
        te.test('Memory amount (kB)',
                [ [ t => t.memSizeKb, '=', 4, this ] ]);
        te.test('Getting/setting data',
                [ [ t => { t.set(0xAB, 42); return t.get(0xAB); }, '=', 42, this ] ]);
    }

}

// vim: ts=4:sw=4:sts=4:expandtab
