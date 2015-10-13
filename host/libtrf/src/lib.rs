#![cfg_attr(test, allow(dead_code))]

use std::vec::Vec;
use std::collections::HashMap;
use std::collections::hash_map::Entry;

// 
// BINARY FILE
//

pub struct Binary {
    data: Vec<u8>
}

impl Binary {

    pub fn new() -> Self { Binary { data: vec![] } }

    pub fn push8(&mut self, v: u8) { self.data.push(v); }

    pub fn push_vec(&mut self, v: Vec<u8>) { self.data.extend(v); }

    pub fn push_str(&mut self, s: &str) { self.push_vec(s.chars().map(|c| c as u8).collect()); }

    #[allow(exceeding_bitshifts)]
    pub fn push16(&mut self, v: u16) {
        self.data.push(v as u8);
        self.data.push((v >> 8) as u8);
    }
    
    #[allow(exceeding_bitshifts)]
    pub fn push32(&mut self, v: u32) {
        self.data.push(v as u8);
        self.data.push((v >> 8) as u8);
        self.data.push((v >> 16) as u8);
        self.data.push((v >> 24) as u8);
    }

    pub fn push_bin(&mut self, b: Binary) { self.push_vec(b.data); }

    pub fn data(&self) -> Vec<u8> { self.data.clone() }

    pub fn len(&self) -> u32 { self.data.len() as u32 }

}

// 
// STRUCTURES
//

#[derive(Clone,Copy)]
pub enum Scope {
    Global = 0, Local = 1, Extern = 2, PendingGlobal = 3, PendingLocal = 4,
}

pub enum ObjectType {
    Object = 0, Executable = 1, Kernel = 2, Library = 3
}

#[allow(non_camel_case_types)]
#[derive(Clone,Copy)]
pub enum Section {
    text = 0, bss = 1, data = 2, rodata = 3, comment = 4, strtab = 5, symtab = 6, reloc = 7, debug = 8
}

struct Sym {
    name:    String,
    scope:   Scope,
    section: Section,
    reloc:   Vec<u32>
}


// 
// TRF file
//

struct Symbol {
    scope: Scope,
    section: Section
}

pub struct TRFFile {
    pub entry_point: u32,
    pub object_type: ObjectType,
    pub text:    Binary,
    pub bss:     Binary,
    pub data:    Binary,
    pub rodata:  Binary,
    pub comment: Binary,
    pub debug:   Binary,
    relocations: HashMap<String, Vec<u32>>,
    symbols:     HashMap<String, Symbol>,
}


impl TRFFile {
    
    pub fn new() -> Self {
        TRFFile {
            entry_point: 0x0,
            object_type: ObjectType::Object,
            text:        Binary::new(),
            bss:         Binary::new(),
            data:        Binary::new(),
            rodata:      Binary::new(),
            comment:     Binary::new(),
            debug:       Binary::new(),
            relocations: HashMap::new(),
            symbols:     HashMap::new(),
        }
    }


    pub fn add_text_reloc(&mut self, symbol: &str) {
        let mut v = self.relocations.entry(symbol.to_string()).or_insert(vec![]);
        v.push(self.text.len());
    }


    pub fn add_symbol(&mut self, section: Section, symbol: &str, scope: Scope) {
        let mut v = self.symbols.entry(symbol.to_string())
                        .or_insert(Symbol { scope: scope, section: section });
    }


    pub fn generate_binary(&self) -> Vec<u8> {
        let mut b = Binary::new();

        // header
        b.push_vec(vec![0x7F, 'T' as u8, 'R' as u8, 'F' as u8]);    // header
        b.push8(0x01);      // TRF version
        b.push8(0x01);      // CPU version
        b.push8(0x00);      // object type (TODO)
        b.push8(0x00);      // reserved
        b.push32(self.entry_point);
        b.push32(0x00);     // reserved

        // crate symbol sections
        let (strtab, symtab, reloc) = self.create_symbol_tables();

        let empty = Binary::new();
        let sections = vec![&self.text,    &self.bss, &self.data, &self.rodata,
                            &self.comment, &strtab,   &symtab,    &reloc,
                            &self.debug,   &empty,    &empty,     &empty,
                            &empty,        &empty,    &empty,     &empty];

        // add section index
        let mut pos = 0x74;
        for ref v in &sections {
            if v.data.is_empty() { 
                b.push32(0x00); b.push32(0x00);
            } else {
                b.push32(pos);
                b.push32(v.data.len() as u32);
                pos += v.data.len() as u32;
            }
        }

        // add sections
        for ref v in &sections {
            b.push_vec(v.data.clone());
        }

        return b.data;
    }


    fn create_symbol_tables(&self) -> (Binary, Binary, Binary) {
        let strtab = Binary::new();
        let symtab = Binary::new();
        let reloc = Binary::new();
        
        let (resolved, unresolved) = self.resolve_symbols();

        // TODO
        for r in &resolved { println!("resolved: {}", r.name); }
        for r in &unresolved { println!("unresolved: {}", r.0); }

        (strtab, symtab, reloc)
    }


    fn resolve_symbols(&self) -> (Vec<Sym>, Vec<(String, Vec<u32>)>) {
        let mut resolved = vec![];
        let mut unresolved = vec![];
        
        for (name, relocs) in &self.relocations {
            match self.symbols.get(name) {
                Some(s) => resolved.push(Sym { 
                               name: name.clone(), 
                               scope: s.scope, 
                               section: s.section, 
                               reloc: relocs.clone() 
                            }),
                None => unresolved.push((name.clone(), relocs.clone())),
            }
        }

        (resolved, unresolved)
    }

}


// 
// TESTS
//

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn binary_file() {
        let mut b = Binary::new();
        b.push8(0x8);
        b.push8(0x10);
        assert_eq!(b.data(), vec![0x8, 0x10]);
        b.push16(0xABCD);
        assert_eq!(b.data(), vec![0x8, 0x10, 0xCD, 0xAB]);
        b.push32(0x1234ABCD);
        assert_eq!(b.data(), vec![0x8, 0x10, 0xCD, 0xAB, 0xCD, 0xAB, 0x34, 0x12]);
        
        b = Binary::new();
        b.push_str("ABC");
        assert_eq!(b.data(), vec!['A' as u8, 'B' as u8, 'C' as u8]);
    }

    #[test]
    fn empty_file() {
        let mut f = TRFFile::new();

        let bin : Vec<u8> = vec![
            0x7F, 0x54, 0x52, 0x46, 0x01, 0x01, 0x00, 0x00,       // header, version, type
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,       // entry point, reserved
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,       // sections
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
        ];
        assert_eq!(f.generate_binary(), bin);
    }

    #[test]
    fn simple_file() {
        let mut f = TRFFile::new();

        f.text.push_str("ABC");
        f.data.push8(0xAF);

        let bin : Vec<u8> = vec![
            0x7F, 0x54, 0x52, 0x46, 0x01, 0x01, 0x00, 0x00,       // header, version, type
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,       // entry point, reserved
            0x74, 0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00,       // sections
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x77, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            'A' as u8, 'B' as u8, 'C' as u8, 0xAF,
        ];
        assert_eq!(f.generate_binary(), bin);
    }

    #[test]
    fn complete_file() {
        let mut f = TRFFile::new();
        f.object_type = ObjectType::Executable;
        f.entry_point = 0x09;

        f.text.push_vec(vec![ 0x2A, 0x10, 0x00, 0x00, 0xF0 ]);
        f.add_text_reloc("hello");
        f.text.push_vec(vec![ 0x2C, 0x14, 0x00, 0x00, 0xF0, 0x00, 0x00, 0x02, 0xF0 ]);
        f.text.push_vec(vec![ 0x2A, 0x18, 0x00, 0x00, 0xF0, 0x06, 0x00 ]);
        f.text.push_vec(vec![ 0x22, 0x1A, 0x00, 0x00, 0xF0, 0x01 ]);

        f.add_symbol(Section::rodata, "hello", Scope::Local);
        f.rodata.push_vec(vec![ 0x48, 0x65, 0x6C, 0x6C, 0x6F, 0x21 ]);

        f.comment.push_str("Generated by tas 1.0.0");

        let bin : Vec<u8> = vec![
            0x7F, 0x54, 0x52, 0x46,         // header 
            0x01, 0x01, 0x01, 0x00,         // version, CPU type, object type
            0x09, 0x00, 0x00, 0x00,         // entry point
            0x00, 0x00, 0x00, 0x00,         // reserved 

            0x74, 0x00, 0x00, 0x00,         // section .text
            0x1E, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,         // section .bss
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,         // section .data
            0x00, 0x00, 0x00, 0x00,
            0x92, 0x00, 0x00, 0x00,         // section .rodata
            0x06, 0x00, 0x00, 0x00,
            0x98, 0x00, 0x00, 0x00,         // section .comment
            0x16, 0x00, 0x00, 0x00,
            0xAE, 0x00, 0x00, 0x00,         // section .strtab
            0x05, 0x00, 0x00, 0x00,
            0xB3, 0x00, 0x00, 0x00,         // section .symtab
            0x0C, 0x00, 0x00, 0x00,
            0xBF, 0x00, 0x00, 0x00,         // section .reloc
            0x08, 0x00, 0x00, 0x00,         
            0x00, 0x00, 0x00, 0x00,         // section .debug
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  // other sections
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,

            // section .text
            0x2A, 0x10, 0x00, 0x00, 0xF0, 0x00, 0x00, 0x00, 0x00,   // movd [MMU_MCPY_ORIG], hello
            0x2C, 0x14, 0x00, 0x00, 0xF0, 0x00, 0x00, 0x02, 0xF0,   // movd [MMU_MCPY_DEST], [VD_TEXT]
            0x2A, 0x18, 0x00, 0x00, 0xF0, 0x06, 0x00,               // movw [MMU_MCPY_SZ], 6
            0x22, 0x1A, 0x00, 0x00, 0xF0, 0x01,                     // movb [MMU_MCPY], 1

            // section .rodata
            0x48, 0x65, 0x6C, 0x6C, 0x6F, 0x21,     // "hello!"

            // section .comment
            0x47, 0x65, 0x6e, 0x65, 0x72, 0x61, 0x74, 0x65,     // "Generated by tas 1.0.0"
            0x64, 0x20, 0x62, 0x79, 0x20, 0x74, 0x61, 0x73,
            0x20, 0x31, 0x2e, 0x30, 0x2e, 0x30,

            // section .strtab
            0x68, 0x65, 0x6C, 0x6C, 0x6F,           // "hello"

            // section .symtab
            0x01,                       // symbol local
            0x03,                       // section .rodata
            0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,     // index in strtab: 0x0
            0x05, 0x00, 0x00, 0x00,     // string length 0x5

            // section .reloc
            0x05, 0x00, 0x00, 0x00,     // offset for reference to "hello" in .text is 0x5
            0x00, 0x00, 0x00, 0x00      // index 0x0 in symbol table
        ];
        assert_eq!(f.generate_binary(), bin);
    }
}


// vim: ts=4:sw=4:sts=4:expandtab
