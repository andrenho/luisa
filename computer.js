'use strict';

class Computer {

    constructor(mem_size_kb) {
        this.mem_size_kb = mem_size_kb;
    }

    run_tests(section) {
        var te = new TestEnvironment(section);
        te.test('Simple test', 
                [ [ _ => { return 1; }, '=', 1 ],
                  [ _ => { return 'x'; }, '=', 'x' ] ])
        te.test('Memory amount',
                [ [ t => { return t.mem_size_kb; }, '=', 4, this ] ])
    }

}

// vim: ts=4:sw=4:sts=4:expandtab
