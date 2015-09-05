from forms.page import Ui_page

from PyQt5.QtWidgets import (QFrame, QWidget, QHBoxLayout, QMainWindow)
from PyQt5.QtGui import QIcon
from PyQt5.QtCore import QSize

class Page(QFrame):

    #
    # CONSTRUCT UI
    #

    def __init__(self, inner, tab_widget):
        super(Page, self).__init__()
        self.ui = Ui_page()
        self.ui.setupUi(self)
        self.inner = inner
        self.tab_widget = tab_widget
        self.setup_ui()


    def setup_ui(self):
        # setup title
        self.ui.title.setText(self.inner.name())
        icon = QIcon.fromTheme('ksudoku')
        pixmap = icon.pixmap(icon.actualSize(QSize(32, 32)));
        self.ui.icon.setPixmap(pixmap)
        self.setWindowTitle(self.name())
        # add inner widget
        w = QWidget()
        h = QHBoxLayout(self.ui.widget)
        h.addWidget(self.inner)
        # connect events
        self.ui.detach.clicked.connect(self.detach)

    #
    # INFORMATION
    #
    
    def name(self):
        return self.inner.name()
    
    #
    # SIGNALS
    #

    def attach(self):
        '''User clicked on attach button (page is detached or hidden).'''
        self.tab_widget.addTab(self, self.name())
        self.ui.detach.setText('Detach')
        self.ui.detach.clicked.connect(self.detach)

    def detach(self):
        '''User clicked on detach button (page is attached).'''
        self.setParent(None)
        self.tab_widget.removeTab(self.tab_widget.currentIndex())
        self.ui.detach.setText('Attach')
        self.ui.detach.clicked.connect(self.attach)
        self.show()


# vim: ts=4:sw=4:sts=4:expandtab
