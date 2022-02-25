
Blockly.Python.inout_print = function() {
    var value_name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC)|| '\"\"';
    
    // TODO: Assemble Python into code variable.
    var code = 'print('+value_name+')\n';
    return code;
  };

Blockly.Python.inout_print_inline = function() {
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var code = "print("+str+',end ="")\n';
  return code;
};

Blockly.Python.inout_print_end = function() {
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var end = Blockly.Python.valueToCode(this, 'END', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var code = "print("+str+',end =' + end + ')\n';
  return code;
};

Blockly.Python.inout_type_input = function() {
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var type = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  if (type=='str') {var code = 'input(' + str +')'}
    else if (type=='int') {var code = 'int(input(' + str +'))'}
      else if (type=='float') {var code = 'float(input(' + str +'))'}
  //var code=varname+"." + type + "("   + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.pyinout_type_input = function() {
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var type = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_pyinput'] = 'import pyinput';
  if (type=='str') {var code = 'pyinput.input(' + str +')'}
  	else if (type=='int') {var code = 'int(pyinput.input(' + str +'))'}
  		else if (type=='float') {var code = 'float(pyinput.input(' + str +'))'}
  //var code=varname+"." + type + "("   + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.inout_print_many = function() {
  
  var dropdown_type = this.getFieldValue('TYPE');
  
  var code = new Array(this.itemCount_);
  var default_value = '0';


  for (var n = 0; n < this.itemCount_; n++) {

  code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
    Blockly.Python.ORDER_NONE) || default_value;
  }

  var code = 'print(' + code.join(', ') + ')\n';
  return code;
};