Blockly.Python['time_sleep'] = function () {
    Blockly.Python.definitions_['import_time'] = 'import time';
    var delay_time = Blockly.Python.valueToCode(this, 'DELAY_TIME', Blockly.Python.ORDER_ATOMIC) || '1000'
    var code = 'time.sleep(' + delay_time + ')\n';
    return code;
};

Blockly.Python.controls_whileUntil = function (a) {
    var b = "UNTIL" == a.getFieldValue("MODE"),
    c = Blockly.Python.valueToCode(a, "BOOL", Blockly.Python.ORDER_NONE) || "False",
    d = Blockly.Python.statementToCode(a, "DO"),
    d = Blockly.Python.addLoopTrap(d, a.id) || Blockly.Python.PASS;
    b && (c = "not " + c);
    return "while " + c + ":\n" + d
};

Blockly.Python.controls_repeat_ext = function (a) {
    var times = Blockly.Python.valueToCode(this, 'TIMES', Blockly.Python.ORDER_ATOMIC);
    var d = Blockly.Python.statementToCode(a, "DO"),
        d = Blockly.Python.addLoopTrap(d, a.id) || Blockly.Python.PASS;
    return 'for _my_variable in range(' + times + '):\n' + d;
};
Blockly.Python.controls_if = function (a) {
    var b = 0,
    c = "",
    d,
    e;
    do
        e = Blockly.Python.valueToCode(a, "IF" + b, Blockly.Python.ORDER_NONE) || "False", d = Blockly.Python.statementToCode(a, "DO" + b) || Blockly.Python.PASS, c += (0 == b ? "if " : "elif ") + e + ":\n" + d, ++b;
    while (a.getInput("IF" + b));
    a.getInput("ELSE") && (d = Blockly.Python.statementToCode(a, "ELSE") || Blockly.Python.PASS, c += "else:\n" + d);
    return c
};
Blockly.Python.controls_whileUntil = function (a) {
    var b = "UNTIL" == a.getFieldValue("MODE"),
    c = Blockly.Python.valueToCode(a, "BOOL", Blockly.Python.ORDER_NONE) || "False",
    d = Blockly.Python.statementToCode(a, "DO"),
    d = Blockly.Python.addLoopTrap(d, a.id) || Blockly.Python.PASS;
    b && (c = "not " + c);
    return "while " + c + ":\n" + d
};

Blockly.Python.do_while = function() {
    var value_select_data = Blockly.Python.valueToCode(this, 'select_data', Blockly.Python.ORDER_NONE) || "False";
    var statements_input_data = Blockly.Python.statementToCode(this, 'input_data')
    var dropdown_type = this.getFieldValue('type');
    if(dropdown_type == 'true'){
        statements_input_data = statements_input_data +'    if ('+value_select_data+'):\n' + '        break\n';  
    }
    else{
        statements_input_data = statements_input_data +'    if not ('+value_select_data+'):\n' + '        break\n';  
    }
    statements_input_data = Blockly.Python.addLoopTrap(statements_input_data, this.id) || Blockly.Python.PASS;
    //var dropdown_type = this.getFieldValue('type');
    var code = 'while True:\n' + statements_input_data;
    return code;
};

Blockly.Python.controls_pass = function () {
    return 'pass\n';
};

Blockly.Python.controls_flow_statements = function (a) {
    switch (a.getFieldValue("FLOW")) {
    case "BREAK":
        return "break\n";
    case "CONTINUE":
        return "continue\n"
    }
    throw "Unknown flow statement.";
};

Blockly.Python['controls_forEach'] = function(block) {
    // For each loop.
    var variable0 = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC) || '\'\'';
    var argument0 = Blockly.Python.valueToCode(block, 'LIST',
        Blockly.Python.ORDER_RELATIONAL) || '[]';
    var branch = Blockly.Python.statementToCode(block, 'DO');
    branch = Blockly.Python.addLoopTrap(branch, block.id) ||
        Blockly.Python.PASS;
    var code = 'for ' + variable0 + ' in ' + argument0 + ':\n' + branch;
    return code;
  };

  Blockly.Python.controls_range = function () {
    var from = Blockly.Python.valueToCode(this, "FROM", Blockly.Python.ORDER_NONE) || "0";
    var end = Blockly.Python.valueToCode(this, "TO", Blockly.Python.ORDER_NONE) || "0";
    var step = Blockly.Python.valueToCode(this, "STEP", Blockly.Python.ORDER_NONE) || "1";
    var code = "range(" + from + ", " + end + ", " + step + ")";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

  Blockly.Python.list_many_input = function() {
    var text=this.getFieldValue('CONTENT');
    var code='['+text+']'
    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  Blockly.Python.controls_try_finally = function () {
    var n = 0;
    var argument = Blockly.Python.valueToCode(this, 'IF' + n,
        Blockly.Python.ORDER_NONE) || 'null';
    var branch = '';
    var t = Blockly.Python.statementToCode(this, 'try') || '    pass\n';
    var code = 'try:\n' + t;
    for (n = 1; n <= this.elseifCount_; n++) {
        argument = Blockly.Python.valueToCode(this, 'IF' + n,
          Blockly.Python.ORDER_NONE) || '';
        if (argument !== '')
            argument = ' ' + argument
        branch = Blockly.Python.statementToCode(this, 'DO' + n) || '    pass\n';
        code += 'except' + argument + ': \n' + branch;
    }
    if (this.elseCount_) {
        branch = Blockly.Python.statementToCode(this, 'ELSE') || '    pass\n';
        code += 'finally:\n' + branch;
    }
    // code += '}';
    return code;
};

Blockly.Python.controls_thread = function () {
    Blockly.Python.definitions_['import__thread'] = 'import _thread';
     var v = Blockly.Python.valueToCode(this, "VAR", Blockly.Python.ORDER_NONE) || "None";
     var callback = Blockly.Python.valueToCode(this, "callback", Blockly.Python.ORDER_NONE) || "None";
     var code = "_thread.start_new_thread("+ callback +", "+ v +")\n";
     return code;
 };

 Blockly.Python.factory_block_return = function() {
	var VALUE = this.getFieldValue('VALUE');
	return [VALUE,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.tuple_create_with_noreturn = function() {
    // Create a list with any number of elements of any type.
    var dropdown_type = this.getFieldValue('TYPE');
    var code = new Array(this.itemCount_);
    var default_value = '0';
  
  
    for (var n = 0; n < this.itemCount_; n++) {
  
    code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
      Blockly.Python.ORDER_NONE) || default_value;
    }
   // if (this.itemCount_!=1){
  //  Blockly.Python.definitions_['var_declare'+varName] = varName+'= '+ '(' + code.join(', ') + ')\n';}
   // else {
   // Blockly.Python.definitions_['var_declare'+varName] = varName+'= '+ '(' + code.join(', ') + ',)\n';}
   if (this.itemCount_!=1){
    var code = '(' + code.join(', ') + ')';}
   else {
    var code = '(' + code.join(', ') + ',)';}
  
    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  Blockly.Python.procedures_defreturns = function() {
    // Define a procedure with a return value.
    var funcName = Blockly.Python.variableDB_.getName(this.getFieldValue('NAME'),
        Blockly.Procedures.NAME_TYPE);
    var branch = Blockly.Python.statementToCode(this, 'STACK')|| '    pass\n';
    if (Blockly.Python.INFINITE_LOOP_TRAP) {
      branch = Blockly.Python.INFINITE_LOOP_TRAP.replace(/%1/g,
          '\'' + this.id + '\'') + branch;
    }
    var returnValue = Blockly.Python.valueToCode(this, 'RETURN',
        Blockly.Python.ORDER_NONE) || '';
    //var type=this.getFieldValue('TYPE');
    if (returnValue) {
      returnValue = '    return ' + returnValue + '\n';
    }
    //var returnType = returnValue ? type : 'void';
    var args = ['self'];
    for (var x = 1; x < this.arguments_.length+1; x++) {
        var varName = Blockly.Python.variableDB_.getName(this.arguments_[x-1], Blockly.Variables.NAME_TYPE);
      args[x] = varName;
    }
    var code = 'def ' + funcName + '(' + args.join(', ') + '):\n' +
        branch + returnValue + '\n';
    code = Blockly.Python.scrub_(this, code);
    
    return code;
  };
  Blockly.Python.procedures_defnoreturns = Blockly.Python.procedures_defreturns;