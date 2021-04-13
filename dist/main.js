webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

var _simpleScene = __webpack_require__(2);

var gameConfig = {
  width: 680,
  height: 400,
  scene: _simpleScene.SimpleScene
};

new Phaser.Game(gameConfig);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleScene = exports.SimpleScene = function (_Phaser$Scene) {
  _inherits(SimpleScene, _Phaser$Scene);

  function SimpleScene() {
    _classCallCheck(this, SimpleScene);

    return _possibleConstructorReturn(this, (SimpleScene.__proto__ || Object.getPrototypeOf(SimpleScene)).apply(this, arguments));
  }

  _createClass(SimpleScene, [{
    key: 'preload',
    value: function preload() {
      this.load.image('cokecan', './cokecan.png');
    }
  }, {
    key: 'create',
    value: function create() {
      this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
      this.add.image(100, 200, 'cokecan');
    }
  }]);

  return SimpleScene;
}(Phaser.Scene);

/***/ })
],[1]);