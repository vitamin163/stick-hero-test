cc.Class({
    extends: cc.Component,

    properties: {
        stick: null,
        scene: null,
        height: 0,
    },



    onLoad() {
        this.stick = this.node;
        this.scene = this.node.parent;
        this.scene.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.scene.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },

    onCollisionEnter(other, self) {
        this.game.isMoving = true;
        this.game.collision = true;
    },


    onDestroy() {
        this.scene.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.scene.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },

    onTouchStart() {
        this.game.touchStart = true;
        this.game.touchEnd = false;
    },

    onTouchEnd() {
        this.game.touchStart = false;
        this.game.touchEnd = true;
    },

    rotationStick() {
        this.scene.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.stick.angle -= 5;

    },

    setOffsetCollider() {
        this.stick.getComponent(cc.BoxCollider).offset.y = this.height;
    },

    //start() {},

    update(dt) {
        if (this.game.touchStart) {
            this.height += 5;
            this.stick.height = this.height;
            this.setOffsetCollider();
        } else if (this.game.touchEnd && this.stick.angle !== -90) {
            this.rotationStick();
        }
    },
});

