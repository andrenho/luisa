from ctypes import *
from collections import namedtuple

#
# MEMORY
#

class MemoryPage:

    def __init__(self, data):
        self.page         = data & 0x3FFFFF
        self.active       = (data >> 22) != 0
        self.supervisor   = (data >> 23) != 0
        self.unwritable   = (data >> 24) != 0
        self.unexecutable = (data >> 25) != 0
        self.error        = (data >> 26) != 0
        self.mapped       = (data >> 27) != 0


class VMEM:

    def __get__(self, obj, objtype=None):
        return obj.dll.mmu_vmem(obj.ptr)

    def __set__(self, obj, value):
        obj.dll.mmu_set_vmem(obj.ptr, value)


class PhysicalMemory:

    def __init__(self, dll, ptr):
        self.dll = dll
        self.ptr = ptr
        self.__data = self.dll.mmu_physical_data(self.ptr)

    def __len__(self):
        return self.dll.mmu_size(self.ptr)

    def __getitem__(self, key):
        if type(key) != int:
            raise TypeError()
        elif key > len(self):
            raise IndexError('Tried to access memory at 0x%X (max position: 0x%X)' % (key, len(self)-1))
        else:
            return self.__data[key]

    def __setitem__(self, key, value):
        if type(key) != int:
            raise TypeError()
        elif key > len(self):
            raise IndexError('Tried to access memory at 0x%X (max position: 0x%X)' % (key, len(self)-1))
        elif value > 0xff:
            raise ValueError('Setting 8-bit memory cell with value 0x%X (maximum 0xFF)' % value)
        else:
            self.__data[key] = value

    def page(self, pos):
        return MemoryPage(self[pos] | (self[pos+1] << 8) | (self[pos+2] << 16) | (self[pos+3] << 24))


class LogicalMemory:

    def __init__(self, dll, ptr):
        self.dll = dll
        self.ptr = ptr

    def __len__(self):
        return 0x100000000

    def __getitem__(self, key):
        if type(key) != int:
            raise TypeError()
        else:
            return self.dll.mmu_get8(self.ptr, key)

    def __setitem__(self, key, value):
        if type(key) != int:
            raise TypeError()
        elif value > 0xff:
            raise ValueError('Setting 8-bit memory cell with value 0x%X (maximum 0xFF)' % value)
        else:
            self.dll.mmu_set8(self.ptr, key, value)

    def page(self, pos):
        return MemoryPage(self[pos] | (self[pos+1] << 8) | (self[pos+2] << 16) | (self[pos+3] << 24))


class MMU:

    vmem = VMEM()

    def __init__(self, dll_name, ptr):
        self.dll = CDLL(dll_name)
        self.ptr = ptr
        self.__init_function_defs()
        self.ph = PhysicalMemory(self.dll, self.ptr)
        self.logical = LogicalMemory(self.dll, self.ptr)

    def vmem_page(self):
        return MemoryPage(self.dll.mmu_vmem_page(self.ptr))

    def translate_to_physical(self, logical_pos):
        flags = c_uint8(0)
        addr = self.dll.mmu_translate_to_physical(self.ptr, logical_pos, flags)
        Flags = namedtuple('Flags', ['supervisor', 'unwritable', 'unexecutable', 'not_active'])
        return addr, Flags(
                supervisor   = flags.value & 0b0001 != 0,
                unwritable   = flags.value & 0b0010 != 0,
                unexecutable = flags.value & 0b0100 != 0,
                not_active   = flags.value & 0b1000 != 0)

    def __init_function_defs(self):
        def f(name, input, output=None):
            getattr(self.dll, name).argtypes = input
            if output:
                getattr(self.dll, name).restype = output
        f('mmu_size', [c_void_p], c_uint64)
        f('mmu_physical_data', [c_void_p], POINTER(c_uint8))
        f('mmu_vmem_page', [c_void_p], c_uint32)
        f('mmu_vmem', [c_void_p], c_uint32)
        f('mmu_set_vmem', [c_void_p, c_uint32])
        f('mmu_translate_to_physical', [c_void_p, c_uint64, POINTER(c_uint8)], c_uint64)
        f('mmu_get8', [c_void_p, c_uint64], c_uint8)
        f('mmu_set8', [c_void_p, c_uint64, c_uint8])

# 
# COMPUTER
#

class VM:

    def __init__(self, filename):
        # load DLL
        self.dll = CDLL('./computer.so')
        self.dll.computer_init.restype = c_void_p
        self.ptr = self.dll.computer_init(bytes(filename, 'utf-8'))
        # create MMU
        self.dll.computer_mmu.argtypes = [c_void_p]
        self.dll.computer_mmu.restype = c_void_p
        self.dll.computer_mmu_library.argtypes = [c_void_p]
        self.dll.computer_mmu_library.restype = c_char_p
        self.mmu = MMU(self.dll.computer_mmu_library(self.ptr).decode('utf-8'), self.dll.computer_mmu(self.ptr))


# vim: ts=4:sw=4:sts=4:expandtab
