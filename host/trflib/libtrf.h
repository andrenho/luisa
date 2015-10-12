#ifndef LIBTRF_H_
#define LIBTRF_H_

#include <cstdint>

#include <array>
#include <string>
#include <type_traits>
#include <vector>
using namespace std;

class TRFFile {
    
    enum class FileType : uint8_t { OBJECT=0, EXECUTABLE, KERNEL, LIBRARY };

    struct Header {
        uint8_t  header[4];
        uint8_t  trf_version;
        uint8_t  cpu_version;
        FileType filetype;
        uint8_t  reserved1;
        uint32_t entry_point;
        uint32_t reserved2;
    };

    enum class SectionType : uint8_t { TEXT=0, BSS, DATA, RODATA, COMMENT, STRTAB, SYMTAB, RELOC, DEBUG_ };

    struct Section {
        uint32_t position;
        uint32_t size;
    };

    struct Symbol {
        enum class SymbolType : uint8_t { GLOBAL=0, LOCAL, EXTERN, PENDING };
        SymbolType type;
        uint8_t    unused1;
        uint16_t   unused2;
        uint32_t   str_idx;
        uint32_t   str_len;
    };

    struct Reloc {
        uint32_t offset;
        uint32_t index;
    };

public:
    TRFFile();

    vector<uint8_t> GenerateBinary() const;

    Header header;
    vector<uint8_t> text, bss, data, rodata;
    string comment, strtab;
    vector<Symbol> symtab;
    vector<Reloc> reloc;
    vector<uint8_t> debug;

private:
    array<Section, 16> BuildSections() const;
};

#endif

// vim: ts=4:sw=4:sts=4:expandtab
