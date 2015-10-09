from forms.memory import Ui_Memory

from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *


class MemoryModel(QAbstractTableModel):


    def __init__(self, mem):
        super().__init__()
        self.mem = mem
        self.block = 0


    def set_block(self, block):
        self.block = block


    def rowCount(self, parent):
        return min((len(self.mem) - (self.block * 0x10000)) / 0x10, 0x1000)


    def columnCount(self, parent):
        return 17


    def flags(self, index):
        if index.column() < 16:
            return Qt.ItemIsSelectable | Qt.ItemIsEditable | Qt.ItemIsEnabled
        else:
            return Qt.ItemIsEnabled


    def headerData(self, section, orientation, role):
        if role == Qt.DisplayRole:
            if orientation == Qt.Horizontal:
                if section == 16:
                    return 'Data'
                else:
                    return '_' + ('%X' % section)
            else:
                return ('%7X' % (section + self.block * 0x1000)) + '_'
        else:
            return None


    def data(self, index, role):
        if role == Qt.DisplayRole or role == Qt.EditRole:
            if index.column() < 16:
                pos = index.row() * 0x10 + index.column() + (self.block * 0x10000)
                v = self.mem[pos]
                return '%02X' % v
            else:
                s = ['\xb7'] * 16
                pos = index.row() * 0x10 + (self.block * 0x10000)
                for i in range(0,16):
                    v = self.mem[pos+i]
                    if v >= 32 and v < 127:
                        s[i] = chr(v)
                return ''.join(s)
        elif role == Qt.ToolTipRole:
            if index.column() < 16:
                pos = index.row() * 0x10 + index.column() + (self.block * 0x10000)
                return '0x%X' % pos
            else:
                return None
        elif role == Qt.TextAlignmentRole:
            return Qt.AlignHCenter | Qt.AlignVCenter
        else:
            return None
        # TODO
        """ 
        elif role == Qt.BackgroundRole:
            pos = index.row() * 0x10 + index.column()
            if self.mmu.physical.changed_last_step(pos):
                return QBrush(QColor(255, 196, 196))
            else:
                return None
        """

    def setData(self, index, value, role):
        pos = index.row() * 0x10 + index.column() + (self.block * 0x10000)
        try:
            v = int(value, 16)
            if v >= 0x0 and v <= 0xff:
                self.mem[pos] = v
                return True
            else:
                return False
        except ValueError:
            return False


class Memory(QFrame):

    #
    # CONSTRUCT UI
    #

    def __init__(self, manager, mem):
        super(Memory, self).__init__()
        self.manager = manager
        self.mem = mem
        self.ui = Ui_Memory()
        self.ui.setupUi(self)
        self.setup_ui()


    def setup_ui(self):
        self.mm = MemoryModel(self.mem)
        self.ui.table.setModel(self.mm)
        self.ui.block.setMaximum((len(self.mem) / 0x10000) - 1)
        for i in range(0,16):
            self.ui.table.setColumnWidth(i, 27)
        self.ui.table.setColumnWidth(16, 160)
        vh = self.ui.table.verticalHeader()
        vh.sectionResizeMode(QHeaderView.Fixed)
        vh.setDefaultSectionSize(27)
        # block changed event
        def block_changed(v):
            self.mm.set_block(v)
            self.update()
        self.ui.block.valueChanged.connect(block_changed)
        self.update()
    
    # 
    # ACTIONS
    #

    def update(self):
        self.mm.beginResetModel()
        self.mm.endResetModel()
        if self.manager.vm.mmu.vmem_page().active:
            self.ui.vmem_is.setText('Virtual Memory is enabled')
        else:
            self.ui.vmem_is.setText('Virtual Memory is disabled')

# 
# IMPLEMENTED CLASSES
#

class PhysicalMemory(Memory):

    def __init__(self, manager):
        super(PhysicalMemory, self).__init__(manager, manager.vm.mmu.ph)

    def name(self):
        return 'Physical Memory'

    def icon(self):
        return 'ksudoku'


class LogicalMemory(Memory):

    def __init__(self, manager):
        super(LogicalMemory, self).__init__(manager, manager.vm.mmu.logical)

    def name(self):
        return 'Logical Memory'

    def icon(self):
        return 'ksudoku'

# vim: ts=4:sw=4:sts=4:expandtab
