from vm import VirtualMachine

from PyQt5.QtWidgets import QMainWindow, QAction, qApp, QFileDialog, QMessageBox
from PyQt5.QtGui import QIcon

class MainWindow(QMainWindow):


    def __init__(self):
        super().__init__()
        QIcon.setThemeName('oxygen')
        self.init_ui()


    def open_vm(self):
        fname = QFileDialog.getOpenFileName(self, filter='VM Configuration (*.tinyvm);;All files (*)')[0]
        if fname != '':
            try:
                self.vm = VirtualMachine(fname)
                self.configure_for_new_vm()
            except Exception as err:
                QMessageBox.critical(self, "Error opening VM", str(err))


    def init_ui(self):
        self.init_menu()
        self.init_toolbar()
        self.setWindowTitle('TinyVM IDE')
        self.statusBar()
        self.show()

    
    def init_menu(self):
        menubar = self.menuBar()
        file_menu = menubar.addMenu('&File')

        open_vm = QAction(QIcon.fromTheme("document-open"), '&Open VM configuration...', self)
        open_vm.triggered.connect(self.open_vm)
        file_menu.addAction(open_vm)

        file_menu.addSeparator()

        exit_action = QAction(QIcon.fromTheme("exit"), '&Exit', self)
        exit_action.triggered.connect(qApp.quit)
        file_menu.addAction(exit_action)

    
    def init_toolbar(self):
        toolbar = self.addToolBar('TinyVM')
        
        open_vm = QAction(QIcon.fromTheme("document-open"), 'Open VM configuration', self)
        open_vm.triggered.connect(self.open_vm)
        toolbar.addAction(open_vm)


    def configure_for_new_vm(self):
        pass

# vim: ts=4:sw=4:sts=4:expandtab
