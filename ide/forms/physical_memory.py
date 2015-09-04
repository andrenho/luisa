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
        PhysicalMemory.resize(409, 316)
        PhysicalMemory.setFrameShape(QtWidgets.QFrame.StyledPanel)
        PhysicalMemory.setFrameShadow(QtWidgets.QFrame.Raised)
        self.label = QtWidgets.QLabel(PhysicalMemory)
        self.label.setGeometry(QtCore.QRect(30, 30, 59, 14))
        self.label.setObjectName("label")

        self.retranslateUi(PhysicalMemory)
        QtCore.QMetaObject.connectSlotsByName(PhysicalMemory)

    def retranslateUi(self, PhysicalMemory):
        _translate = QtCore.QCoreApplication.translate
        PhysicalMemory.setWindowTitle(_translate("PhysicalMemory", "Frame"))
        self.label.setText(_translate("PhysicalMemory", "TextLabel"))


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    PhysicalMemory = QtWidgets.QFrame()
    ui = Ui_PhysicalMemory()
    ui.setupUi(PhysicalMemory)
    PhysicalMemory.show()
    sys.exit(app.exec_())

