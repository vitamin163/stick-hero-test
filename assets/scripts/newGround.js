cc.Class({
    extends: cc.Component,

    properties: {
        // When the distance between the star and main character is less than this value, collection of the point will be completed

    },


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.setWidthCollider();
    },

    setWidthCollider() {
        this.node.getComponent(cc.BoxCollider).size.width = this.node.width;
    },

    start() {

    },

    //update(dt) {},
});
