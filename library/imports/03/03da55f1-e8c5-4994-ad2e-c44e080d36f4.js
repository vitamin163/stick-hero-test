"use strict";
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