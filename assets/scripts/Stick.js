cc.Class({
    extends: cc.Component,

    properties: {
        touchStart: false,
        touchEnd: false,
        stick: null,
        scene: null,
        rotation: 0,
    },

    // LIFE-CYCLE CALLBACKS:


    onLoad() {
        this.stick = this.node;
        this.scene = this.node.parent;
        this.scene.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.scene.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },

    onDestroy() {
        this.scene.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.scene.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },

    onTouchStart() {
        this.touchStart = true;
        this.touchEnd = false;
    },

    onTouchEnd() {
        this.touchStart = false;
        this.touchEnd = true;
    },

    rotationStick() {
        if (this.stick.rotation !== 90) {
            this.stick.rotation += 1;
        }
    },

    start() {

    },

    update(dt) {
        if (this.touchStart) {
            this.stick.height += 3;
        } else if (this.touchEnd) {
            this.rotationStick();
        }
    },
});
