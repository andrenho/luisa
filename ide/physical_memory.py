from forms.physical_memory import Ui_PhysicalMemory

from PyQt5.QtWidgets import QFrame
from PyQt5.QtCore import QAbstractTableModel, Qt, QSize
from PyQt5.QtGui import QBrush, QColor


class MemoryModel(QAbstractTableModel):


    def __init__(self, mmu):
        super().__init__()
        self.mmu = mmu


    def rowCount(self, parent):
        return self.mmu.size / 0x10


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
                return ('%07X' % (section * 0x10)) + '_'
        else:
            return None


    def data(self, index, role):
        if role == Qt.DisplayRole or role == Qt.EditRole:
            if index.column() < 16:
                pos = index.row() * 0x10 + index.column()
                v = self.mmu.get8(pos)
                return '%02X' % v
            else:
                s = ['.'] * 16
                pos = index.row() * 0x10
                for i in range(0,16):
                    v = self.mmu.get8(pos+i)
                    if v >= 32 and v < 127:
                        s[i] = chr(v)
                return ''.join(s)
        elif role == Qt.ToolTipRole:
            if index.column() < 16:
                pos = index.row() * 0x10 + index.column()
                return '0x%08X' % pos
            else:
                return None
        elif role == Qt.TextAlignmentRole:
            return Qt.AlignHCenter | Qt.AlignVCenter
        elif role == Qt.BackgroundRole:
            pos = index.row() * 0x10 + index.column()
            if self.mmu.changed_last_step(pos):
                return QBrush(QColor(255, 196, 196))
            else:
                return None
        else:
            return None

    def setData(self, index, value, role):
        pos = index.row() * 0x10 + index.column()
        try:
            v = int(value, 16)
            if v >= 0x0 and v <= 0xff:
                self.mmu.set8(pos, v)
                return True
            else:
                return False
        except ValueError:
            return False


class PhysicalMemory(QFrame):

    #
    # CONSTRUCT UI
    #

    def __init__(self, vm):
        super(PhysicalMemory, self).__init__()
        self.vm = vm
        self.ui = Ui_PhysicalMemory()
        self.ui.setupUi(self)
        self.setup_ui()


    def setup_ui(self):
        mm = MemoryModel(self.vm.mmu)
        self.ui.table.setModel(mm)
        for i in range(0,16):
            self.ui.table.setColumnWidth(i, 27)
        self.ui.table.setColumnWidth(16, 140)
        go_to = lambda: self.ui.table.scrollTo(\
            mm.createIndex(self.ui.position.value(), 0, 0))
        self.ui.position.editingFinished.connect(go_to)
    
    # 
    # INFORMATION
    #

    def name(self):
        return 'Physical Memory'


    def icon(self):
        return 'ksudoku'

    # 
    # ACTIONS
    #

    def update(self):
        pass


# vim: ts=4:sw=4:sts=4:expandtab
