from forms.pages import Ui_Pages

from PyQt5.QtWidgets import QFrame, QHeaderView
from PyQt5.QtCore import QAbstractTableModel, Qt, QSize
from PyQt5.QtGui import QBrush, QColor

class MemoryModel(QAbstractTableModel):

    COLUMNS = 16
    PAGE_SIZE = 0x1000

    def __init__(self, memory):
        super(QAbstractTableModel, self).__init__()
        self.memory = memory


    def rowCount(self, parent=None):
        return self.memory.size // MemoryModel.PAGE_SIZE // MemoryModel.COLUMNS


    def columnCount(self, parent=None):
        return MemoryModel.COLUMNS


    def flags(self, index):
        return Qt.ItemIsEnabled
    

    def headerData(self, section, orientation, role):
        if role == Qt.DisplayRole:
            if orientation == Qt.Horizontal:
                return None
            else:
                return ('%04X' % (section * MemoryModel.COLUMNS))
        else:
            return None


    def data(self, index, role):
        if role == Qt.ToolTipRole:
            page = index.row() * MemoryModel.COLUMNS + index.column()
            pos = page * MemoryModel.PAGE_SIZE
            return 'Page: %d -- Position: 0x%08X' % (page, pos)
        else:
            return None



class PhysicalMemoryModel(MemoryModel):

    def __init__(self, mmu):
        super(PhysicalMemoryModel, self).__init__(mmu.physical)
        self.logical = mmu.logical

    def data(self, index, role):
        if role == Qt.BackgroundRole:
            page = index.row() * MemoryModel.COLUMNS + index.column()
            if self.logical.active():
                if page == self.logical.page_directory_page():
                    return QBrush(QColor(85, 170, 0))
                elif self.memory.is_page_table(page):
                    return QBrush(QColor(255, 170, 0))
                elif self.memory.is_mapped(page):
                    return QBrush(QColor(0, 170, 255))
            return QBrush(QColor(255, 255, 255))
        else:
            return super(PhysicalMemoryModel, self).data(index, role)



class LogicalMemoryModel(MemoryModel):

    def __init__(self, mmu):
        super(LogicalMemoryModel, self).__init__(mmu.logical)



class Pages(QFrame):

    #
    # CONSTRUCT UI
    #

    def __init__(self, vm):
        super(Pages, self).__init__()
        self.vm = vm
        self.ui = Ui_Pages()
        self.ui.setupUi(self)
        self.setup_ui()
        self.update()


    def setup_ui(self):
        # memory model
        self.models = []
        for Model, widget in ((PhysicalMemoryModel, self.ui.ph_memory),
                              (LogicalMemoryModel, self.ui.v_memory)):
            mm = Model(self.vm.mmu)
            widget.setModel(mm)
            for i in range(0, mm.columnCount()):
                widget.setColumnWidth(i, 10)
            vh = widget.verticalHeader()
            vh.sectionResizeMode(QHeaderView.Fixed)
            vh.setDefaultSectionSize(16)
            self.models.append(mm)
        
        # events
        def active_checked(state):
            self.vm.mmu.logical.set_active(False if state == 0 else True)
            self.update()
        self.ui.vm_active.stateChanged.connect(active_checked)

        def update_page_table():
            try:
                page = int(self.ui.page_dir.text(), 16)
                self.vm.mmu.logical.set_page_directory_page(page)
            except ValueError:
                pass
            self.update()
        self.ui.page_dir.editingFinished.connect(update_page_table)

    # 
    # INFORMATION
    #

    def name(self):
        return 'Memory Pages'


    def icon(self):
        return 'kthesaurus'

    # 
    # ACTIONS
    #

    def update(self):
        self.ui.vm_active.setChecked(self.vm.mmu.logical.active())
        self.ui.vmem_stack.setCurrentIndex(1 if self.vm.mmu.logical.active() else 0)
        self.ui.page_dir.setText('0x%08X' % self.vm.mmu.logical.page_directory_page())
        self.ui.vmem.display(self.vm.mmu.logical.vmem())
        for model in self.models:
            model.beginResetModel()
            model.endResetModel()


# vim: ts=4:sw=4:sts=4:expandtab
