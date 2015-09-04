import configparser
from ctypes import *

class MMU:

    def __init__(self, config):
        self.size = config['mmu']['size_kb']
        self.physical_size_str = '{0} kB'.format(self.size)
        self.plugin = CDLL('./' + config['mmu']['plugin'])

    def name(self):
        get_name = self.plugin.mmu_name
        get_name.restype = c_char_p
        get_name.argtypes = []
        return get_name().decode('utf-8')


class VirtualMachine:
    
    def __init__(self, filename):
        config = configparser.ConfigParser()
        config.read(filename)
        self.name = config['computer']['name']
        self.mmu = MMU(config)

# vim: ts=4:sw=4:sts=4:expandtab
