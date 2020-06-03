
cc.Class({
    extends: cc.Component,

    properties: {
        newGroundPrefab: {
            default: null,
            type: cc.Prefab
        },

        redPointPrefab: {
            default: null,
            type: cc.Prefab
        },

        stickPrefab: {
            default: null,
            type: cc.Prefab
        },

        ground: {
            default: null,
            type: cc.Node
        },

        player: {
            default: null,
            type: cc.Node
        },
        correctDestination: 'none',
        isMoving: false,
        touchStart: false,
        touchEnd: false,
        collision: false,
        stick: null,
        newGround: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log(this.node)
        this.stick = this.spawnStick();
        this.newGroundWidth = this.newGroundPrefab.data.width;
        this.newGround = this.spawnNewGround();
        //const manager = cc.director.getCollisionManager(); //убрать столкновение
        //manager.enabled = true;
        //manager.enabledDebugDraw = true;
        //manager.enabledDrawBoundingBox = true;
        this.player.getComponent('Player').game = this;

        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },

    onTouchStart() {
        this.touchStart = true;
        this.touchEnd = false;
    },


    onTouchEnd() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.touchStart = false;
        this.touchEnd = true;
        if (this.calculateCollision()) {
            this.successAction()
        }

    },

    calculateCollision() {
        const startCollisionPoint = this.newGround.x - this.newGround.width / 2;
        const endCollisionPoint = this.newGround.x + this.newGround.width / 2;
        const destination = this.stick.x + this.stick.height;
        return destination >= startCollisionPoint && destination <= endCollisionPoint;
    },

    rotationStick() {

        //const action = cc.rotateTo(0.5, 90.0);
        //this.stick.runAction(action);
        //cc.tween(this.stick).to(1, { rotation: 90 }).start()
    },

    moveHero(destination) {
        //const action = cc.speed(cc.moveTo(2, cc.v2(destination, this.stick.y)), 2);
        //this.player.runAction(action);
        //cc.tween(this.player).to(1, { position: cc.v2(destination, this.stick.y) }).start()
    },

    successAction() {
        //this.rotationStick();
        //this.moveHero(this.correctDestination);
        cc.tween(this.stick)
            .to(1, { rotation: 90 })
            // This callback function is not called until the preceding action has been performed
            .call(() => { cc.tween(this.player).to(1, { position: cc.v2(this.correctDestination, this.stick.y) }).start() })
            .start()
        this.onLoad();
    },

    randomInteger(min, max) {
        const rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    },

    spawnRedPoint() {
        return cc.instantiate(this.redPointPrefab);
    },

    spawnStick() {
        const newStick = cc.instantiate(this.stickPrefab);
        this.node.addChild(newStick);
        newStick.anchorY = 0;
        newStick.height = 0;
        newStick.width = 6;
        newStick.y = this.ground.y + this.ground.height / 2;
        newStick.x = -this.node.width / 2 + this.ground.width;
        newStick.getComponent('Stick').game = this;
        return newStick;
    },

    spawnNewGround() {
        const newGround = cc.instantiate(this.newGroundPrefab);
        this.node.addChild(newGround);
        const newRedPoint = this.spawnRedPoint();
        newGround.addChild(newRedPoint);
        newRedPoint.y = this.ground.height / 2 - newRedPoint.height / 2;
        const minWidthNewGround = 30;
        const maxWidthNewGround = this.ground.width;
        newGround.width = this.randomInteger(minWidthNewGround, maxWidthNewGround);
        newGround.setPosition(this.getNewGroundPosition());
        this.correctDestination = (newGround.x + newGround.width / 2) - 20;
        return newGround;
        //newGround.getComponent(cc.BoxCollider).size.width = newGround.width;
    },


    getNewGroundPosition() {
        const groundY = this.ground.y;
        const minX = -(this.node.width / 2) + this.ground.width + (this.newGroundWidth / 2) + 5;
        const maxX = (this.node.width / 2) - (this.newGroundWidth / 2);
        const randX = this.randomInteger(minX, maxX);
        return cc.v2(randX, groundY);
    },



    start() {

    },

    update(dt) {

    },
});
