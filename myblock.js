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
  },
  {
    "type": "banzai",
    "message0": "%1",
    "args0": [
      {
        "type": "field_image",
        "src": "https://2.bp.blogspot.com/-C_ZLBrSz3B0/Uvy5z1KOCJI/AAAAAAAAdqE/Jtqur1Qwd6o/s800/banzai_boy.png",
        "width": 100,
        "height": 100,
        "alt": "*",
        "flipRtl": false
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },]
)

Blockly.JavaScript['hand_goo'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'グー,';
  
  return code;
};

Blockly.JavaScript['hand_pa'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'パー,';

  return code;
};

Blockly.JavaScript['hand_choki'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'チョキ,';
  return code;
};

Blockly.JavaScript['banzai'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};