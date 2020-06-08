
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm5ld0dyb3VuZFByZWZhYiIsInR5cGUiLCJQcmVmYWIiLCJyZWRQb2ludFByZWZhYiIsInN0aWNrUHJlZmFiIiwiZ3JvdW5kIiwiTm9kZSIsInBsYXllciIsInNjb3JlRGlzcGxheSIsIkxhYmVsIiwiZ2FtZW92ZXJEaXNwbGF5IiwicGVyZmVjdERpc3BsYXkiLCJwbGF5ZXJEZXN0aW5hdGlvbiIsImlzTW92aW5nIiwidG91Y2hTdGFydCIsInRvdWNoRW5kIiwiY29sbGlzaW9uIiwic3RpY2siLCJuZXdHcm91bmQiLCJiZXlvbmQiLCJzdGFydFBvc2l0aW9uIiwib25Mb2FkIiwiZW5hYmxlZCIsInNwYXduU3RpY2siLCJzcGF3bk5ld0dyb3VuZCIsInNjb3JlIiwib25FbmFibGUiLCJub2RlIiwib25jZSIsIkV2ZW50VHlwZSIsIlRPVUNIX1NUQVJUIiwib25Ub3VjaFN0YXJ0IiwiVE9VQ0hfRU5EIiwib25Ub3VjaEVuZCIsImNhbGN1bGF0ZUNvbGxpc2lvbiIsInN1Y2Nlc3NBY3Rpb24iLCJmYWlsQWN0aW9uIiwic2V0U2NvcmUiLCJzdHJpbmciLCJzdGFydENvbGxpc2lvblBvaW50IiwieCIsIndpZHRoIiwiZW5kQ29sbGlzaW9uUG9pbnQiLCJzdGFydENvbGxpc2lvblJlZFBvaW50IiwiZGF0YSIsImVuZENvbGxpc2lvblJlZFBvaW50IiwiZGVzdGluYXRpb24iLCJoZWlnaHQiLCJpc0NvbGxpc2lvbiIsImlzUGVyZmVjdCIsInBlcmZlY3QiLCJnZXRUaW1lIiwiZGlzdGFuY2UiLCJzcGVlZCIsInBsYXllck1vdmVUaW1lIiwic3RpY2tDb21lYmFja1RpbWUiLCJjb21lYmFja1RpbWUiLCJ0d2VlbiIsImRlbGF5IiwidG8iLCJhbmdsZSIsImNhbGwiLCJwb3NpdGlvbiIsInYyIiwieSIsInN0YXJ0IiwiZGVzdHJveSIsImFjdGl2ZSIsImJ5IiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJyYW5kb21JbnRlZ2VyIiwibWluIiwibWF4IiwicmFuZCIsIk1hdGgiLCJyYW5kb20iLCJmbG9vciIsInNwYXduUmVkUG9pbnQiLCJpbnN0YW50aWF0ZSIsIm5ld1N0aWNrIiwiYWRkQ2hpbGQiLCJhbmNob3JZIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZSIsIm5ld1JlZFBvaW50IiwibWluV2lkdGhOZXdHcm91bmQiLCJtYXhXaWR0aE5ld0dyb3VuZCIsIm5ld0dyb3VuZFBvcyIsImdldE5ld0dyb3VuZFBvc2l0aW9uIiwidGltZSIsIm5ld0dyb3VuZFdpZHRoIiwiZ3JvdW5kWSIsIm1pblgiLCJtYXhYIiwicmFuZFgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDUCxhQUFTRCxFQUFFLENBQUNFLFNBREw7QUFHUEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLGVBQWUsRUFBRTtBQUNmLGlCQUFTLElBRE07QUFFZkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRk0sS0FEUDtBQU1WQyxJQUFBQSxjQUFjLEVBQUU7QUFDZCxpQkFBUyxJQURLO0FBRWRGLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZLLEtBTk47QUFXVkUsSUFBQUEsV0FBVyxFQUFFO0FBQ1gsaUJBQVMsSUFERTtBQUVYSCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGRSxLQVhIO0FBZ0JWRyxJQUFBQSxNQUFNLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU5KLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDVTtBQUZILEtBaEJFO0FBcUJWQyxJQUFBQSxNQUFNLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU5OLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDVTtBQUZILEtBckJFO0FBeUJWRSxJQUFBQSxZQUFZLEVBQUU7QUFDWixpQkFBUyxJQURHO0FBRVpQLE1B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dXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbmNjLkNsYXNzKHtcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gIHByb3BlcnRpZXM6IHtcbiAgICBuZXdHcm91bmRQcmVmYWI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXG4gICAgfSxcblxuICAgIHJlZFBvaW50UHJlZmFiOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxuICAgIH0sXG5cbiAgICBzdGlja1ByZWZhYjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcbiAgICB9LFxuXG4gICAgZ3JvdW5kOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuXG4gICAgcGxheWVyOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIHNjb3JlRGlzcGxheToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxuICAgIH0sXG4gICAgZ2FtZW92ZXJEaXNwbGF5OiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTGFiZWwsXG4gICAgfSxcbiAgICBwZXJmZWN0RGlzcGxheToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxuICAgIH0sXG4gICAgcGxheWVyRGVzdGluYXRpb246ICdub25lJyxcbiAgICBpc01vdmluZzogZmFsc2UsXG4gICAgdG91Y2hTdGFydDogZmFsc2UsXG4gICAgdG91Y2hFbmQ6IGZhbHNlLFxuICAgIGNvbGxpc2lvbjogZmFsc2UsXG4gICAgc3RpY2s6IG51bGwsXG4gICAgbmV3R3JvdW5kOiBudWxsLFxuICAgIGJleW9uZDogLTUwMCxcbiAgICBzdGFydFBvc2l0aW9uOiAtMzAwLFxuICB9LFxuXG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLmdhbWVvdmVyRGlzcGxheS5lbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5wZXJmZWN0RGlzcGxheS5lbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5zdGljayA9IHRoaXMuc3Bhd25TdGljaygpO1xuICAgIHRoaXMubmV3R3JvdW5kID0gdGhpcy5zcGF3bk5ld0dyb3VuZCgpO1xuICAgIHRoaXMuc2NvcmUgPSAwO1xuICB9LFxuXG4gIG9uRW5hYmxlKCkge1xuICAgIHRoaXMubm9kZS5vbmNlKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hTdGFydCwgdGhpcyk7XG4gICAgdGhpcy5ub2RlLm9uY2UoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xuICB9LFxuXG5cbiAgb25Ub3VjaFN0YXJ0KCkge1xuICAgIHRoaXMudG91Y2hTdGFydCA9IHRydWU7XG4gICAgdGhpcy50b3VjaEVuZCA9IGZhbHNlO1xuICB9LFxuXG5cbiAgb25Ub3VjaEVuZCgpIHtcbiAgICB0aGlzLnRvdWNoU3RhcnQgPSBmYWxzZTtcbiAgICB0aGlzLnRvdWNoRW5kID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5jYWxjdWxhdGVDb2xsaXNpb24oKSkge1xuICAgICAgdGhpcy5zdWNjZXNzQWN0aW9uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmFpbEFjdGlvbigpO1xuICAgIH1cbiAgfSxcblxuICBzZXRTY29yZSgpIHtcbiAgICB0aGlzLnNjb3JlRGlzcGxheS5zdHJpbmcgPSBgU2NvcmU6ICR7dGhpcy5zY29yZX1gO1xuICB9LFxuXG4gIGNhbGN1bGF0ZUNvbGxpc2lvbigpIHtcbiAgICBjb25zdCBzdGFydENvbGxpc2lvblBvaW50ID0gdGhpcy5uZXdHcm91bmQueCAtIHRoaXMubmV3R3JvdW5kLndpZHRoIC8gMjtcbiAgICBjb25zdCBlbmRDb2xsaXNpb25Qb2ludCA9IHRoaXMubmV3R3JvdW5kLnggKyB0aGlzLm5ld0dyb3VuZC53aWR0aCAvIDI7XG4gICAgY29uc3Qgc3RhcnRDb2xsaXNpb25SZWRQb2ludCA9IHRoaXMubmV3R3JvdW5kLnggLSB0aGlzLnJlZFBvaW50UHJlZmFiLmRhdGEud2lkdGggLyAyO1xuICAgIGNvbnN0IGVuZENvbGxpc2lvblJlZFBvaW50ID0gdGhpcy5uZXdHcm91bmQueCArIHRoaXMucmVkUG9pbnRQcmVmYWIuZGF0YS53aWR0aCAvIDI7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSB0aGlzLnN0aWNrLnggKyB0aGlzLnN0aWNrLmhlaWdodDtcbiAgICBjb25zdCBpc0NvbGxpc2lvbiA9IGRlc3RpbmF0aW9uID49IHN0YXJ0Q29sbGlzaW9uUG9pbnQgJiYgZGVzdGluYXRpb24gPD0gZW5kQ29sbGlzaW9uUG9pbnQ7XG4gICAgY29uc3QgaXNQZXJmZWN0ID0gZGVzdGluYXRpb24gPj0gc3RhcnRDb2xsaXNpb25SZWRQb2ludCAmJiBkZXN0aW5hdGlvbiA8PSBlbmRDb2xsaXNpb25SZWRQb2ludDtcbiAgICBpZiAoaXNDb2xsaXNpb24gJiYgIWlzUGVyZmVjdCkge1xuICAgICAgdGhpcy5zY29yZSArPSAxO1xuICAgIH0gZWxzZSBpZiAoaXNQZXJmZWN0KSB7XG4gICAgICB0aGlzLnNjb3JlICs9IDI7XG4gICAgICB0aGlzLnBlcmZlY3QgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gaXNDb2xsaXNpb247XG4gIH0sXG5cbiAgZ2V0VGltZShkaXN0YW5jZSwgc3BlZWQgPSA1MDApIHtcbiAgICByZXR1cm4gZGlzdGFuY2UgLyBzcGVlZDtcbiAgfSxcblxuICBzdWNjZXNzQWN0aW9uKCkge1xuICAgIGNvbnN0IHBsYXllck1vdmVUaW1lID0gdGhpcy5nZXRUaW1lKHRoaXMucGxheWVyRGVzdGluYXRpb24gLSB0aGlzLnBsYXllci54KTtcbiAgICBjb25zdCBzdGlja0NvbWViYWNrVGltZSA9IHRoaXMuZ2V0VGltZShcbiAgICAgICh0aGlzLm5ld0dyb3VuZC54IC0gdGhpcy5zdGljay54KSArIHRoaXMubmV3R3JvdW5kLndpZHRoIC8gMixcbiAgICApO1xuICAgIGNvbnN0IGNvbWViYWNrVGltZSA9IHRoaXMuZ2V0VGltZSh0aGlzLm5ld0dyb3VuZC54IC0gdGhpcy5zdGFydFBvc2l0aW9uKTtcbiAgICBjYy50d2Vlbih0aGlzLnN0aWNrKS5kZWxheSgwLjMpLnRvKDAuNCwgeyBhbmdsZTogLTkwIH0pXG4gICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgIHRoaXMucGVyZmVjdERpc3BsYXkuZW5hYmxlZCA9IHRoaXMucGVyZmVjdDtcbiAgICAgICAgY2MudHdlZW4odGhpcy5wbGF5ZXIpLnRvKHBsYXllck1vdmVUaW1lLFxuICAgICAgICAgIHsgcG9zaXRpb246IGNjLnYyKHRoaXMucGxheWVyRGVzdGluYXRpb24sIHRoaXMuc3RpY2sueSkgfSlcbiAgICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBlcmZlY3QgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucGVyZmVjdERpc3BsYXkuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5uZXdHcm91bmQpXG4gICAgICAgICAgICAgIC50byhjb21lYmFja1RpbWUsIHsgcG9zaXRpb246IGNjLnYyKHRoaXMuc3RhcnRQb3NpdGlvbiwgdGhpcy5ncm91bmQueSkgfSlcbiAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnBsYXllcilcbiAgICAgICAgICAgICAgLnRvKGNvbWViYWNrVGltZSwge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBjYy52MihcbiAgICAgICAgICAgICAgICAgICh0aGlzLnN0YXJ0UG9zaXRpb24gKyB0aGlzLm5ld0dyb3VuZC53aWR0aCAvIDIpIC0gMjAsIHRoaXMuc3RpY2sueSxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuc3RhcnQoKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuc3RpY2spXG4gICAgICAgICAgICAgIC50byhzdGlja0NvbWViYWNrVGltZSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBwb3NpdGlvbjogY2MudjIoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RpY2sueCAtICh0aGlzLm5ld0dyb3VuZC54IC0gdGhpcy5zdGljay54ICsgdGhpcy5uZXdHcm91bmQud2lkdGggLyAyXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RpY2sueSxcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLmdyb3VuZClcbiAgICAgICAgICAgICAgLnRvKGNvbWViYWNrVGltZSwgeyBwb3NpdGlvbjogY2MudjIoLTgwMCwgdGhpcy5ncm91bmQueSkgfSlcbiAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdW5kLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VuZCA9IHRoaXMubmV3R3JvdW5kO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RpY2suYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGljayA9IHRoaXMuc3Bhd25TdGljaygpO1xuICAgICAgICAgICAgICAgIHRoaXMubmV3R3JvdW5kID0gdGhpcy5zcGF3bk5ld0dyb3VuZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5vbmNlKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hTdGFydCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLm9uY2UoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xuICAgICAgICAgICAgICB9KS5zdGFydCgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICB9KVxuICAgICAgLmNhbGwoKCkgPT4gdGhpcy5zZXRTY29yZSgpKVxuICAgICAgLnN0YXJ0KClcbiAgICAgIC5zdGFydCgpO1xuICB9LFxuXG4gIGZhaWxBY3Rpb24oKSB7XG4gICAgY29uc3QgcGxheWVyTW92ZVRpbWUgPSB0aGlzLmdldFRpbWUodGhpcy5zdGljay5oZWlnaHQpO1xuICAgIGNjLnR3ZWVuKHRoaXMuc3RpY2spLmRlbGF5KDAuMykudG8oMC40LCB7IGFuZ2xlOiAtOTAgfSlcbiAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgY2MudHdlZW4odGhpcy5wbGF5ZXIpXG4gICAgICAgICAgLnRvKHBsYXllck1vdmVUaW1lLCB7IHBvc2l0aW9uOiBjYy52Mih0aGlzLnBsYXllci54ICsgdGhpcy5zdGljay5oZWlnaHQsIHRoaXMuc3RpY2sueSkgfSlcbiAgICAgICAgICAuY2FsbCgoKSA9PiB7IGNjLnR3ZWVuKHRoaXMuc3RpY2spLnRvKDAuNCwgeyBhbmdsZTogLTE4MCB9KS5zdGFydCgpOyB9KVxuICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMucGxheWVyKS5ieSgwLjMsIHsgcG9zaXRpb246IGNjLnYyKDAsIC0zNTApIH0pXG4gICAgICAgICAgICAgIC5jYWxsKCgpID0+IHsgdGhpcy5nYW1lb3ZlckRpc3BsYXkuZW5hYmxlZCA9IHRydWU7IH0pXG4gICAgICAgICAgICAgIC5kZWxheSgxKVxuICAgICAgICAgICAgICAuY2FsbCgoKSA9PiBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2dhbWUnKSlcbiAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuc3RhcnQoKTtcbiAgICAgIH0pXG4gICAgICAuc3RhcnQoKTtcbiAgfSxcblxuICByYW5kb21JbnRlZ2VyKG1pbiwgbWF4KSB7XG4gICAgY29uc3QgcmFuZCA9IG1pbiArIE1hdGgucmFuZG9tKCkgKiAobWF4ICsgMSAtIG1pbik7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IocmFuZCk7XG4gIH0sXG5cbiAgc3Bhd25SZWRQb2ludCgpIHtcbiAgICByZXR1cm4gY2MuaW5zdGFudGlhdGUodGhpcy5yZWRQb2ludFByZWZhYik7XG4gIH0sXG5cbiAgc3Bhd25TdGljaygpIHtcbiAgICBjb25zdCBuZXdTdGljayA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3RpY2tQcmVmYWIpO1xuICAgIHRoaXMubm9kZS5hZGRDaGlsZChuZXdTdGljayk7XG4gICAgbmV3U3RpY2suYW5jaG9yWSA9IDA7XG4gICAgbmV3U3RpY2sueSA9IHRoaXMuZ3JvdW5kLnkgKyB0aGlzLmdyb3VuZC5oZWlnaHQgLyAyO1xuICAgIG5ld1N0aWNrLnggPSB0aGlzLnN0YXJ0UG9zaXRpb24gKyB0aGlzLmdyb3VuZC53aWR0aCAvIDI7XG4gICAgbmV3U3RpY2suZ2V0Q29tcG9uZW50KCdTdGljaycpLmdhbWUgPSB0aGlzO1xuICAgIHJldHVybiBuZXdTdGljaztcbiAgfSxcblxuICBzcGF3bk5ld0dyb3VuZCgpIHtcbiAgICBjb25zdCBuZXdHcm91bmQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm5ld0dyb3VuZFByZWZhYik7XG4gICAgbmV3R3JvdW5kLnggPSA1MDA7XG4gICAgbmV3R3JvdW5kLnkgPSB0aGlzLmdyb3VuZC55O1xuICAgIHRoaXMubm9kZS5hZGRDaGlsZChuZXdHcm91bmQpO1xuICAgIGNvbnN0IG5ld1JlZFBvaW50ID0gdGhpcy5zcGF3blJlZFBvaW50KCk7XG4gICAgbmV3R3JvdW5kLmFkZENoaWxkKG5ld1JlZFBvaW50KTtcbiAgICBuZXdSZWRQb2ludC55ID0gdGhpcy5ncm91bmQuaGVpZ2h0IC8gMiAtIG5ld1JlZFBvaW50LmhlaWdodCAvIDI7XG4gICAgY29uc3QgbWluV2lkdGhOZXdHcm91bmQgPSAzMDtcbiAgICBjb25zdCBtYXhXaWR0aE5ld0dyb3VuZCA9IDE1MDtcbiAgICBjb25zdCBuZXdHcm91bmRQb3MgPSB0aGlzLmdldE5ld0dyb3VuZFBvc2l0aW9uKG5ld0dyb3VuZC53aWR0aCk7XG4gICAgbmV3R3JvdW5kLndpZHRoID0gdGhpcy5yYW5kb21JbnRlZ2VyKG1pbldpZHRoTmV3R3JvdW5kLCBtYXhXaWR0aE5ld0dyb3VuZCk7XG4gICAgdGhpcy5wbGF5ZXJEZXN0aW5hdGlvbiA9IChuZXdHcm91bmRQb3MueCArIG5ld0dyb3VuZC53aWR0aCAvIDIpIC0gMjA7XG4gICAgY29uc3QgdGltZSA9IHRoaXMuZ2V0VGltZShuZXdHcm91bmQueCAtIG5ld0dyb3VuZFBvcy54LCAxMDAwKTtcbiAgICBjYy50d2VlbihuZXdHcm91bmQpLnRvKHRpbWUsIHsgcG9zaXRpb246IG5ld0dyb3VuZFBvcyB9KS5zdGFydCgpO1xuICAgIHJldHVybiBuZXdHcm91bmQ7XG4gIH0sXG5cblxuICBnZXROZXdHcm91bmRQb3NpdGlvbihuZXdHcm91bmRXaWR0aCkge1xuICAgIGNvbnN0IGdyb3VuZFkgPSB0aGlzLmdyb3VuZC55O1xuICAgIGNvbnN0IG1pblggPSAtKHRoaXMubm9kZS53aWR0aCAvIDIpICsgMTUwICsgKG5ld0dyb3VuZFdpZHRoIC8gMikgKyA1O1xuICAgIGNvbnN0IG1heFggPSAodGhpcy5ub2RlLndpZHRoIC8gMikgLSAobmV3R3JvdW5kV2lkdGggLyAyKTtcbiAgICBjb25zdCByYW5kWCA9IHRoaXMucmFuZG9tSW50ZWdlcihtaW5YLCBtYXhYKTtcbiAgICByZXR1cm4gY2MudjIocmFuZFgsIGdyb3VuZFkpO1xuICB9LFxuXG59KTtcbiJdfQ==
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
