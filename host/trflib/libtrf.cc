#include "libtrf.h"

#include <cstring>

TRFFile::TRFFile()
    : header({ { 0x7F, 'T', 'R', 'F' }, 0x1, 0x1, ObjectType::OBJECT, 0, 0x0, 0 })
{
}

    
vector<uint8_t> 
TRFFile::GenerateBinary()
{
    static_assert(is_pod<Header>::value, "Header must be POD");
    static_assert(is_pod<Section>::value, "Section must be POD");
    static_assert(sizeof(Section) == 8, "Invalid section size");

    ResolveSymbols();

    vector<uint8_t> d;

    // header
    d.resize(sizeof(Header));
    memcpy(&d.data()[0], &header, sizeof(Header));

    // sections
    auto sections = BuildSections();
    uint32_t pos = d.size();
    d.resize(d.size() + (sizeof(Section) * 16));
    for(Section s: sections) {
        memcpy(&d.data()[pos], &s, sizeof(Section));
        pos += sizeof(Section);
    }

    // add sections
    d.insert(end(d), begin(text), end(text));
    d.insert(end(d), begin(bss), end(bss));
    d.insert(end(d), begin(data), end(data));
    d.insert(end(d), begin(rodata), end(rodata));
    d.insert(end(d), begin(comment), end(comment));
    d.insert(end(d), begin(strtab), end(strtab));
    
    pos = d.size();
    d.resize(d.size() + (symtab.size() * sizeof(Symbol)) + (reloc.size() * sizeof(Reloc)));
    memcpy(&d.data()[pos], symtab.data(), symtab.size() * sizeof(Symbol));
    pos += symtab.size() * sizeof(Symbol);
    memcpy(&d.data()[pos], reloc.data(), reloc.size() * sizeof(Reloc));

    d.insert(end(d), begin(debug), end(debug));

    return d;
}


void 
TRFFile::AddTextReloc(string const& symbol_name)
{
}


void 
TRFFile::AddSymbol(SectionType section, string const& symbol_name, Symbol::Scope scope)
{
}


// 
// PRIVATE
//

array<TRFFile::Section, 16> 
TRFFile::BuildSections() const
{
    array<TRFFile::Section, 16> sections;
    uint32_t pos = 0x74;
    
    for(size_t i=0; i<16; ++i) { sections[i] = { 0, 0 }; }

    // .text
    if(!text.empty()) {
        sections[0] = { pos, static_cast<uint32_t>(text.size()) };
        pos += text.size();
    }

    // .bss
    if(!bss.empty()) {
        sections[1] = { pos, static_cast<uint32_t>(bss.size()) };
        pos += bss.size();
    }

    // .data
    if(!data.empty()) {
        sections[2] = { pos, static_cast<uint32_t>(data.size()) };
        pos += data.size();
    }

    // .rodata
    if(!rodata.empty()) {
        sections[3] = { pos, static_cast<uint32_t>(rodata.size()) };
        pos += rodata.size();
    }

    // .comment
    if(!comment.empty()) {
        sections[4] = { pos, static_cast<uint32_t>(comment.size()) };
        pos += comment.size();
    }

    // .strtab
    if(!strtab.empty()) {
        sections[5] = { pos, static_cast<uint32_t>(strtab.size()) };
        pos += strtab.size();
    }

    // .symtab
    if(!symtab.empty()) {
        sections[6] = { pos, static_cast<uint32_t>(symtab.size()) };
        pos += symtab.size();
    }

    // .reloc
    if(!reloc.empty()) {
        sections[7] = { pos, static_cast<uint32_t>(reloc.size()) };
        pos += reloc.size();
    }

    // .debug
    if(!debug.empty()) {
        sections[8] = { pos, static_cast<uint32_t>(debug.size()) };
        pos += debug.size();
    }

    return sections;
}


void
TRFFile::ResolveSymbols()
{
}


// vim: ts=4:sw=4:sts=4:expandtab
