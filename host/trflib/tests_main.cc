#define CATCH_CONFIG_RUNNER
#include "../catch.hpp"

int main(int argc, char* const argv[])
{
    return Catch::Session().run(argc, argv);
}

// vim: ts=4:sw=4:sts=4:expandtab
