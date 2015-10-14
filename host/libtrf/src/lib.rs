#![cfg_attr(test, allow(dead_code))]

use std::vec::Vec;
use std::collections::HashMap;

//
// HELPER FUNCTIONS
//

fn get32(a: &Vec<u8>, pos: u32) -> u32 {
    let n = pos as usize;
    (((a[n+3] as u32) << 24) | ((a[n+2] as u32) << 16) | ((a[n+1] as u32) << 8) | a[n] as u32)
}

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

    pub fn push_slice(&mut self, v: &[u8]) { self.data.extend(v); }

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

#[derive(Clone,Copy,PartialEq,Eq,Debug)]
pub enum Scope {
    Global = 0, Local = 1, Extern = 2, PendingGlobal = 3, PendingLocal = 4,
}

#[derive(Clone,Copy,PartialEq,Eq,Debug)]
pub enum ObjectType {
    Object = 0, Executable = 1, Kernel = 2, Library = 3
}

#[allow(non_camel_case_types)]
#[derive(Clone,Copy,PartialEq,Eq,Debug)]
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

#[derive(Clone,Copy,PartialEq,Eq,Debug)]
pub struct Symbol {
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
    pub relocations: HashMap<String, Vec<u32>>,
    pub symbols:     HashMap<String, Symbol>,
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


    pub fn from_binary(d: &Vec<u8>) -> Self {
        let mut t = TRFFile::new();

        if d.len() < 0x90 || d[0..4] != [0x7F, 0x54, 0x52, 0x46] { panic!("Not a TRF file"); }
        if d[4] != 0x1 { panic!("Unsupported TRF version"); }

        // header information
        t.entry_point = ((d[0xB] as u32) << 24) | ((d[0xA] as u32) << 16) | ((d[0x9] as u32) << 8) | d[0x8] as u32;
        t.object_type = match d[0x6] {
            0x0 => ObjectType::Object,
            0x1 => ObjectType::Executable,
            0x2 => ObjectType::Kernel,
            0x3 => ObjectType::Library,
            _   => panic!("Invalid object type")
        };

        // sections
        for i in 0x00..0x8 {
            let n = 0x10+(i*8);
            let pos = get32(&d, n) as usize;
            let sz = get32(&d, n+4) as usize;
            match i {
                0x0 => t.text.push_slice(&d[pos..(pos+sz)]),
                0x1 => t.bss.push_slice(&d[pos..(pos+sz)]),
                0x2 => t.data.push_slice(&d[pos..(pos+sz)]),
                0x3 => t.rodata.push_slice(&d[pos..(pos+sz)]),
                0x4 => t.comment.push_slice(&d[pos..(pos+sz)]),
                0x8 => t.debug.push_slice(&d[pos..(pos+sz)]),
                _   => ()
            }
        }

        // symbols and relocations
        let strtab_pos = get32(&d, 0x38);
        let strtab_sz  = get32(&d, 0x3C);
        let symtab_pos = get32(&d, 0x40);
        let symtab_sz  = get32(&d, 0x44);
        let reloc_pos  = get32(&d, 0x48);
        let reloc_sz   = get32(&d, 0x4C);

        for i in 0..(symtab_sz / 12) {
            
        }

        t
    }


    pub fn add_text_reloc(&mut self, symbol: &str) {
        let mut v = self.relocations.entry(symbol.to_string()).or_insert(vec![]);
        v.push(self.text.len());
        self.text.push32(0x00);
    }


    pub fn add_symbol(&mut self, section: Section, symbol: &str, scope: Scope) {
        self.symbols.entry(symbol.to_string()).or_insert(Symbol { scope: scope, section: section });
    }


    pub fn generate_binary(&self) -> Vec<u8> {
        let mut b = Binary::new();

        // header
        b.push_vec(vec![0x7F, 'T' as u8, 'R' as u8, 'F' as u8]);    // header
        b.push8(0x01);      // TRF version
        b.push8(0x01);      // CPU version
        b.push8(self.object_type as u8);
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
        let mut pos = 0x90;
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
        let mut strtab = Binary::new();
        let mut symtab = Binary::new();
        let mut reloc = Binary::new();
        
        let (resolved, unresolved) = self.resolve_symbols();

        for r in resolved {
            // strtab
            let ns = strtab.len() as u32;
            strtab.push_str(r.name.as_ref());
            // symtab
            let ss = symtab.len() as u32;
            symtab.push8(r.scope as u8);
            symtab.push8(r.section as u8);
            symtab.push16(0x00);
            symtab.push32(ns);
            symtab.push32(r.name.len() as u32);
            // reloc
            for rl in r.reloc {
                reloc.push32(rl);
                reloc.push32(ss);
            }
        }

        for _ in unresolved {
            unimplemented!();
        }

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


    //
    // DEBUG
    //

    pub fn print_binary(&self) {
        println!("");
        let b = self.generate_binary();
        let p = |p: u32, s: &str, d: &[u8]| { 
            print!("{:08X}   {:15}  ", p, s);
            for x in d { print!("{:02X} ", x); }
            println!("");
        };
        p(0, "Header", &b[0x0..0x10]);
        for i in 0x00..0x10 {
            p((0x10+(i*8)), format!("Section #{}", i).as_ref(), &b[((0x10+(i*8)) as usize)..((0x18+(i*8)) as usize)]);
        }
        for i in 0x00..0x10 {
            let n = 0x10+(i*8);
            let pos = get32(&b, n) as usize;
            let sz = get32(&b, n+4) as usize;
            if pos != 0 {
                p(pos as u32, format!("Contents #{}", i).as_ref(), &b[pos..(pos+sz)]);
            }
        }
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
        let f = TRFFile::new();

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
            0x90, 0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00,       // sections
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x93, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00,
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

        f.print_binary();

        let bin : Vec<u8> = vec![
            0x7F, 0x54, 0x52, 0x46,         // header 
            0x01, 0x01, 0x01, 0x00,         // version, CPU type, object type
            0x09, 0x00, 0x00, 0x00,         // entry point
            0x00, 0x00, 0x00, 0x00,         // reserved 

            0x90, 0x00, 0x00, 0x00,         // section .text
            0x1F, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,         // section .bss
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,         // section .data
            0x00, 0x00, 0x00, 0x00,
            0xAF, 0x00, 0x00, 0x00,         // section .rodata
            0x06, 0x00, 0x00, 0x00,
            0xB5, 0x00, 0x00, 0x00,         // section .comment
            0x16, 0x00, 0x00, 0x00,
            0xCB, 0x00, 0x00, 0x00,         // section .strtab
            0x05, 0x00, 0x00, 0x00,
            0xD0, 0x00, 0x00, 0x00,         // section .symtab
            0x0C, 0x00, 0x00, 0x00,
            0xDC, 0x00, 0x00, 0x00,         // section .reloc
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

    #[test]
    #[should_panic]
    fn from_invalid_bin() {
        TRFFile::from_binary(&vec![0x0]);
    }

    #[test]
    fn from_bin() {
        let bin : Vec<u8> = vec![
            0x7F, 0x54, 0x52, 0x46,         // header 
            0x01, 0x01, 0x01, 0x00,         // version, CPU type, object type
            0x09, 0x00, 0x00, 0x00,         // entry point
            0x00, 0x00, 0x00, 0x00,         // reserved 

            0x90, 0x00, 0x00, 0x00,         // section .text
            0x1F, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,         // section .bss
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,         // section .data
            0x00, 0x00, 0x00, 0x00,
            0xAF, 0x00, 0x00, 0x00,         // section .rodata
            0x06, 0x00, 0x00, 0x00,
            0xB5, 0x00, 0x00, 0x00,         // section .comment
            0x16, 0x00, 0x00, 0x00,
            0xCB, 0x00, 0x00, 0x00,         // section .strtab
            0x05, 0x00, 0x00, 0x00,
            0xD0, 0x00, 0x00, 0x00,         // section .symtab
            0x0C, 0x00, 0x00, 0x00,
            0xDC, 0x00, 0x00, 0x00,         // section .reloc
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

        let f = TRFFile::from_binary(&bin);
        assert_eq!(f.entry_point, 0x9);
        assert_eq!(f.object_type, ObjectType::Executable);

        assert_eq!(f.text.data, &[ 0x2A, 0x10, 0x00, 0x00, 0xF0, 0x00, 0x00, 0x00, 0x00,
                                   0x2C, 0x14, 0x00, 0x00, 0xF0, 0x00, 0x00, 0x02, 0xF0,
                                   0x2A, 0x18, 0x00, 0x00, 0xF0, 0x06, 0x00,
                                   0x22, 0x1A, 0x00, 0x00, 0xF0, 0x01 ]);
        assert_eq!(f.rodata.data, &[ 0x48, 0x65, 0x6C, 0x6C, 0x6F, 0x21 ]);

        assert_eq!(f.symbols.get("hello"), Some(&Symbol { scope: Scope::Local, section: Section::rodata }));
        assert_eq!(f.relocations.get("hello"), Some(&vec![ 0x5 ]));

        assert_eq!(f.generate_binary(), bin);
    }
}


// vim: ts=4:sw=4:sts=4:expandtab
