"use strict";
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