from forms.physical_memory import Ui_PhysicalMemory

from PyQt5.QtWidgets import QFrame

class PhysicalMemory(QFrame):

    def __init__(self):
        super(PhysicalMemory, self).__init__()
        self.ui = Ui_PhysicalMemory()
        self.ui.setupUi(self)
    

    def name(self):
        return 'Physical Memory'


    def icon(self):
        return 'ksudoku'


# vim: ts=4:sw=4:sts=4:expandtab
