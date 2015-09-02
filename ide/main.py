from vm import VirtualMachine
from forms.main_window import Ui_MainWindow

from PyQt5 import QtGui
from PyQt5.QtWidgets import (QMainWindow, qApp, QFileDialog, QMessageBox, QTreeWidgetItem)
from PyQt5.QtGui import QIcon


class MainWindow(QMainWindow):

    def __init__(self):
        super(MainWindow, self).__init__()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        self.setup_ui()
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


    def open_vm(self):
        fname = QFileDialog.getOpenFileName(self, filter='VM Configuration (*.tinyvm);;All files (*)')[0]
        if fname != '':
            try:
                self.vm = VirtualMachine(fname)
                self.configure_for_new_vm()
            except Exception as err:
                QMessageBox.critical(self, "Error opening VM", str(err))


    def configure_for_new_vm(self):
        # TODO - close all tabs, clear tree
        vmc = self.ui.vmComponents
        vm = QTreeWidgetItem(vmc, ['Computer', self.vm.name])
        vm.setExpanded(True)
        vm.setIcon(0, QIcon.fromTheme("computer"))
        mem = QTreeWidgetItem(vm, ['Memory', self.vm.mmu.name + ' (' + self.vm.mmu.physical_size_str + ')'])
        mem.setIcon(0, QIcon.fromTheme("media-flash-memory-stick"))



# vim: ts=4:sw=4:sts=4:expandtab
