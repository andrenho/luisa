from manager import Manager

from forms.main_window import Ui_MainWindow

from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *

class MainWindow(QMainWindow):

    # 
    # CONSTRUCT UI
    #

    def __init__(self, vm=None):
        super(MainWindow, self).__init__()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        self.setup_ui()
        self.manager = Manager(self)
        if vm:
            self.manager.load_vm(vm)

        vmc = self.ui.vmComponents
        vmc.itemDoubleClicked.connect(self.vm_component_selected)

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


    # 
    # ACTIONS
    #

    def open_vm(self):
        '''Open a new virtual machine.'''
        fname = QFileDialog.getOpenFileName(self, filter='VM Configuration (*.conf);;All files (*)')[0]
        if fname != '':
            try:
                self.manager.load_vm(fname)
            except Exception as err:
                QMessageBox.critical(self, "Error opening VM", str(err))


    # 
    # SIGNALS
    #

    def vm_component_selected(self, item, column):
        '''Called when a component is double clicked in the component tree.'''
        try:
            self.manager.open_page(item.klass)
        except AttributeError:
            pass


# vim: ts=4:sw=4:sts=4:expandtab
