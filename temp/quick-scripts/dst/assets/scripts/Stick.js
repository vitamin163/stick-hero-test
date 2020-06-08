
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Stick.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '03da5Xx6MVJlK0uxE4IDTb0', 'Stick');
// scripts/Stick.js

"use strict";

/* eslint-disable no-undef */
cc.Class({
  "extends": cc.Component,
  properties: {},
  update: function update() {
    if (this.game.touchStart) {
      this.node.height += 2;
    }
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcU3RpY2suanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ1cGRhdGUiLCJnYW1lIiwidG91Y2hTdGFydCIsIm5vZGUiLCJoZWlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDUCxhQUFTRCxFQUFFLENBQUNFLFNBREw7QUFHUEMsRUFBQUEsVUFBVSxFQUFFLEVBSEw7QUFLUEMsRUFBQUEsTUFMTyxvQkFLRTtBQUNQLFFBQUksS0FBS0MsSUFBTCxDQUFVQyxVQUFkLEVBQTBCO0FBQ3hCLFdBQUtDLElBQUwsQ0FBVUMsTUFBVixJQUFvQixDQUFwQjtBQUNEO0FBQ0Y7QUFUTSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuY2MuQ2xhc3Moe1xuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgcHJvcGVydGllczoge30sXG5cbiAgdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLmdhbWUudG91Y2hTdGFydCkge1xuICAgICAgdGhpcy5ub2RlLmhlaWdodCArPSAyO1xuICAgIH1cbiAgfSxcbn0pO1xuIl19