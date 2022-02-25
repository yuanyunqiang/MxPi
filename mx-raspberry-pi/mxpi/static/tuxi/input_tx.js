
Blockly.Blocks['inout_print'] = {
    init: function() {
    this.appendValueInput("VAR")
        .appendField(Blockly.MIXLY_SERIAL_PRINTLN);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('print_blocks');
    this.setTooltip("");
    this.setHelpUrl("");
    }
  };

Blockly.Blocks['inout_print_inline'] = {
  init: function() {
    this.setStyle('print_blocks');
    this.appendValueInput("VAR")
    .appendField(Blockly.MIXLY_SERIAL_PRINT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
  }
};

Blockly.Blocks['inout_print_end'] = {
  init: function() {
    this.setStyle('print_blocks');
    this.appendValueInput("VAR")
    .appendField(Blockly.MIXLY_SERIAL_PRINT);
    this.appendValueInput("END")
    .appendField(Blockly.MIXLY_ENDSWITH);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_PYTHON_INOUT_PRINT_END_TOOLTIP);
  }
};

Blockly.Blocks['inout_type_input'] = {
  init: function() {
    
    var input_type =
    [[Blockly.LANG_MATH_STRING, 'str'],[Blockly.LANG_MATH_INT, 'int']
    ,[Blockly.LANG_MATH_FLOAT, 'float']];
    this.setStyle('print_blocks');
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET)
    .appendField(new Blockly.FieldDropdown(input_type), 'DIR')
    this.appendValueInput("VAR")
    .appendField(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE)
    .setCheck(String);    

    this.setInputsInline(true);
    this.setOutput(true);
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('DIR');
      var TOOLTIPS = {
        'str': Blockly.MIXLY_MIXPY_INOUT_STR_INPUT_TOOLTIP,
        'int': Blockly.MIXLY_MIXPY_INOUT_INT_INPUT_TOOLTIP,
        'float': Blockly.MIXLY_MIXPY_INOUT_FLOAT_INPUT_TOOLTIP
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['inout_print_many'] = {
  
  init: function() {
    this.setStyle('print_blocks');
    this.itemCount_ = 2;
    this.updateShape_();
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setInputsInline(true);
    this.setMutator(new Blockly.Mutator(['inout_print_item']));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_MIXPY_INOUT_PRINT_MANY_TOOLTIP);
  },
  
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },

  decompose: function(workspace) {
    var containerBlock =
    workspace.newBlock('inout_print_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('inout_print_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },

  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    var i = 0;
    while (itemBlock) {
      connections[i] = itemBlock.valueConnection_;
      itemBlock = itemBlock.nextConnection &&
      itemBlock.nextConnection.targetBlock();
      i++;
    }
    this.itemCount_ = i;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      if (connections[i]) {
        this.getInput('ADD' + i)
        .connection.connect(connections[i]);
      }
    }
  },

  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
      itemBlock.nextConnection.targetBlock();
    }
  },

  updateShape_: function() {
    // Delete everything.
    if (this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else {
      var i = 0;
      while (this.getInput('ADD' + i)) {
        this.removeInput('ADD' + i);
        i++;
      }
    }
    // Rebuild block.
    if (this.itemCount_ == 0) {
      this.appendDummyInput('EMPTY')
      .appendField(Blockly.MIXLY_MIXPY_INOUT_PRINT_EMPTY);
    } else {
      for (var i = 0; i < this.itemCount_; i++) {
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField(Blockly.MIXLY_SERIAL_PRINTLN);
        }
      }
    }
  }
};

Blockly.Blocks['inout_print_container'] = {  
  init: function() {
    this.setStyle('print_blocks');
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_SERIAL_PRINTLN);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.MIXLY_MIXPY_INOUT_PRINT_MANY_CONTAINER_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['inout_print_item'] = {
  init: function() {
    this.setStyle('print_blocks');
    this.appendDummyInput()
    .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_MIXPY_INOUT_PRINT_MANY_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['math_constant'] = {  
  init: function() {
    this.setStyle('print_blocks');
    var constant =
        [['π', 'pi'],['e', 'e']];    
    this.appendDummyInput("")                
        .appendField(Blockly.MIXLY_PYTHON_MATH_CONSTANT)  
        .appendField(new Blockly.FieldDropdown(constant), 'CONSTANT')      
     
    this.setOutput(true, Number);
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('CONSTANT');
      var TOOLTIPS = {
        'pi': Blockly.MIXLY_PYTHON_MATH_CONSTANT_PI_TOOLTIP,
        'e': Blockly.MIXLY_PYTHON_MATH_CONSTANT_E_TOOLTIP
      };
      return TOOLTIPS[mode];
    });

  }
};

Blockly.Blocks['math_arithmetic'] = {
  /**
   * Block for basic arithmetic operator.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [['+', 'ADD'],
         ['-', 'MINUS'],
         ['×', 'MULTIPLY'],
         ['÷', 'DIVIDE'],
		     ['%', 'QUYU'],
         ['//', 'ZHENGCHU'],
         ['**', 'POWER']];
    //this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
    this.setStyle('print_blocks');
    this.setOutput(true);
    this.appendValueInput('A')
    this.appendValueInput('B')
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'ADD': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD,
        'MINUS': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS,
        'MULTIPLY': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
        'DIVIDE': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE,
		    'QUYU':Blockly.Msg.MATH_MODULO_TOOLTIP,
        'ZHENGCHU':Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE,
        'POWER': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_POWER
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['math_selfcalcu'] = {
  /**
   * Block for basic arithmetic operator.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [['+=', 'ADD'],
         ['-=', 'MINUS'],
         ['×=', 'MULTIPLY'],
         ['÷=', 'DIVIDE'],
         ['%=', 'QUYU'],
         ['//=', 'ZHENGCHU'],
         ['**=', 'POWER']];
    
    this.setStyle('print_blocks');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendValueInput('A')
    this.appendValueInput('B')
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'ADD': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD,
        'MINUS': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS,
        'MULTIPLY': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
        'DIVIDE': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE,
        'QUYU':Blockly.Msg.MATH_MODULO_TOOLTIP,
        'ZHENGCHU':Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE,
        'POWER': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_POWER
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['math_bit'] = {
  init: function() {
    var OPERATORS =
        [['&', '&'],
         ['|', '|'],
         ['>>', '>>'],
         ['<<', '<<']];
    this.setStyle('print_blocks');
    this.setOutput(true, Number);
    this.appendValueInput('A')
        //.setCheck(Number);
    this.appendValueInput('B')
        .setCheck(Number)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
	this.setTooltip("位运算");
  }
};

Blockly.Blocks['math_trig'] = {
  /**
   * Block for trigonometry operators.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [['sin', 'SIN'],
         ['cos', 'COS'],
         ['tan', 'TAN'],
         ['asin', 'ASIN'],
         ['acos', 'ACOS'],
         ['atan', 'ATAN'],
         ['-', '-'],
         ['ln', 'LN'],
         ['log10', 'LOG10'],
         ['e^', 'EXP'],
         ['10^', 'POW10']
        ];
    //this.setHelpUrl(Blockly.Msg.MATH_TRIG_HELPURL);
    this.setStyle('print_blocks');
    this.setOutput(true, Number);
    this.appendValueInput('NUM')
        .setCheck(Number)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'SIN': Blockly.Msg.MATH_TRIG_TOOLTIP_SIN,
        'COS': Blockly.Msg.MATH_TRIG_TOOLTIP_COS,
        'TAN': Blockly.Msg.MATH_TRIG_TOOLTIP_TAN,
        'ASIN': Blockly.Msg.MATH_TRIG_TOOLTIP_ASIN,
        'ACOS': Blockly.Msg.MATH_TRIG_TOOLTIP_ACOS,
        'ATAN': Blockly.Msg.MATH_TRIG_TOOLTIP_ATAN,
        'LN': Blockly.Msg.MATH_SINGLE_TOOLTIP_LN
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['math_dec'] = {
  /**
   * Block for trigonometry operators.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [[Blockly.Msg.MATH_BIN, 'bin'],
         [Blockly.Msg.MATH_OCT, 'oct'],
         [Blockly.Msg.MATH_HEX, 'hex'],
                 ];
    //this.setHelpUrl(Blockly.Msg.MATH_TRIG_HELPURL);
    this.setStyle('print_blocks');
    this.setOutput(true, String);
    this.appendValueInput('NUM')
        .setCheck(Number)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'bin': Blockly.Msg.MATH_DEC_TOOLTIP_BIN,
        'oct': Blockly.Msg.MATH_DEC_TOOLTIP_OCT,
        'hex': Blockly.Msg.MATH_DEC_TOOLTIP_HEX,
        
      };
      return TOOLTIPS[mode];
    });
  }
};

//取整等
Blockly.Blocks['math_to_int']= {
  init: function() {
	var OPERATORS =
        [[Blockly.LANG_MATH_TO_ROUND, 'round'],
         [Blockly.LANG_MATH_TO_CEIL, 'ceil'],
         [Blockly.LANG_MATH_TO_FLOOR, 'floor'],
		 [Blockly.Msg.MATH_ABS, 'fabs'],
         // [Blockly.Msg.MATH_SQ, 'pow'],
         [Blockly.Msg.MATH_SQRT, 'sqrt']];
    this.setStyle('print_blocks');
    this.appendValueInput('A')
        .setCheck(Number)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setOutput(true, Number);
	var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'sqrt': Blockly.Msg.MATH_SINGLE_TOOLTIP_ROOT,
        'fabs': Blockly.Msg.MATH_SINGLE_TOOLTIP_ABS,
        'sq': Blockly.Msg.MATH_SINGLE_TOOLTIP_SQ,
        'round': Blockly.Msg.MATH_SINGLE_TOOLTIP_ROUND,
        'ceil': Blockly.Msg.MATH_SINGLE_TOOLTIP_CEIL,
        'floor': Blockly.Msg.MATH_SINGLE_TOOLTIP_FLOOR
      };
      return TOOLTIPS[mode];
    });
  }
};
//最大最小值
Blockly.Blocks['math_max_min']= {
  init: function() {
	var OPERATORS =
        [[Blockly.MIXLY_MAX, 'max'],
		     [Blockly.MIXLY_MIN, 'min'],
        ];

    this.setStyle('print_blocks');
    this.appendValueInput('A')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP')
		.appendField('(');
	this.appendValueInput('B')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(',');
	this.appendDummyInput('')
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendField(')');
	this.setInputsInline(true);
    this.setOutput(true, Number);
	var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'max': Blockly.MIXLY_TOOLTIP_MATH_MAX,
        'min': Blockly.MIXLY_TOOLTIP_MATH_MIN
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['math_number_base_conversion'] = {
init: function() {
    var OPERATORS =[
         [Blockly.Msg.MATH_TWO, 'two'],
         [Blockly.Msg.MATH_EIGHT, 'eight'],
         [Blockly.Msg.MATH_TEN, 'ten'],
         [Blockly.Msg.MATH_SIXTEEN, 'sixteen']
         ];
    this.setStyle('print_blocks');
    this.appendDummyInput('')
        .appendField(Blockly.Msg.MATH_BA)
    this.appendValueInput("NUM")
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP')
        .appendField(Blockly.Msg.MATH_JinZhi)
        //.setCheck(Number);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.MATH_ZHW)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP2')
        .appendField(Blockly.Msg.MATH_JinZhi);
    this.setFieldValue('ten','OP2')
    // this.setPreviousStatement(true, null);
    // this.setNextStatement(true, null);
    this.setOutput(true)
    this.setInputsInline(true);
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'two': Blockly.Msg.MATH_Before_two,
        'eight': Blockly.Msg.MATH_Before_eight,
        'ten': Blockly.Msg.MATH_Before_ten,
        'sixteen': Blockly.Msg.MATH_Before_sixteen,
      };
      var mode2 = thisBlock.getFieldValue('OP2');
      var TOOLTIPS2 = {
        'two': Blockly.Msg.MATH_Behind_two,
        'eight': Blockly.Msg.MATH_Behind_eight,
        'ten': Blockly.Msg.MATH_Behind_ten,
        'sixteen': Blockly.Msg.MATH_Behind_sixteen,
      };
      return TOOLTIPS[mode]+TOOLTIPS2[mode2];
    });
  }
};


Blockly.Blocks['math_random'] = {
    init: function() {
    var INT_FLOAT = [[Blockly.LANG_MATH_INT, 'int'],[Blockly.LANG_MATH_FLOAT, 'float']];
    this.setStyle('print_blocks');
    this.setOutput(true, Number);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_RANDOM)
        .appendField(new Blockly.FieldDropdown(INT_FLOAT), 'TYPE');
    this.appendValueInput('FROM')
        .setCheck(Number)
        .appendField(Blockly.LANG_CONTROLS_FOR_INPUT_FROM);
    this.appendValueInput('TO')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.LANG_MATH_RANDOM_INT_INPUT_TO);
    this.setInputsInline(true);
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('TYPE');
      var TOOLTIPS = {
        'int': Blockly.LANG_MATH_INT,
        'float':Blockly.LANG_MATH_FLOAT_RANDOM
      };
      return Blockly.Msg.MATH_RANDOM_INT_TOOLTIP + TOOLTIPS[mode];
    });
  }
};


Blockly.Blocks['math_constrain'] = {
  /**
   * Block for constraining a number between two limits.
   * @this Blockly.Block
   */
  init: function() {
    this.setStyle('print_blocks');
    this.setOutput(true, Number);
    this.appendValueInput('VALUE')
        .setCheck(Number)
        .appendField(Blockly.LANG_MATH_CONSTRAIN_INPUT_CONSTRAIN);
    this.appendValueInput('LOW')
        .setCheck(Number)
        .appendField(Blockly.LANG_MATH_CONSTRAIN_INPUT_LOW);
    this.appendValueInput('HIGH')
        .setCheck(Number)
        .appendField(Blockly.LANG_MATH_CONSTRAIN_INPUT_HIGH);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MATH_CONSTRAIN_TOOLTIP);
  }
};

Blockly.Blocks.math_map = {
  init: function() {
    this.setStyle('print_blocks');
    this.appendValueInput("NUM", Number)
        .appendField(Blockly.MIXLY_MAP)
        //.setCheck(Number);
    this.appendValueInput("fromLow", Number)
        .appendField(Blockly.MIXLY_MAP_FROM)
        //.setCheck(Number);
    this.appendValueInput("fromHigh", Number)
        .appendField(",")
        //.setCheck(Number);
    this.appendValueInput("toLow", Number)
        .appendField(Blockly.MIXLY_MAP_TO)
        //.setCheck(Number);
    this.appendValueInput("toHigh", Number)
        .appendField(",")
        //.setCheck(Number);
    this.appendDummyInput("")
	      .appendField("]");
    this.setInputsInline(true);
    this.setOutput(true);
	this.setTooltip(Blockly.MIXLY_TOOLTIP_MATH_MAP);
  }
};

Blockly.Blocks['math_indexer_number'] = {
  /**
   * Block for numeric value.
   * @this Blockly.Block
   */
  init: function() {
    this.setStyle('print_blocks');
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('0', Blockly.FieldTextInput.math_number_validator_include_blank), 'NUM');
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP);
  }
};

Blockly.Blocks['math_random_seed'] = {
    init: function () {
        this.setStyle('print_blocks');
        this.appendValueInput('NUM')
            .setCheck(Number)
            .appendField(Blockly.LANG_MATH_RANDOM_SEED);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_MATH_RANDOM_SEED);
    }
};

Blockly.Blocks['math_round'] = {
  
  init: function() {
    this.setStyle('print_blocks');
    this.setOutput(true, Number);
    this.appendValueInput('VALUE')
        .setCheck(Number)
    this.appendValueInput('VAR')
        .setCheck(Number)
        .appendField(Blockly.MATH_ROUND)
        .appendField(Blockly.TEXT_KEEP);  
    this.appendDummyInput()
        .appendField(Blockly.TEXT_DECIMAL);        
    this.setInputsInline(true);
    this.setTooltip(Blockly.MATH_ROUND_NEW_TOOLTIP);
  }
};

Blockly.Blocks['text_to_number'] = {
  init: function() {
   var TO_INT_FLOAT =
   [[Blockly.MIXLY_TO_INT, 'int'],[Blockly.MIXLY_TO_FLOAT, 'float'],[Blockly.MIXLY_TO_BITES, 'b']];
   this.setStyle('print_blocks');
   this.appendValueInput('VAR')
   .appendField(new Blockly.FieldDropdown(TO_INT_FLOAT), 'TOWHAT');
   this.setOutput(true, Number);
   var thisBlock = this;
   this.setTooltip(function() {
    var mode = thisBlock.getFieldValue('TOWHAT');
    var TOOLTIPS = {
      'int': Blockly.MIXLY_PYTHON_TOOLTIP_TOINT,
      'float': Blockly.MIXLY_PYTHON_TOOLTIP_TOFLOAT,
      'b': Blockly.MIXLY_TOOLTIP_TEXT_TOBYTE
    };
    return TOOLTIPS[mode];
  });
 }
};