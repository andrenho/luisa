# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'memory.ui'
#
# Created by: PyQt5 UI code generator 5.5
#
# WARNING! All changes made in this file will be lost!

from PyQt5 import QtCore, QtGui, QtWidgets

class Ui_Memory(object):
    def setupUi(self, Memory):
        Memory.setObjectName("Memory")
        Memory.resize(493, 372)
        Memory.setFrameShape(QtWidgets.QFrame.StyledPanel)
        Memory.setFrameShadow(QtWidgets.QFrame.Raised)
        self.verticalLayout = QtWidgets.QVBoxLayout(Memory)
        self.verticalLayout.setObjectName("verticalLayout")
        self.horizontalLayout = QtWidgets.QHBoxLayout()
        self.horizontalLayout.setObjectName("horizontalLayout")
        spacerItem = QtWidgets.QSpacerItem(40, 20, QtWidgets.QSizePolicy.Expanding, QtWidgets.QSizePolicy.Minimum)
        self.horizontalLayout.addItem(spacerItem)
        self.label = QtWidgets.QLabel(Memory)
        self.label.setObjectName("label")
        self.horizontalLayout.addWidget(self.label)
        self.block = QtWidgets.QSpinBox(Memory)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Preferred, QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.block.sizePolicy().hasHeightForWidth())
        self.block.setSizePolicy(sizePolicy)
        self.block.setMinimumSize(QtCore.QSize(100, 0))
        self.block.setWrapping(False)
        self.block.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.block.setButtonSymbols(QtWidgets.QAbstractSpinBox.UpDownArrows)
        self.block.setProperty("value", 0)
        self.block.setDisplayIntegerBase(16)
        self.block.setObjectName("block")
        self.horizontalLayout.addWidget(self.block)
        self.verticalLayout.addLayout(self.horizontalLayout)
        self.table = QtWidgets.QTableView(Memory)
        font = QtGui.QFont()
        font.setFamily("Monospace")
        font.setPointSize(10)
        self.table.setFont(font)
        self.table.setAlternatingRowColors(True)
        self.table.setSelectionMode(QtWidgets.QAbstractItemView.SingleSelection)
        self.table.setHorizontalScrollMode(QtWidgets.QAbstractItemView.ScrollPerPixel)
        self.table.setGridStyle(QtCore.Qt.SolidLine)
        self.table.setObjectName("table")
        self.table.horizontalHeader().setStretchLastSection(False)
        self.verticalLayout.addWidget(self.table)
        self.vmem_is = QtWidgets.QLabel(Memory)
        self.vmem_is.setObjectName("vmem_is")
        self.verticalLayout.addWidget(self.vmem_is)

        self.retranslateUi(Memory)
        QtCore.QMetaObject.connectSlotsByName(Memory)

    def retranslateUi(self, Memory):
        _translate = QtCore.QCoreApplication.translate
        Memory.setWindowTitle(_translate("Memory", "Frame"))
        self.label.setText(_translate("Memory", "64 kB block"))
        self.block.setPrefix(_translate("Memory", "0x"))
        self.vmem_is.setText(_translate("Memory", "Virtual Memory is "))


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    Memory = QtWidgets.QFrame()
    ui = Ui_Memory()
    ui.setupUi(Memory)
    Memory.show()
    sys.exit(app.exec_())

