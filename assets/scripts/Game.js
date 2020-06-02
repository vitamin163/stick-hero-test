
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
        destination: 'none',
        isMoving: false,
        touchStart: false,
        touchEnd: false,
        collision: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.newGroundWidth = this.newGroundPrefab.data.width;
        this.spawnNewGround();
        this.spawnStick();
        const manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
        this.player.getComponent('Player').game = this;
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
        this.destination = (newGround.x + newGround.width / 2) - 20;
        newGround.getComponent(cc.BoxCollider).size.width = newGround.width;
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
