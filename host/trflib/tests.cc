#include "../catch.hpp"

#include "libtrf.h"

TEST_CASE("empty file", "[libtrf]") {
    
    TRFFile f;

    const vector<uint8_t> bin = { 
        0x7F, 'T', 'R', 'F', 1, 1, 0, 0,    // header, version, type
        0, 0, 0, 0, 0, 0, 0, 0,             // entry point, reserved
        0, 0, 0, 0, 0, 0, 0, 0,             // sections
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
    };

    REQUIRE(f.GenerateBinary() == bin);
}


TEST_CASE("code", "[libtrf]") {
    
    TRFFile f;

    f.text.push_back('A');
    f.text.push_back('B');
    f.text.push_back('C');

    const vector<uint8_t> bin = { 
        0x7F, 'T', 'R', 'F', 1, 1, 0, 0,    // header, version, type
        0, 0, 0, 0, 0, 0, 0, 0,             // entry point, reserved
        0x74, 0, 0, 0, 0x3, 0, 0, 0,             // section .text
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        'A', 'B', 'C',
    };

    REQUIRE(f.GenerateBinary() == bin);
}


// vim: ts=4:sw=4:sts=4:expandtab
