
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/migration/use_v2.0.x_cc.Toggle_event');
require('./assets/scripts/Game');
require('./assets/scripts/NewGround');
require('./assets/scripts/Player');
require('./assets/scripts/RedPoint');
require('./assets/scripts/Stick');

                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm5ld0dyb3VuZFByZWZhYiIsInR5cGUiLCJQcmVmYWIiLCJyZWRQb2ludFByZWZhYiIsInN0aWNrUHJlZmFiIiwiZ3JvdW5kIiwiTm9kZSIsInBsYXllciIsInNjb3JlRGlzcGxheSIsIkxhYmVsIiwiZ2FtZW92ZXJEaXNwbGF5IiwicGVyZmVjdERpc3BsYXkiLCJwbGF5ZXJEZXN0aW5hdGlvbiIsImlzTW92aW5nIiwidG91Y2hTdGFydCIsInRvdWNoRW5kIiwiY29sbGlzaW9uIiwic3RpY2siLCJuZXdHcm91bmQiLCJiZXlvbmQiLCJzdGFydFBvc2l0aW9uIiwib25Mb2FkIiwiZW5hYmxlZCIsInNwYXduU3RpY2siLCJzcGF3bk5ld0dyb3VuZCIsInNjb3JlIiwib25FbmFibGUiLCJub2RlIiwib25jZSIsIkV2ZW50VHlwZSIsIlRPVUNIX1NUQVJUIiwib25Ub3VjaFN0YXJ0IiwiVE9VQ0hfRU5EIiwib25Ub3VjaEVuZCIsIm9mZiIsImNhbGN1bGF0ZUNvbGxpc2lvbiIsInN1Y2Nlc3NBY3Rpb24iLCJmYWlsQWN0aW9uIiwic2V0U2NvcmUiLCJzdHJpbmciLCJzdGFydENvbGxpc2lvblBvaW50IiwieCIsIndpZHRoIiwiZW5kQ29sbGlzaW9uUG9pbnQiLCJzdGFydENvbGxpc2lvblJlZFBvaW50IiwiZGF0YSIsImVuZENvbGxpc2lvblJlZFBvaW50IiwiZGVzdGluYXRpb24iLCJoZWlnaHQiLCJpc0NvbGxpc2lvbiIsImlzUGVyZmVjdCIsInBlcmZlY3QiLCJnZXRUaW1lIiwiZGlzdGFuY2UiLCJzcGVlZCIsInBsYXllck1vdmVUaW1lIiwic3RpY2tDb21lYmFja1RpbWUiLCJjb21lYmFja1RpbWUiLCJ0d2VlbiIsImRlbGF5IiwidG8iLCJhbmdsZSIsImNhbGwiLCJwb3NpdGlvbiIsInYyIiwieSIsInN0YXJ0IiwiZGVzdHJveSIsImFjdGl2ZSIsImJ5IiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJyYW5kb21JbnRlZ2VyIiwibWluIiwibWF4IiwicmFuZCIsIk1hdGgiLCJyYW5kb20iLCJmbG9vciIsInNwYXduUmVkUG9pbnQiLCJpbnN0YW50aWF0ZSIsIm5ld1N0aWNrIiwiYWRkQ2hpbGQiLCJhbmNob3JZIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZSIsIm5ld1JlZFBvaW50IiwibWluV2lkdGhOZXdHcm91bmQiLCJtYXhXaWR0aE5ld0dyb3VuZCIsIm5ld0dyb3VuZFBvcyIsImdldE5ld0dyb3VuZFBvc2l0aW9uIiwidGltZSIsIm5ld0dyb3VuZFdpZHRoIiwiZ3JvdW5kWSIsIm1pblgiLCJtYXhYIiwicmFuZFgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDUCxhQUFTRCxFQUFFLENBQUNFLFNBREw7QUFHUEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLGVBQWUsRUFBRTtBQUNmLGlCQUFTLElBRE07QUFFZkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRk0sS0FEUDtBQU1WQyxJQUFBQSxjQUFjLEVBQUU7QUFDZCxpQkFBUyxJQURLO0FBRWRGLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZLLEtBTk47QUFXVkUsSUFBQUEsV0FBVyxFQUFFO0FBQ1gsaUJBQVMsSUFERTtBQUVYSCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGRSxLQVhIO0FBZ0JWRyxJQUFBQSxNQUFNLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU5KLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDVTtBQUZILEtBaEJFO0FBcUJWQyxJQUFBQSxNQUFNLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU5OLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDVTtBQUZILEtBckJFO0FBeUJWRSxJQUFBQSxZQUFZLEVBQUU7QUFDWixpQkFBUyxJQURHO0FB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QUFMLENBQW1Cc0IsSUFBbkIsRUFBeUJDLElBQXpCLENBQWQ7QUFDQSxXQUFPbkcsRUFBRSxDQUFDb0UsRUFBSCxDQUFNZ0MsS0FBTixFQUFhSCxPQUFiLENBQVA7QUFDRDtBQXJPTSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuY2MuQ2xhc3Moe1xuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgcHJvcGVydGllczoge1xuICAgIG5ld0dyb3VuZFByZWZhYjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcbiAgICB9LFxuXG4gICAgcmVkUG9pbnRQcmVmYWI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXG4gICAgfSxcblxuICAgIHN0aWNrUHJlZmFiOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxuICAgIH0sXG5cbiAgICBncm91bmQ6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG5cbiAgICBwbGF5ZXI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgc2NvcmVEaXNwbGF5OiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTGFiZWwsXG4gICAgfSxcbiAgICBnYW1lb3ZlckRpc3BsYXk6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcbiAgICB9LFxuICAgIHBlcmZlY3REaXNwbGF5OiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTGFiZWwsXG4gICAgfSxcbiAgICBwbGF5ZXJEZXN0aW5hdGlvbjogJ25vbmUnLFxuICAgIGlzTW92aW5nOiBmYWxzZSxcbiAgICB0b3VjaFN0YXJ0OiBmYWxzZSxcbiAgICB0b3VjaEVuZDogZmFsc2UsXG4gICAgY29sbGlzaW9uOiBmYWxzZSxcbiAgICBzdGljazogbnVsbCxcbiAgICBuZXdHcm91bmQ6IG51bGwsXG4gICAgYmV5b25kOiAtNTAwLFxuICAgIHN0YXJ0UG9zaXRpb246IC0zMDAsXG4gIH0sXG5cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuZ2FtZW92ZXJEaXNwbGF5LmVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnBlcmZlY3REaXNwbGF5LmVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnN0aWNrID0gdGhpcy5zcGF3blN0aWNrKCk7XG4gICAgdGhpcy5uZXdHcm91bmQgPSB0aGlzLnNwYXduTmV3R3JvdW5kKCk7XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gIH0sXG5cbiAgb25FbmFibGUoKSB7XG4gICAgdGhpcy5ub2RlLm9uY2UoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFN0YXJ0LCB0aGlzKTtcbiAgICB0aGlzLm5vZGUub25jZShjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZCwgdGhpcyk7XG4gIH0sXG5cblxuICBvblRvdWNoU3RhcnQoKSB7XG4gICAgdGhpcy50b3VjaFN0YXJ0ID0gdHJ1ZTtcbiAgICB0aGlzLnRvdWNoRW5kID0gZmFsc2U7XG4gIH0sXG5cblxuICBvblRvdWNoRW5kKCkge1xuICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFN0YXJ0LCB0aGlzKTtcbiAgICB0aGlzLnRvdWNoU3RhcnQgPSBmYWxzZTtcbiAgICB0aGlzLnRvdWNoRW5kID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5jYWxjdWxhdGVDb2xsaXNpb24oKSkge1xuICAgICAgdGhpcy5zdWNjZXNzQWN0aW9uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmFpbEFjdGlvbigpO1xuICAgIH1cbiAgfSxcblxuICBzZXRTY29yZSgpIHtcbiAgICB0aGlzLnNjb3JlRGlzcGxheS5zdHJpbmcgPSBgU2NvcmU6ICR7dGhpcy5zY29yZX1gO1xuICB9LFxuXG4gIGNhbGN1bGF0ZUNvbGxpc2lvbigpIHtcbiAgICBjb25zdCBzdGFydENvbGxpc2lvblBvaW50ID0gdGhpcy5uZXdHcm91bmQueCAtIHRoaXMubmV3R3JvdW5kLndpZHRoIC8gMjtcbiAgICBjb25zdCBlbmRDb2xsaXNpb25Qb2ludCA9IHRoaXMubmV3R3JvdW5kLnggKyB0aGlzLm5ld0dyb3VuZC53aWR0aCAvIDI7XG4gICAgY29uc3Qgc3RhcnRDb2xsaXNpb25SZWRQb2ludCA9IHRoaXMubmV3R3JvdW5kLnggLSB0aGlzLnJlZFBvaW50UHJlZmFiLmRhdGEud2lkdGggLyAyO1xuICAgIGNvbnN0IGVuZENvbGxpc2lvblJlZFBvaW50ID0gdGhpcy5uZXdHcm91bmQueCArIHRoaXMucmVkUG9pbnRQcmVmYWIuZGF0YS53aWR0aCAvIDI7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSB0aGlzLnN0aWNrLnggKyB0aGlzLnN0aWNrLmhlaWdodDtcbiAgICBjb25zdCBpc0NvbGxpc2lvbiA9IGRlc3RpbmF0aW9uID49IHN0YXJ0Q29sbGlzaW9uUG9pbnQgJiYgZGVzdGluYXRpb24gPD0gZW5kQ29sbGlzaW9uUG9pbnQ7XG4gICAgY29uc3QgaXNQZXJmZWN0ID0gZGVzdGluYXRpb24gPj0gc3RhcnRDb2xsaXNpb25SZWRQb2ludCAmJiBkZXN0aW5hdGlvbiA8PSBlbmRDb2xsaXNpb25SZWRQb2ludDtcbiAgICBpZiAoaXNDb2xsaXNpb24gJiYgIWlzUGVyZmVjdCkge1xuICAgICAgdGhpcy5zY29yZSArPSAxO1xuICAgIH0gZWxzZSBpZiAoaXNQZXJmZWN0KSB7XG4gICAgICB0aGlzLnNjb3JlICs9IDI7XG4gICAgICB0aGlzLnBlcmZlY3QgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gaXNDb2xsaXNpb247XG4gIH0sXG5cbiAgZ2V0VGltZShkaXN0YW5jZSwgc3BlZWQgPSA1MDApIHtcbiAgICByZXR1cm4gZGlzdGFuY2UgLyBzcGVlZDtcbiAgfSxcblxuICBzdWNjZXNzQWN0aW9uKCkge1xuICAgIGNvbnN0IHBsYXllck1vdmVUaW1lID0gdGhpcy5nZXRUaW1lKHRoaXMucGxheWVyRGVzdGluYXRpb24gLSB0aGlzLnBsYXllci54KTtcbiAgICBjb25zdCBzdGlja0NvbWViYWNrVGltZSA9IHRoaXMuZ2V0VGltZShcbiAgICAgICh0aGlzLm5ld0dyb3VuZC54IC0gdGhpcy5zdGljay54KSArIHRoaXMubmV3R3JvdW5kLndpZHRoIC8gMixcbiAgICApO1xuICAgIGNvbnN0IGNvbWViYWNrVGltZSA9IHRoaXMuZ2V0VGltZSh0aGlzLm5ld0dyb3VuZC54IC0gdGhpcy5zdGFydFBvc2l0aW9uKTtcbiAgICBjYy50d2Vlbih0aGlzLnN0aWNrKS5kZWxheSgwLjMpLnRvKDAuNCwgeyBhbmdsZTogLTkwIH0pXG4gICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgIHRoaXMucGVyZmVjdERpc3BsYXkuZW5hYmxlZCA9IHRoaXMucGVyZmVjdDtcbiAgICAgICAgY2MudHdlZW4odGhpcy5wbGF5ZXIpLnRvKHBsYXllck1vdmVUaW1lLFxuICAgICAgICAgIHsgcG9zaXRpb246IGNjLnYyKHRoaXMucGxheWVyRGVzdGluYXRpb24sIHRoaXMuc3RpY2sueSkgfSlcbiAgICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBlcmZlY3QgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucGVyZmVjdERpc3BsYXkuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5uZXdHcm91bmQpXG4gICAgICAgICAgICAgIC50byhjb21lYmFja1RpbWUsIHsgcG9zaXRpb246IGNjLnYyKHRoaXMuc3RhcnRQb3NpdGlvbiwgdGhpcy5ncm91bmQueSkgfSlcbiAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnBsYXllcilcbiAgICAgICAgICAgICAgLnRvKGNvbWViYWNrVGltZSwge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBjYy52MihcbiAgICAgICAgICAgICAgICAgICh0aGlzLnN0YXJ0UG9zaXRpb24gKyB0aGlzLm5ld0dyb3VuZC53aWR0aCAvIDIpIC0gMjAsIHRoaXMuc3RpY2sueSxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuc3RhcnQoKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuc3RpY2spXG4gICAgICAgICAgICAgIC50byhzdGlja0NvbWViYWNrVGltZSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBwb3NpdGlvbjogY2MudjIoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RpY2sueCAtICh0aGlzLm5ld0dyb3VuZC54IC0gdGhpcy5zdGljay54ICsgdGhpcy5uZXdHcm91bmQud2lkdGggLyAyXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RpY2sueSxcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLmdyb3VuZClcbiAgICAgICAgICAgICAgLnRvKGNvbWViYWNrVGltZSwgeyBwb3NpdGlvbjogY2MudjIoLTgwMCwgdGhpcy5ncm91bmQueSkgfSlcbiAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdW5kLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VuZCA9IHRoaXMubmV3R3JvdW5kO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RpY2suYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGljayA9IHRoaXMuc3Bhd25TdGljaygpO1xuICAgICAgICAgICAgICAgIHRoaXMubmV3R3JvdW5kID0gdGhpcy5zcGF3bk5ld0dyb3VuZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5vbmNlKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hTdGFydCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLm9uY2UoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuc3RhcnQoKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgfSlcbiAgICAgIC5jYWxsKCgpID0+IHRoaXMuc2V0U2NvcmUoKSkuc3RhcnQoKVxuICAgICAgLnN0YXJ0KCk7XG4gIH0sXG5cbiAgZmFpbEFjdGlvbigpIHtcbiAgICBjb25zdCBwbGF5ZXJNb3ZlVGltZSA9IHRoaXMuZ2V0VGltZSh0aGlzLnN0aWNrLmhlaWdodCk7XG4gICAgY2MudHdlZW4odGhpcy5zdGljaykuZGVsYXkoMC4zKS50bygwLjQsIHsgYW5nbGU6IC05MCB9KVxuICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICBjYy50d2Vlbih0aGlzLnBsYXllcilcbiAgICAgICAgICAudG8ocGxheWVyTW92ZVRpbWUsIHsgcG9zaXRpb246IGNjLnYyKHRoaXMucGxheWVyLnggKyB0aGlzLnN0aWNrLmhlaWdodCwgdGhpcy5zdGljay55KSB9KVxuICAgICAgICAgIC5jYWxsKCgpID0+IHsgY2MudHdlZW4odGhpcy5zdGljaykudG8oMC40LCB7IGFuZ2xlOiAtMTgwIH0pLnN0YXJ0KCk7IH0pXG4gICAgICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5wbGF5ZXIpLmJ5KDAuMywgeyBwb3NpdGlvbjogY2MudjIoMCwgLTM1MCkgfSlcbiAgICAgICAgICAgICAgLmNhbGwoKCkgPT4geyB0aGlzLmdhbWVvdmVyRGlzcGxheS5lbmFibGVkID0gdHJ1ZTsgfSlcbiAgICAgICAgICAgICAgLmRlbGF5KDEpXG4gICAgICAgICAgICAgIC5jYWxsKCgpID0+IGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZ2FtZScpKVxuICAgICAgICAgICAgICAuc3RhcnQoKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgfSlcbiAgICAgIC5zdGFydCgpO1xuICB9LFxuXG4gIHJhbmRvbUludGVnZXIobWluLCBtYXgpIHtcbiAgICBjb25zdCByYW5kID0gbWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggKyAxIC0gbWluKTtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihyYW5kKTtcbiAgfSxcblxuICBzcGF3blJlZFBvaW50KCkge1xuICAgIHJldHVybiBjYy5pbnN0YW50aWF0ZSh0aGlzLnJlZFBvaW50UHJlZmFiKTtcbiAgfSxcblxuICBzcGF3blN0aWNrKCkge1xuICAgIGNvbnN0IG5ld1N0aWNrID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdGlja1ByZWZhYik7XG4gICAgdGhpcy5ub2RlLmFkZENoaWxkKG5ld1N0aWNrKTtcbiAgICBuZXdTdGljay5hbmNob3JZID0gMDtcbiAgICBuZXdTdGljay55ID0gdGhpcy5ncm91bmQueSArIHRoaXMuZ3JvdW5kLmhlaWdodCAvIDI7XG4gICAgbmV3U3RpY2sueCA9IHRoaXMuc3RhcnRQb3NpdGlvbiArIHRoaXMuZ3JvdW5kLndpZHRoIC8gMjtcbiAgICBuZXdTdGljay5nZXRDb21wb25lbnQoJ1N0aWNrJykuZ2FtZSA9IHRoaXM7XG4gICAgcmV0dXJuIG5ld1N0aWNrO1xuICB9LFxuXG4gIHNwYXduTmV3R3JvdW5kKCkge1xuICAgIGNvbnN0IG5ld0dyb3VuZCA9IGNjLmluc3RhbnRpYXRlKHRoaXMubmV3R3JvdW5kUHJlZmFiKTtcbiAgICBuZXdHcm91bmQueCA9IDUwMDtcbiAgICBuZXdHcm91bmQueSA9IHRoaXMuZ3JvdW5kLnk7XG4gICAgdGhpcy5ub2RlLmFkZENoaWxkKG5ld0dyb3VuZCk7XG4gICAgY29uc3QgbmV3UmVkUG9pbnQgPSB0aGlzLnNwYXduUmVkUG9pbnQoKTtcbiAgICBuZXdHcm91bmQuYWRkQ2hpbGQobmV3UmVkUG9pbnQpO1xuICAgIG5ld1JlZFBvaW50LnkgPSB0aGlzLmdyb3VuZC5oZWlnaHQgLyAyIC0gbmV3UmVkUG9pbnQuaGVpZ2h0IC8gMjtcbiAgICBjb25zdCBtaW5XaWR0aE5ld0dyb3VuZCA9IDMwO1xuICAgIGNvbnN0IG1heFdpZHRoTmV3R3JvdW5kID0gMTUwO1xuICAgIGNvbnN0IG5ld0dyb3VuZFBvcyA9IHRoaXMuZ2V0TmV3R3JvdW5kUG9zaXRpb24obmV3R3JvdW5kLndpZHRoKTtcbiAgICBuZXdHcm91bmQud2lkdGggPSB0aGlzLnJhbmRvbUludGVnZXIobWluV2lkdGhOZXdHcm91bmQsIG1heFdpZHRoTmV3R3JvdW5kKTtcbiAgICB0aGlzLnBsYXllckRlc3RpbmF0aW9uID0gKG5ld0dyb3VuZFBvcy54ICsgbmV3R3JvdW5kLndpZHRoIC8gMikgLSAyMDtcbiAgICBjb25zdCB0aW1lID0gdGhpcy5nZXRUaW1lKG5ld0dyb3VuZC54IC0gbmV3R3JvdW5kUG9zLngsIDEwMDApO1xuICAgIGNjLnR3ZWVuKG5ld0dyb3VuZCkudG8odGltZSwgeyBwb3NpdGlvbjogbmV3R3JvdW5kUG9zIH0pLnN0YXJ0KCk7XG4gICAgcmV0dXJuIG5ld0dyb3VuZDtcbiAgfSxcblxuXG4gIGdldE5ld0dyb3VuZFBvc2l0aW9uKG5ld0dyb3VuZFdpZHRoKSB7XG4gICAgY29uc3QgZ3JvdW5kWSA9IHRoaXMuZ3JvdW5kLnk7XG4gICAgY29uc3QgbWluWCA9IC0odGhpcy5ub2RlLndpZHRoIC8gMikgKyAxNTAgKyAobmV3R3JvdW5kV2lkdGggLyAyKSArIDU7XG4gICAgY29uc3QgbWF4WCA9ICh0aGlzLm5vZGUud2lkdGggLyAyKSAtIChuZXdHcm91bmRXaWR0aCAvIDIpO1xuICAgIGNvbnN0IHJhbmRYID0gdGhpcy5yYW5kb21JbnRlZ2VyKG1pblgsIG1heFgpO1xuICAgIHJldHVybiBjYy52MihyYW5kWCwgZ3JvdW5kWSk7XG4gIH0sXG5cbn0pO1xuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/RedPoint.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '33633JGEk9C8LC2uD/cQICA', 'RedPoint');
// scripts/RedPoint.js

"use strict";

/* eslint-disable no-undef */
cc.Class({
  "extends": cc.Component,
  properties: {}
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUmVkUG9pbnQuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDUCxhQUFTRCxFQUFFLENBQUNFLFNBREw7QUFHUEMsRUFBQUEsVUFBVSxFQUFFO0FBSEwsQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbmNjLkNsYXNzKHtcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gIHByb3BlcnRpZXM6IHt9LFxuXG59KTtcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '430e07wtqJIHJT/OxFlj0Yj', 'Player');
// scripts/Player.js

"use strict";

/* eslint-disable no-undef */
cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {}
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUGxheWVyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ1AsYUFBU0QsRUFBRSxDQUFDRSxTQURMO0FBR1BDLEVBQUFBLFVBQVUsRUFBRSxFQUhMO0FBS1BDLEVBQUFBLE1BTE8sb0JBS0UsQ0FBRztBQUxMLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG5jYy5DbGFzcyh7XG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICBwcm9wZXJ0aWVzOiB7fSxcblxuICBvbkxvYWQoKSB7IH0sXG5cbn0pO1xuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/migration/use_v2.0.x_cc.Toggle_event.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1dcbctZmIVFnIv0sqSM8Gmv', 'use_v2.0.x_cc.Toggle_event');
// migration/use_v2.0.x_cc.Toggle_event.js

"use strict";

/*
 * This script is automatically generated by Cocos Creator and is only compatible with projects prior to v2.1.0.
 * You do not need to manually add this script in any other project.
 * If you don't use cc.Toggle in your project, you can delete this script directly.
 * If your project is hosted in VCS such as git, submit this script together.
 *
 * 此脚本由 Cocos Creator 自动生成，仅用于兼容 v2.1.0 之前版本的工程，
 * 你无需在任何其它项目中手动添加此脚本。
 * 如果你的项目中没用到 Toggle，可直接删除该脚本。
 * 如果你的项目有托管于 git 等版本库，请将此脚本一并上传。
 */
if (cc.Toggle) {
  // Whether the 'toggle' and 'checkEvents' events are fired when 'toggle.check() / toggle.uncheck()' is called in the code
  // 在代码中调用 'toggle.check() / toggle.uncheck()' 时是否触发 'toggle' 与 'checkEvents' 事件
  cc.Toggle._triggerEventInScript_check = true;
}

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbWlncmF0aW9uXFx1c2VfdjIuMC54X2NjLlRvZ2dsZV9ldmVudC5qcyJdLCJuYW1lcyI6WyJjYyIsIlRvZ2dsZSIsIl90cmlnZ2VyRXZlbnRJblNjcmlwdF9jaGVjayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7QUFZQSxJQUFJQSxFQUFFLENBQUNDLE1BQVAsRUFBZTtBQUNYO0FBQ0E7QUFDQUQsRUFBQUEsRUFBRSxDQUFDQyxNQUFILENBQVVDLDJCQUFWLEdBQXdDLElBQXhDO0FBQ0giLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIFRoaXMgc2NyaXB0IGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IENvY29zIENyZWF0b3IgYW5kIGlzIG9ubHkgY29tcGF0aWJsZSB3aXRoIHByb2plY3RzIHByaW9yIHRvIHYyLjEuMC5cclxuICogWW91IGRvIG5vdCBuZWVkIHRvIG1hbnVhbGx5IGFkZCB0aGlzIHNjcmlwdCBpbiBhbnkgb3RoZXIgcHJvamVjdC5cclxuICogSWYgeW91IGRvbid0IHVzZSBjYy5Ub2dnbGUgaW4geW91ciBwcm9qZWN0LCB5b3UgY2FuIGRlbGV0ZSB0aGlzIHNjcmlwdCBkaXJlY3RseS5cclxuICogSWYgeW91ciBwcm9qZWN0IGlzIGhvc3RlZCBpbiBWQ1Mgc3VjaCBhcyBnaXQsIHN1Ym1pdCB0aGlzIHNjcmlwdCB0b2dldGhlci5cclxuICpcclxuICog5q2k6ISa5pys55SxIENvY29zIENyZWF0b3Ig6Ieq5Yqo55Sf5oiQ77yM5LuF55So5LqO5YW85a65IHYyLjEuMCDkuYvliY3niYjmnKznmoTlt6XnqIvvvIxcclxuICog5L2g5peg6ZyA5Zyo5Lu75L2V5YW25a6D6aG555uu5Lit5omL5Yqo5re75Yqg5q2k6ISa5pys44CCXHJcbiAqIOWmguaenOS9oOeahOmhueebruS4reayoeeUqOWIsCBUb2dnbGXvvIzlj6/nm7TmjqXliKDpmaTor6XohJrmnKzjgIJcclxuICog5aaC5p6c5L2g55qE6aG555uu5pyJ5omY566h5LqOIGdpdCDnrYnniYjmnKzlupPvvIzor7flsIbmraTohJrmnKzkuIDlubbkuIrkvKDjgIJcclxuICovXHJcblxyXG5pZiAoY2MuVG9nZ2xlKSB7XHJcbiAgICAvLyBXaGV0aGVyIHRoZSAndG9nZ2xlJyBhbmQgJ2NoZWNrRXZlbnRzJyBldmVudHMgYXJlIGZpcmVkIHdoZW4gJ3RvZ2dsZS5jaGVjaygpIC8gdG9nZ2xlLnVuY2hlY2soKScgaXMgY2FsbGVkIGluIHRoZSBjb2RlXHJcbiAgICAvLyDlnKjku6PnoIHkuK3osIPnlKggJ3RvZ2dsZS5jaGVjaygpIC8gdG9nZ2xlLnVuY2hlY2soKScg5pe25piv5ZCm6Kem5Y+RICd0b2dnbGUnIOS4jiAnY2hlY2tFdmVudHMnIOS6i+S7tlxyXG4gICAgY2MuVG9nZ2xlLl90cmlnZ2VyRXZlbnRJblNjcmlwdF9jaGVjayA9IHRydWU7XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/NewGround.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '863ddB4Y99BBrLRWhRNUjZB', 'NewGround');
// scripts/NewGround.js

"use strict";

/* eslint-disable no-undef */
cc.Class({
  "extends": cc.Component,
  properties: {}
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcTmV3R3JvdW5kLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ1AsYUFBU0QsRUFBRSxDQUFDRSxTQURMO0FBR1BDLEVBQUFBLFVBQVUsRUFBRTtBQUhMLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG5jYy5DbGFzcyh7XG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICBwcm9wZXJ0aWVzOiB7fSxcblxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Stick.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '03da5Xx6MVJlK0uxE4IDTb0', 'Stick');
// scripts/Stick.js

"use strict";

/* eslint-disable no-undef */
cc.Class({
  "extends": cc.Component,
  properties: {},
  update: function update() {
    if (this.game.touchStart) {
      this.node.height += 2;
    }
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcU3RpY2suanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ1cGRhdGUiLCJnYW1lIiwidG91Y2hTdGFydCIsIm5vZGUiLCJoZWlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDUCxhQUFTRCxFQUFFLENBQUNFLFNBREw7QUFHUEMsRUFBQUEsVUFBVSxFQUFFLEVBSEw7QUFLUEMsRUFBQUEsTUFMTyxvQkFLRTtBQUNQLFFBQUksS0FBS0MsSUFBTCxDQUFVQyxVQUFkLEVBQTBCO0FBQ3hCLFdBQUtDLElBQUwsQ0FBVUMsTUFBVixJQUFvQixDQUFwQjtBQUNEO0FBQ0Y7QUFUTSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuY2MuQ2xhc3Moe1xuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgcHJvcGVydGllczoge30sXG5cbiAgdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLmdhbWUudG91Y2hTdGFydCkge1xuICAgICAgdGhpcy5ub2RlLmhlaWdodCArPSAyO1xuICAgIH1cbiAgfSxcbn0pO1xuIl19
//------QC-SOURCE-SPLIT------
