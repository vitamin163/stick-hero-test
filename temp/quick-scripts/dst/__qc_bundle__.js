
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

cc.Class({
  "extends": cc.Component,
  properties: {} // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  //start() {},
  // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUmVkUG9pbnQuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRSxFQUhQLENBS0w7QUFFQTtBQUVBO0FBRUE7O0FBWEssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHt9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fSxcclxuXHJcbiAgICAvL3N0YXJ0KCkge30sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
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
  // LIFE-CYCLE CALLBACKS:
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
          return _this2.gameoverDisplay.enabled = true;
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
  } //start() {},
  //update(dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm5ld0dyb3VuZFByZWZhYiIsInR5cGUiLCJQcmVmYWIiLCJyZWRQb2ludFByZWZhYiIsInN0aWNrUHJlZmFiIiwiZ3JvdW5kIiwiTm9kZSIsInBsYXllciIsInNjb3JlRGlzcGxheSIsIkxhYmVsIiwiZ2FtZW92ZXJEaXNwbGF5IiwicGVyZmVjdERpc3BsYXkiLCJwbGF5ZXJEZXN0aW5hdGlvbiIsImlzTW92aW5nIiwidG91Y2hTdGFydCIsInRvdWNoRW5kIiwiY29sbGlzaW9uIiwic3RpY2siLCJuZXdHcm91bmQiLCJiZXlvbmQiLCJzdGFydFBvc2l0aW9uIiwib25Mb2FkIiwiZW5hYmxlZCIsInNwYXduU3RpY2siLCJzcGF3bk5ld0dyb3VuZCIsInNjb3JlIiwib25FbmFibGUiLCJub2RlIiwib25jZSIsIkV2ZW50VHlwZSIsIlRPVUNIX1NUQVJUIiwib25Ub3VjaFN0YXJ0IiwiVE9VQ0hfRU5EIiwib25Ub3VjaEVuZCIsImNhbGN1bGF0ZUNvbGxpc2lvbiIsInN1Y2Nlc3NBY3Rpb24iLCJmYWlsQWN0aW9uIiwic2V0U2NvcmUiLCJzdHJpbmciLCJzdGFydENvbGxpc2lvblBvaW50IiwieCIsIndpZHRoIiwiZW5kQ29sbGlzaW9uUG9pbnQiLCJzdGFydENvbGxpc2lvblJlZFBvaW50IiwiZGF0YSIsImVuZENvbGxpc2lvblJlZFBvaW50IiwiZGVzdGluYXRpb24iLCJoZWlnaHQiLCJpc0NvbGxpc2lvbiIsImlzUGVyZmVjdCIsInBlcmZlY3QiLCJnZXRUaW1lIiwiZGlzdGFuY2UiLCJzcGVlZCIsInBsYXllck1vdmVUaW1lIiwic3RpY2tDb21lYmFja1RpbWUiLCJjb21lYmFja1RpbWUiLCJ0d2VlbiIsImRlbGF5IiwidG8iLCJhbmdsZSIsImNhbGwiLCJwb3NpdGlvbiIsInYyIiwieSIsInN0YXJ0IiwiZGVzdHJveSIsImFjdGl2ZSIsImJ5IiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJyYW5kb21JbnRlZ2VyIiwibWluIiwibWF4IiwicmFuZCIsIk1hdGgiLCJyYW5kb20iLCJmbG9vciIsInNwYXduUmVkUG9pbnQiLCJpbnN0YW50aWF0ZSIsIm5ld1N0aWNrIiwiYWRkQ2hpbGQiLCJhbmNob3JZIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZSIsIm5ld1JlZFBvaW50IiwibWluV2lkdGhOZXdHcm91bmQiLCJtYXhXaWR0aE5ld0dyb3VuZCIsIm5ld0dyb3VuZFBvcyIsImdldE5ld0dyb3VuZFBvc2l0aW9uIiwidGltZSIsIm5ld0dyb3VuZFdpZHRoIiwiZ3JvdW5kWSIsIm1pblgiLCJtYXhYIiwicmFuZFgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxlQUFlLEVBQUU7QUFDYixpQkFBUyxJQURJO0FBRWJDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZJLEtBRFQ7QUFNUkMsSUFBQUEsY0FBYyxFQUFFO0FBQ1osaUJBQVMsSUFERztBQUVaRixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGRyxLQU5SO0FBV1JFLElBQUFBLFdBQVcsRUFBRTtBQUNULGlCQUFTLElBREE7QUFFVEgsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkEsS0FYTDtBQWdCUkcsSUFBQUEsTUFBTSxFQUFFO0FBQ0osaUJBQVMsSUFETDtBQUVKSixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1U7QUFGTCxLQWhCQTtBQXFCUkMsSUFBQUEsTUFBTSxFQUFFO0FBQ0osaUJBQVMsSUFETDtBQUVKTixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1U7QUFGTCxLQXJCQTtBQXlCUkUsSUFBQUEsWUFBWSxFQUFFO0FBQ1YsaUJBQVMsSUFEQztBQUVWUCxNQUFBQSxJ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bk5JLENBc05MO0FBRUE7O0FBeE5LLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbmV3R3JvdW5kUHJlZmFiOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlZFBvaW50UHJlZmFiOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0aWNrUHJlZmFiOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdyb3VuZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcGxheWVyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjb3JlRGlzcGxheToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2FtZW92ZXJEaXNwbGF5OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwZXJmZWN0RGlzcGxheToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxheWVyRGVzdGluYXRpb246ICdub25lJyxcclxuICAgICAgICBpc01vdmluZzogZmFsc2UsXHJcbiAgICAgICAgdG91Y2hTdGFydDogZmFsc2UsXHJcbiAgICAgICAgdG91Y2hFbmQ6IGZhbHNlLFxyXG4gICAgICAgIGNvbGxpc2lvbjogZmFsc2UsXHJcbiAgICAgICAgc3RpY2s6IG51bGwsXHJcbiAgICAgICAgbmV3R3JvdW5kOiBudWxsLFxyXG4gICAgICAgIGJleW9uZDogLTUwMCxcclxuICAgICAgICBzdGFydFBvc2l0aW9uOiAtMzAwLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lb3ZlckRpc3BsYXkuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGVyZmVjdERpc3BsYXkuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RpY2sgPSB0aGlzLnNwYXduU3RpY2soKTtcclxuICAgICAgICB0aGlzLm5ld0dyb3VuZCA9IHRoaXMuc3Bhd25OZXdHcm91bmQoKTtcclxuICAgICAgICB0aGlzLnNjb3JlID0gMDtcclxuICAgIH0sXHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uY2UoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFN0YXJ0LCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub25jZShjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBvblRvdWNoU3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy50b3VjaFN0YXJ0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRvdWNoRW5kID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBvblRvdWNoRW5kKCkge1xyXG4gICAgICAgIHRoaXMudG91Y2hTdGFydCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudG91Y2hFbmQgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLmNhbGN1bGF0ZUNvbGxpc2lvbigpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3VjY2Vzc0FjdGlvbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmFpbEFjdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNldFNjb3JlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zY29yZURpc3BsYXkuc3RyaW5nID0gJ1Njb3JlOiAnICsgdGhpcy5zY29yZTtcclxuICAgIH0sXHJcblxyXG4gICAgY2FsY3VsYXRlQ29sbGlzaW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0Q29sbGlzaW9uUG9pbnQgPSB0aGlzLm5ld0dyb3VuZC54IC0gdGhpcy5uZXdHcm91bmQud2lkdGggLyAyO1xyXG4gICAgICAgIGNvbnN0IGVuZENvbGxpc2lvblBvaW50ID0gdGhpcy5uZXdHcm91bmQueCArIHRoaXMubmV3R3JvdW5kLndpZHRoIC8gMjtcclxuICAgICAgICBjb25zdCBzdGFydENvbGxpc2lvblJlZFBvaW50ID0gdGhpcy5uZXdHcm91bmQueCAtIHRoaXMucmVkUG9pbnRQcmVmYWIuZGF0YS53aWR0aCAvIDI7XHJcbiAgICAgICAgY29uc3QgZW5kQ29sbGlzaW9uUmVkUG9pbnQgPSB0aGlzLm5ld0dyb3VuZC54ICsgdGhpcy5yZWRQb2ludFByZWZhYi5kYXRhLndpZHRoIC8gMlxyXG4gICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gdGhpcy5zdGljay54ICsgdGhpcy5zdGljay5oZWlnaHQ7XHJcbiAgICAgICAgY29uc3QgaXNDb2xsaXNpb24gPSBkZXN0aW5hdGlvbiA+PSBzdGFydENvbGxpc2lvblBvaW50ICYmIGRlc3RpbmF0aW9uIDw9IGVuZENvbGxpc2lvblBvaW50O1xyXG4gICAgICAgIGNvbnN0IGlzUGVyZmVjdCA9IGRlc3RpbmF0aW9uID49IHN0YXJ0Q29sbGlzaW9uUmVkUG9pbnQgJiYgZGVzdGluYXRpb24gPD0gZW5kQ29sbGlzaW9uUmVkUG9pbnQ7XHJcbiAgICAgICAgaWYgKGlzQ29sbGlzaW9uICYmICFpc1BlcmZlY3QpIHtcclxuICAgICAgICAgICAgdGhpcy5zY29yZSArPSAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNQZXJmZWN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NvcmUgKz0gMjtcclxuICAgICAgICAgICAgdGhpcy5wZXJmZWN0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzQ29sbGlzaW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRUaW1lKGRpc3RhbmNlLCBzcGVlZCA9IDUwMCkge1xyXG4gICAgICAgIHJldHVybiBkaXN0YW5jZSAvIHNwZWVkO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdWNjZXNzQWN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHBsYXllck1vdmVUaW1lID0gdGhpcy5nZXRUaW1lKHRoaXMucGxheWVyRGVzdGluYXRpb24gLSB0aGlzLnBsYXllci54KTtcclxuICAgICAgICBjb25zdCBzdGlja0NvbWViYWNrVGltZSA9IHRoaXMuZ2V0VGltZSgodGhpcy5uZXdHcm91bmQueCAtIHRoaXMuc3RpY2sueCkgKyB0aGlzLm5ld0dyb3VuZC53aWR0aCAvIDIpO1xyXG4gICAgICAgIGNvbnN0IGNvbWViYWNrVGltZSA9IHRoaXMuZ2V0VGltZSh0aGlzLm5ld0dyb3VuZC54IC0gdGhpcy5zdGFydFBvc2l0aW9uKTtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLnN0aWNrKS5kZWxheSgwLjMpLnRvKDAuNCwgeyBhbmdsZTogLTkwIH0pXHJcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVyZmVjdERpc3BsYXkuZW5hYmxlZCA9IHRoaXMucGVyZmVjdDtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMucGxheWVyKS50byhwbGF5ZXJNb3ZlVGltZSwgeyBwb3NpdGlvbjogY2MudjIodGhpcy5wbGF5ZXJEZXN0aW5hdGlvbiwgdGhpcy5zdGljay55KSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXJmZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGVyZmVjdERpc3BsYXkuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5ld0dyb3VuZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50byhjb21lYmFja1RpbWUsIHsgcG9zaXRpb246IGNjLnYyKHRoaXMuc3RhcnRQb3NpdGlvbiwgdGhpcy5ncm91bmQueSkgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMucGxheWVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvKGNvbWViYWNrVGltZSwgeyBwb3NpdGlvbjogY2MudjIoKHRoaXMuc3RhcnRQb3NpdGlvbiArIHRoaXMubmV3R3JvdW5kLndpZHRoIC8gMikgLSAyMCwgdGhpcy5zdGljay55KSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5zdGljaylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50byhzdGlja0NvbWViYWNrVGltZSwgeyBwb3NpdGlvbjogY2MudjIodGhpcy5zdGljay54IC0gKHRoaXMubmV3R3JvdW5kLnggLSB0aGlzLnN0aWNrLnggKyB0aGlzLm5ld0dyb3VuZC53aWR0aCAvIDIpLCB0aGlzLnN0aWNrLnkpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLmdyb3VuZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50byhjb21lYmFja1RpbWUsIHsgcG9zaXRpb246IGNjLnYyKC04MDAsIHRoaXMuZ3JvdW5kLnkpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91bmQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdW5kID0gdGhpcy5uZXdHcm91bmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGljay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0aWNrID0gdGhpcy5zcGF3blN0aWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXdHcm91bmQgPSB0aGlzLnNwYXduTmV3R3JvdW5kKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLm9uY2UoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFN0YXJ0LCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUub25jZShjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5zdGFydCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuc3RhcnQoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2FsbCgoKSA9PiB0aGlzLnNldFNjb3JlKCkpLnN0YXJ0KClcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGZhaWxBY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3QgcGxheWVyTW92ZVRpbWUgPSB0aGlzLmdldFRpbWUodGhpcy5zdGljay5oZWlnaHQpO1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuc3RpY2spLmRlbGF5KDAuMykudG8oMC40LCB7IGFuZ2xlOiAtOTAgfSlcclxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5wbGF5ZXIpLnRvKHBsYXllck1vdmVUaW1lLCB7IHBvc2l0aW9uOiBjYy52Mih0aGlzLnBsYXllci54ICsgdGhpcy5zdGljay5oZWlnaHQsIHRoaXMuc3RpY2sueSkgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7IGNjLnR3ZWVuKHRoaXMuc3RpY2spLnRvKDAuNCwgeyBhbmdsZTogLTE4MCB9KS5zdGFydCgpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLnBsYXllcikuYnkoMC4zLCB7IHBvc2l0aW9uOiBjYy52MigwLCAtMzUwKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4gdGhpcy5nYW1lb3ZlckRpc3BsYXkuZW5hYmxlZCA9IHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVsYXkoMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZ2FtZScpKS5zdGFydCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuc3RhcnQoKVxyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICByYW5kb21JbnRlZ2VyKG1pbiwgbWF4KSB7XHJcbiAgICAgICAgY29uc3QgcmFuZCA9IG1pbiArIE1hdGgucmFuZG9tKCkgKiAobWF4ICsgMSAtIG1pbik7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IocmFuZCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNwYXduUmVkUG9pbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLmluc3RhbnRpYXRlKHRoaXMucmVkUG9pbnRQcmVmYWIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzcGF3blN0aWNrKCkge1xyXG4gICAgICAgIGNvbnN0IG5ld1N0aWNrID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdGlja1ByZWZhYik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5ld1N0aWNrKTtcclxuICAgICAgICBuZXdTdGljay5hbmNob3JZID0gMDtcclxuICAgICAgICBuZXdTdGljay55ID0gdGhpcy5ncm91bmQueSArIHRoaXMuZ3JvdW5kLmhlaWdodCAvIDI7XHJcbiAgICAgICAgbmV3U3RpY2sueCA9IHRoaXMuc3RhcnRQb3NpdGlvbiArIHRoaXMuZ3JvdW5kLndpZHRoIC8gMjtcclxuICAgICAgICBuZXdTdGljay5nZXRDb21wb25lbnQoJ1N0aWNrJykuZ2FtZSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ld1N0aWNrO1xyXG4gICAgfSxcclxuXHJcbiAgICBzcGF3bk5ld0dyb3VuZCgpIHtcclxuICAgICAgICBjb25zdCBuZXdHcm91bmQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm5ld0dyb3VuZFByZWZhYik7XHJcbiAgICAgICAgbmV3R3JvdW5kLnggPSA1MDA7XHJcbiAgICAgICAgbmV3R3JvdW5kLnkgPSB0aGlzLmdyb3VuZC55O1xyXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChuZXdHcm91bmQpO1xyXG4gICAgICAgIGNvbnN0IG5ld1JlZFBvaW50ID0gdGhpcy5zcGF3blJlZFBvaW50KCk7XHJcbiAgICAgICAgbmV3R3JvdW5kLmFkZENoaWxkKG5ld1JlZFBvaW50KTtcclxuICAgICAgICBuZXdSZWRQb2ludC55ID0gdGhpcy5ncm91bmQuaGVpZ2h0IC8gMiAtIG5ld1JlZFBvaW50LmhlaWdodCAvIDI7XHJcbiAgICAgICAgY29uc3QgbWluV2lkdGhOZXdHcm91bmQgPSAzMDtcclxuICAgICAgICBjb25zdCBtYXhXaWR0aE5ld0dyb3VuZCA9IDE1MDtcclxuICAgICAgICBjb25zdCBuZXdHcm91bmRQb3MgPSB0aGlzLmdldE5ld0dyb3VuZFBvc2l0aW9uKG5ld0dyb3VuZC53aWR0aCk7XHJcbiAgICAgICAgbmV3R3JvdW5kLndpZHRoID0gdGhpcy5yYW5kb21JbnRlZ2VyKG1pbldpZHRoTmV3R3JvdW5kLCBtYXhXaWR0aE5ld0dyb3VuZCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJEZXN0aW5hdGlvbiA9IChuZXdHcm91bmRQb3MueCArIG5ld0dyb3VuZC53aWR0aCAvIDIpIC0gMjA7XHJcbiAgICAgICAgY29uc3QgdGltZSA9IHRoaXMuZ2V0VGltZShuZXdHcm91bmQueCAtIG5ld0dyb3VuZFBvcy54LCAxMDAwKTtcclxuICAgICAgICBjYy50d2VlbihuZXdHcm91bmQpLnRvKHRpbWUsIHsgcG9zaXRpb246IG5ld0dyb3VuZFBvcyB9KS5zdGFydCgpXHJcbiAgICAgICAgcmV0dXJuIG5ld0dyb3VuZDtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGdldE5ld0dyb3VuZFBvc2l0aW9uKG5ld0dyb3VuZFdpZHRoKSB7XHJcbiAgICAgICAgY29uc3QgZ3JvdW5kWSA9IHRoaXMuZ3JvdW5kLnk7XHJcbiAgICAgICAgY29uc3QgbWluWCA9IC0odGhpcy5ub2RlLndpZHRoIC8gMikgKyAxNTAgKyAobmV3R3JvdW5kV2lkdGggLyAyKSArIDU7XHJcbiAgICAgICAgY29uc3QgbWF4WCA9ICh0aGlzLm5vZGUud2lkdGggLyAyKSAtIChuZXdHcm91bmRXaWR0aCAvIDIpO1xyXG4gICAgICAgIGNvbnN0IHJhbmRYID0gdGhpcy5yYW5kb21JbnRlZ2VyKG1pblgsIG1heFgpO1xyXG4gICAgICAgIHJldHVybiBjYy52MihyYW5kWCwgZ3JvdW5kWSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvL3N0YXJ0KCkge30sXHJcblxyXG4gICAgLy91cGRhdGUoZHQpIHt9LFxyXG59KTtcclxuIl19
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

cc.Class({
  "extends": cc.Component,
  properties: {},
  //onLoad() {},
  //start() {},
  update: function update(dt) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcU3RpY2suanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ1cGRhdGUiLCJkdCIsImdhbWUiLCJ0b3VjaFN0YXJ0Iiwibm9kZSIsImhlaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLEVBSFA7QUFLTDtBQUVBO0FBRUFDLEVBQUFBLE1BVEssa0JBU0VDLEVBVEYsRUFTTTtBQUNQLFFBQUksS0FBS0MsSUFBTCxDQUFVQyxVQUFkLEVBQTBCO0FBQ3RCLFdBQUtDLElBQUwsQ0FBVUMsTUFBVixJQUFvQixDQUFwQjtBQUNIO0FBQ0o7QUFiSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge30sXHJcblxyXG4gICAgLy9vbkxvYWQoKSB7fSxcclxuXHJcbiAgICAvL3N0YXJ0KCkge30sXHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS50b3VjaFN0YXJ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5oZWlnaHQgKz0gMjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbiJdfQ==
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

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {} //update: function (dt) { }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUGxheWVyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQUtMQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVksQ0FBRyxDQUxsQixDQU9MOztBQVBLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7fSxcclxuXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHsgfSxcclxuXHJcbiAgICAvL3VwZGF0ZTogZnVuY3Rpb24gKGR0KSB7IH1cclxufSk7Il19
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

cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  start: function start() {} //update(dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcTmV3R3JvdW5kLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRSxFQUhQO0FBTUw7QUFFQUMsRUFBQUEsTUFSSyxvQkFRSSxDQUVSLENBVkk7QUFhTEMsRUFBQUEsS0FiSyxtQkFhRyxDQUVQLENBZkksQ0FpQkw7O0FBakJLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7fSxcclxuXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy91cGRhdGUoZHQpIHt9LFxyXG59KTtcclxuIl19
//------QC-SOURCE-SPLIT------
