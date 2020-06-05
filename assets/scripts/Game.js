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
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        gameoverDisplay: {
            default: null,
            type: cc.Label
        },
        perfectDisplay: {
            default: null,
            type: cc.Label
        },
        playerDestination: 'none',
        isMoving: false,
        touchStart: false,
        touchEnd: false,
        collision: false,
        stick: null,
        newGround: null,
        beyond: -500,
        startPosition: -300,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.gameoverDisplay.enabled = false;
        this.perfectDisplay.enabled = false;
        this.stick = this.spawnStick();
        this.newGround = this.spawnNewGround();
        this.score = 0;
    },

    onEnable() {
        this.node.once(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.once(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },


    onTouchStart() {
        this.touchStart = true;
        this.touchEnd = false;
    },


    onTouchEnd() {
        this.touchStart = false;
        this.touchEnd = true;
        if (this.calculateCollision()) {
            this.successAction();
        } else {
            this.failAction();
        }

    },

    setScore: function () {
        this.scoreDisplay.string = 'Score: ' + this.score;
    },

    calculateCollision() {
        const startCollisionPoint = this.newGround.x - this.newGround.width / 2;
        const endCollisionPoint = this.newGround.x + this.newGround.width / 2;
        const startCollisionRedPoint = this.newGround.x - this.redPointPrefab.data.width / 2;
        const endCollisionRedPoint = this.newGround.x + this.redPointPrefab.data.width / 2
        const destination = this.stick.x + this.stick.height;
        const isCollision = destination >= startCollisionPoint && destination <= endCollisionPoint;
        const isPerfect = destination >= startCollisionRedPoint && destination <= endCollisionRedPoint;
        if (isCollision && !isPerfect) {
            this.score += 1;
        } else if (isPerfect) {
            this.score += 2;
            this.perfect = true;
        }
        return isCollision;
    },

    getTime(distance, speed = 500) {
        return distance / speed;
    },

    successAction() {
        const playerMoveTime = this.getTime(this.playerDestination - this.player.x);
        const stickComebackTime = this.getTime((this.newGround.x - this.stick.x) + this.newGround.width / 2);
        const comebackTime = this.getTime(this.newGround.x - this.startPosition);
        cc.tween(this.stick).delay(0.3).to(0.4, { angle: -90 })
            .call(() => {
                this.perfectDisplay.enabled = this.perfect;
                cc.tween(this.player).to(playerMoveTime, { position: cc.v2(this.playerDestination, this.stick.y) })
                    .call(() => {
                        this.perfect = false;
                        this.perfectDisplay.enabled = false;
                        cc.tween(this.newGround)
                            .to(comebackTime, { position: cc.v2(this.startPosition, this.ground.y) })
                            .start()
                    })
                    .call(() => {
                        cc.tween(this.player)
                            .to(comebackTime, { position: cc.v2((this.startPosition + this.newGround.width / 2) - 20, this.stick.y) })
                            .start()
                    })
                    .call(() => {
                        cc.tween(this.stick)
                            .to(stickComebackTime, { position: cc.v2(this.stick.x - (this.newGround.x - this.stick.x + this.newGround.width / 2), this.stick.y) })
                            .start()
                    })
                    .call(() => {
                        cc.tween(this.ground)
                            .to(comebackTime, { position: cc.v2(-800, this.ground.y) })
                            .call(() => {
                                this.ground.destroy();
                                this.ground = this.newGround;
                                this.stick.active = false;
                                this.stick = this.spawnStick();
                                this.newGround = this.spawnNewGround();
                                this.node.once(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
                                this.node.once(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
                            }).start()
                    }).start()
            })
            .call(() => this.setScore()).start()
            .start();
    },

    failAction() {
        const playerMoveTime = this.getTime(this.stick.height);
        cc.tween(this.stick).delay(0.3).to(0.4, { angle: -90 })
            .call(() => {
                cc.tween(this.player).to(playerMoveTime, { position: cc.v2(this.player.x + this.stick.height, this.stick.y) })
                    .call(() => { cc.tween(this.stick).to(0.4, { angle: -180 }).start() })
                    .call(() => {
                        cc.tween(this.player).by(0.3, { position: cc.v2(0, -350) })
                            .call(() => this.gameoverDisplay.enabled = true)
                            .delay(1)
                            .call(() => cc.director.loadScene('game')).start()
                    }).start()
            }).start();
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
        newStick.y = this.ground.y + this.ground.height / 2;
        newStick.x = this.startPosition + this.ground.width / 2;
        newStick.getComponent('Stick').game = this;
        return newStick;
    },

    spawnNewGround() {
        const newGround = cc.instantiate(this.newGroundPrefab);
        newGround.x = 500;
        newGround.y = this.ground.y;
        this.node.addChild(newGround);
        const newRedPoint = this.spawnRedPoint();
        newGround.addChild(newRedPoint);
        newRedPoint.y = this.ground.height / 2 - newRedPoint.height / 2;
        const minWidthNewGround = 30;
        const maxWidthNewGround = 150;
        const newGroundPos = this.getNewGroundPosition(newGround.width);
        newGround.width = this.randomInteger(minWidthNewGround, maxWidthNewGround);
        this.playerDestination = (newGroundPos.x + newGround.width / 2) - 20;
        const time = this.getTime(newGround.x - newGroundPos.x, 1000);
        cc.tween(newGround).to(time, { position: newGroundPos }).start()
        return newGround;
    },


    getNewGroundPosition(newGroundWidth) {
        const groundY = this.ground.y;
        const minX = -(this.node.width / 2) + 150 + (newGroundWidth / 2) + 5;
        const maxX = (this.node.width / 2) - (newGroundWidth / 2);
        const randX = this.randomInteger(minX, maxX);
        return cc.v2(randX, groundY);
    },


    //start() {},

    //update(dt) {},
});
