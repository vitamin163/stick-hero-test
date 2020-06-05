
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

cc.Class({
  "extends": cc.Component,
  properties: {},
  //onLoad() {},
  //start() {},
  update: function update(dt) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcU3RpY2suanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ1cGRhdGUiLCJkdCIsImdhbWUiLCJ0b3VjaFN0YXJ0Iiwibm9kZSIsImhlaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLEVBSFA7QUFLTDtBQUVBO0FBRUFDLEVBQUFBLE1BVEssa0JBU0VDLEVBVEYsRUFTTTtBQUNQLFFBQUksS0FBS0MsSUFBTCxDQUFVQyxVQUFkLEVBQTBCO0FBQ3RCLFdBQUtDLElBQUwsQ0FBVUMsTUFBVixJQUFvQixDQUFwQjtBQUNIO0FBQ0o7QUFiSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge30sXHJcblxyXG4gICAgLy9vbkxvYWQoKSB7fSxcclxuXHJcbiAgICAvL3N0YXJ0KCkge30sXHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS50b3VjaFN0YXJ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5oZWlnaHQgKz0gMjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbiJdfQ==