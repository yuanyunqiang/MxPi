
Blockly.Blocks['time_sleep']= {
    init: function() {
      this.setColour(120);
      this.appendValueInput("DELAY_TIME", Number)
          .appendField(Blockly.MIXLY_DELAY)        
            //.setCheck(Number);
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_SECOND)
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
      this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_DELAY);
    }
  };

  Blockly.Blocks['controls_if'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
     init: function() {
      //this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
      this.setColour(120);
      this.appendValueInput('IF0')
      .setCheck([Boolean,Number])
      .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
      this.appendStatementInput('DO0')
      .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/03.Control.html#if");
      this.setMutator(new Blockly.Mutator(['controls_if_elseif',
       'controls_if_else']));
      // Assign 'this' to a variable for use in the tooltip closure below.
      var thisBlock = this;
      this.setTooltip(function() {
        if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
          return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
        } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
          return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
        } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
          return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
        } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
          return Blockly.Msg.CONTROLS_IF_TOOLTIP_4;
        }
        return '';
      });
      this.elseifCount_ = 0;
      this.elseCount_ = 0;
    },
    /**
     * Create XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
     mutationToDom: function() {
      if (!this.elseifCount_ && !this.elseCount_) {
        return null;
      }
      var container = document.createElement('mutation');
      if (this.elseifCount_) {
        container.setAttribute('elseif', this.elseifCount_);
      }
      if (this.elseCount_) {
        container.setAttribute('else', 1);
      }
      return container;
    },
    /**
     * Parse XML to restore the else-if and else inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
     domToMutation: function(xmlElement) {
      var containerBlock = this;
      var valueConnections = [];
      var statementConnections = [];
      var elseStatementConnection = null;
      if (this.elseCount_) {
        if(containerBlock.getInputTargetBlock('ELSE') && containerBlock.getInputTargetBlock('ELSE').previousConnection)
          elseStatementConnection = containerBlock.getInputTargetBlock('ELSE').previousConnection;
        this.removeInput('ELSE');
      }
      for (var i = this.elseifCount_; i > 0; i--) {
        if(containerBlock.getInputTargetBlock('IF' + i) && containerBlock.getInputTargetBlock('IF' + i).previousConnection)
          valueConnections[i] = (containerBlock.getInputTargetBlock('IF' + i).previousConnection);
        else
          valueConnections[i] = null;
        this.removeInput('IF' + i);
        if(containerBlock.getInputTargetBlock('DO' + i) && containerBlock.getInputTargetBlock('DO' + i).previousConnection)
          statementConnections[i] = (containerBlock.getInputTargetBlock('DO' + i).previousConnection);
        else
          statementConnections[i] = null;
        this.removeInput('DO' + i);
      }
      this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10);
      this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10);
      //this.compose(containerBlock);
      for (var i = 1; i <= this.elseifCount_; i++) {
        this.appendValueInput('IF' + i)
        .setCheck([Boolean,Number])
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
        this.appendStatementInput('DO' + i)
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
      }
      if (this.elseCount_) {
        this.appendStatementInput('ELSE')
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
      }
      for(var i = valueConnections.length - 2; i > 0; i--){
        if(valueConnections[i])
          Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
      }
      for(var i = statementConnections.length - 2; i > 0; i--){
        if(statementConnections[i])
          Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
      }
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
     decompose: function(workspace) {
      var containerBlock = workspace.newBlock('controls_if_if');
      containerBlock.initSvg();
      var connection = containerBlock.getInput('STACK').connection;
      for (var i = 1; i <= this.elseifCount_; i++) {
        var elseifBlock = workspace.newBlock('controls_if_elseif');
        elseifBlock.initSvg();
        connection.connect(elseifBlock.previousConnection);
        connection = elseifBlock.nextConnection;
      }
      if (this.elseCount_) {
        var elseBlock = workspace.newBlock('controls_if_else');
        elseBlock.initSvg();
        connection.connect(elseBlock.previousConnection);
      }
      return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
     compose: function(containerBlock) {
      // Disconnect the else input blocks and remove the inputs.
      if (this.elseCount_) {
        this.removeInput('ELSE');
      }
      this.elseCount_ = 0;
      // Disconnect all the elseif input blocks and remove the inputs.
      for (var i = this.elseifCount_; i > 0; i--) {
        this.removeInput('IF' + i);
        this.removeInput('DO' + i);
      }
      this.elseifCount_ = 0;
      // Rebuild the block's optional inputs.
      var clauseBlock = containerBlock.getInputTargetBlock('STACK');
      var valueConnections = [null];
      var statementConnections = [null];
      var elseStatementConnection = null;
      while (clauseBlock) {
        switch (clauseBlock.type) {
          case 'controls_if_elseif':
          this.elseifCount_++;
          valueConnections.push(clauseBlock.valueConnection_);
          statementConnections.push(clauseBlock.statementConnection_);
          break;
          case 'controls_if_else':
          this.elseCount_++;
          elseStatementConnection = clauseBlock.statementConnection_;
          break;
          default:
          throw TypeError('Unknown block type: ' + clauseBlock.type);
        }
        clauseBlock = clauseBlock.nextConnection &&
        clauseBlock.nextConnection.targetBlock();
      }
  
      this.updateShape_();
      // Reconnect any child blocks.
      this.reconnectChildBlocks_(valueConnections, statementConnections, elseStatementConnection);
  
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
     saveConnections: function(containerBlock) {
      var clauseBlock = containerBlock.getInputTargetBlock('STACK');
      var i = 1;
      while (clauseBlock) {
        switch (clauseBlock.type) {
          case 'controls_if_elseif':
          var inputIf = this.getInput('IF' + i);
          var inputDo = this.getInput('DO' + i);
          clauseBlock.valueConnection_ =
          inputIf && inputIf.connection.targetConnection;
          clauseBlock.statementConnection_ =
          inputDo && inputDo.connection.targetConnection;
          i++;
          break;
          case 'controls_if_else':
          var inputDo = this.getInput('ELSE');
          clauseBlock.statementConnection_ =
          inputDo && inputDo.connection.targetConnection;
          break;
          default:
          throw 'Unknown block type.';
        }
        clauseBlock = clauseBlock.nextConnection &&
        clauseBlock.nextConnection.targetBlock();
      }
    },
    /**
     * Reconstructs the block with all child blocks attached.
     */
     rebuildShape_: function() {
      var valueConnections = [null];
      var statementConnections = [null];
      var elseStatementConnection = null;
  
      if (this.getInput('ELSE')) {
        elseStatementConnection = this.getInput('ELSE').connection.targetConnection;
      }
      var i = 1;
      while (this.getInput('IF' + i)) {
        var inputIf = this.getInput('IF' + i);
        var inputDo = this.getInput('DO' + i);
        console.log(inputIf.connection.targetConnection);
        valueConnections.push(inputIf.connection.targetConnection);
        statementConnections.push(inputDo.connection.targetConnection);
        i++;
      }
      this.updateShape_();
      this.reconnectChildBlocks_(valueConnections, statementConnections,elseStatementConnection);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @this Blockly.Block
     * @private
     */
     updateShape_: function() {
      // Delete everything.
      if (this.getInput('ELSE')) {
        this.removeInput('ELSE');
      }
      var i = 1;
      while (this.getInput('IF' + i)) {
        this.removeInput('IF' + i);
        this.removeInput('DO' + i);
        i++;
      }
      // Rebuild block.
      for (var i = 1; i <= this.elseifCount_; i++) {
        this.appendValueInput('IF' + i)
        .setCheck([Number,Boolean])
        .appendField(Blockly.Msg['CONTROLS_IF_MSG_ELSEIF']);
        this.appendStatementInput('DO' + i)
        .appendField(Blockly.Msg['CONTROLS_IF_MSG_THEN']);
      }
      if (this.elseCount_) {
        this.appendStatementInput('ELSE')
        .appendField(Blockly.Msg['CONTROLS_IF_MSG_ELSE']);
      }
    },
    /**
     * Reconnects child blocks.
     * @param {!Array<?Blockly.RenderedConnection>} valueConnections List of value
     * connectsions for if input.
     * @param {!Array<?Blockly.RenderedConnection>} statementConnections List of
     * statement connections for do input.
     * @param {?Blockly.RenderedConnection} elseStatementConnection Statement
     * connection for else input.
     */
     reconnectChildBlocks_: function(valueConnections, statementConnections,
      elseStatementConnection) {
      for (var i = 1; i <= this.elseifCount_; i++) {
        Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
        Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
      }
      Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
    }
  };

Blockly.Blocks['controls_if_if'] = {
  /**
   * Mutator block for if container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CONTROLS_IF_IF_TITLE_IF);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.CONTROLS_IF_IF_TOOLTIP);
    this.contextMenu = false;
  }
};
  
Blockly.Blocks['controls_if_elseif'] = {
  /**
   * Mutator bolck for else-if condition.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CONTROLS_IF_ELSEIF_TITLE_ELSEIF);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSEIF_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['controls_if_else'] = {
  /**
   * Mutator block for else condition.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CONTROLS_IF_ELSE_TITLE_ELSE);
    this.setPreviousStatement(true);
    this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSE_TOOLTIP);
    this.contextMenu = false;
  }
};
  
Blockly.Blocks['controls_repeat_ext'] = {
  /**
   * Block for repeat n times (external number).
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROLS_REPEAT_TITLE,
      "args0": [
        {
          "type": "input_value",
          "name": "TIMES",
          // "check": "Number"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 120,
      "tooltip": Blockly.Msg.CONTROLS_REPEAT_TOOLTIP,
      "helpUrl": Blockly.Msg.CONTROLS_REPEAT_HELPURL
    });
    this.appendStatementInput('DO');
  }
};
  
Blockly.Blocks.controls_whileUntil = {
  init: function() {
    this.setColour(120);
    this.appendValueInput('BOOL')
        //.setCheck([Boolean,Number])
        .appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT)
        .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'MODE')
    // this.appendDummyInput()
    //     .appendField(Blockly.CONTROLS_WHILE_SHI);
    this.appendStatementInput('DO')
        .appendField(Blockly.LANG_CONTROLS_WHILEUNTIL_TITLE_REPEAT+Blockly.MIXLY_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  var thisBlock = this;
  this.setTooltip(function() {
      var op = thisBlock.getFieldValue('MODE');
      var TOOLTIPS = {
        'WHILE': Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,
        'UNTIL': Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL
      };
      return TOOLTIPS[op];
    });
  }
};

Blockly.Blocks.controls_whileUntil.OPERATORS =
  [[Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE, 'WHILE'],
    [Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, 'UNTIL']];

    Blockly.Blocks.do_while= {
    init: function() { 
      this.appendDummyInput()
      .appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_REPEAT + Blockly.MIXLY_DO);
      this.appendStatementInput("input_data")
      .setCheck(null)  
      this.appendValueInput("select_data")
      .setCheck(null)  
      .appendField(Blockly.Msg.CONTROLS_OPERATOR_UNTIL)
      .appendField(new Blockly.FieldDropdown([[Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE,"true"],[Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL ,"false"]]), "type");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
      this.setTooltip("do-while loop");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks.controls_pass = {
    init: function() {
      this.setColour(120);
      this.appendDummyInput()
        .appendField(Blockly.MIXLY_PYTHON_PASS);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_PYTHON_CONTROLS_PASS_TOOLTIP);
    }
  };

Blockly.Blocks.controls_flow_statements = {
    init: function() {
      this.setColour(120);
      var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
      this.appendDummyInput()
          .appendField(dropdown, 'FLOW')
          .appendField(Blockly.LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP);
      this.setPreviousStatement(true);
      this.setTooltip(Blockly.MIXLY_PYTHON_CONTROLS_FLOW_STATEMENTS_TOOLTIP);
    var thisBlock = this;
      this.setTooltip(function() {
        var op = thisBlock.getFieldValue('FLOW');
        var TOOLTIPS = {
          'BREAK': Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK,
          'CONTINUE': Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE
        };
        return TOOLTIPS[op];
      });
    },
    onchange: function() {
      if (!this.workspace) {
        // Block has been deleted.
        return;
      }
      var legal = false;
      // Is the block nested in a control statement?
      var block = this;
      do {
        if (block.type == 'controls_repeat' ||
            block.type == 'controls_for' ||
            block.type == 'controls_forEach' ||
            block.type == 'controls_repeat_ext' ||
            block.type == 'controls_whileUntil' ||
            block.type == 'do_while') {
          legal = true;
          break;
        }
        block = block.getSurroundParent();
      } while (block);
      if (legal) {
        this.setWarningText(null);
      } else {
        this.setWarningText(Blockly.LANG_CONTROLS_FLOW_STATEMENTS_WARNING);
      }
    }
  };

Blockly.Blocks.controls_flow_statements.OPERATORS =
    [[Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK, 'BREAK'],
     [Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE, 'CONTINUE']];


Blockly.Blocks.controls_forEach = {
      init: function() {
        this.setColour(120);
        this.appendValueInput('LIST')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.CONTROLS_FOREACH_INPUT);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.CONTROLS_FOREACH_INPUT_ITEM)
        //    .appendField(new Blockly.FieldTextInput('i'), 'VAR');
        this.appendStatementInput('DO')
            .appendField(Blockly.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
      var thisBlock = this;
        this.setTooltip(function() {
          return Blockly.Msg.CONTROLS_FOR_TOOLTIP.replace('%1',
              thisBlock.getFieldValue('VAR'));
        });
      },
      getVars: function() {
        return [this.getFieldValue('VAR')];
      },
      renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
          this.setTitleValue(newName, 'VAR');
        }
      }
    };

    Blockly.Blocks.controls_range = {
      init: function() {
        this.setColour(120);
        this.appendValueInput('FROM')
            //.setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.PYTHON_RANGE)
            .appendField(Blockly.LANG_CONTROLS_FOR_INPUT_FROM);
        this.appendValueInput('TO')
            //.setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.LANG_CONTROLS_FOR_INPUT_TO);
        this.appendValueInput('STEP')
            //.setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.PYTHON_RANGE_STEP);
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip(Blockly.MIXLY_PYTHON_CONTROLS_RANGE_TOOLTIP);
      }
    };

    Blockly.Blocks['list_many_input']= {
      init: function() {
        this.setColour(120);
        this.appendDummyInput("")
            .appendField('[')
            .appendField(new Blockly.FieldTextInput('0,0,0'),"CONTENT")
            .appendField(']');
        this.setInputsInline(true);
        this.setOutput(true);
      }
    };

    Blockly.Blocks['controls_try_finally'] = {
      /**
       * Block for if/elseif/else condition.
       * @this Blockly.Block
       */
       init: function() {
        this.setColour(120);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_PYTHON_TRY);
        this.appendStatementInput('try');
        this.appendValueInput('IF1')
            .appendField(Blockly.MIXLY_PYTHON_EXCEPT);
        this.appendStatementInput('DO1')
            .appendField('');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutator(new Blockly.Mutator(['controls_except','controls_finally']));
        this.setTooltip(Blockly.MIXLY_MIXPY_CONTROL_TRY_TOOLTIP);
        this.elseifCount_ = 1;
        this.elseCount_ = 0;
      },
      /**
       * Create XML to represent the number of else-if and else inputs.
       * @return {Element} XML storage element.
       * @this Blockly.Block
       */
       mutationToDom: function() {
        if (!this.elseifCount_ && !this.elseCount_) {
          return null;
        }
        var container = document.createElement('mutation');
        if (this.elseifCount_) {
          container.setAttribute('elseif', this.elseifCount_);
        }
        if (this.elseCount_) {
          container.setAttribute('else', 1);
        }
        return container;
      },
      /**
       * Parse XML to restore the else-if and else inputs.
       * @param {!Element} xmlElement XML storage element.
       * @this Blockly.Block
       */
       domToMutation: function(xmlElement) {
        var containerBlock = this;
        var valueConnections = [];
        var statementConnections = [];
        var elseStatementConnection = null;
        if (this.elseCount_) {
          if(containerBlock.getInputTargetBlock('ELSE') && containerBlock.getInputTargetBlock('ELSE').previousConnection)
            elseStatementConnection = containerBlock.getInputTargetBlock('ELSE').previousConnection;
          this.removeInput('ELSE');
        }
        for (var i = this.elseifCount_; i > 0; i--) {
          if(containerBlock.getInputTargetBlock('IF' + i) && containerBlock.getInputTargetBlock('IF' + i).previousConnection)
            valueConnections[i] = (containerBlock.getInputTargetBlock('IF' + i).previousConnection);
          else
            valueConnections[i] = null;
          this.removeInput('IF' + i);
          if(containerBlock.getInputTargetBlock('DO' + i) && containerBlock.getInputTargetBlock('DO' + i).previousConnection)
            statementConnections[i] = (containerBlock.getInputTargetBlock('DO' + i).previousConnection);
          else
            statementConnections[i] = null;
          this.removeInput('DO' + i);
        }
        this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10);
        this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10);
        //this.compose(containerBlock);
        for (var i = 1; i <= this.elseifCount_; i++) {
          this.appendValueInput('IF' + i)
          .setCheck([Boolean,Number])
          .appendField(Blockly.MIXLY_PYTHON_EXCEPT);
          this.appendStatementInput('DO' + i)
          .appendField("");
        }
        if (this.elseCount_) {
          this.appendStatementInput('ELSE')
          .appendField(Blockly.MIXLY_PYTHON_FINALLY);
        }
        for(var i = valueConnections.length - 2; i > 0; i--){
          if(valueConnections[i])
            Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
        }
        for(var i = statementConnections.length - 2; i > 0; i--){
          if(statementConnections[i])
            Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
        }
      },
      /**
       * Populate the mutator's dialog with this block's components.
       * @param {!Blockly.Workspace} workspace Mutator's workspace.
       * @return {!Blockly.Block} Root block in mutator.
       * @this Blockly.Block
       */
       decompose: function(workspace) {
        var containerBlock = workspace.newBlock('controls_try');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 1; i <= this.elseifCount_; i++) {
          var elseifBlock = workspace.newBlock('controls_except');
          elseifBlock.initSvg();
          connection.connect(elseifBlock.previousConnection);
          connection = elseifBlock.nextConnection;
        }
        if (this.elseCount_) {
          var elseBlock = workspace.newBlock('controls_finally');
          elseBlock.initSvg();
          connection.connect(elseBlock.previousConnection);
        }
        return containerBlock;
      },
      /**
       * Reconfigure this block based on the mutator dialog's components.
       * @param {!Blockly.Block} containerBlock Root block in mutator.
       * @this Blockly.Block
       */
       compose: function(containerBlock) {
        // Disconnect the else input blocks and remove the inputs.
        if (this.elseCount_) {
          this.removeInput('ELSE');
        }
        this.elseCount_ = 0;
        // Disconnect all the elseif input blocks and remove the inputs.
        for (var i = this.elseifCount_; i > 0; i--) {
          this.removeInput('IF' + i);
          this.removeInput('DO' + i);
        }
        this.elseifCount_ = 0;
        // Rebuild the block's optional inputs.
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        var valueConnections = [null];
        var statementConnections = [null];
        var elseStatementConnection = null;
        while (clauseBlock) {
          switch (clauseBlock.type) {
            case 'controls_except':
            this.elseifCount_++;
            valueConnections.push(clauseBlock.valueConnection_);
            statementConnections.push(clauseBlock.statementConnection_);
            break;
            case 'controls_finally':
            this.elseCount_++;
            elseStatementConnection = clauseBlock.statementConnection_;
            break;
            default:
            throw TypeError('Unknown block type: ' + clauseBlock.type);
          }
          clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
        }
    
        this.updateShape_();
        // Reconnect any child blocks.
        this.reconnectChildBlocks_(valueConnections, statementConnections, elseStatementConnection);
    
      },
      /**
       * Store pointers to any connected child blocks.
       * @param {!Blockly.Block} containerBlock Root block in mutator.
       * @this Blockly.Block
       */
       saveConnections: function(containerBlock) {
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 1;
        while (clauseBlock) {
          switch (clauseBlock.type) {
            case 'controls_except':
            var inputIf = this.getInput('IF' + i);
            var inputDo = this.getInput('DO' + i);
            clauseBlock.valueConnection_ =
            inputIf && inputIf.connection.targetConnection;
            clauseBlock.statementConnection_ =
            inputDo && inputDo.connection.targetConnection;
            i++;
            break;
            case 'controls_finally':
            var inputDo = this.getInput('ELSE');
            clauseBlock.statementConnection_ =
            inputDo && inputDo.connection.targetConnection;
            break;
            default:
            throw 'Unknown block type.';
          }
          clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
        }
      },
      /**
       * Reconstructs the block with all child blocks attached.
       */
       rebuildShape_: function() {
        var valueConnections = [null];
        var statementConnections = [null];
        var elseStatementConnection = null;
    
        if (this.getInput('ELSE')) {
          elseStatementConnection = this.getInput('ELSE').connection.targetConnection;
        }
        var i = 1;
        while (this.getInput('IF' + i)) {
          var inputIf = this.getInput('IF' + i);
          var inputDo = this.getInput('DO' + i);
          console.log(inputIf.connection.targetConnection);
          valueConnections.push(inputIf.connection.targetConnection);
          statementConnections.push(inputDo.connection.targetConnection);
          i++;
        }
        this.updateShape_();
        this.reconnectChildBlocks_(valueConnections, statementConnections,elseStatementConnection);
      },
      /**
       * Modify this block to have the correct number of inputs.
       * @this Blockly.Block
       * @private
       */
       updateShape_: function() {
        // Delete everything.
        if (this.getInput('ELSE')) {
          this.removeInput('ELSE');
        }
        var i = 1;
        while (this.getInput('IF' + i)) {
          this.removeInput('IF' + i);
          this.removeInput('DO' + i);
          i++;
        }
        // Rebuild block.
        for (var i = 1; i <= this.elseifCount_; i++) {
          this.appendValueInput('IF' + i)
          .setCheck([Number,Boolean])
          .appendField(Blockly.MIXLY_PYTHON_EXCEPT);
          this.appendStatementInput('DO' + i)
          .appendField('');
        }
        if (this.elseCount_) {
          this.appendStatementInput('ELSE')
          .appendField(Blockly.MIXLY_PYTHON_FINALLY);
        }
      },
      /**
       * Reconnects child blocks.
       * @param {!Array<?Blockly.RenderedConnection>} valueConnections List of value
       * connectsions for if input.
       * @param {!Array<?Blockly.RenderedConnection>} statementConnections List of
       * statement connections for do input.
       * @param {?Blockly.RenderedConnection} elseStatementConnection Statement
       * connection for else input.
       */
       reconnectChildBlocks_: function(valueConnections, statementConnections,
        elseStatementConnection) {
        for (var i = 1; i <= this.elseifCount_; i++) {
          Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
          Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
        }
        Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
      }
    };

    Blockly.Blocks.controls_thread = {
      init: function() {
        this.setColour(120);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_PYTHON_CONTROLS_THREAD_START)
        this.appendValueInput('callback')
            .appendField(Blockly.MIXLY_PYTHON_CONTROLS_THREAD_USE)
        this.appendValueInput('VAR')
            .appendField(Blockly.MIXLY_PARAMS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_PYTHON_CONTROLS_THREAD_TOOLTIP);
      }
    };

    Blockly.Blocks.factory_block_return = {
      init: function() {
        this.setColour(195);
        this.appendDummyInput("")
        .appendField(new Blockly.FieldTextInput('test'), 'VALUE');
        this.setOutput(true);
      }
    };

    Blockly.Blocks['tuple_create_with_noreturn'] = {
      /**
       * Block for creating a list with any number of elements of any type.
       * @this Blockly.Block
       */
      init: function() {
        this.setColour(195);
        this.itemCount_ = 3;
        this.updateShape_();
        this.setPreviousStatement(false);
        this.setNextStatement(false);
      this.setOutput(true, "Tuple")
        this.setMutator(new Blockly.Mutator(['tuple_create_with_item']));
        this.setTooltip(Blockly.Msg.TUPLE_CREATE_WITH_TOOLTIP);
      },
      /**
       * Create XML to represent list inputs.
       * @return {Element} XML storage element.
       * @this Blockly.Block
       */
      mutationToDom: function() {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
      },
      /**
       * Parse XML to restore the list inputs.
       * @param {!Element} xmlElement XML storage element.
       * @this Blockly.Block
       */
      domToMutation: function(xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
      },
      /**
       * Populate the mutator's dialog with this block's components.
       * @param {!Blockly.Workspace} workspace Mutator's workspace.
       * @return {!Blockly.Block} Root block in mutator.
       * @this Blockly.Block
       */
      decompose: function(workspace) {
        var containerBlock =
            workspace.newBlock('tuple_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
          var itemBlock = workspace.newBlock('tuple_create_with_item');
          itemBlock.initSvg();
          connection.connect(itemBlock.previousConnection);
          connection = itemBlock.nextConnection;
        }
        return containerBlock;
      },
      /**
       * Reconfigure this block based on the mutator dialog's components.
       * @param {!Blockly.Block} containerBlock Root block in mutator.
       * @this Blockly.Block
       */
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
            this.getInput('ADD' + i).connection.connect(connections[i]);
          }
        }
      },
      /**
       * Store pointers to any connected child blocks.
       * @param {!Blockly.Block} containerBlock Root block in mutator.
       * @this Blockly.Block
       */
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
      /**
       * Modify this block to have the correct number of inputs.
       * @private
       * @this Blockly.Block
       */
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
              .appendField(Blockly.Msg.TUPLE_CREATE_EMPTY_TITLE);
        } else {
          for (var i = 0; i < this.itemCount_; i++) {
            var input = this.appendValueInput('ADD' + i);
            if (i == 0) {
              input.appendField(Blockly.Msg.TUPLE_CREATE_WITH_INPUT_WITH);
            }
          }
        }
      },
      getVars: function() {
        return [this.getFieldValue('VAR')];
      },
      renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
          this.setTitleValue(newName, 'VAR');
        }
      }
    };

    Blockly.Blocks['tuple_create_with_item'] = {
      /**
       * Mutator bolck for adding items.
       * @this Blockly.Block
       */
      init: function() {
        this.setColour(195);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_SET_VARIABLES_NAME);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.TUPLE_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = false;
      }
    };

    Blockly.Blocks['tuple_create_with_container'] = {
      /**
       * Mutator block for list container.
       * @this Blockly.Block
       */
      init: function() {
        this.setColour(195);
        this.appendDummyInput()
            .appendField(Blockly.Msg.TUPLE_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.TUPLE_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = false;
      }
    };

    Blockly.Blocks['procedures_defnoreturns'] = {
      /**
       * Block for defining a procedure with no return value.
       * @this {Blockly.Block}
       */
      init: function() {
        var initName = Blockly.Procedures.findLegalName('', this);
        var nameField = new Blockly.FieldTextInput(initName,
            Blockly.Procedures.rename);
        nameField.setSpellcheck(false);
        this.appendDummyInput()
            .appendField("定义类函数 ")
            .appendField(Blockly.Msg['PROCEDURES_DEFNORETURN_TITLE'])
            .appendField(new Blockly.FieldTextInput("run1"), "NAME")
            .appendField('', 'PARAMS');
        this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        if ((this.workspace.options.comments ||
             (this.workspace.options.parentWorkspace &&
              this.workspace.options.parentWorkspace.options.comments)) &&
            Blockly.Msg['PROCEDURES_DEFNORETURN_COMMENT']) {
          this.setCommentText(Blockly.Msg['PROCEDURES_DEFNORETURN_COMMENT']);
        }
        this.setStyle('procedure_blocks');
        this.setTooltip(Blockly.Msg['PROCEDURES_DEFNORETURN_TOOLTIP']);
        this.setHelpUrl(Blockly.Msg['PROCEDURES_DEFNORETURN_HELPURL']);
        this.arguments_ = [];
        this.argumentVarModels_ = [];
        this.setStatements_(true);
        this.statementConnection_ = null;
      },
      /**
       * Add or remove the statement block from this function definition.
       * @param {boolean} hasStatements True if a statement block is needed.
       * @this {Blockly.Block}
       */
      setStatements_: function(hasStatements) {
        if (this.hasStatements_ === hasStatements) {
          return;
        }
        if (hasStatements) {
          this.appendStatementInput('STACK')
              .appendField(Blockly.Msg['PROCEDURES_DEFNORETURN_DO']);
          if (this.getInput('RETURN')) {
            this.moveInputBefore('STACK', 'RETURN');
          }
        } else {
          this.removeInput('STACK', true);
        }
        this.hasStatements_ = hasStatements;
      },
      /**
       * Update the display of parameters for this procedure definition block.
       * @private
       * @this {Blockly.Block}
       */
      updateParams_: function() {
    
        // Merge the arguments into a human-readable list.
        var paramString = '';
        if (this.arguments_.length) {
          paramString = Blockly.Msg['PROCEDURES_BEFORE_PARAMS'] +
              ' ' + this.arguments_.join(', ');
        }
        // The params field is deterministic based on the mutation,
        // no need to fire a change event.
        Blockly.Events.disable();
        try {
          this.setFieldValue(paramString, 'PARAMS');
        } finally {
          Blockly.Events.enable();
        }
      },
      /**
       * Create XML to represent the argument inputs.
       * @param {boolean=} opt_paramIds If true include the IDs of the parameter
       *     quarks.  Used by Blockly.Procedures.mutateCallers for reconnection.
       * @return {!Element} XML storage element.
       * @this {Blockly.Block}
       */
      mutationToDom: function(opt_paramIds) {
        var container = Blockly.utils.xml.createElement('mutation');
        if (opt_paramIds) {
          container.setAttribute('name', this.getFieldValue('NAME'));
        }
        for (var i = 0; i < this.argumentVarModels_.length; i++) {
          var parameter = Blockly.utils.xml.createElement('arg');
          var argModel = this.argumentVarModels_[i];
          parameter.setAttribute('name', argModel.name);
          parameter.setAttribute('varid', argModel.getId());
          if (opt_paramIds && this.paramIds_) {
            parameter.setAttribute('paramId', this.paramIds_[i]);
          }
          container.appendChild(parameter);
        }
    
        // Save whether the statement input is visible.
        if (!this.hasStatements_) {
          container.setAttribute('statements', 'false');
        }
        return container;
      },
      /**
       * Parse XML to restore the argument inputs.
       * @param {!Element} xmlElement XML storage element.
       * @this {Blockly.Block}
       */
      domToMutation: function(xmlElement) {
        this.arguments_ = [];
        this.argumentVarModels_ = [];
        for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
          if (childNode.nodeName.toLowerCase() == 'arg') {
            var varName = childNode.getAttribute('name');
            var varId = childNode.getAttribute('varid') || childNode.getAttribute('varId');
            this.arguments_.push(varName);
            var variable = Blockly.Variables.getOrCreateVariablePackage(
                this.workspace, varId, varName, '');
            if (variable != null) {
              this.argumentVarModels_.push(variable);
            } else {
              console.log('Failed to create a variable with name ' + varName + ', ignoring.');
            }
          }
        }
        this.updateParams_();
        Blockly.Procedures.mutateCallers(this);
    
        // Show or hide the statement input.
        this.setStatements_(xmlElement.getAttribute('statements') !== 'false');
      },
      /**
       * Populate the mutator's dialog with this block's components.
       * @param {!Blockly.Workspace} workspace Mutator's workspace.
       * @return {!Blockly.Block} Root block in mutator.
       * @this {Blockly.Block}显示添加参数
       */
      decompose: function(workspace) {
        /*
         * Creates the following XML:
         * <block type="procedures_mutatorcontainer">
         *   <statement name="STACK">
         *     <block type="procedures_mutatorarg">
         *       <field name="NAME">arg1_name</field>
         *       <next>etc...</next>
         *     </block>
         *   </statement>
         * </block>
         */
    
        var containerBlockNode = Blockly.utils.xml.createElement('block');
        containerBlockNode.setAttribute('type', 'procedures_mutatorcontainer');
        var statementNode = Blockly.utils.xml.createElement('statement');
        statementNode.setAttribute('name', 'STACK');
        containerBlockNode.appendChild(statementNode);
    
        var node = statementNode;
        for (var i = 0; i < this.arguments_.length; i++) {
          var argBlockNode = Blockly.utils.xml.createElement('block');
          argBlockNode.setAttribute('type', 'procedures_mutatorarg');
          var fieldNode = Blockly.utils.xml.createElement('field');
          fieldNode.setAttribute('name', 'NAME');
          var argumentName = Blockly.utils.xml.createTextNode(this.arguments_[i]);
          fieldNode.appendChild(argumentName);
          argBlockNode.appendChild(fieldNode);
          var nextNode = Blockly.utils.xml.createElement('next');
          argBlockNode.appendChild(nextNode);
    
          node.appendChild(argBlockNode);
          node = nextNode;
        }
    
        var containerBlock = Blockly.Xml.domToBlock(containerBlockNode, workspace);
    
        if (this.type == 'procedures_defreturns') {
          containerBlock.setFieldValue(this.hasStatements_, 'STATEMENTS');
        } else {
          containerBlock.removeInput('STATEMENT_INPUT');
        }
    
        // Initialize procedure's callers with blank IDs.
        Blockly.Procedures.mutateCallers(this);
        return containerBlock;
      },
      /**
       * Reconfigure this block based on the mutator dialog's components.
       * @param {!Blockly.Block} containerBlock Root block in mutator.
       * @this {Blockly.Block}
       */
      compose: function(containerBlock) {
        // Parameter list.
        this.arguments_ = [];
        this.paramIds_ = [];
        this.argumentVarModels_ = [];
        var paramBlock = containerBlock.getInputTargetBlock('STACK');
        while (paramBlock && !paramBlock.isInsertionMarker()) {
          var varName = paramBlock.getFieldValue('NAME');
          this.arguments_.push(varName);
          var variable = this.workspace.getVariable(varName, '');
          this.argumentVarModels_.push(variable);
    
          this.paramIds_.push(paramBlock.id);
          paramBlock = paramBlock.nextConnection &&
              paramBlock.nextConnection.targetBlock();
        }
        this.updateParams_();
        Blockly.Procedures.mutateCallers(this);
    
        // Show/hide the statement input.
        var hasStatements = containerBlock.getFieldValue('STATEMENTS');
        if (hasStatements !== null) {
          hasStatements = hasStatements == 'TRUE';
          if (this.hasStatements_ != hasStatements) {
            if (hasStatements) {
              this.setStatements_(true);
              // Restore the stack, if one was saved.
              Blockly.Mutator.reconnect(this.statementConnection_, this, 'STACK');
              this.statementConnection_ = null;
            } else {
              // Save the stack, then disconnect it.
              var stackConnection = this.getInput('STACK').connection;
              this.statementConnection_ = stackConnection.targetConnection;
              if (this.statementConnection_) {
                var stackBlock = stackConnection.targetBlock();
                stackBlock.unplug();
                stackBlock.bumpNeighbours();
              }
              this.setStatements_(false);
            }
          }
        }
      },
      /**
       * Return the signature of this procedure definition.
       * @return {!Array} Tuple containing three elements:
       *     - the name of the defined procedure,
       *     - a list of all its arguments,
       *     - that it DOES NOT have a return value.
       * @this {Blockly.Block}
       */
      getProcedureDef: function() {
        return [this.getFieldValue('NAME'), this.arguments_, false];
      },
      /**
       * Return all variables referenced by this block.
       * @return {!Array<string>} List of variable names.
       * @this {Blockly.Block}
       */
      getVars: function() {
        return this.arguments_;
      },
      /**
       * Return all variables referenced by this block.
       * @return {!Array<!Blockly.VariableModel>} List of variable models.
       * @this {Blockly.Block}
       */
      getVarModels: function() {
        return this.argumentVarModels_;
      },
      /**
       * Notification that a variable is renaming.
       * If the ID matches one of this block's variables, rename it.
       * @param {string} oldId ID of variable to rename.
       * @param {string} newId ID of new variable.  May be the same as oldId, but
       *     with an updated name.  Guaranteed to be the same type as the old
       *     variable.
       * @override
       * @this {Blockly.Block}
       */
      renameVarById: function(oldId, newId) {
        var oldVariable = this.workspace.getVariableById(oldId);
        if (oldVariable.type != '') {
          // Procedure arguments always have the empty type.
          return;
        }
        var oldName = oldVariable.name;
        var newVar = this.workspace.getVariableById(newId);
    
        var change = false;
        for (var i = 0; i < this.argumentVarModels_.length; i++) {
          if (this.argumentVarModels_[i].getId() == oldId) {
            this.arguments_[i] = newVar.name;
            this.argumentVarModels_[i] = newVar;
            change = true;
          }
        }
        if (change) {
          this.displayRenamedVar_(oldName, newVar.name);
          Blockly.Procedures.mutateCallers(this);
        }
      },
      /**
       * Notification that a variable is renaming but keeping the same ID.  If the
       * variable is in use on this block, rerender to show the new name.
       * @param {!Blockly.VariableModel} variable The variable being renamed.
       * @package
       * @override
       * @this {Blockly.Block}
       */
      updateVarName: function(variable) {
        var newName = variable.name;
        var change = false;
        for (var i = 0; i < this.argumentVarModels_.length; i++) {
          if (this.argumentVarModels_[i].getId() == variable.getId()) {
            var oldName = this.arguments_[i];
            this.arguments_[i] = newName;
            change = true;
          }
        }
        if (change) {
          this.displayRenamedVar_(oldName, newName);
          Blockly.Procedures.mutateCallers(this);
        }
      },
      /**
       * Update the display to reflect a newly renamed argument.
       * @param {string} oldName The old display name of the argument.
       * @param {string} newName The new display name of the argument.
       * @private
       * @this {Blockly.Block}
       */
      displayRenamedVar_: function(oldName, newName) {
        this.updateParams_();
        // Update the mutator's variables if the mutator is open.
        if (this.mutator && this.mutator.isVisible()) {
          var blocks = this.mutator.workspace_.getAllBlocks(false);
          for (var i = 0, block; (block = blocks[i]); i++) {
            if (block.type == 'procedures_mutatorarg' &&
                Blockly.Names.equals(oldName, block.getFieldValue('NAME'))) {
              block.setFieldValue(newName, 'NAME');
            }
          }
        }
      },
      /**
       * Add custom menu options to this block's context menu.
       * @param {!Array} options List of menu options to add to.
       * @this {Blockly.Block}
       */
      customContextMenu: function(options) {
        if (this.isInFlyout) {
          return;
        }
        // Add option to create caller.
        var option = {enabled: true};
        var name = this.getFieldValue('NAME');
        option.text = Blockly.Msg['PROCEDURES_CREATE_DO'].replace('%1', name);
        var xmlMutation = Blockly.utils.xml.createElement('mutation');
        xmlMutation.setAttribute('name', name);
        for (var i = 0; i < this.arguments_.length; i++) {
          var xmlArg = Blockly.utils.xml.createElement('arg');
          xmlArg.setAttribute('name', this.arguments_[i]);
          xmlMutation.appendChild(xmlArg);
        }
        var xmlBlock = Blockly.utils.xml.createElement('block');
        xmlBlock.setAttribute('type', this.callType_);
        xmlBlock.appendChild(xmlMutation);
        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
        options.push(option);
    
        // Add options to create getters for each parameter.
        if (!this.isCollapsed()) {
          for (var i = 0; i < this.argumentVarModels_.length; i++) {
            var argOption = {enabled: true};
            var argVar = this.argumentVarModels_[i];
            argOption.text = Blockly.Msg['VARIABLES_SET_CREATE_GET']
                .replace('%1', argVar.name);
    
            var argXmlField = Blockly.Variables.generateVariableFieldDom(argVar);
            var argXmlBlock = Blockly.utils.xml.createElement('block');
            argXmlBlock.setAttribute('type', 'variables_change');
            argXmlBlock.appendChild(argXmlField);
            argOption.callback =
                Blockly.ContextMenu.callbackFactory(this, argXmlBlock);
            options.push(argOption);
          }
        }
      },
      callType_: 'procedures_callnoreturns'
    };

    
