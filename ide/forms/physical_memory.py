# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'physical_memory.ui'
#
# Created by: PyQt5 UI code generator 5.5
#
# WARNING! All changes made in this file will be lost!

from PyQt5 import QtCore, QtGui, QtWidgets

class Ui_PhysicalMemory(object):
    def setupUi(self, PhysicalMemory):
        PhysicalMemory.setObjectName("PhysicalMemory")
        PhysicalMemory.resize(768, 636)
        PhysicalMemory.setFrameShape(QtWidgets.QFrame.StyledPanel)
        PhysicalMemory.setFrameShadow(QtWidgets.QFrame.Raised)
        self.verticalLayout = QtWidgets.QVBoxLayout(PhysicalMemory)
        self.verticalLayout.setObjectName("verticalLayout")
        self.horizontalLayout = QtWidgets.QHBoxLayout()
        self.horizontalLayout.setObjectName("horizontalLayout")
        spacerItem = QtWidgets.QSpacerItem(40, 20, QtWidgets.QSizePolicy.Expanding, QtWidgets.QSizePolicy.Minimum)
        self.horizontalLayout.addItem(spacerItem)
        self.label = QtWidgets.QLabel(PhysicalMemory)
        self.label.setObjectName("label")
        self.horizontalLayout.addWidget(self.label)
        self.position = QtWidgets.QSpinBox(PhysicalMemory)
        self.position.setWrapping(False)
        self.position.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.position.setButtonSymbols(QtWidgets.QAbstractSpinBox.PlusMinus)
        self.position.setMaximum(999999999)
        self.position.setProperty("value", 0)
        self.position.setDisplayIntegerBase(16)
        self.position.setObjectName("position")
        self.horizontalLayout.addWidget(self.position)
        self.verticalLayout.addLayout(self.horizontalLayout)
        self.table = QtWidgets.QTableView(PhysicalMemory)
        font = QtGui.QFont()
        font.setFamily("Monospace")
        font.setPointSize(10)
        self.table.setFont(font)
        self.table.setAlternatingRowColors(True)
        self.table.setHorizontalScrollMode(QtWidgets.QAbstractItemView.ScrollPerPixel)
        self.table.setGridStyle(QtCore.Qt.SolidLine)
        self.table.setObjectName("table")
        self.table.horizontalHeader().setStretchLastSection(False)
        self.verticalLayout.addWidget(self.table)

        self.retranslateUi(PhysicalMemory)
        QtCore.QMetaObject.connectSlotsByName(PhysicalMemory)

    def retranslateUi(self, PhysicalMemory):
        _translate = QtCore.QCoreApplication.translate
        PhysicalMemory.setWindowTitle(_translate("PhysicalMemory", "Frame"))
        self.label.setText(_translate("PhysicalMemory", "Memory position (in multiples of 0x10)"))
        self.position.setPrefix(_translate("PhysicalMemory", "0x"))


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    PhysicalMemory = QtWidgets.QFrame()
    ui = Ui_PhysicalMemory()
    ui.setupUi(PhysicalMemory)
    PhysicalMemory.show()
    sys.exit(app.exec_())

