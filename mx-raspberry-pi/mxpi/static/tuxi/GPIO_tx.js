
var pin =  [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["26", "26"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"], ["37", "37"], ["38", "38"], ["39", "39"], ["40", "40"]];

Blockly.Blocks['pins'] = {
    init: function() {
     this.setColour(90);
     this.appendDummyInput("")
     .appendField(new Blockly.FieldDropdown(pin), 'PIN');
     this.setOutput(true, Number);
   }
   };

Blockly.Blocks['inout_highlow'] = {
init: function() {
    this.setColour(90);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown([['高', "HIGH"], ['低', "LOW"]]), 'BOOL')
    this.setOutput(true, Boolean);
    this.setTooltip();
}
};

Blockly.Blocks['GPIO_model'] = {
    /**
     * @this Blockly.Block
     */
     init: function() {
        this.appendDummyInput()
            .appendField("设置引脚编码方式为 ")
            .appendField(new Blockly.FieldDropdown([["BOARD","BOARD"],["BCM","BCM"]]), "MODEL")
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('GPIO_blocks');
        this.setTooltip("设置引脚编号方式");
        this.setHelpUrl("");
        }
  };

  Blockly.Blocks['GPIO_getmode'] = {
    /**
     * @this Blockly.Block
     */
     init: function() {
        this.appendDummyInput()
            .appendField("当前引脚编号方式");
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setStyle('GPIO_blocks');
        this.setTooltip("获取当前引脚编号方式");
        this.setHelpUrl("");
        }
  };

  Blockly.Blocks['GPIO_setup'] = {
    /**
     * @this Blockly.Block
     */
     init: function() {
        this.appendValueInput("PIN", Number)
            .appendField("引脚 #")
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(" 设为 ")
            .appendField(new Blockly.FieldDropdown([['输入','IN'],['输出','OUT']]),'MODEL');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('GPIO_blocks');
        this.setTooltip("设置引脚为输入/输出模式");
        this.setHelpUrl("");
        }
  };

  Blockly.Blocks['GPIO_out'] = {
    /**
     * @this Blockly.Block
     */
     init: function() {
        this.appendValueInput("PIN",Number)
            .setCheck(Number)
            .appendField("输出 引脚 #");
        this.appendValueInput('STAT')
            .setCheck(null)
            .appendField("赋值为")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('GPIO_blocks');
        this.setTooltip("设置引脚为输入/输出模式");
        this.setHelpUrl("");
        }
  };

  Blockly.Blocks['GPIO_in'] = {
    /**
     * @this Blockly.Block
     */
     init: function() {
        this.appendValueInput("PIN",Number)
            .setCheck(Number)
            .appendField("数字输入 引脚 #");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setStyle('GPIO_blocks');
        this.setTooltip("读取数字引脚的值");
        this.setHelpUrl("");
        }
  };

  

