cc.Class({
    extends: cc.Component,

    properties: {

    },

    //onLoad() {

    //},

    //onCollisionEnter(other, self) {
    //this.game.isMoving = true;
    //this.game.collision = true;
    //console.log('colission')
    //},



    //setOffsetCollider() {
    ///this.getComponent(cc.BoxCollider).offset.y = this.node.height;
    //},

    //start() {},

    update(dt) {

        if (this.game.touchStart) {
            this.node.height += 2;
            //this.setOffsetCollider();
        }
    },
});

