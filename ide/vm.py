import configparser
from ctypes import *

class MMU:

    def __init__(self, config):
        self.plugin = CDLL('./' + config['mmu']['plugin'])
        self.plugin.mmu_init(int(config['mmu']['size_kb']) * 1024)
        self.size = self.plugin.mmu_ph_size()
        self.physical_size_str = '{0} kB'.format(self.size / 1024)

    def name(self):
        get_name = self.plugin.mmu_name
        get_name.restype = c_char_p
        get_name.argtypes = []
        return get_name().decode('utf-8')

    def get8(self, pos):
        if pos < self.size:
            return self.plugin.mmu_ph_get8(pos)
        else:
            return None

    def changed_last_step(self, pos):
        return True if self.plugin.mmu_ph_changed_last_step(pos) == 1 else False


class VirtualMachine:
    
    def __init__(self, filename):
        config = configparser.ConfigParser()
        config.read(filename)
        self.name = config['computer']['name']
        self.mmu = MMU(config)

# vim: ts=4:sw=4:sts=4:expandtab
