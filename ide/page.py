from forms.page import Ui_page

from PyQt5.QtWidgets import QFrame
from PyQt5.QtGui import QIcon
from PyQt5.QtCore import QSize

class Page(QFrame):

    def __init__(self, inner):
        super(Page, self).__init__()
        self.ui = Ui_page()
        self.ui.setupUi(self)
        self.ui.title.setText(inner.name())
        icon = QIcon.fromTheme('ksudoku')
        pixmap = icon.pixmap(icon.actualSize(QSize(32, 32)));
        self.ui.icon.setPixmap(pixmap)
    

# vim: ts=4:sw=4:sts=4:expandtab
