from forms.page_list import Ui_PageList

from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *

class TableMemoryModel(QAbstractTableModel):

    def __init__(self, mmu):
        super().__init__()
        self.mmu = mmu
        self.directory = None

    def rowCount(self, parent):
        if self.directory:
            return 0x400
        else:
            return 0

    def columnCount(self, parent):
        return 4

    def headerData(self, section, orientation, role):
        if role == Qt.DisplayRole:
            if orientation == Qt.Horizontal:
                if section == 0:
                    return 'Page'
                elif section == 1:
                    return 'A'
                elif section == 2:
                    return 'W'
                elif section == 3:
                    return 'X'
            else:
                if self.directory:
                    return '%03X' % section
                else:
                    return None
        else:
            return None

    def data(self, index, role):
        if role == Qt.DisplayRole:
            addr = (self.directory * 0x1000) + (index.row() * 4)
            page = self.mmu.ph.page(addr)
            if index.column() == 0:
                return '%06X' % page.page
            elif index.column() == 1:
                return 1 if page.active else 0
            elif index.column() == 2:
                return 1 if page.unwritable else 0
            elif index.column() == 3:
                return 1 if page.unexecutable else 0
        elif role == Qt.TextAlignmentRole:
            if index.column() == 0:
                return Qt.AlignRight | Qt.AlignVCenter
            else:
                return Qt.AlignHCenter | Qt.AlignVCenter
        elif role == Qt.BackgroundRole:
            addr = (self.directory * 0x1000) + (index.row() * 4)
            page = self.mmu.ph.page(addr)
            if page.active:
                return QBrush(QColor(196, 196, 255))
            else:
                return None


class DirectoryMemoryModel(QAbstractTableModel):

    def __init__(self, mmu):
        super().__init__()
        self.mmu = mmu

    def rowCount(self, parent):
        return 0x400

    def columnCount(self, parent):
        return 3

    def headerData(self, section, orientation, role):
        if role == Qt.DisplayRole:
            if orientation == Qt.Horizontal:
                if section == 0:
                    return 'Page table'
                elif section == 1:
                    return 'A'
                elif section == 2:
                    return 'S'
            else:
                return '%03X' % section 
        else:
            return None

    def data(self, index, role):
        if role == Qt.DisplayRole:
            vmem_page = self.mmu.vmem_page().page
            addr = (vmem_page * 0x1000) + (index.row() * 4)
            page = self.mmu.ph.page(addr)
            if index.column() == 0:
                return '%06X' % page.page
            elif index.column() == 1:
                return 1 if page.active else 0
            elif index.column() == 2:
                return 1 if page.supervisor else 0
        elif role == Qt.TextAlignmentRole:
            if index.column() == 0:
                return Qt.AlignRight | Qt.AlignVCenter
            else:
                return Qt.AlignHCenter | Qt.AlignVCenter
        elif role == Qt.BackgroundRole:
            vmem_page = self.mmu.vmem_page().page
            addr = (vmem_page * 0x1000) + (index.row() * 4)
            page = self.mmu.ph.page(addr)
            if page.active:
                if page.supervisor:
                    return QBrush(QColor(255, 196, 196))
                else:
                    return QBrush(QColor(196, 196, 255))
            else:
                return None


class PageList(QFrame):

    #
    # CONSTRUCT UI
    #

    def __init__(self, manager):
        super(PageList, self).__init__()
        self.manager = manager
        self.mmu = manager.vm.mmu
        self.ui = Ui_PageList()
        self.ui.setupUi(self)
        self.setup_ui()

    def setup_ui(self):
        # directory
        self.dir_model = DirectoryMemoryModel(self.manager.vm.mmu)
        self.ui.directory.setModel(self.dir_model)
        self.ui.directory.setColumnWidth(0, 80)
        self.ui.directory.setColumnWidth(1, 30)
        self.ui.directory.setColumnWidth(2, 30)
        self.ui.directory.selectionModel().currentRowChanged.connect(self.directory_selected)
        # table
        self.tbl_model = TableMemoryModel(self.manager.vm.mmu)
        self.ui.table.setModel(self.tbl_model)
        self.ui.table.setColumnWidth(0, 80)
        self.ui.table.setColumnWidth(1, 30)
        self.ui.table.setColumnWidth(2, 30)
        self.ui.table.setColumnWidth(3, 30)
        # logical -> physical
        self.ui.translate_logical.textChanged.connect(self.update_logical_physical)
        # vmem
        self.ui.vmem_active.toggled.connect(self.vmem_active_checked)
        self.ui.vmem_page.valueChanged.connect(self.vmem_changed)
        self.update()

    # 
    # INFORMATION
    #

    def name(self):
        return 'Page List'


    def icon(self):
        return 'view-presentation'

    #
    # EVENTS
    #
    def vmem_active_checked(self, state):
        if state:
            self.mmu.vmem |= (1 << 22)
        else:
            self.mmu.vmem &= ~(1 << 22)
        self.update()


    def vmem_changed(self, new_value):
        self.mmu.vmem &= ~0x3FFFFF
        self.mmu.vmem |= new_value
        self.update()


    def directory_selected(self, selected, deselected):
        vmem_page = self.mmu.vmem_page().page
        addr = (vmem_page * 0x1000) + (selected.row() * 4)
        page = self.mmu.ph.page(addr)
        if page.active and page.page * 0x1000 < len(self.mmu.ph):
            self.tbl_model.directory = page.page
        else:
            self.tbl_model.directory = None
        self.tbl_model.beginResetModel()
        self.tbl_model.endResetModel()

    # 
    # ACTIONS
    #

    def update(self):
        self.ui.vmem_page.setValue(self.mmu.vmem_page().page)
        self.ui.vmem_active.setChecked(self.mmu.vmem_page().active)
        self.ui.stackedWidget.setCurrentIndex(1 if self.mmu.vmem_page().active else 0)
        self.dir_model.beginResetModel()
        self.dir_model.endResetModel()
        self.tbl_model.beginResetModel()
        self.tbl_model.endResetModel()
        self.update_logical_physical()


    def update_logical_physical(self):
        self.ui.supervisor.setCheckState(Qt.PartiallyChecked)
        self.ui.unwritable.setCheckState(Qt.PartiallyChecked)
        self.ui.unexecutable.setCheckState(Qt.PartiallyChecked)
        logical = self.ui.translate_logical.text()
        if logical == '':
            self.ui.translate_physical.setText('')
        else:
            try:
                l_a = int(logical, 16)
                ph_a, flags = self.mmu.translate_to_physical(l_a)
                if flags.not_active:
                    self.ui.translate_physical.setText('#pagefault')
                else:
                    self.ui.translate_physical.setText('0x%08X' % ph_a)
                    self.ui.supervisor.setCheckState(Qt.Checked if flags.supervisor else Qt.Unchecked)
                    self.ui.unwritable.setCheckState(Qt.Checked if flags.unwritable else Qt.Unchecked)
                    self.ui.unexecutable.setCheckState(Qt.Checked if flags.unexecutable else Qt.Unchecked)
            except ValueError:
                self.ui.translate_physical.setText('#error')


# vim: ts=4:sw=4:sts=4:expandtab
