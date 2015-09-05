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
        self.spinBox = QtWidgets.QSpinBox(PhysicalMemory)
        self.spinBox.setWrapping(False)
        self.spinBox.setAlignment(QtCore.Qt.AlignRight|QtCore.Qt.AlignTrailing|QtCore.Qt.AlignVCenter)
        self.spinBox.setButtonSymbols(QtWidgets.QAbstractSpinBox.PlusMinus)
        self.spinBox.setMaximum(999999999)
        self.spinBox.setProperty("value", 0)
        self.spinBox.setDisplayIntegerBase(16)
        self.spinBox.setObjectName("spinBox")
        self.horizontalLayout.addWidget(self.spinBox)
        self.pushButton = QtWidgets.QPushButton(PhysicalMemory)
        self.pushButton.setObjectName("pushButton")
        self.horizontalLayout.addWidget(self.pushButton)
        self.verticalLayout.addLayout(self.horizontalLayout)
        self.tableView = QtWidgets.QTableView(PhysicalMemory)
        self.tableView.setObjectName("tableView")
        self.tableView.horizontalHeader().setStretchLastSection(True)
        self.verticalLayout.addWidget(self.tableView)

        self.retranslateUi(PhysicalMemory)
        QtCore.QMetaObject.connectSlotsByName(PhysicalMemory)

    def retranslateUi(self, PhysicalMemory):
        _translate = QtCore.QCoreApplication.translate
        PhysicalMemory.setWindowTitle(_translate("PhysicalMemory", "Frame"))
        self.label.setText(_translate("PhysicalMemory", "Memory position (in multiples of 0x10)"))
        self.spinBox.setPrefix(_translate("PhysicalMemory", "0x"))
        self.pushButton.setText(_translate("PhysicalMemory", "Go to"))


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    PhysicalMemory = QtWidgets.QFrame()
    ui = Ui_PhysicalMemory()
    ui.setupUi(PhysicalMemory)
    PhysicalMemory.show()
    sys.exit(app.exec_())

