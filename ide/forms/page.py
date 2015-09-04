# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'page.ui'
#
# Created by: PyQt5 UI code generator 5.5
#
# WARNING! All changes made in this file will be lost!

from PyQt5 import QtCore, QtGui, QtWidgets

class Ui_page(object):
    def setupUi(self, page):
        page.setObjectName("page")
        page.resize(734, 672)
        page.setFrameShape(QtWidgets.QFrame.StyledPanel)
        page.setFrameShadow(QtWidgets.QFrame.Raised)
        self.horizontalLayout_3 = QtWidgets.QHBoxLayout(page)
        self.horizontalLayout_3.setObjectName("horizontalLayout_3")
        self.verticalLayout = QtWidgets.QVBoxLayout()
        self.verticalLayout.setObjectName("verticalLayout")
        self.horizontalLayout = QtWidgets.QHBoxLayout()
        self.horizontalLayout.setObjectName("horizontalLayout")
        self.icon = QtWidgets.QLabel(page)
        self.icon.setObjectName("icon")
        self.horizontalLayout.addWidget(self.icon)
        self.title = QtWidgets.QLabel(page)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Expanding, QtWidgets.QSizePolicy.Preferred)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.title.sizePolicy().hasHeightForWidth())
        self.title.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(14)
        self.title.setFont(font)
        self.title.setObjectName("title")
        self.horizontalLayout.addWidget(self.title)
        self.verticalLayout.addLayout(self.horizontalLayout)
        self.frame = QtWidgets.QFrame(page)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Preferred, QtWidgets.QSizePolicy.Expanding)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.frame.sizePolicy().hasHeightForWidth())
        self.frame.setSizePolicy(sizePolicy)
        self.frame.setFrameShape(QtWidgets.QFrame.StyledPanel)
        self.frame.setFrameShadow(QtWidgets.QFrame.Raised)
        self.frame.setObjectName("frame")
        self.verticalLayout.addWidget(self.frame)
        self.horizontalLayout_2 = QtWidgets.QHBoxLayout()
        self.horizontalLayout_2.setObjectName("horizontalLayout_2")
        spacerItem = QtWidgets.QSpacerItem(40, 20, QtWidgets.QSizePolicy.Expanding, QtWidgets.QSizePolicy.Minimum)
        self.horizontalLayout_2.addItem(spacerItem)
        self.detach = QtWidgets.QPushButton(page)
        self.detach.setObjectName("detach")
        self.horizontalLayout_2.addWidget(self.detach)
        self.verticalLayout.addLayout(self.horizontalLayout_2)
        self.horizontalLayout_3.addLayout(self.verticalLayout)

        self.retranslateUi(page)
        QtCore.QMetaObject.connectSlotsByName(page)

    def retranslateUi(self, page):
        _translate = QtCore.QCoreApplication.translate
        page.setWindowTitle(_translate("page", "Frame"))
        self.icon.setText(_translate("page", "TextLabel"))
        self.title.setText(_translate("page", "TextLabel"))
        self.detach.setText(_translate("page", "Detach"))


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    page = QtWidgets.QFrame()
    ui = Ui_page()
    ui.setupUi(page)
    page.show()
    sys.exit(app.exec_())

