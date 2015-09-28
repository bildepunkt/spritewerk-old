(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @class Canvas
 * @requires {Viewport} viewport
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = (function () {
    /**
     * [constructor description]
     * @param  {[type]} deps [description]
     * @return {[type]}      [description]
     */

    function Canvas(deps) {
        _classCallCheck(this, Canvas);

        this._deps = deps;

        this._context = this._deps.viewport.getContext();
    }

    /**
     * [clear description]
     * @return {[type]} [description]
     */

    _createClass(Canvas, [{
        key: "clear",
        value: function clear() {
            var width = this._deps.config.width;
            var height = this._deps.config.height;
            this._context.clearRect(0, 0, width, height);
        }
    }, {
        key: "drawRect",
        value: function drawRect(x, y, w, h) {
            this._context.fillRect(x, y, w, h);
        }

        /**
         * [saveContext description]
         * @return {[type]} [description]
         */
    }, {
        key: "restoreContext",
        value: function restoreContext() {
            this._context.restore();
        }

        /**
         * [saveContext description]
         * @return {[type]} [description]
         */
    }, {
        key: "saveContext",
        value: function saveContext() {
            this._context.save();
        }

        /**
         * [translateContext description]
         * @return {[type]} [description]
         */
    }, {
        key: "translateContext",
        value: function translateContext(x, y) {
            this._context.translate(x, y);
        }
    }]);

    return Canvas;
})();

exports["default"] = Canvas;
module.exports = exports["default"];
},{}],2:[function(require,module,exports){
/**
 * Provides configuration properties used by many other classes
 *
 * @class Config
 * @param {object} [options]
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config =
/**
 * [constructor description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
function Config(options) {
    _classCallCheck(this, Config);

    this.gameWidth = 800;
    this.gameHeight = 600;

    for (var option in options) {
        this[option] = options[option];
    }
};

exports["default"] = Config;
module.exports = exports["default"];
},{}],3:[function(require,module,exports){
/**
 * A point that passes its transforms to its children
 *
 * @class Group
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Point2 = require('./Point');

var _Point3 = _interopRequireDefault(_Point2);

var _Sprite = require('./Sprite');

var _Sprite2 = _interopRequireDefault(_Sprite);

var Group = (function (_Point) {
    _inherits(Group, _Point);

    function Group() {
        _classCallCheck(this, Group);

        _get(Object.getPrototypeOf(Group.prototype), 'constructor', this).call(this);

        this._renderable = [];
        this._groups = [];
    }

    _createClass(Group, [{
        key: 'addChild',
        value: function addChild(child) {
            child.setParentX(this.getGlobalX()).setParentY(this.getGlobalY());

            if (child instanceof _Sprite2['default']) {
                this._renderable.push(child);
            } else if (child instanceof Group) {
                this._groups.push(child);
            }
        }
    }, {
        key: 'getChildren',
        value: function getChildren() {
            return this._renderable.concat(this._groups);
        }
    }, {
        key: 'setParentX',
        value: function setParentX(val) {
            this._parentX = val;

            var globalX = this.getGlobalX();

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._renderable[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var child = _step.value;

                    child.setParentX(globalX);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._groups[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var child = _step2.value;

                    child.setParentX(globalX);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                        _iterator2['return']();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return this;
        }
    }, {
        key: 'setParentY',
        value: function setParentY(val) {
            this._parentY = val;

            var globalY = this.getGlobalY();

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this._renderable[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var child = _step3.value;

                    child.setParentY(globalY);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                        _iterator3['return']();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this._groups[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var child = _step4.value;

                    child.setParentY(globalY);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                        _iterator4['return']();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return this;
        }
    }, {
        key: 'setX',
        value: function setX(val) {
            this._x = val;

            var globalX = this.getGlobalX();

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this._renderable[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var child = _step5.value;

                    child.setParentX(globalX);
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5['return']) {
                        _iterator5['return']();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this._groups[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var child = _step6.value;

                    child.setParentX(globalX);
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6['return']) {
                        _iterator6['return']();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            return this;
        }
    }, {
        key: 'setY',
        value: function setY(val) {
            this._y = val;

            var globalY = this.getGlobalY();

            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = this._renderable[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var child = _step7.value;

                    child.setParentY(globalY);
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7['return']) {
                        _iterator7['return']();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }

            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = this._groups[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var child = _step8.value;

                    child.setParentY(globalY);
                }
            } catch (err) {
                _didIteratorError8 = true;
                _iteratorError8 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion8 && _iterator8['return']) {
                        _iterator8['return']();
                    }
                } finally {
                    if (_didIteratorError8) {
                        throw _iteratorError8;
                    }
                }
            }

            return this;
        }
    }]);

    return Group;
})(_Point3['default']);

exports['default'] = Group;
module.exports = exports['default'];
},{"./Point":4,"./Sprite":5}],4:[function(require,module,exports){
/**
 * a 2d transform
 *
 * @class Point
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = (function () {
  /**
   * [constructor description]
   * @return {[type]} [description]
   */

  function Point() {
    _classCallCheck(this, Point);

    this._x = 0;
    this._y = 0;
    this._parentX = 0;
    this._parentY = 0;
  }

  /**
   * [getGlobalX description]
   * @return {[type]} [description]
   */

  _createClass(Point, [{
    key: "getGlobalX",
    value: function getGlobalX() {
      return this._x + this._parentX;
    }

    /**
     * [getGlobalY description]
     * @return {[type]} [description]
     */
  }, {
    key: "getGlobalY",
    value: function getGlobalY() {
      return this._y + this._parentY;
    }

    /**
     * [getX description]
     * @return {[type]} [description]
     */
  }, {
    key: "getX",
    value: function getX() {
      return this._x;
    }

    /**
     * [getY description]
     * @return {[type]} [description]
     */
  }, {
    key: "getY",
    value: function getY() {
      return this._y;
    }

    /**
     * [getParentX description]
     * @return {[type]} [description]
     */
  }, {
    key: "getParentX",
    value: function getParentX() {
      return this._parentX;
    }

    /**
     * [getParentY description]
     * @return {[type]} [description]
     */
  }, {
    key: "getParentY",
    value: function getParentY() {
      return this._parentY;
    }

    /**
     * [getParentX description]
     * @return {[type]} [description]
     */
  }, {
    key: "setParentX",
    value: function setParentX(val) {
      this._parentX = val;

      return this;
    }

    /**
     * [getParentY description]
     * @return {[type]} [description]
     */
  }, {
    key: "setParentY",
    value: function setParentY(val) {
      this._parentY = val;

      return this;
    }

    /**
     * [setX description]
     * @param {[type]} val [description]
     */
  }, {
    key: "setX",
    value: function setX(val) {
      this._x = val;

      return this;
    }

    /**
     * [setY description]
     * @param {[type]} val [description]
     */
  }, {
    key: "setY",
    value: function setY(val) {
      this._y = val;

      return this;
    }
  }]);

  return Point;
})();

exports["default"] = Point;
module.exports = exports["default"];
},{}],5:[function(require,module,exports){
/**
 * @class Sprite
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Point2 = require('./Point');

var _Point3 = _interopRequireDefault(_Point2);

var Sprite = (function (_Point) {
  _inherits(Sprite, _Point);

  /**
   * [constructor description]
   * @return {[type]} [description]
   */

  function Sprite() {
    _classCallCheck(this, Sprite);

    _get(Object.getPrototypeOf(Sprite.prototype), 'constructor', this).call(this);

    this._width = 0;
    this._height = 0;
    this._rotation = 0;
  }

  /**
   * [getHeight description]
   * @return {[type]} [description]
   */

  _createClass(Sprite, [{
    key: 'getHeight',
    value: function getHeight() {
      return this._height;
    }

    /**
     * [getWidth description]
     * @return {[type]} [description]
     */
  }, {
    key: 'getWidth',
    value: function getWidth() {
      return this._width;
    }

    /**
     * [getRotation description]
     * @return {[type]} [description]
     */
  }, {
    key: 'getRotation',
    value: function getRotation() {
      return this._rotation;
    }

    /**
     * [setWidth description]
     * @param {[type]} val [description]
     */
  }, {
    key: 'setWidth',
    value: function setWidth(val) {
      this._width = val;

      return this;
    }

    /**
     * [setHeight description]
     * @param {[type]} val [description]
     */
  }, {
    key: 'setHeight',
    value: function setHeight(val) {
      this._height = val;

      return this;
    }

    /**
     * [setRotation description]
     * @param {[type]} val [description]
     */
  }, {
    key: 'setRotation',
    value: function setRotation(val) {
      this._rotation = val;

      return this;
    }
  }]);

  return Sprite;
})(_Point3['default']);

exports['default'] = Sprite;
module.exports = exports['default'];
},{"./Point":4}],6:[function(require,module,exports){
/**
 * Creates and handles the canvas DOM element
 *
 * @class Viewport
 * @requires {Config} config
 * @requires {object} document
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Viewport = (function () {
    /**
     * [constructor description]
     * @param  {[type]} deps [description]
     * @return {[type]}      [description]
     */

    function Viewport(deps) {
        _classCallCheck(this, Viewport);

        this._deps = deps;

        this._canvas = this._deps.document.createElement('canvas');
        this._context = this._canvas.getContext('2d');

        this._canvas.width = this._deps.config.gameWidth;
        this._canvas.height = this._deps.config.gameHeight;
        this._canvas.style.position = 'absolute';

        this._deps.document.body.appendChild(this._canvas);
    }

    _createClass(Viewport, [{
        key: 'fit',
        value: function fit(left, top, width, height) {
            this._canvas.style.top = Math.round(top) + 'px';
            this._canvas.style.left = Math.round(left) + 'px';
            this._canvas.style.width = Math.round(width) + 'px';
            this._canvas.style.height = Math.round(height) + 'px';
        }
    }, {
        key: 'getContext',
        value: function getContext() {
            return this._context;
        }
    }]);

    return Viewport;
})();

exports['default'] = Viewport;
module.exports = exports['default'];
},{}],7:[function(require,module,exports){
/**
 * Keeps canvas element centered and (with aspect ratio intact) in the viewport
 *
 * @class Cinemize
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cinemize = (function () {
    function Cinemize() {
        _classCallCheck(this, Cinemize);
    }

    _createClass(Cinemize, null, [{
        key: "fit",

        /**
         * @param  {number}
         * @param  {number}
         * @return {object}
         */
        value: function fit(width, height) {
            var LANDSCAPE_RATIO = height / width;
            var PORTRAIT_RATIO = width / height;
            var IS_LANDSCAPE = LANDSCAPE_RATIO < PORTRAIT_RATIO ? true : false;
            var winWidth = window.innerWidth;
            var winHeight = window.innerHeight;
            var winLandscapeRatio = winHeight / winWidth;
            var winPortraitRatio = winWidth / winHeight;
            var offsetLeft = 0;
            var offsetTop = 0;
            var offsetWidth = undefined;
            var offsetHeight = undefined;

            if (IS_LANDSCAPE) {
                if (LANDSCAPE_RATIO < winLandscapeRatio) {
                    offsetWidth = winWidth;
                    offsetHeight = offsetWidth * LANDSCAPE_RATIO;
                    offsetTop = (winHeight - offsetHeight) / 2;
                } else {
                    offsetHeight = winHeight;
                    offsetWidth = winHeight * PORTRAIT_RATIO;
                    offsetLeft = (winWidth - offsetWidth) / 2;
                }
            } else {
                if (PORTRAIT_RATIO < winPortraitRatio) {
                    offsetHeight = winHeight;
                    offsetWidth = winHeight * PORTRAIT_RATIO;
                    offsetLeft = (winWidth - offsetWidth) / 2;
                } else {
                    offsetWidth = winWidth;
                    offsetHeight = offsetWidth * LANDSCAPE_RATIO;
                    offsetTop = (winHeight - offsetHeight) / 2;
                }
            }

            return {
                width: offsetWidth,
                height: offsetHeight,
                left: offsetLeft,
                top: offsetTop
            };
        }
    }]);

    return Cinemize;
})();

exports["default"] = Cinemize;
module.exports = exports["default"];
},{}],8:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _distConfig = require('../../dist/Config');

var _distConfig2 = _interopRequireDefault(_distConfig);

var _distViewport = require('../../dist/Viewport');

var _distViewport2 = _interopRequireDefault(_distViewport);

var _distCanvas = require('../../dist/Canvas');

var _distCanvas2 = _interopRequireDefault(_distCanvas);

var _distGroup = require('../../dist/Group');

var _distGroup2 = _interopRequireDefault(_distGroup);

var _distSprite = require('../../dist/Sprite');

var _distSprite2 = _interopRequireDefault(_distSprite);

var _distLibCinemize = require('../../dist/lib/Cinemize');

var _distLibCinemize2 = _interopRequireDefault(_distLibCinemize);

var Main = function Main() {
    _classCallCheck(this, Main);

    var config = new _distConfig2['default']();
    var viewport = new _distViewport2['default']({
        config: config,
        document: document
    });

    var ltwh = _distLibCinemize2['default'].fit(config.gameWidth, config.gameHeight);
    viewport.fit(ltwh.left, ltwh.top, ltwh.width, ltwh.height);

    var canvas = new _distCanvas2['default']({
        viewport: viewport
    });

    var sprite = new _distSprite2['default']().setWidth(32).setHeight(32);
    var groupA = new _distGroup2['default']();
    var groupB = new _distGroup2['default']().setX(64).setY(64);

    groupB.addChild(sprite);
    groupA.addChild(groupB);

    groupB.setX(-64);
    sprite.setX(64);

    canvas.drawRect(sprite.getGlobalX(), sprite.getGlobalY(), sprite.getWidth(), sprite.getHeight());
};

new Main();

},{"../../dist/Canvas":1,"../../dist/Config":2,"../../dist/Group":3,"../../dist/Sprite":5,"../../dist/Viewport":6,"../../dist/lib/Cinemize":7}]},{},[8]);
