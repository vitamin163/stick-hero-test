cc.Class({
    extends: cc.Component,

    properties: {
        jumpHeight: 0,

        jumpDuration: 0,

        maxMoveSpeed: 0,

        accel: 0,

        jumpAudio: {
            default: null,
            type: cc.AudioClip
        },
        destination: "none",
    },


    onLoad: function () {

    },

    movePlayer() {
        this.node.x += 4;
    },

    //onDestroy() {},

    /*update: function (dt) {
        this.destination = this.game.destination - 4;
        if (this.game.isMoving) {
            this.movePlayer();
        }
        if (this.node.x >= this.destination) {
            this.game.isMoving = false;
        }

    } */
});