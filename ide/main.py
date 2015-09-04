from vm import VirtualMachine

from PyQt5.QtCore import Qt
from PyQt5.QtWidgets import (QMainWindow, QAction, qApp, QFileDialog, QMessageBox, 
    QSplitter, QHBoxLayout, QScrollArea, QTreeView, QTreeWidget, QTreeWidgetItem, QSizePolicy,
    QWidget)
from PyQt5.QtGui import QIcon

class MainWindow(QMainWindow):


    def __init__(self):
        super().__init__()
        self.setSizePolicy(QSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding))
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
        self.setWindowTitle('TinyVM IDE')
        self.init_menu()
        self.init_toolbar()
        self.center()
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


    def center(self):
        # tree
        self.vm_tree = QTreeWidget()
        self.vm_tree.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)

        hbox = QHBoxLayout()
        hbox.addWidget(self.vm_tree)

        w = QWidget()
        w.setLayout(hbox)

        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        scroll.setWidget(w)

        # splitter
        splitter = QSplitter(Qt.Horizontal)
        splitter.addWidget(scroll)

        scroll = QScrollArea(splitter)

        hbox = QHBoxLayout()
        hbox.addWidget(splitter)

        w = QWidget()
        w.setLayout(hbox)
        self.setCentralWidget(w)


    def configure_for_new_vm(self):
        pass


# vim: ts=4:sw=4:sts=4:expandtab
