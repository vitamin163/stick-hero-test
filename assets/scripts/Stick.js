cc.Class({
    extends: cc.Component,

    properties: {
        touchStart: false,
        touchEnd: false,
        stick: null,
        scene: null,
        height: 0,
    },

    // LIFE-CYCLE CALLBACKS:


    onLoad() {
        this.stick = this.node;
        this.scene = this.node.parent;
        this.scene.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.scene.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },

    onCollisionEnter(other, self) {
        console.log("Currently colliding");
    },

    onCollisionExit(other, self) {
        console.log("Done colliding");
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
        this.setOffsetCollider();
    },

    rotationStick() {
        this.scene.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.stick.angle -= 1;
    },

    setOffsetCollider() {
        this.stick.getComponent(cc.BoxCollider).offset.y = this.height;
    },

    //start() {   },

    update(dt) {
        if (this.touchStart) {
            this.height += 1;
            this.stick.height = this.height;
        } else if (this.touchEnd && this.stick.angle !== -90) {
            this.rotationStick();
        }
    },
});
