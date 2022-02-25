import sys
from PyQt5 import QtWidgets

class MainQ(QtWidgets.QMainWindow):
    def __init__(self,parent=None):
        super(MainQ,self).__init__(parent)
        self.setObjectName("MainQ_MainWindow")
        self.setWindowTitle('我的')


if __name__ == "__main__":
  App = QtWidgets.QApplication(sys.argv)
  ex=MainQ()
  ex.show()
  sys.exit(App.exec_())
