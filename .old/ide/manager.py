from vm import VM

from page import Page
from memory import PhysicalMemory, LogicalMemory
from page_list import PageList

from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *

class Manager:

    def __init__(self, main_window):
        self.mw = main_window
        self.vm = None


    def load_vm(self, filename):
        self.vm = VM(filename)
        self.create_pages()
        #self.mw.setup_pages()
        self.configure_main_window_for_new_vm()


    # 
    # new VM initialization
    #
    def create_pages(self):
        def create_page(klass):
            frame = klass(self)
            widget = QWidget()
            widget.page = Page(frame, self.mw.ui.tabs)
            widget.frame = frame
            h = QHBoxLayout(widget)
            h.addWidget(widget.page)
            return widget
        self.pages = {
            'PhysicalMemory': create_page(PhysicalMemory),
            'LogicalMemory': create_page(LogicalMemory),
            'PageList': create_page(PageList),
        }


    def open_page(self, opt):
        self.pages[opt].page.attach()


    def configure_main_window_for_new_vm(self):
        '''Configure the UI to receive a newly loaded VM.'''
        # TODO - close all tabs, clear tree

        vmc = self.mw.ui.vmComponents

        def add_item(parent, klass, name, icon=None, option=None, desc=''):
            # create widget item
            w = QTreeWidgetItem(parent, [name, desc])
            if icon:
                w.setIcon(0, QIcon.fromTheme(icon))
            if option:
                w.option = option
            w.klass = klass
            return w

        # memory
        mem = QTreeWidgetItem(vmc, ['Memory', "temp"]) # TODO vm.mmu.name() + ' (' + vm.mmu.physical.size_str + ')'])
        mem.setIcon(0, QIcon.fromTheme('media-flash-memory-stick'))
        add_item(mem, 'PhysicalMemory', 'Physical Memory', 'ksudoku', 'Physical Memory')
        add_item(mem, 'LogicalMemory', 'Logical Memory', 'ksudoku', 'Logical Memory')
        add_item(mem, 'PageList', 'Page List', 'view-presentation', 'Page List')
        #add_item(mem, 'Memory Pages', 'kthesaurus', 'Memory Pages')

        mem.setExpanded(True)

# vim: ts=4:sw=4:sts=4:expandtab
