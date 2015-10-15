#ifndef TRFFILE_H
#define TRFFILE_H

#include <cstdint>
#include <array>
#include <map>
#include <string>
#include <vector>
using namespace std;

#define INVALID_SECTION 0xff

class TRFFile {
public:
    void SetTRFVersion(uint8_t v);
    void SetCPUVersion(uint8_t v);
    void SetObjectType(uint8_t v);
    void SetEntryPoint(uint32_t v) { entry_point = v; }

    void SetCurrentSection(string const& s);

    void Add8(uint8_t v);
    void Add16(uint16_t v);
    void Add32(uint32_t v);
    void AddStr(string const& s);

    void AddReloc(string const& s);
    void AddSymbol(string const& s);

    void OutputBinary();

private:
    void CreateSymbolSections();

    uint8_t object_type = 0x0;
    uint32_t entry_point = 0x0;

    uint8_t current_section = INVALID_SECTION;
    array<vector<uint8_t>, 16> sections;

    struct Symbol {
        uint8_t scope;
        uint8_t section;
    };
    map<string, Symbol> symbols = {};
    map<string, vector<uint32_t>> relocs = {};
};

#endif

// vim: ts=4:sw=4:sts=4:expandtab
