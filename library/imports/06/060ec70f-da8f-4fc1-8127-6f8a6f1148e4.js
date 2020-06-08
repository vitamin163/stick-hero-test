"use strict";
cc._RF.push(module, '060eccP2o9PwYEnb4pvEUjk', 'Game');
// scripts/Game.js

"use strict";

/* eslint-disable no-undef */
cc.Class({
  "extends": cc.Component,
  properties: {
    newGroundPrefab: {
      "default": null,
      type: cc.Prefab
    },
    redPointPrefab: {
      "default": null,
      type: cc.Prefab
    },
    stickPrefab: {
      "default": null,
      type: cc.Prefab
    },
    ground: {
      "default": null,
      type: cc.Node
    },
    player: {
      "default": null,
      type: cc.Node
    },
    scoreDisplay: {
      "default": null,
      type: cc.Label
    },
    gameoverDisplay: {
      "default": null,
      type: cc.Label
    },
    perfectDisplay: {
      "default": null,
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
    startPosition: -300
  },
  onLoad: function onLoad() {
    this.gameoverDisplay.enabled = false;
    this.perfectDisplay.enabled = false;
    this.stick = this.spawnStick();
    this.newGround = this.spawnNewGround();
    this.score = 0;
  },
  onEnable: function onEnable() {
    this.node.once(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.once(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
  },
  onTouchStart: function onTouchStart() {
    this.touchStart = true;
    this.touchEnd = false;
  },
  onTouchEnd: function onTouchEnd() {
    this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.touchStart = false;
    this.touchEnd = true;

    if (this.calculateCollision()) {
      this.successAction();
    } else {
      this.failAction();
    }
  },
  setScore: function setScore() {
    this.scoreDisplay.string = "Score: ".concat(this.score);
  },
  calculateCollision: function calculateCollision() {
    var startCollisionPoint = this.newGround.x - this.newGround.width / 2;
    var endCollisionPoint = this.newGround.x + this.newGround.width / 2;
    var startCollisionRedPoint = this.newGround.x - this.redPointPrefab.data.width / 2;
    var endCollisionRedPoint = this.newGround.x + this.redPointPrefab.data.width / 2;
    var destination = this.stick.x + this.stick.height;
    var isCollision = destination >= startCollisionPoint && destination <= endCollisionPoint;
    var isPerfect = destination >= startCollisionRedPoint && destination <= endCollisionRedPoint;

    if (isCollision && !isPerfect) {
      this.score += 1;
    } else if (isPerfect) {
      this.score += 2;
      this.perfect = true;
    }

    return isCollision;
  },
  getTime: function getTime(distance) {
    var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    return distance / speed;
  },
  successAction: function successAction() {
    var _this = this;

    var playerMoveTime = this.getTime(this.playerDestination - this.player.x);
    var stickComebackTime = this.getTime(this.newGround.x - this.stick.x + this.newGround.width / 2);
    var comebackTime = this.getTime(this.newGround.x - this.startPosition);
    cc.tween(this.stick).delay(0.3).to(0.4, {
      angle: -90
    }).call(function () {
      _this.perfectDisplay.enabled = _this.perfect;
      cc.tween(_this.player).to(playerMoveTime, {
        position: cc.v2(_this.playerDestination, _this.stick.y)
      }).call(function () {
        _this.perfect = false;
        _this.perfectDisplay.enabled = false;
        cc.tween(_this.newGround).to(comebackTime, {
          position: cc.v2(_this.startPosition, _this.ground.y)
        }).start();
      }).call(function () {
        cc.tween(_this.player).to(comebackTime, {
          position: cc.v2(_this.startPosition + _this.newGround.width / 2 - 20, _this.stick.y)
        }).start();
      }).call(function () {
        cc.tween(_this.stick).to(stickComebackTime, {
          position: cc.v2(_this.stick.x - (_this.newGround.x - _this.stick.x + _this.newGround.width / 2), _this.stick.y)
        }).start();
      }).call(function () {
        cc.tween(_this.ground).to(comebackTime, {
          position: cc.v2(-800, _this.ground.y)
        }).call(function () {
          _this.ground.destroy();

          _this.ground = _this.newGround;
          _this.stick.active = false;
          _this.stick = _this.spawnStick();
          _this.newGround = _this.spawnNewGround();

          _this.node.once(cc.Node.EventType.TOUCH_START, _this.onTouchStart, _this);

          _this.node.once(cc.Node.EventType.TOUCH_END, _this.onTouchEnd, _this);
        }).start();
      }).start();
    }).call(function () {
      return _this.setScore();
    }).start().start();
  },
  failAction: function failAction() {
    var _this2 = this;

    var playerMoveTime = this.getTime(this.stick.height);
    cc.tween(this.stick).delay(0.3).to(0.4, {
      angle: -90
    }).call(function () {
      cc.tween(_this2.player).to(playerMoveTime, {
        position: cc.v2(_this2.player.x + _this2.stick.height, _this2.stick.y)
      }).call(function () {
        cc.tween(_this2.stick).to(0.4, {
          angle: -180
        }).start();
      }).call(function () {
        cc.tween(_this2.player).by(0.3, {
          position: cc.v2(0, -350)
        }).call(function () {
          _this2.gameoverDisplay.enabled = true;
        }).delay(1).call(function () {
          return cc.director.loadScene('game');
        }).start();
      }).start();
    }).start();
  },
  randomInteger: function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  },
  spawnRedPoint: function spawnRedPoint() {
    return cc.instantiate(this.redPointPrefab);
  },
  spawnStick: function spawnStick() {
    var newStick = cc.instantiate(this.stickPrefab);
    this.node.addChild(newStick);
    newStick.anchorY = 0;
    newStick.y = this.ground.y + this.ground.height / 2;
    newStick.x = this.startPosition + this.ground.width / 2;
    newStick.getComponent('Stick').game = this;
    return newStick;
  },
  spawnNewGround: function spawnNewGround() {
    var newGround = cc.instantiate(this.newGroundPrefab);
    newGround.x = 500;
    newGround.y = this.ground.y;
    this.node.addChild(newGround);
    var newRedPoint = this.spawnRedPoint();
    newGround.addChild(newRedPoint);
    newRedPoint.y = this.ground.height / 2 - newRedPoint.height / 2;
    var minWidthNewGround = 30;
    var maxWidthNewGround = 150;
    var newGroundPos = this.getNewGroundPosition(newGround.width);
    newGround.width = this.randomInteger(minWidthNewGround, maxWidthNewGround);
    this.playerDestination = newGroundPos.x + newGround.width / 2 - 20;
    var time = this.getTime(newGround.x - newGroundPos.x, 1000);
    cc.tween(newGround).to(time, {
      position: newGroundPos
    }).start();
    return newGround;
  },
  getNewGroundPosition: function getNewGroundPosition(newGroundWidth) {
    var groundY = this.ground.y;
    var minX = -(this.node.width / 2) + 150 + newGroundWidth / 2 + 5;
    var maxX = this.node.width / 2 - newGroundWidth / 2;
    var randX = this.randomInteger(minX, maxX);
    return cc.v2(randX, groundY);
  }
});

cc._RF.pop();