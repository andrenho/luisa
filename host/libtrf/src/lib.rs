use std::vec::Vec;

// 
// BINARY FILE
//

pub struct BinaryFile {
    data: Vec<u8>
}

impl BinaryFile {

    pub fn new() -> Self { BinaryFile { data: vec![] } }

    pub fn push8<T>(&mut self, v: u8) { self.data.push(v); }

    #[allow(exceeding_bitshifts)]
    pub fn push16<T>(&mut self, v: u16) {
        self.data.push(v as u8);
        self.data.push((v >> 8) as u8);
    }
    
    #[allow(exceeding_bitshifts)]
    pub fn push32<T>(&mut self, v: u16) {
        self.data.push(v as u8);
        self.data.push((v >> 8) as u8);
        self.data.push((v >> 16) as u8);
        self.data.push((v >> 24) as u8);
    }

}

// 
// STRUCTURES
//

pub struct Header {
    header:      [u8; 4],
    trf_version: u8,
    cpu_version: u8,
    entry_point: u32,
}

impl Header {

    pub fn binary() -> Vec<u8> {
        vec![]
    }

}

// 
// TRF file
//

pub struct TRFFile {
    header: Header,
}

impl TRFFile {
    
    pub fn new() -> Self {
        TRFFile {
            header: Header { 
                header:      [ 0x7F, 'T' as u8, 'R' as u8, 'F' as u8 ],
                trf_version: 0x1,
                cpu_version: 0x1,
                entry_point: 0x0,
            },
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
        let b = BinaryFile::new();
        b.push8(0x16);
        assert_eq!(b.data, vec![0x16]);
    }
}

// vim: ts=4:sw=4:sts=4:expandtab
