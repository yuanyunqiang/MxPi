Blockly.Python.pyqt5 = function(a) {
    Blockly.Python.definitions_['sys'] = 'import sys';
    Blockly.Python.definitions_['PyQt5_QtWidgets'] = 'from PyQt5 import QtWidgets';
    var class_NAME = this.getFieldValue('NAME')
    var python_code=Blockly.Python.statementToCode(this, 'NAME');
    var code = 'class '+class_NAME+'(QtWidgets.QMainWindow):\n'+
               python_code+'\n\n'+
               'if __name__ == "__main__":\n  '+
               'App = QtWidgets.QApplication(sys.argv)\n  '+
               'ex='+class_NAME+'()\n  '
               +'ex.show()\n  '+
               'sys.exit(App.exec_())\n'
               ;
    return code;
  };

  Blockly.Python.pyqt5_init=function(a){
    var python_code=Blockly.Python.statementToCode(this, 'NAME') || '  pass';
    var class_NAME = this.getFieldValue('NAME')
    var code= 'def __init__(self,parent=None):\n'+'    super('+class_NAME+',self).__init__(parent)\n    self.setObjectName("'+class_NAME+'_MainWindow")\n'+python_code;
    return code;
  }
  Blockly.Python.pyqt5_QMain_bg_color = function() {
    var name=this.getFieldValue('NAME')
    var color=this.getFieldValue('COLOR')
    var code='self.setStyleSheet("#'+name+'_MainWindow{background-color:'+color+';}")\n'
    return code;
  };

  Blockly.Python.pyqt5_QMain_bg_img = function() {
    var name=this.getFieldValue('NAME')
    var url=this.getFieldValue('URL')
    var code='self.setStyleSheet("#'+name+'_MainWindow{border-image:url('+url+');}")\n'
    return code;
  };
  Blockly.Python.pyqt5_setsize = function(a) {
        var width = Blockly.Python.valueToCode(this,'WIDTH',Blockly.Python.ORDER_ASSIGNMENT);
        var high = Blockly.Python.valueToCode(this,'HIGH',Blockly.Python.ORDER_ASSIGNMENT);
        var code = 'self.resize('+width+','+high+')\n'
        return code;
  }

  Blockly.Python.pyqt5_setname = function(a) {
        var name = Blockly.Python.valueToCode(this,'NAME',Blockly.Python.ORDER_ASSIGNMENT);
        var code = 'self.setWindowTitle('+name+')\n';
        return code;
  }

  Blockly.Python.pyqt5_label = function(a) {
      var name=this.getFieldValue('LABEL')
      var body = Blockly.Python.valueToCode(this,'TEXT',Blockly.Python.ORDER_ASSIGNMENT);
      var code = 'self.'+name+' = QtWidgets.QLabel(self)\n'+
                 'self.'+name+'.setText('+body+')\n'   
      return code;
  }

  Blockly.Python.pyqt5_label_setxywh = function(a) {
      var name = this.getFieldValue('NAME')
      var x = Blockly.Python.valueToCode(this,'X',Blockly.Python.ORDER_ASSIGNMENT);
      var y = Blockly.Python.valueToCode(this,'Y',Blockly.Python.ORDER_ASSIGNMENT);
      var w = Blockly.Python.valueToCode(this,'W',Blockly.Python.ORDER_ASSIGNMENT);
      var h = Blockly.Python.valueToCode(this,'H',Blockly.Python.ORDER_ASSIGNMENT);
      var code='self.'+name+'.setGeometry('+x+','+y+','+w+','+h+')\n'
      return code
  }

  Blockly.Python.pyqt5_label_setfont = function(a) {
      Blockly.Python.definitions_['PyQt5_QtGui'] = 'from PyQt5 import QtGui';
      var name = this.getFieldValue('NAME')
      var size = Blockly.Python.valueToCode(this,'SIZE',Blockly.Python.ORDER_ASSIGNMENT);
      if (this.getFieldValue('FONT')=='FONT1'){
            var font='Arial'
      }
      else if(this.getFieldValue('FONT')=='FONT2'){
            var font='黑体'
      }
      var code='self.'+name+'.setFont(QtGui.QFont("'+font+'",'+size+'))\n'
      return code;
  }

  Blockly.Python.pyqt5_Slider = function(a) {
      var name = this.getFieldValue('NAME')
      var code = 'self.'+name+' = QtWidgets.QSlider(self)\n'
      return code;
  }

  Blockly.Python.pyqt5_Slider_model = function(a) {
      Blockly.Python.definitions_['PyQt5_QtCore'] = 'from PyQt5 import QtCore';
      var name = this.getFieldValue('NAME')
      if (this.getFieldValue('MODEL')=='H'){
            var model='Horizontal'
      }
      else if(this.getFieldValue('MOEDL')=='V'){
            var model='Vertical'
      }
      var code = 'self.'+name+'.setOrientation(QtCore.Qt.'+model+')\n'
      return code;
  }

  Blockly.Python.pyqt5_Slider_maxmin = function(a) {
      var name = this.getFieldValue('NAME')
      var min = Blockly.Python.valueToCode(this,'MIN',Blockly.Python.ORDER_ASSIGNMENT);
      var max = Blockly.Python.valueToCode(this,'MAX',Blockly.Python.ORDER_ASSIGNMENT);
      var step = Blockly.Python.valueToCode(this,'STEP',Blockly.Python.ORDER_ASSIGNMENT);
      var code = 'self.'+name+'.setMinimum('+min+')\n'+
                 'self.'+name+'.setMaximum('+max+')\n'+
                 'self.'+name+'.setSingleStep('+step+')\n'
      return code;
  }

  Blockly.Python.pyqt5_Slider_setValue = function(a) {
      var name = this.getFieldValue('NAME')
      var value = Blockly.Python.valueToCode(this,'NUM',Blockly.Python.ORDER_ASSIGNMENT);
      var code = 'self.'+name+'.setValue('+value+')\n';
      return code;
  }

  Blockly.Python.pyqt5_Slider_Value = function(a) {
      var name = this.getFieldValue('NAME')
      var code = 'self.'+name+'.value()';
      return [code,Blockly.Python.ORDER_ATOMIC];
  }

  Blockly.Python.pyqt5_Slider_setxywh = function(a) {
      var name = this.getFieldValue('NAME')
      var x = Blockly.Python.valueToCode(this,'X',Blockly.Python.ORDER_ASSIGNMENT);
      var y = Blockly.Python.valueToCode(this,'Y',Blockly.Python.ORDER_ASSIGNMENT);
      var w = Blockly.Python.valueToCode(this,'W',Blockly.Python.ORDER_ASSIGNMENT);
      var h = Blockly.Python.valueToCode(this,'H',Blockly.Python.ORDER_ASSIGNMENT);
      var code='self.'+name+'.setGeometry('+x+','+y+','+w+','+h+')\n'
      return code
  }

  Blockly.Python.pyqt5_Slider_setfont = function(a) {
      Blockly.Python.definitions_['PyQt5_QtGui'] = 'from PyQt5 import QtGui';
      var name = this.getFieldValue('NAME')
      var size = Blockly.Python.valueToCode(this,'SIZE',Blockly.Python.ORDER_ASSIGNMENT);
      if (this.getFieldValue('FONT')=='FONT1'){
            var font='Arial'
      }
      else if(this.getFieldValue('FONT')=='FONT2'){
            var font='黑体'
      }
      var code='self.'+name+'.setFont(QtGui.QFont("'+font+'",'+size+'))\n'
      return code;
  }

  Blockly.Python.pyqt5_Slider_valueChanged = function(a) {
      var name=this.getFieldValue('NAME')
      var fun = Blockly.Python.valueToCode(this,'FUN',Blockly.Python.ORDER_ATOMIC) || null;
      var code= 'self.'+name+'.valueChanged.connect('+fun+')\n';
      return code;
  }

  Blockly.Python.pyqt5_label_setText=function(a){
      var name=this.getFieldValue('NAME');
      var text = Blockly.Python.valueToCode(this,'TEXT',Blockly.Python.ORDER_ASSIGNMENT);
      var code= 'self.'+name+'.setText('+text+')\n';
      return code;
  }

  Blockly.Python.pyqt5_main_move=function(a){
    var x = Blockly.Python.valueToCode(this,'X',Blockly.Python.ORDER_ASSIGNMENT);
    var y = Blockly.Python.valueToCode(this,'Y',Blockly.Python.ORDER_ASSIGNMENT);
    var code= 'self.move('+x+','+y+')\n';
    return code;
  }
  
  Blockly.Python.pyqt5_quit=function(a){
    var code= '_quit_App=QtWidgets.QApplication.instance()\n'+
              '_quit_App.quit()'
    return code;
  }

  Blockly.Python.pyqt5_QPushButton=function(a){
    var name=this.getFieldValue('NAME');
    var text = Blockly.Python.valueToCode(this,'TEXT',Blockly.Python.ORDER_ASSIGNMENT);
    var code= 'self.'+name+' = QtWidgets.QPushButton(self)\n'+
              'self.'+name+'.setText('+text+')\n';
    return code;
}

Blockly.Python.pyqt5_btn_setText=function(a){
    var name=this.getFieldValue('NAME');
    var text = Blockly.Python.valueToCode(this,'TEXT',Blockly.Python.ORDER_ASSIGNMENT);
    var code= 'self.'+name+'.setText('+text+')\n';
    return code;
}

Blockly.Python.pyqt5_btn_setfont = function(a) {
    Blockly.Python.definitions_['PyQt5_QtGui'] = 'from PyQt5 import QtGui';
    var name = this.getFieldValue('NAME')
    var size = Blockly.Python.valueToCode(this,'SIZE',Blockly.Python.ORDER_ASSIGNMENT);
    if (this.getFieldValue('FONT')=='FONT1'){
          var font='Arial'
    }
    else if(this.getFieldValue('FONT')=='FONT2'){
          var font='黑体'
    }
    var code='self.'+name+'.setFont(QtGui.QFont("'+font+'",'+size+'))\n'
    return code;
}

Blockly.Python.pyqt5_btn_setxywh = function(a) {
    var name = this.getFieldValue('NAME')
    var x = Blockly.Python.valueToCode(this,'X',Blockly.Python.ORDER_ASSIGNMENT);
    var y = Blockly.Python.valueToCode(this,'Y',Blockly.Python.ORDER_ASSIGNMENT);
    var w = Blockly.Python.valueToCode(this,'W',Blockly.Python.ORDER_ASSIGNMENT);
    var h = Blockly.Python.valueToCode(this,'H',Blockly.Python.ORDER_ASSIGNMENT);
    var code='self.'+name+'.setGeometry('+x+','+y+','+w+','+h+')\n'
    return code
}

Blockly.Python.pyqt5_btn_setCheckable = function(a) {
    var name=this.getFieldValue('NAME')
    var fun = Blockly.Python.valueToCode(this,'FUN',Blockly.Python.ORDER_ATOMIC) || null;
    var code= 'self.'+name+'.clicked.connect('+fun+')\n';
    return code;
}

Blockly.Python.pyqt5_QPushButton_Enabled = function() {
    var name=this.getFieldValue('NAME')
    if (this.getFieldValue('TYPE')=='TRUE'){
        var type='True'
    }
    else if(this.getFieldValue('TYPE')=='FALSE'){
        var type='False'
    }
    var code='self.'+name+'.setEnabled('+type+')\n'
    return code;
  };

  Blockly.Python.pyqt5_label_Enabled = function() {
    var name=this.getFieldValue('NAME')
    if (this.getFieldValue('TYPE')=='TRUE'){
        var type='True'
    }
    else if(this.getFieldValue('TYPE')=='FALSE'){
        var type='False'
    }
    var code='self.'+name+'.setEnabled('+type+')\n'
    return code;
  };

  Blockly.Python.pyqt5_Slider_Enabled = function() {
    var name=this.getFieldValue('NAME')
    if (this.getFieldValue('TYPE')=='TRUE'){
        var type='True'
    }
    else if(this.getFieldValue('TYPE')=='FALSE'){
        var type='False'
    }
    var code='self.'+name+'.setEnabled('+type+')\n'
    return code;
  };

  Blockly.Python.pyqt5_lineEdit = function() {
    var name=this.getFieldValue('NAME');
    var code='self.'+name+' = QtWidgets.QLineEdit(self)\n';
    return code;
  }

  Blockly.Python.pyqt5_lineEdit_setText=function(a){
    var name=this.getFieldValue('NAME');
    var text = Blockly.Python.valueToCode(this,'TEXT',Blockly.Python.ORDER_ASSIGNMENT);
    var code= 'self.'+name+'.setText('+text+')\n';
    return code;
}

Blockly.Python.pyqt5_lineEdit_setfont = function(a) {
    Blockly.Python.definitions_['PyQt5_QtGui'] = 'from PyQt5 import QtGui';
    var name = this.getFieldValue('NAME')
    var size = Blockly.Python.valueToCode(this,'SIZE',Blockly.Python.ORDER_ASSIGNMENT);
    if (this.getFieldValue('FONT')=='FONT1'){
          var font='Arial'
    }
    else if(this.getFieldValue('FONT')=='FONT2'){
          var font='黑体'
    }
    var code='self.'+name+'.setFont(QtGui.QFont("'+font+'",'+size+'))\n'
    return code;
}

Blockly.Python.pyqt5_lineEdit_setxywh = function(a) {
    var name = this.getFieldValue('NAME')
    var x = Blockly.Python.valueToCode(this,'X',Blockly.Python.ORDER_ASSIGNMENT);
    var y = Blockly.Python.valueToCode(this,'Y',Blockly.Python.ORDER_ASSIGNMENT);
    var w = Blockly.Python.valueToCode(this,'W',Blockly.Python.ORDER_ASSIGNMENT);
    var h = Blockly.Python.valueToCode(this,'H',Blockly.Python.ORDER_ASSIGNMENT);
    var code='self.'+name+'.setGeometry('+x+','+y+','+w+','+h+')\n'
    return code
}

Blockly.Python.pyqt5_lineEdit_text = function(a) {
    var name = this.getFieldValue('NAME')
    var code='self.'+name+'.text()'
    return [code,Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.pyqt5_lineEdit_textChanged = function(a) {
    var name=this.getFieldValue('NAME')
    var fun = Blockly.Python.valueToCode(this,'FUN',Blockly.Python.ORDER_ATOMIC) || null;
    var code= 'self.'+name+'.textChanged.connect('+fun+')\n';
    return code;
}

Blockly.Python.pyqt5_lineEdit_Enabled = function() {
    var name=this.getFieldValue('NAME')
    if (this.getFieldValue('TYPE')=='TRUE'){
        var type='True'
    }
    else if(this.getFieldValue('TYPE')=='FALSE'){
        var type='False'
    }
    var code='self.'+name+'.setEnabled('+type+')\n'
    return code;
  };

Blockly.Python.pyqt5_lineEdit_readonly = function() {
    var name=this.getFieldValue('NAME')
    if (this.getFieldValue('TYPE')=='TRUE'){
        var type='True'
    }
    else if(this.getFieldValue('TYPE')=='FALSE'){
        var type='False'
    }
    var code='self.'+name+'.setReadOnly('+type+')\n'
    return code;
  };

Blockly.Python.pyqt5_PlainTextEdit_init = function() {
    var name=this.getFieldValue('NAME')
    var code='self.'+name+' = QtWidgets.QPlainTextEdit(self)\n'
    return code;
  };

Blockly.Python.pyqt5_plainTextEdit_setText=function(a){
    var name=this.getFieldValue('NAME');
    var text = Blockly.Python.valueToCode(this,'TEXT',Blockly.Python.ORDER_ASSIGNMENT);
    var code= 'self.'+name+'.setPlainText('+text+')\n';
    return code;
}


Blockly.Python.pyqt5_plainTextEdit_addText=function(a){
    var name=this.getFieldValue('NAME');
    var text = Blockly.Python.valueToCode(this,'TEXT',Blockly.Python.ORDER_ASSIGNMENT);
    var code= 'self.'+name+'.appendPlainText('+text+')\n';
    return code;
}

Blockly.Python.pyqt5_plainTextEdit_text = function(a) {
    var name = this.getFieldValue('NAME')
    var code='self.'+name+'.toPlainText()'
    return [code,Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.pyqt5_progressBar_init = function() {
    var name=this.getFieldValue('NAME')
    var code='self.'+name+' = QtWidgets.QProgressBar(self)\n'
    return code;
  };

  Blockly.Python.pyqt5_progressBar_set_value= function() {
    var name=this.getFieldValue('NAME')
    var value=Blockly.Python.valueToCode(this,'VALUE',Blockly.Python.ORDER_ASSIGNMENT);
    var code='self.'+name+'.setValue('+value+')\n'
    return code;
  };

  Blockly.Python.pyqt5_progressBar_set_maxminvalue= function() {
    var name=this.getFieldValue('NAME')
    var min=Blockly.Python.valueToCode(this,'MIN',Blockly.Python.ORDER_ASSIGNMENT);
    var max=Blockly.Python.valueToCode(this,'MAX',Blockly.Python.ORDER_ASSIGNMENT);
    var code='self.'+name+'.setMinimum('+min+')\n'+
             'self.'+name+'.setMaximum('+max+')\n'
    return code;
  };

  Blockly.Python.pyqt5_progressBar_set_Orientation = function() {
    Blockly.Python.definitions_['PyQt5_QtCore'] = 'from PyQt5 import QtCore';
    var name=this.getFieldValue('NAME')
    if (this.getFieldValue('VAR')=='V'){
        var type='QtCore.Qt.Horizontal'
    }
    else if(this.getFieldValue('VAR')=='H'){
        var type='QtCore.Qt.Vertical'
    }
    var code='self.'+name+'.setOrientation('+type+')\n'
    return code;
  };

  Blockly.Python.pyqt5_timer_init = function() {
    Blockly.Python.definitions_['PyQt5_QtCore'] = 'from PyQt5 import QtCore';
    var name=this.getFieldValue('NAME')
    var code='self.'+name+' = QtCore.QTimer(self)\n'
    return code;
  };

  Blockly.Python.pyqt5_timer_timeout = function(a) {
    var name=this.getFieldValue('NAME')
    var fun = Blockly.Python.valueToCode(this,'FUN',Blockly.Python.ORDER_ATOMIC) || null;
    var code= 'self.'+name+'.timeout.connect('+fun+')\n';
    return code;
}

Blockly.Python.pyqt5_timer_start = function(a) {
    var name=this.getFieldValue('NAME')
    var time = Blockly.Python.valueToCode(this,'TIME',Blockly.Python.ORDER_ATOMIC) || null;
    var code= 'self.'+name+'.start('+time+')\n';
    return code;
}