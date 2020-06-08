/* eslint-disable no-undef */
cc.Class({
  extends: cc.Component,

  properties: {},

  update() {
    if (this.game.touchStart) {
      this.node.height += 2;
    }
  },
});
