Blockly.Blocks.pyqt5= {
    init: function() {
    this.appendDummyInput()
        .appendField("PyQt5窗口")
        .appendField(new Blockly.FieldTextInput("MainQ"), "NAME")
        .appendField("  ");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setNextStatement(true, null);
    this.setStyle('GUI_blocks');
    this.setTooltip("创建PyQt5窗口");
    this.setHelpUrl("创建PyQt5窗口");
    }
  };

  Blockly.Blocks.pyqt5_init= {
    init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("窗口")
        .appendField(new Blockly.FieldTextInput("MainQ"), "NAME")
        .appendField("初始化函数 ");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(285);
    this.setTooltip("关闭所有窗口");
    this.setHelpUrl("");
    }
  };

  Blockly.Blocks.pyqt5_QMain_bg_color= {
    init: function() {
    this.appendDummyInput()
        .appendField(" 设置窗口 ")
        .appendField(new Blockly.FieldTextInput("MainQ"), "NAME")
        .appendField(" 背景颜色为 ")
        .appendField(new Blockly.FieldColour("#ff6600"), "COLOR");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('GUI_blocks');
    this.setTooltip("设置窗口背景颜色");
    this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks.pyqt5_QMain_bg_img= {
    init: function() {
    this.appendDummyInput()
        .appendField(" 设置窗口 ")
        .appendField(new Blockly.FieldTextInput("MainQ"), "NAME")
        .appendField(" 背景图片为 ")
        .appendField(new Blockly.FieldTextInput("/static/file/MxPi.jpg"), "URL");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('GUI_blocks');
    this.setTooltip("设置窗口背景图片");
    this.setHelpUrl("");
    }
  }
  Blockly.Blocks.pyqt5_setsize= {
    init: function() {
    this.appendDummyInput()
        .appendField("设置窗口大小");
    this.appendValueInput("WIDTH")
        .setCheck(Number)
        .appendField(" 宽 ");
    this.appendValueInput("HIGH")
        .setCheck(Number)
        .appendField(" 高 ");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('GUI_blocks');
    this.setTooltip("设置窗口大小");
    this.setHelpUrl();
    }
  };

  Blockly.Blocks.pyqt5_setname= {
    init: function() {
    this.appendValueInput("NAME")
        .setCheck(String)
        .appendField("设置窗口名称：");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('GUI_blocks');
    this.setTooltip("设置窗口大小");
    this.setHelpUrl();
    }
  };

  Blockly.Blocks.pyqt5_label= {
    init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("创建标签组件")
        .appendField(new Blockly.FieldTextInput("label"), "LABEL");
    this.appendValueInput("TEXT")
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("内容为");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('GUI_blocks');
    this.setTooltip("创建标签组件");
    this.setHelpUrl();
    }
  };

  Blockly.Blocks.pyqt5_label_setxywh= {
    init: function() {
    this.appendDummyInput()
        .appendField("设置组件")
        .appendField(new Blockly.FieldTextInput("label"), "NAME");
    this.appendValueInput("X")
        .setCheck(Number)
        .appendField(" 位置  X");
    this.appendValueInput("Y")
        .setCheck(Number)
        .appendField(" 位置  Y");
    this.appendValueInput("W")
        .setCheck(Number)
        .appendField(" 宽");
    this.appendValueInput("H")
        .setCheck(Number)
        .appendField(" 高");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('GUI_blocks');
    this.setTooltip("设置组件位置与宽高");
    this.setHelpUrl("");
    }
  };

  Blockly.Blocks.pyqt5_label_setfont= {
    init: function() {
    this.appendDummyInput()
        .appendField("设置组件")
        .appendField(new Blockly.FieldTextInput("label"), "NAME");
    this.appendDummyInput()
        .appendField(" 字体为")
        .appendField(new Blockly.FieldDropdown([["Arial","FONT1"],["黑体","FONT2"]]), "FONT");
    this.appendValueInput("SIZE")
        .setCheck(null)
        .appendField(" 字体大小");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('GUI_blocks');
    this.setTooltip("设置组件位置与宽高");
    this.setHelpUrl("");
    }
  };

  Blockly.Blocks.pyqt5_Slider= {
    init: function() {
    this.appendDummyInput()
        .appendField("创建滑块组件")
        .appendField(new Blockly.FieldTextInput("slider"), "NAME");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('GUI_blocks');
    this.setTooltip("创建滑块组件");
    this.setHelpUrl("");
    }
  };
  Blockly.Blocks.pyqt5_Slider_model= {
    init: function() {
    this.appendDummyInput()
        .appendField("滑块组件 ")
        .appendField(new Blockly.FieldTextInput("slider"), "NAME")
        .appendField(" 模式为 ")
        .appendField(new Blockly.FieldDropdown([["水平模式","H"],["垂直模式","V"]]), "MODEL");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('GUI_blocks');
    this.setTooltip("设置滑块组件(水平/垂直)模式");
    this.setHelpUrl("");
    }
  };

  Blockly.Blocks.pyqt5_Slider_maxmin= {
    init: function() {
    this.appendDummyInput()
        .appendField("滑块组件 ")
        .appendField(new Blockly.FieldTextInput("slider"), "NAME");
    this.appendValueInput("MIN")
        .setCheck(Number)
        .appendField(" 最小值 ");
    this.appendValueInput("MAX")
        .setCheck(Number)
        .appendField(" 最大值 ");
    this.appendValueInput("STEP")
        .setCheck(Number)
        .appendField(" 步长为 ");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('GUI_blocks');
    this.setTooltip("设置滑块组件最大最小值");
    this.setHelpUrl("");
    }
  };


  Blockly.Blocks.pyqt5_Slider_setValue= {
    init: function() {
    this.appendDummyInput()
        .appendField("设置滑块组件 ")
        .appendField(new Blockly.FieldTextInput("slider"), "NAME");
    this.appendValueInput("NUM")
        .setCheck(Number)
        .appendField(" 值为 ");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('GUI_blocks');
    this.setTooltip("设置滑块的值");
    this.setHelpUrl("");
    }
  };

  Blockly.Blocks.pyqt5_Slider_Value= {
    init: function() {
    this.appendDummyInput()
        .appendField("获取滑块组件 ")
        .appendField(new Blockly.FieldTextInput("slider"), "NAME")
        .appendField(" 的值 ");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setStyle('GUI_blocks');
    this.setTooltip("获取引脚编号方式");
    this.setHelpUrl("");
    }
  };

  Blockly.Blocks.pyqt5_Slider_setxywh= {
    init: function() {
    this.appendDummyInput()
        .appendField("设置组件")
        .appendField(new Blockly.FieldTextInput("slider"), "NAME");
    this.appendValueInput("X")
        .setCheck(Number)
        .appendField(" 位置  X");
    this.appendValueInput("Y")
        .setCheck(Number)
        .appendField(" 位置  Y");
    this.appendValueInput("W")
        .setCheck(Number)
        .appendField(" 宽");
    this.appendValueInput("H")
        .setCheck(Number)
        .appendField(" 高");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('GUI_blocks');
    this.setTooltip("设置组件位置与宽高");
    this.setHelpUrl("");
    }
  };

  Blockly.Blocks.pyqt5_Slider_setfont= {
    init: function() {
    this.appendDummyInput()
        .appendField("设置组件")
        .appendField(new Blockly.FieldTextInput("slider"), "NAME");
    this.appendDummyInput()
        .appendField(" 字体为")
        .appendField(new Blockly.FieldDropdown([["Arial","FONT1"],["黑体","FONT2"]]), "FONT");
    this.appendValueInput("SIZE")
        .setCheck(null)
        .appendField(" 字体大小");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('GUI_blocks');
    this.setTooltip("设置组件位置与宽高");
    this.setHelpUrl("");
    }
  };

  Blockly.Blocks.pyqt5_label_setText= {
    init: function() {
    this.appendDummyInput()
        .appendField("设置组件 ")
        .appendField(new Blockly.FieldTextInput("label"), "NAME");
    this.appendValueInput("TEXT")
        .setCheck(String)
        .appendField(" 内容为 ");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('GUI_blocks');
    this.setTooltip("设置Label的内容");
    this.setHelpUrl("");
    }
  };

  Blockly.Blocks.pyqt5_Slider_valueChanged= {
    init: function() {
    this.appendDummyInput()
        .appendField("当滑块组件 ")
        .appendField(new Blockly.FieldTextInput("slider"), "NAME")
        .appendField(" 的值改变时运行 ");
    this.appendValueInput("FUN")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('GUI_blocks');
    this.setTooltip("创建信号，当滑块值改变时运行函数");
    this.setHelpUrl("");
    }
  };

  Blockly.Blocks.pyqt5_main_move = {
    init: function() {
    this.appendDummyInput()
        .appendField("移动窗口到");
    this.appendValueInput("X")
        .setCheck(Number)
        .appendField(" x ");
    this.appendValueInput("Y")
        .setCheck(Number)
        .appendField(" y ");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('GUI_blocks');
    this.setTooltip("移动窗口到屏幕指定位置");
    this.setHelpUrl("");
    }
  };

  Blockly.Blocks['procedures_callnoreturns'] = {
    /**
     * Block for calling a procedure with no return value.
     * @this {Blockly.Block}
     */
    init: function() {
      this.appendDummyInput('TOPROW')
          .appendField('', 'NAME');
      this.setOutput(true, null);
      this.setStyle('procedure_blocks');
      // Tooltip is set in renameProcedure.
      this.setHelpUrl(Blockly.Msg['PROCEDURES_CALLNORETURN_HELPURL']);
      this.arguments_ = [];
      this.argumentVarModels_ = [];
      this.quarkConnections_ = {};
      this.quarkIds_ = null;
      this.previousEnabledState_ = true;
    },
     
   /**
    * Returns the name of the procedure this block calls.
    * @return {string} Procedure name.
    * @this {Blockly.Block}
    */
   getProcedureCall: function() {
    // The NAME field is guaranteed to exist, null will never be returned.
    return /** @type {string} */ (this.getFieldValue('NAME'));
  },
  /**
   * Notification that a procedure is renaming.
   * If the name matches this block's procedure, rename it.
   * @param {string} oldName Previous name of procedure.
   * @param {string} newName Renamed procedure.
   * @this {Blockly.Block}
   */
  renameProcedure: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getProcedureCall())) {
      this.setFieldValue(newName, 'NAME');
      var baseMsg = this.outputConnection ?
          Blockly.Msg['PROCEDURES_CALLRETURN_TOOLTIP'] :
          Blockly.Msg['PROCEDURES_CALLNORETURN_TOOLTIP'];
      this.setTooltip(baseMsg.replace('%1', newName));
    }
  },
  /**
   * Notification that the procedure's parameters have changed.
   * @param {!Array<string>} paramNames New param names, e.g. ['x', 'y', 'z'].
   * @param {!Array<string>} paramIds IDs of params (consistent for each
   *     parameter through the life of a mutator, regardless of param renaming),
   *     e.g. ['piua', 'f8b_', 'oi.o'].
   * @private
   * @this {Blockly.Block}
   */
  setProcedureParameters_: function(paramNames, paramIds) {
    // Data structures:
    // this.arguments = ['x', 'y']
    //     Existing param names.
    // this.quarkConnections_ {piua: null, f8b_: Blockly.Connection}
    //     Look-up of paramIds to connections plugged into the call block.
    // this.quarkIds_ = ['piua', 'f8b_']
    //     Existing param IDs.
    // Note that quarkConnections_ may include IDs that no longer exist, but
    // which might reappear if a param is reattached in the mutator.
    var defBlock = Blockly.Procedures.getDefinition(this.getProcedureCall(),
        this.workspace);
    var mutatorOpen = defBlock && defBlock.mutator &&
        defBlock.mutator.isVisible();
    if (!mutatorOpen) {
      this.quarkConnections_ = {};
      this.quarkIds_ = null;
    }
    if (!paramIds) {
      // Reset the quarks (a mutator is about to open).
      return;
    }
    // Test arguments (arrays of strings) for changes. '\n' is not a valid
    // argument name character, so it is a valid delimiter here.
    if (paramNames.join('\n') == this.arguments_.join('\n')) {
      // No change.
      this.quarkIds_ = paramIds;
      return;
    }
    if (paramIds.length != paramNames.length) {
      throw RangeError('paramNames and paramIds must be the same length.');
    }
    this.setCollapsed(false);
    if (!this.quarkIds_) {
      // Initialize tracking for this block.
      this.quarkConnections_ = {};
      this.quarkIds_ = [];
    }
    // Switch off rendering while the block is rebuilt.
    var savedRendered = this.rendered;
    this.rendered = false;
    // Update the quarkConnections_ with existing connections.
    for (var i = 0; i < this.arguments_.length; i++) {
      var input = this.getInput('ARG' + i);
      if (input) {
        var connection = input.connection.targetConnection;
        this.quarkConnections_[this.quarkIds_[i]] = connection;
        if (mutatorOpen && connection &&
            paramIds.indexOf(this.quarkIds_[i]) == -1) {
          // This connection should no longer be attached to this block.
          connection.disconnect();
          connection.getSourceBlock().bumpNeighbours();
        }
      }
    }
    // Rebuild the block's arguments.
    this.arguments_ = [].concat(paramNames);
    // And rebuild the argument model list.
    this.argumentVarModels_ = [];
    for (var i = 0; i < this.arguments_.length; i++) {
      var variable = Blockly.Variables.getOrCreateVariablePackage(
          this.workspace, null, this.arguments_[i], '');
      this.argumentVarModels_.push(variable);
    }

    this.updateShape_();
    this.quarkIds_ = paramIds;
    // Reconnect any child blocks.
    if (this.quarkIds_) {
      for (var i = 0; i < this.arguments_.length; i++) {
        var quarkId = this.quarkIds_[i];
        if (quarkId in this.quarkConnections_) {
          var connection = this.quarkConnections_[quarkId];
          if (!Blockly.Mutator.reconnect(connection, this, 'ARG' + i)) {
            // Block no longer exists or has been attached elsewhere.
            delete this.quarkConnections_[quarkId];
          }
        }
      }
    }
    // Restore rendering and show the changes.
    this.rendered = savedRendered;
    if (this.rendered) {
      this.render();
    }
  },
  /**
   * Modify this block to have the correct number of arguments.
   * @private
   * @this {Blockly.Block}
   */
  updateShape_: function() {
    for (var i = 0; i < this.arguments_.length; i++) {
      var field = this.getField('ARGNAME' + i);
      if (field) {
        // Ensure argument name is up to date.
        // The argument name field is deterministic based on the mutation,
        // no need to fire a change event.
        Blockly.Events.disable();
        try {
          field.setValue(this.arguments_[i]);
        } finally {
          Blockly.Events.enable();
        }
      } else {
        // Add new input.
        field = new Blockly.FieldLabel(this.arguments_[i]);
        var input = this.appendValueInput('ARG' + i)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(field, 'ARGNAME' + i);
        input.init();
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }
    // Add 'with:' if there are parameters, remove otherwise.
    var topRow = this.getInput('TOPROW');
    if (topRow) {
      if (this.arguments_.length) {
        if (!this.getField('WITH')) {
          topRow.appendField(Blockly.Msg['PROCEDURES_CALL_BEFORE_PARAMS'], 'WITH');
          topRow.init();
        }
      } else {
        if (this.getField('WITH')) {
          topRow.removeField('WITH');
        }
      }
    }
  },
  /**
   * Create XML to represent the (non-editable) name and arguments.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('name', this.getProcedureCall());
    for (var i = 0; i < this.arguments_.length; i++) {
      var parameter = Blockly.utils.xml.createElement('arg');
      parameter.setAttribute('name', this.arguments_[i]);
      container.appendChild(parameter);
    }
    return container;
  },
  /**
   * Parse XML to restore the (non-editable) name and parameters.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {
    var name = xmlElement.getAttribute('name');
    this.renameProcedure(this.getProcedureCall(), name);
    var args = [];
    var paramIds = [];
    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'arg') {
        args.push(childNode.getAttribute('name'));
        paramIds.push(childNode.getAttribute('paramId'));
      }
    }
    this.setProcedureParameters_(args, paramIds);
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
   * Procedure calls cannot exist without the corresponding procedure
   * definition.  Enforce this link whenever an event is fired.
   * @param {!Blockly.Events.Abstract} event Change event.
   * @this {Blockly.Block}
   */
  onchange: function(event) {
    if (!this.workspace || this.workspace.isFlyout) {
      // Block is deleted or is in a flyout.
      return;
    }
    if (!event.recordUndo) {
      // Events not generated by user. Skip handling.
      return;
    }
  },
  /**
   * Add menu option to find the definition block for this call.
   * @param {!Array} options List of menu options to add to.
   * @this {Blockly.Block}
   */
  customContextMenu: function(options) {
    if (!this.workspace.isMovable()) {
      // If we center on the block and the workspace isn't movable we could
      // loose blocks at the edges of the workspace.
      return;
    }

    var option = {enabled: true};
    option.text = Blockly.Msg['PROCEDURES_HIGHLIGHT_DEF'];
    var name = this.getProcedureCall();
    var workspace = this.workspace;
    option.callback = function() {
      var def = Blockly.Procedures.getDefinition(name, workspace);
      if (def) {
        workspace.centerOnBlock(def.id);
        def.select();
      }
    };
    options.push(option);
  },
  defType_: 'procedures_defnoreturns'
};

Blockly.Blocks.pyqt5_quit= {
  init: function() {
  this.appendDummyInput()
      .appendField("关闭窗口");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("关闭所有窗口");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_QPushButton= {
  init: function() {
  this.appendDummyInput()
      .appendField("创建按钮组件 ")
      .appendField(new Blockly.FieldTextInput("button"), "NAME");
  this.appendValueInput("TEXT")
      .setCheck(null)
      .appendField("  按钮文本");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("创建按钮组件");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_btn_setText= {
  init: function() {
  this.appendDummyInput()
      .appendField("设置组件 ")
      .appendField(new Blockly.FieldTextInput("button"), "NAME");
  this.appendValueInput("TEXT")
      .setCheck(String)
      .appendField(" 内容为 ");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("设置按钮上显示的内容");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_btn_setfont= {
  init: function() {
  this.appendDummyInput()
      .appendField("设置组件")
      .appendField(new Blockly.FieldTextInput("button"), "NAME");
  this.appendDummyInput()
      .appendField(" 字体为")
      .appendField(new Blockly.FieldDropdown([["Arial","FONT1"],["黑体","FONT2"]]), "FONT");
  this.appendValueInput("SIZE")
      .setCheck(null)
      .appendField(" 字体大小");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("设置组件位置与宽高");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_btn_setxywh= {
  init: function() {
  this.appendDummyInput()
      .appendField("设置组件")
      .appendField(new Blockly.FieldTextInput("button"), "NAME");
  this.appendValueInput("X")
      .setCheck(Number)
      .appendField(" 位置  X");
  this.appendValueInput("Y")
      .setCheck(Number)
      .appendField(" 位置  Y");
  this.appendValueInput("W")
      .setCheck(Number)
      .appendField(" 宽");
  this.appendValueInput("H")
      .setCheck(Number)
      .appendField(" 高");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("设置组件位置与宽高");
  this.setHelpUrl("");
  }
};


Blockly.Blocks.pyqt5_btn_setCheckable= {
  init: function() {
  this.appendDummyInput()
      .appendField("当按钮组件 ")
      .appendField(new Blockly.FieldTextInput("button"), "NAME")
      .appendField(" 被点击时 运行 ");
  this.appendValueInput("FUN")
      .setCheck(null);
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("创建信号，当按钮被点击时运行函数");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_QPushButton_Enabled= {
  init: function() {
  this.appendDummyInput()
      .appendField("设置组件 ")
      .appendField(new Blockly.FieldTextInput("button"), "NAME")
      .appendField(new Blockly.FieldDropdown([["启用","TRUE"],["停用","FALSE"]]), "TYPE");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("设置组件是否可用");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_label_Enabled= {
  init: function() {
  this.appendDummyInput()
      .appendField("设置组件 ")
      .appendField(new Blockly.FieldTextInput("label"), "NAME")
      .appendField(new Blockly.FieldDropdown([["启用","TRUE"],["停用","FALSE"]]), "TYPE");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("设置组件是否可用");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_Slider_Enabled= {
  init: function() {
  this.appendDummyInput()
      .appendField("设置组件 ")
      .appendField(new Blockly.FieldTextInput("slider"), "NAME")
      .appendField(new Blockly.FieldDropdown([["启用","TRUE"],["停用","FALSE"]]), "TYPE");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("设置组件是否可用");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_lineEdit= {
  init: function() {
  this.appendDummyInput()
      .appendField("创建单行文本框组件 ")
      .appendField(new Blockly.FieldTextInput("lineEdit"), "NAME");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("创建单行文本框组件");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_lineEdit_setText= {
  init: function() {
  this.appendDummyInput()
      .appendField("设置单行文本框组件 ")
      .appendField(new Blockly.FieldTextInput("lineEdit"), "NAME");
  this.appendValueInput("TEXT")
      .setCheck(String)
      .appendField(" 内容为 ");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("设置单行文本框中的内容");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_lineEdit_setfont= {
  init: function() {
  this.appendDummyInput()
      .appendField("设置组件")
      .appendField(new Blockly.FieldTextInput("lineEdit"), "NAME");
  this.appendDummyInput()
      .appendField(" 字体为")
      .appendField(new Blockly.FieldDropdown([["Arial","FONT1"],["黑体","FONT2"]]), "FONT");
  this.appendValueInput("SIZE")
      .setCheck(null)
      .appendField(" 字体大小");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("设置组件字体大小");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_lineEdit_setxywh= {
  init: function() {
  this.appendDummyInput()
      .appendField("设置组件")
      .appendField(new Blockly.FieldTextInput("lineEdit"), "NAME");
  this.appendValueInput("X")
      .setCheck(Number)
      .appendField(" 位置  X");
  this.appendValueInput("Y")
      .setCheck(Number)
      .appendField(" 位置  Y");
  this.appendValueInput("W")
      .setCheck(Number)
      .appendField(" 宽");
  this.appendValueInput("H")
      .setCheck(Number)
      .appendField(" 高");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("设置组件位置与宽高");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_lineEdit_text= {
  init: function() {
  this.appendDummyInput()
      .appendField("单行文本框组件 ")
      .appendField(new Blockly.FieldTextInput("lineEdit"), "NAME")
      .appendField(" 内容");
  this.setInputsInline(true);
  this.setOutput(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("获取单行文本框内容 ");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_lineEdit_textChanged= {
  init: function() {
  this.appendDummyInput()
      .appendField("当单行文本框组件 ")
      .appendField(new Blockly.FieldTextInput("lineEdit"), "NAME")
      .appendField(" 内容修改时 运行 ");
  this.appendValueInput("FUN")
      .setCheck(null);
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("创建信号，当文本框内容修改时运行函数");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_lineEdit_Enabled= {
  init: function() {
  this.appendDummyInput()
      .appendField("设置组件 ")
      .appendField(new Blockly.FieldTextInput("lineEdit"), "NAME")
      .appendField(new Blockly.FieldDropdown([["启用","TRUE"],["停用","FALSE"]]), "TYPE");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("设置组件是否可用");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_lineEdit_readonly= {
  init: function() {
  this.appendDummyInput()
      .appendField("设置组件 ")
      .appendField(new Blockly.FieldTextInput("lineEdit"), "NAME")
      .appendField(new Blockly.FieldDropdown([["可编辑","FALSE"],["不可编辑","TRUE"]]), "TYPE");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("设置组件能否编辑");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_PlainTextEdit_init= {
  init: function() {
  this.appendDummyInput()
      .appendField("创建多行文本框组件 ")
      .appendField(new Blockly.FieldTextInput("plainTextEdit"), "NAME");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("创建多行文本框组件");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_plainTextEdit_setText= {
  init: function() {
  this.appendDummyInput()
      .appendField("设置多行文本框组件 ")
      .appendField(new Blockly.FieldTextInput("plainTextEdit"), "NAME");
  this.appendValueInput("TEXT")
      .setCheck(String)
      .appendField(" 内容为 ");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("设置多行文本框中的内容");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_plainTextEdit_addText= {
  init: function() {
  this.appendDummyInput()
      .appendField("多行文本框组件 ")
      .appendField(new Blockly.FieldTextInput("plainTextEdit"), "NAME");
  this.appendValueInput("TEXT")
      .setCheck(String)
      .appendField(" 追加内容 ");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("追加多行文本框中的内容");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_plainTextEdit_text= {
  init: function() {
  this.appendDummyInput()
      .appendField("多行文本框组件 ")
      .appendField(new Blockly.FieldTextInput("plainTextEdit"), "NAME")
      .appendField(" 内容");
  this.setInputsInline(true);
  this.setOutput(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("获取多行文本框内容 ");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_progressBar_init= {
  init: function() {
  this.appendDummyInput()
      .appendField("创建进度条组件 ")
      .appendField(new Blockly.FieldTextInput("progressBar"), "NAME");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("创建进度条组件");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_progressBar_set_value= {
  init: function() {
  this.appendDummyInput()
      .appendField(" 设置进度条 ")
      .appendField(new Blockly.FieldTextInput("progressBar"), "NAME")
      .appendField("的值为 ");
  this.appendValueInput("VALUE")
      .setCheck(Number);
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("设置进度条的值");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_progressBar_set_maxminvalue= {
  init: function() {
  this.appendDummyInput()
      .appendField(" 设置进度条 ")
      .appendField(new Blockly.FieldTextInput("progressBar"), "NAME");
  this.appendValueInput("MIN")
      .setCheck(Number)
      .appendField(" 最小值为");
  this.appendValueInput("MAX")
      .setCheck(Number)
      .appendField(" 最大值为");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("设置进度条的最大最小值");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_progressBar_set_Orientation= {
  init: function() {
  this.appendDummyInput()
      .appendField(" 进度条组件 ")
      .appendField(new Blockly.FieldTextInput("progressBar"), "NAME")
      .appendField("模式")
      .appendField(new Blockly.FieldDropdown([["水平模式","V"],["垂直模式","H"]]), "VAR");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("设置进度条的水平/垂直模式");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_PlainTextEdit_init= {
  init: function() {
  this.appendDummyInput()
      .appendField("创建定时器组件 ")
      .appendField(new Blockly.FieldTextInput("plainTextEdit"), "NAME");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("创建多行文本框组件");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_timer_init= {
  init: function() {
  this.appendDummyInput()
      .appendField(" 创建定时器组件 ")
      .appendField(new Blockly.FieldTextInput("timer"), "NAME");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("创建定时器组件");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_timer_timeout= {
  init: function() {
  this.appendDummyInput()
      .appendField("定时器 ")
      .appendField(new Blockly.FieldTextInput("timer"), "NAME")
      .appendField(" 每次运行 调用");
  this.appendValueInput("FUN")
      .setCheck(null);
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("创建信号，定时器每次运行时就调用函数");
  this.setHelpUrl("");
  }
};

Blockly.Blocks.pyqt5_timer_start= {
  init: function() {
  this.appendDummyInput()
      .appendField("启动定时器 ")
      .appendField(new Blockly.FieldTextInput("timer"), "NAME")
      .appendField("  间隔时间 ");
  this.appendValueInput("TIME")
      .setCheck(Number);
  this.appendDummyInput()
      .appendField("Ms")
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setStyle('GUI_blocks');
  this.setTooltip("启动定时器");
  this.setHelpUrl("");
  }
};
