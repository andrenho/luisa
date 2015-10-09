#include "../catch.hpp"

#include "libtrf.h"

TEST_CASE("empty file", "[libtrf]") {
    
    TRFFile f;

    const vector<uint8_t> bin = { 0x00 };

    REQUIRE(f.GenerateBinary() == bin);
}

// vim: ts=4:sw=4:sts=4:expandtab
