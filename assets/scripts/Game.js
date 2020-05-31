
cc.Class({
    extends: cc.Component,

    properties: {
        newGroundPrefab: {
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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.newGroundWidth = this.newGroundPrefab.data.width;
        this.spawnNewGround();
    },

    randomInteger(min, max) {
        const rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    },

    spawnNewGround() {
        const newGround = cc.instantiate(this.newGroundPrefab);
        this.node.addChild(newGround);
        const minWidthNewGround = 30;
        const maxWidthNewGround = this.ground.width;
        newGround.width = this.randomInteger(minWidthNewGround, maxWidthNewGround);
        newGround.setPosition(this.getNewGroundPosition());
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

    // update (dt) {},
});
