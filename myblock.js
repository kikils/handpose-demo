Blockly.defineBlocksWithJsonArray(
  [{
    "type": "hand_goo",
    "message0": "グーを出す",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "hand_pa",
    "message0": "パーを出す",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "hand_choki",
    "message0": "チョキを出す",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  }]
)

Blockly.JavaScript['hand_goo'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'console.log("グー");document.getElementById("blocky-outtext").textContent = document.getElementById("blocky-outtext").value + "グー";\n';
  
  return code;
};

Blockly.JavaScript['hand_pa'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'console.log("パー");document.getElementById("blocky-outtext").textContent = document.getElementById("blocky-outtext").value + "パー";\n';

  return code;
};

Blockly.JavaScript['hand_choki'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'console.log("チョキ");document.getElementById("blocky-outtext").textContent = document.getElementById("blocky-outtext").value + "チョキ";\n';
  return code;
};