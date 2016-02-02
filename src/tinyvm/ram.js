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


    get(addr) {
        if(addr > this.memSize) {
            throw 'out of bounds';
        } else {
            return this.data[addr];
        }
    }

    debug() {
        return `
            <p>The physical memory size is <b>${this.memSizeKb} Kb</b>. The maximum addressable address 
               is <b>0x${toHex(this.memSize-1)}</b>.</p>
            <h2>Physical memory</h2>
            <section class="physical_memory_table">start=0x0,end=physical_memory_size</section>
            <p>Notice that this is access to the <b>physical memory</b>. When virtual memory is active,
               this is not the memory that the CPU sees.</p>`
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
        te.test('Out of bounds',
                [ 
                    [ t => t.get(0xF0), '!exception', 0, this ],
                    [ t => t.get(0xE000000), 'exception', 'out of bounds', this ],
                ]);
    }

}

// vim: ts=4:sw=4:sts=4:expandtab
