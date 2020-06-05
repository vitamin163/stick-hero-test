cc.Class({
    extends: cc.Component,

    properties: {},

    //onLoad() {},

    //start() {},

    update(dt) {
        if (this.game.touchStart) {
            this.node.height += 2;
        }
    },
});

