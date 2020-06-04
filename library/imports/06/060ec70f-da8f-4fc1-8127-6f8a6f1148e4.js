"use strict";
cc._RF.push(module, '060eccP2o9PwYEnb4pvEUjk', 'Game');
// scripts/Game.js

"use strict";

var async = require("async");

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
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.stick = this.spawnStick();
    this.newGround = this.spawnNewGround();
    this.player.getComponent('Player').game = this;
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
    this.touchStart = false;
    this.touchEnd = true;

    if (this.calculateCollision()) {
      this.successAction();
    } else {
      this.failAction();
    }
  },
  gainScore: function gainScore() {
    this.scoreDisplay.string = 'Score: ' + this.score;
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
    }

    return isCollision;
  },
  successAction: function successAction() {
    var _this = this;

    cc.tween(this.stick).to(0.5, {
      rotation: 90
    }).call(function () {
      cc.tween(_this.player).to(1, {
        position: cc.v2(_this.playerDestination, _this.stick.y)
      }).call(function () {
        cc.tween(_this.newGround).to(1, {
          position: cc.v2(_this.startPosition, _this.ground.y)
        }).start();
      }).call(function () {
        cc.tween(_this.player).to(1, {
          position: cc.v2(_this.startPosition + _this.newGround.width / 2 - 20, _this.stick.y)
        }).start();
      }).call(function () {
        cc.tween(_this.stick).to(1, {
          position: cc.v2(_this.startPosition - _this.stick.height, _this.stick.y)
        }).start();
      }).call(function () {
        cc.tween(_this.ground).to(1, {
          position: cc.v2(-800, _this.ground.y)
        }).call(function () {
          return _this.ground.destroy();
        }).call(function () {
          return _this.ground = _this.newGround;
        }).call(function () {
          _this.stick.active = false;
          _this.stick = _this.spawnStick();
          _this.newGround = _this.spawnNewGround();

          _this.node.once(cc.Node.EventType.TOUCH_START, _this.onTouchStart, _this);

          _this.node.once(cc.Node.EventType.TOUCH_END, _this.onTouchEnd, _this);
        }).start();
      }).start();
    }).call(function () {
      return _this.gainScore();
    }).start().start();
  },
  failAction: function failAction() {
    var _this2 = this;

    cc.tween(this.stick).to(0.5, {
      rotation: 90
    }).call(function () {
      cc.tween(_this2.player).to(1, {
        position: cc.v2(_this2.player.x + _this2.stick.height, _this2.stick.y)
      }).call(function () {
        cc.tween(_this2.stick).to(0.5, {
          rotation: 180
        }).start();
      }).call(function () {
        cc.tween(_this2.player).by(0.5, {
          position: cc.v2(0, -350)
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
    this.node.addChild(newGround);
    var newRedPoint = this.spawnRedPoint();
    newGround.addChild(newRedPoint);
    newRedPoint.y = this.ground.height / 2 - newRedPoint.height / 2;
    var minWidthNewGround = 30;
    var maxWidthNewGround = 150;
    newGround.width = this.randomInteger(minWidthNewGround, maxWidthNewGround);
    newGround.setPosition(this.getNewGroundPosition(newGround.width));
    this.playerDestination = newGround.x + newGround.width / 2 - 20;
    return newGround;
  },
  getNewGroundPosition: function getNewGroundPosition(newGroundWidth) {
    var groundY = this.ground.y;
    var minX = -(this.node.width / 2) + 150 + newGroundWidth / 2 + 5;
    var maxX = this.node.width / 2 - newGroundWidth / 2;
    var randX = this.randomInteger(minX, maxX);
    return cc.v2(randX, groundY);
  },
  start: function start() {},
  update: function update(dt) {}
});

cc._RF.pop();