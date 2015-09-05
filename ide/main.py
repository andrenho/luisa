from vm import VirtualMachine
from page import Page
from physical_memory import PhysicalMemory

from forms.main_window import Ui_MainWindow

from PyQt5 import QtGui
from PyQt5.QtWidgets import (QMainWindow, qApp, QFileDialog, QMessageBox, QTreeWidgetItem, QWidget, QFrame, QHBoxLayout)
from PyQt5.QtGui import QIcon


class MainWindow(QMainWindow):

    # 
    # CONSTRUCT UI
    #

    def __init__(self, vm=None):
        super(MainWindow, self).__init__()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        self.setup_ui()
        self.setup_pages()
        if vm:
            self.vm = VirtualMachine(vm)
            self.configure_for_new_vm()
        self.show()


    def setup_ui(self):
        QIcon.setThemeName('oxygen')
        # setup actions
        self.ui.actionOpen_VM_configuration.setIcon(QIcon.fromTheme("document-open"))
        self.ui.actionOpen_VM_configuration.triggered.connect(self.open_vm)
        self.ui.actionQuit.setIcon(QIcon.fromTheme("application-exit"))
        self.ui.actionQuit.triggered.connect(qApp.quit)
        # other
        self.ui.vmComponents.setHeaderLabels(['Component', 'Description'])
        self.ui.vmComponents.setColumnWidth(0, 300)
        self.ui.tabs.tabCloseRequested.connect(lambda i: self.ui.tabs.removeTab(i))


    def setup_pages(self):
        '''Create all tab pages. New pages need to be added here.'''
        self.pages_w = {}
        pg = {
            'Physical Memory': PhysicalMemory,
        }
        for name, p in pg.items():
            frame = p()
            w = QWidget()
            w.page = Page(frame, self.ui.tabs)
            h = QHBoxLayout(w)
            h.addWidget(w.page)
            self.pages_w[name] = w

    # 
    # ACTIONS
    #

    def open_vm(self):
        '''Open a new virtual machine.'''
        fname = QFileDialog.getOpenFileName(self, filter='VM Configuration (*.tinyvm);;All files (*)')[0]
        if fname != '':
            try:
                self.vm = VirtualMachine(fname)
                self.configure_for_new_vm()
            except Exception as err:
                QMessageBox.critical(self, "Error opening VM", str(err))


    def configure_for_new_vm(self):
        '''Configure the UI to receive a newly loaded VM.'''
        # TODO - close all tabs, clear tree

        vmc = self.ui.vmComponents
        vmc.itemDoubleClicked.connect(self.vm_component_selected)

        # vm
        vm = QTreeWidgetItem(vmc, ['Computer', self.vm.name])
        vm.setExpanded(True)
        vm.setIcon(0, QIcon.fromTheme('computer'))

        # memory
        mem = QTreeWidgetItem(vm, ['Memory', self.vm.mmu.name() + ' (' + self.vm.mmu.physical_size_str + ')'])
        mem.setIcon(0, QIcon.fromTheme('media-flash-memory-stick'))
        pmem = QTreeWidgetItem(mem, ['Physical memory debugger'])
        pmem.setIcon(0, QIcon.fromTheme('ksudoku'))
        pmem.option = 'Physical Memory'
        mem.setExpanded(True)

    # 
    # SIGNALS
    #

    def vm_component_selected(self, item, column):
        '''Called when a component is double clicked in the component tree.'''
        try:
            self.pages_w[item.option].page.attach()
        except AttributeError:
            pass


# vim: ts=4:sw=4:sts=4:expandtab
