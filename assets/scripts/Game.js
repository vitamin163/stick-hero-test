
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

    spawnNewGround() {
        const newGround = cc.instantiate(this.newGroundPrefab);
        this.node.addChild(newGround);
        newGround.setPosition(this.getNewGroundPosition());
    },

    randomInteger(min, max) {
        const rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
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
