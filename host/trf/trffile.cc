#include "trffile.h"

extern void yyerror(const char* s);

// helper function
static inline void 
push32(vector<uint8_t>& v, uint32_t n) {
    v.push_back(n & 0xff);
    v.push_back(n >> 8);
    v.push_back(n >> 16);
    v.push_back(n >> 24);
}
    

void 
TRFFile::SetTRFVersion(uint8_t v)
{
    if(v != 1) {
        yyerror("Invalid TRF version");
    }
}


void 
TRFFile::SetCPUVersion(uint8_t v)
{
    if(v != 1) {
        yyerror("Invalid CPU version");
    }
}


void 
TRFFile::SetObjectType(uint8_t v)
{
    if(v > 0x3) {
        yyerror("Invalid object type");
    }
    object_type = v;
}


void 
TRFFile::SetCurrentSection(string const& s)
{
    if(s == ".text") {
        current_section = 0;
    } else if(s == ".bss") {
        current_section = 1;
    } else if(s == ".data") {
        current_section = 2;
    } else if(s == ".rodata") {
        current_section = 3;
    } else if(s == ".comment") {
        current_section = 4;
    } else if(s == ".debug") {
        current_section = 8;
    } else {
        yyerror("Invalid section");
    }
}


void  
TRFFile::Add8(uint8_t v)
{
    sections[current_section].push_back(v);
}


void  
TRFFile::Add16(uint16_t v)
{
    sections[current_section].push_back(v & 0xff);
    sections[current_section].push_back(v >> 8);
}


void  
TRFFile::Add32(uint32_t v)
{
    sections[current_section].push_back(v & 0xff);
    sections[current_section].push_back(v >> 8);
    sections[current_section].push_back(v >> 16);
    sections[current_section].push_back(v >> 24);
}


void  
TRFFile::AddStr(string const& s)
{
    for(uint8_t c: s) {
        sections[current_section].push_back(c);
    }
}


void  
TRFFile::AddReloc(string const& s)
{
    if(current_section != 0) {
        yyerror("Relocations can only by added to the section .text");
    }

    relocs[s].push_back(static_cast<uint32_t>(sections[0].size()));
    for(int i=0; i<4; ++i) sections[0].push_back(0x00);
}


void  
TRFFile::AddSymbol(string const& s)
{
    symbols[s] = { 0x0, current_section };
}


void 
TRFFile::CreateSymbolSections()
{
    // TODO - what about unresolved symbols?
    
    static const uint8_t STRTAB = 5, SYMTAB = 6, RELOC = 7;

    // create symbol sections
    for(auto const& kv: symbols) {
        // strtab
        uint32_t stridx = sections[STRTAB].size();
        for(uint8_t c: kv.first) { sections[STRTAB].push_back(c); }

        // symbtab
        uint32_t symidx = sections[SYMTAB].size() / 12;  // 12 is the size of each symtab record
        sections[SYMTAB].push_back(kv.second.scope);
        sections[SYMTAB].push_back(kv.second.section);
        sections[SYMTAB].push_back(0);
        sections[SYMTAB].push_back(0);
        push32(sections[SYMTAB], stridx);
        push32(sections[SYMTAB], kv.first.size());

        // reloc
        if(relocs.find(kv.first) != end(relocs)) {
            for(auto const& pos: relocs.at(kv.first)) {
                push32(sections[RELOC], pos);
                push32(sections[RELOC], symidx);
            }
        }
    }
}

void 
TRFFile::OutputBinary()
{
    CreateSymbolSections();

    // header
    vector<uint8_t> h;
    h.push_back(0x7F); h.push_back('T'); h.push_back('R'); h.push_back('F'); 
    h.push_back(0x1); h.push_back(0x1); h.push_back(object_type);
    push32(h, entry_point);
    push32(h, 0x0);

    // section indexes
    uint32_t pos = 0x90;
    for(int i=0; i<16; ++i) {
        if(!sections[i].empty() && i < 9) {
            push32(h, pos);
            push32(h, sections[i].size());
            pos += sections[i].size();
        } else {
            push32(h, 0); push32(h, 0);
        }
    }

    // output binary
    for(uint8_t c: h) { putc(c, stdout); }
    for(int i=0; i<16; ++i) {
        for(uint8_t c: sections[i]) { putc(c, stdout); }
    }
}


// vim: ts=4:sw=4:sts=4:expandtab
