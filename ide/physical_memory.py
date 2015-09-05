from forms.physical_memory import Ui_PhysicalMemory

from PyQt5.QtWidgets import QFrame
from PyQt5.QtCore import QAbstractTableModel, Qt, QSize


class MemoryModel(QAbstractTableModel):


    def __init__(self, mmu):
        super().__init__()
        self.mmu = mmu


    def rowCount(self, parent):
        return self.mmu.size / 0x10


    def columnCount(self, parent):
        return 16


    def headerData(self, section, orientation, role):
        if role == Qt.DisplayRole:
            if orientation == Qt.Horizontal:
                return '_' + ('%X' % section)
            else:
                return ('%07X' % (section * 0x10)) + '_'
        else:
            return None


    def data(self, index, role):
        if role == Qt.DisplayRole:
            pos = index.row() * 0x10 + index.column()
            v = self.mmu.get8(pos)
            return '%02X' % v
        elif role == Qt.ToolTipRole:
            pos = index.row() * 0x10 + index.column()
            return '0x%08X' % pos
        elif role == Qt.TextAlignmentRole:
            return Qt.AlignHCenter | Qt.AlignVCenter
        #elif role == Qt::BackgroundRole:
            # TODO - last position
        else:
            return None



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
        self.ui.table.setModel(MemoryModel(self.vm.mmu))
        for i in range(0,16):
            self.ui.table.setColumnWidth(i, 27)
    
    
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
