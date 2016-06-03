/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Game = __webpack_require__(1);
	
	var _Game2 = _interopRequireDefault(_Game);
	
	var _State2 = __webpack_require__(15);
	
	var _State3 = _interopRequireDefault(_State2);
	
	var _Bitmap = __webpack_require__(17);
	
	var _Bitmap2 = _interopRequireDefault(_Bitmap);
	
	var _Group = __webpack_require__(16);
	
	var _Group2 = _interopRequireDefault(_Group);
	
	var _Tween = __webpack_require__(18);
	
	var _Tween2 = _interopRequireDefault(_Tween);
	
	var _Animation = __webpack_require__(20);
	
	var _Animation2 = _interopRequireDefault(_Animation);
	
	var _TileMap = __webpack_require__(21);
	
	var _TileMap2 = _interopRequireDefault(_TileMap);
	
	var _collision = __webpack_require__(10);
	
	var _timer = __webpack_require__(23);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SCROLL_SPEED = 176,
	    HERO_ATTACK_TIME = 12,
	    WIDTH = 480,
	    HEIGHT = 320,
	    OPTS = {};
	
	var Demo = function (_State) {
	    _inherits(Demo, _State);
	
	    function Demo(game) {
	        _classCallCheck(this, Demo);
	
	        // preload image, video, audio assets by adding them the preload property
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Demo).call(this, game));
	        // call super to setup your new state with all the goodies in the game object
	
	
	        _this.preload = ["assets/images/bg.png", "assets/images/Mayla.png"];
	
	        // set the state's background color
	        _this.bgColor = "#000";
	
	        // create the tilemap for the bg
	        _this.bg = new _TileMap2.default(0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], {
	            width: 64,
	            height: 320,
	            rowLength: 11,
	            legend: ["assets/images/bg.png"]
	        });
	
	        // create a sprite and add it to the stage for updating/rendering
	        _this.hero = new _Bitmap2.default(64, 192, 64, 64, "assets/images/Mayla.png");
	        _this.hero.srcWidth = 64;
	        _this.hero.srcHeight = 64;
	        // add and play run animation
	        _this.hero.addAnimation("run", new _Animation2.default([64, 128, 192, 256], 0, 8));
	        _this.hero.playAnimation("run", true);
	
	        // create enenmy group
	        _this.enemyGroup = new _Group2.default();
	
	        // add all items to the stage
	        _this.stage.addItems(_this.bg, _this.hero, _this.enemyGroup);
	
	        // add a click listener and handler
	        _this.game.input.addListener("click", _this.onClick.bind(_this));
	        return _this;
	    }
	
	    _createClass(Demo, [{
	        key: "addEnemy",
	        value: function addEnemy() {
	            var enemy = new _Bitmap2.default(WIDTH + 64, 192, 64, 64, "assets/images/Mayla.png");
	            enemy.srcWidth = 64;
	            enemy.srcHeight = 64;
	            this.enemyGroup.addItem(enemy);
	
	            this.enemyTimer = new _timer.Timer(this.addEnemy, Math.round(Math.random() * 1000) + 1000, this);
	        }
	    }, {
	        key: "init",
	        value: function init() {
	            // initialize some props
	            this.bg.x = 0;
	            this.heroAttacking = false;
	            this.enemyGroup.removeAll();
	
	            if (this.enemyTimer) {
	                this.enemyTimer.clear();
	            }
	
	            this.addEnemy();
	        }
	    }, {
	        key: "onClick",
	        value: function onClick(e) {
	            this.heroAttacking = true;
	            this.heroAttackTime = HERO_ATTACK_TIME;
	        }
	    }, {
	        key: "update",
	        value: function update(factor) {
	            var _this2 = this;
	
	            if (this.bg.x > -128) {
	                this.bg.translate(-SCROLL_SPEED * factor);
	            } else {
	                this.bg.x = this.bg.x * factor;
	            }
	
	            if (this.heroAttackTime) {
	                this.heroAttackTime -= 1;
	            } else {
	                this.heroAttacking = false;
	            }
	
	            this.enemyGroup.each(function (enemy) {
	                enemy.translate(-SCROLL_SPEED * factor);
	            });
	
	            this.enemyGroup.each(function (enemy) {
	                if ((0, _collision.rectRectCollide)(_this2.hero, enemy)) {
	                    _this2.enemyGroup.remove(enemy);
	
	                    if (_this2.heroAttacking) {
	                        console.log("GOT ONE!!!!");
	                    } else {
	                        _this2.init();
	                        console.log("START");
	                    }
	                }
	            }, this);
	
	            _get(Object.getPrototypeOf(Demo.prototype), "update", this).call(this, factor);
	        }
	    }]);
	
	    return Demo;
	}(_State3.default);
	
	// Make magic!
	
	
	new _Game2.default(WIDTH, HEIGHT, OPTS, {
	    state: Demo,
	    name: "demo"
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Camera = __webpack_require__(2);
	
	var _Camera2 = _interopRequireDefault(_Camera);
	
	var _Canvas = __webpack_require__(3);
	
	var _Canvas2 = _interopRequireDefault(_Canvas);
	
	var _FSM = __webpack_require__(6);
	
	var _FSM2 = _interopRequireDefault(_FSM);
	
	var _Input = __webpack_require__(7);
	
	var _Input2 = _interopRequireDefault(_Input);
	
	var _Ticker = __webpack_require__(11);
	
	var _Ticker2 = _interopRequireDefault(_Ticker);
	
	var _Viewport = __webpack_require__(12);
	
	var _Viewport2 = _interopRequireDefault(_Viewport);
	
	var _Preloader = __webpack_require__(14);
	
	var _Preloader2 = _interopRequireDefault(_Preloader);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Store = function () {
	    function Store() {
	        _classCallCheck(this, Store);
	
	        this._items = {};
	    }
	
	    _createClass(Store, [{
	        key: "getItem",
	        value: function getItem(key) {
	            return this._items[key];
	        }
	    }, {
	        key: "setItem",
	        value: function setItem(key, val) {
	            this._items[key] = val;
	        }
	    }, {
	        key: "setItems",
	        value: function setItems(obj) {
	            for (var key in obj) {
	                this._items[keys] = obj[keys];
	            }
	        }
	    }, {
	        key: "clear",
	        value: function clear(key) {
	            if (typeof key === "string") {
	                var item = this._items[key];
	                this._items[key] = Array.isArray(item) ? [] : {};
	            } else {
	                this._items = {};
	            }
	        }
	    }, {
	        key: "serialize",
	        value: function serialize(key) {
	            if (typeof key === "string") {
	                return JSON.stringify(this._items[key]);
	            } else {
	                return JSON.stringify(this._items);
	            }
	        }
	    }, {
	        key: "deserialize",
	        value: function deserialize(data) {
	            return JSON.parse(data);
	        }
	    }]);
	
	    return Store;
	}();
	
	/**
	 * The Game object sets all core module instances as properties. It also takes width/height properties of the game
	 * and takes the states for adding to the FSM; the first being the initially loaded state.
	 * @class Game
	 * @param {Integer} width The game width
	 * @param {Integer} height The game height
	 * @param {Object}  ]options] The game options
	 * @param {Boolean} [options.container]         Container element for Spritewerk elements, defaults to <body>
	 * @param {Boolean} [options.listenForMouse]    Whether or not to listen for mouse events
	 * @param {Boolean} [options.listenForTouch]    Whether or not to listen for touch events
	 * @param {Boolean} [options.listenForKeyboard] Whether or not to listen for keyboard events
	 * @param {Boolean} [options.combineMouseAndClick] Combines mouse and touch events
	 *                                                 eg: `click` triggers `tap` and visa-versa
	 * @param {...State} states A key/val pair of the state and its name
	 */
	
	
	var Game = function Game(width, height) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	    _classCallCheck(this, Game);
	
	    this.width = width;
	    this.height = height;
	    this.viewport = new _Viewport2.default(width, height, options);
	    this.ticker = new _Ticker2.default();
	    this.camera = new _Camera2.default(0, 0, width, height);
	    this.input = new _Input2.default(this.viewport.canvasElement, options);
	    this.canvas = new _Canvas2.default(this.viewport.canvasElement, this.camera);
	    this.fsm = new _FSM2.default(this.canvas, this.ticker, _Preloader2.default, this);
	    this.store = new Store();
	
	    var initialStateName = void 0;
	
	    for (var _len = arguments.length, states = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
	        states[_key - 3] = arguments[_key];
	    }
	
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	        for (var _iterator = states[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var state = _step.value;
	
	            if (!initialStateName) {
	                initialStateName = state.name;
	            }
	
	            this.fsm.add(state.state, state.name, state.args);
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	
	    this.fsm.load(initialStateName);
	};
	
	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Display various areas of the game
	 * @class Camera
	 * @param  {Number} x     
	 * @param  {Number} y     
	 * @param  {Number} width 
	 * @param  {Number} height
	 */
	
	var Camera = function () {
	    function Camera() {
	        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	        var width = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	        var height = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	
	        _classCallCheck(this, Camera);
	
	        this._x = x;
	        this._y = y;
	        this._width = width;
	        this._height = height;
	    }
	
	    /**
	     * @method translate
	     * @param  {Float} x The new position
	     * @param  {Float} y The new position
	     */
	
	
	    _createClass(Camera, [{
	        key: "translate",
	        value: function translate() {
	            var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	            var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	            this._x += x;
	            this._y += y;
	        }
	    }, {
	        key: "x",
	        get: function get() {
	            return this._x;
	        },
	        set: function set(val) {
	            this._x = val;
	        }
	    }, {
	        key: "y",
	        get: function get() {
	            return this._y;
	        },
	        set: function set(val) {
	            this._y = val;
	        }
	    }, {
	        key: "width",
	        get: function get() {
	            return this._width;
	        },
	        set: function set(val) {
	            this._width = val;
	        }
	    }, {
	        key: "height",
	        get: function get() {
	            return this._height;
	        },
	        set: function set(val) {
	            this._height = val;
	        }
	    }]);
	
	    return Camera;
	}();
	
	exports.default = Camera;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Sprite = __webpack_require__(4);
	
	var _Sprite2 = _interopRequireDefault(_Sprite);
	
	var _Collection = __webpack_require__(5);
	
	var _Collection2 = _interopRequireDefault(_Collection);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Handles rendering entities onto the canvas element
	 * @class Canvas
	 * @param {HTMLElement} canvas The active canvas element
	 * @param {Camera}      camera The camera instance
	 */
	
	var Canvas = function () {
	    function Canvas(canvas, camera) {
	        _classCallCheck(this, Canvas);
	
	        this._canvas = canvas;
	        this._camera = camera;
	        this._context = this._canvas.getContext("2d");
	        this._imageSmoothing = false;
	
	        Canvas.Collection = _Collection2.default;
	        Canvas.Sprite = _Sprite2.default;
	
	        this.imageSmoothing = false;
	    }
	
	    _createClass(Canvas, [{
	        key: "_isVisible",
	        value: function _isVisible(entity) {
	            var bb = entity.getBoundingBox();
	            return bb.maxX > 0 && bb.minX < this._canvas.width && bb.maxY > 0 && bb.minY < this._canvas.height;
	        }
	
	        /**
	         * Clears the entire canvas and optionally fills with a color
	         *
	         * @method Canvas#clear
	         * @param  {String} [color] If passed, will fill the canvas with the color value
	         */
	
	    }, {
	        key: "clear",
	        value: function clear(color) {
	            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
	
	            if (color) {
	                this._context.save();
	                this._context.fillStyle = color;
	                this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
	                this._context.restore();
	            }
	        }
	
	        /**
	         * Offsets canvas based on camera and calls an entity's render method passing the context.
	         * Saves and restores context and beginning and end of operation.
	         * Resets `dirty` on entities.
	         *
	         * @method Canvas#render
	         * @param  {Sprite} entity Any renderable entity
	         */
	
	    }, {
	        key: "render",
	        value: function render(entity) {
	            var _this = this;
	
	            this._context.translate(-this._camera.x, -this._camera.y);
	
	            if (entity instanceof Canvas.Collection) {
	                entity.each(function (item) {
	                    _this.render(item);
	                }, this);
	            }
	
	            if (entity instanceof Canvas.Sprite) {
	                this._context.save();
	
	                if (this._isVisible(entity)) {
	                    entity.render(this._context);
	                }
	
	                this._context.restore();
	                entity.dirty = false;
	            }
	        }
	
	        /**
	         * Set the context image smoothing
	         *
	         * @method Canvas#setImageSmoothing
	         * @param  {Boolean} val The image smoothing value
	         */
	
	    }, {
	        key: "imageSmoothing",
	        set: function set(val) {
	            this._imageSmoothing = val;
	            this._context.imageSmoothingEnabled = this._imageSmoothingEnabled;
	            this._context.mozImageSmoothingEnabled = this._imageSmoothingEnabled;
	            this._context.webkitImageSmoothingEnabled = this._imageSmoothingEnabled;
	            this._context.msImageSmoothingEnabled = this._imageSmoothingEnabled;
	
	            return this;
	        }
	    }]);
	
	    return Canvas;
	}();
	
	exports.default = Canvas;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SOURCE_OVER = "source-over";
	var SOURCE_IN = "source-in";
	var SOURCE_OUT = "source-out";
	var SOURCE_ATOP = "source-atop";
	var DESTINATION_OVER = "destination-over";
	var DESTINATION_IN = "destination-in";
	var DESTINATION_OUT = "destination-out";
	var DESTINATION_ATOP = "destination-atop";
	var LIGHTER = "lighter";
	var COPY = "copy";
	var XOR = "xor";
	var MULTIPLY = "multiply";
	var SCREEN = "screen";
	var OVERLAY = "overlay";
	var DARKEN = "darken";
	var LIGHTEN = "lighten";
	var COLOR_DODGE = "color-dodge";
	var COLOR_BURN = "color-burn";
	var HARD_LIGHT = "hard-light";
	var SOFT_LIGHT = "soft-light";
	var DIFFERENCE = "difference";
	var EXCLUSION = "exclusion";
	var HUE = "hue";
	var SATURATION = "saturation";
	var COLOR = "color";
	var LUMINOSITY = "luminosity";
	
	/**
	 * The base class for display objects. Sprite is an observable, physical body with coordinates and size
	 * @class Sprite
	 * @param {Number} x=0      [description]
	 * @param {Number} y=0      [description]
	 * @param {Number} width=0  [description]
	 * @param {Number} height=0 [description]
	 */
	
	var Sprite = function () {
	    function Sprite() {
	        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	        var width = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	        var height = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	
	        _classCallCheck(this, Sprite);
	
	        this._x = x;
	        this._y = y;
	        this._pivotX = 0;
	        this._pivotY = 0;
	        this._width = width;
	        this._height = height;
	        this._sx = 1;
	        this._sy = 1;
	        this._rotation = 0;
	        this._opacity = 1;
	        this._composite = "source-over";
	        this._visible = true;
	        this._tweens = [];
	        // used to safely cache expensive operations. Set to true on each `set` and cleared after each `render`
	        this._dirty = true;
	
	        this._uuid = Sprite.uuidCount++;
	    }
	
	    /**
	     * @method Sprite#addTween
	     * @param  {Tween} tween A new tween instance
	     */
	
	
	    _createClass(Sprite, [{
	        key: "addTween",
	        value: function addTween(tween) {
	            this._tweens.push(tween);
	        }
	    }, {
	        key: "centerPivot",
	        value: function centerPivot() {
	            this._pivotX = this._width / 2 * this._sx;
	            this._pivotY = this._height / 2 * this._sy;
	        }
	    }, {
	        key: "getBoundingBox",
	        value: function getBoundingBox() {
	            return {
	                minX: this._x,
	                minY: this._y,
	                maxX: (this._x + this._width) * this._sx,
	                maxY: (this._y + this._height) * this._sy
	            };
	        }
	    }, {
	        key: "translate",
	        value: function translate(x, y) {
	            this._x += typeof x === "number" ? x : 0;
	            this._y += typeof y === "number" ? y : 0;
	        }
	    }, {
	        key: "render",
	        value: function render(context) {
	            if (this.opacity !== 1) {
	                context.globalAlpha = this.opacity;
	            }
	
	            if (this.composite !== "source-over") {
	                context.globalCompositeOperation = this.composite;
	            }
	
	            var px = Math.floor(this._pivotX);
	            var py = Math.floor(this._pivotY);
	
	            context.translate(Math.floor(this._x), Math.floor(this._y));
	            context.translate(px, py);
	
	            if (this.sx !== 1 || this.sy !== 1) {
	                context.scale(this.sx, this.sy);
	            }
	
	            if (this.rotation !== 0) {
	                context.rotate(this.rotation);
	            }
	
	            context.translate(-px, -py);
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            for (var i = 0, len = this._tweens.length; i < len; i++) {
	                var tween = this._tweens[i];
	                tween.update(this);
	
	                if (tween.isComplete()) {
	                    this._tweens.splice(i, 1);
	                }
	            }
	        }
	    }, {
	        key: "composite",
	        get: function get() {
	            return this._composite;
	        },
	        set: function set(val) {
	            switch (val) {
	                case SOURCE_OVER:
	                case SOURCE_IN:
	                case SOURCE_OUT:
	                case SOURCE_ATOP:
	                case DESTINATION_OVER:
	                case DESTINATION_IN:
	                case DESTINATION_OUT:
	                case DESTINATION_ATOP:
	                case LIGHTER:
	                case COPY:
	                case XOR:
	                case MULTIPLY:
	                case SCREEN:
	                case OVERLAY:
	                case DARKEN:
	                case LIGHTEN:
	                case COLOR_DODGE:
	                case COLOR_BURN:
	                case HARD_LIGHT:
	                case SOFT_LIGHT:
	                case DIFFERENCE:
	                case EXCLUSION:
	                case HUE:
	                case SATURATION:
	                case COLOR:
	                case LUMINOSITY:
	                    this._composite = val;
	                    break;
	                default:
	                    throw new Error("Sprite#set composite: value must be one of globalCompositeOperation enum.");
	            }
	
	            this._dirty = true;
	        }
	    }, {
	        key: "opacity",
	        get: function get() {
	            return this._opacity;
	        },
	        set: function set(val) {
	            this._opacity = val;
	            this._dirty = true;
	        }
	    }, {
	        key: "x",
	        get: function get() {
	            return this._x;
	        },
	        set: function set(val) {
	            this._x = val;
	            this._dirty = true;
	        }
	    }, {
	        key: "y",
	        get: function get() {
	            return this._y;
	        },
	        set: function set(val) {
	            this._y = val;
	            this._dirty = true;
	        }
	    }, {
	        key: "width",
	        get: function get() {
	            return this._width;
	        },
	        set: function set(val) {
	            this._width = val;
	            this._dirty = true;
	        }
	    }, {
	        key: "height",
	        get: function get() {
	            return this._height;
	        },
	        set: function set(val) {
	            this._height = val;
	            this._dirty = true;
	        }
	    }, {
	        key: "sx",
	        get: function get() {
	            return this._sx;
	        },
	        set: function set(val) {
	            this._sx = val;
	            this._dirty = true;
	        }
	    }, {
	        key: "sy",
	        get: function get() {
	            return this._sy;
	        },
	        set: function set(val) {
	            this._sy = val;
	            this._dirty = true;
	        }
	    }, {
	        key: "rotation",
	        get: function get() {
	            return this._rotation;
	        },
	        set: function set(val) {
	            this._rotation = val;
	            this._dirty = true;
	        }
	    }, {
	        key: "visible",
	        get: function get() {
	            return this._visible;
	        },
	        set: function set(val) {
	            this._visible = val;
	            this._dirty = true;
	        }
	    }, {
	        key: "uuid",
	        get: function get() {
	            return this._uuid;
	        }
	    }, {
	        key: "pivotX",
	        set: function set(val) {
	            this._pivotX = val;
	            this._dirty = true;
	        }
	    }, {
	        key: "pivotY",
	        set: function set(val) {
	            this._pivotY = val;
	            this._dirty = true;
	        }
	    }]);
	
	    return Sprite;
	}();
	
	Sprite.uuidCount = 0;
	
	exports.default = Sprite;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @typedef  {Object} CollectionItem The collection item
	 * @property {String} name The item's name
	 * @property {Body}   item The item
	 */
	
	/**
	 * Provides a list for getting, setting, sorting, & removing entities by name
	 * @class Collection
	 */
	
	var Collection = function () {
	    function Collection() {
	        _classCallCheck(this, Collection);
	
	        this._items = [];
	    }
	
	    /**
	     * Returns the item CollectionItem object
	     * @method Collection#_getRawItem
	     * @param  {String} name
	     * @return {CollectionItem}
	     * @private
	     */
	
	
	    _createClass(Collection, [{
	        key: "_getRawItem",
	        value: function _getRawItem(name) {
	            var item = void 0;
	
	            this._rawEach(function (iterItem, i, iterName) {
	                if (name === iterName) {
	                    item = iterItem;
	
	                    return false;
	                }
	            });
	
	            return item;
	        }
	
	        /**
	         * Iterates the collection's sorted items. The raw item, index, name, and the
	         * list being iterated are supplied to the provided function
	         * @method Collection#_rawEach
	         * @param {Function} fn
	         * @private
	         */
	
	    }, {
	        key: "_rawEach",
	        value: function _rawEach(fn) {
	            for (var i = 0, len = this._items.length; i < len; i += 1) {
	                if (fn(this._items[i], i, this._items[i].name, this._items) === false) {
	                    break;
	                }
	            }
	        }
	
	        /**
	         * Add an item with optional name
	         * @method Collection#addItem
	         * @param  {Any}        item   The item to add
	         * @param  {String}     [name] The optional name of the item
	         * @return {Collection}
	         */
	
	    }, {
	        key: "addItem",
	        value: function addItem(item, name) {
	            name = name || "";
	
	            this._items.push({
	                item: item, name: name
	            });
	
	            return this;
	        }
	
	        /**
	         * Add multiple items
	         * @method Collection#addItems
	         * @param  {(...CollectionItem|Body)} items Can be the object itself or an object containing the entity and its name
	         * @return {Collection}
	         */
	
	    }, {
	        key: "addItems",
	        value: function addItems() {
	            for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
	                items[_key] = arguments[_key];
	            }
	
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var item = _step.value;
	
	                    if (_typeof(item.item) === "object" && typeof item.name === "string") {
	                        // if item has item/name structure
	                        this.addItem(item.item, item.name);
	                    } else {
	                        // for convenience allow user to add just item
	                        this.addItem(item);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	
	            return this;
	        }
	
	        /**
	         * Iterates the collection's sorted items. The item, index, and name are supplied
	         * to the provided function
	         * @method Collection#each
	         * @param {Function} fn      The function to execute on the iterable
	         * @param {Object}   [scope] The scope with which to execute the function
	         */
	
	    }, {
	        key: "each",
	        value: function each(fn, scope) {
	            fn = scope ? fn.bind(scope) : fn;
	
	            for (var i = 0, len = this._items.length; i < len; i++) {
	                var item = this._items[i],
	                    doContinue = void 0;
	
	                // if item on last item and an item is removed
	                if (!item) {
	                    break;
	                }
	
	                doContinue = fn(item.item, i, item.name);
	
	                if (doContinue === false) {
	                    break;
	                }
	            }
	        }
	
	        /**
	         * iterates items and return the ones that meet criteria
	         * @method Collection#filter
	         * @param  {Function} fn      Truth predicate
	         * @param  {Object}   [scope] The scope in which to execute the function
	         * @return {Array}
	         */
	
	    }, {
	        key: "filter",
	        value: function filter(fn, scope) {
	            var filteredItems = [];
	
	            this.each(function (item, i, name) {
	                var predicate = fn(item, i, name);
	
	                if (predicate) {
	                    filteredItems.push(item);
	                }
	            }, scope);
	
	            return filteredItems;
	        }
	
	        /**
	         * Returns a list of just the items
	         * @method Collection#getArray
	         * @return {Array}
	         */
	
	    }, {
	        key: "getArray",
	        value: function getArray() {
	            return this._items.map(function (item) {
	                return item.item;
	            });
	        }
	
	        /**
	         * Returns an existing item by name, or undefined if the name is not found
	         *
	         * @param  {String} name The name of the item
	         * @return {(Body|undefined)}
	         */
	
	    }, {
	        key: "getItem",
	        value: function getItem(name) {
	            var item = void 0;
	
	            this.each(function (iterItem, i, iterName) {
	                if (name === iterName) {
	                    item = iterItem;
	
	                    return false;
	                }
	            });
	
	            return item;
	        }
	
	        /**
	         * Returns an existing item by index
	         *
	         * @param  {Integer} index
	         * @return {Body}
	         */
	
	    }, {
	        key: "getAt",
	        value: function getAt(index) {
	            return this._items[index].item;
	        }
	
	        /**
	         * Returns the count of items in collection
	         *
	         * @return {Integer}
	         */
	
	    }, {
	        key: "getCount",
	        value: function getCount() {
	            return this._items.length;
	        }
	
	        /**
	         * Returns an item's current index
	         *
	         * @param  {String} name
	         * @return {Integer}
	         */
	
	    }, {
	        key: "getIndexWithName",
	        value: function getIndexWithName(name) {
	            var index = void 0;
	
	            this.each(function (iterItem, i, iterName) {
	                if (name === iterName) {
	                    index = i;
	
	                    return false;
	                }
	            });
	
	            return index;
	        }
	
	        /**
	         * Removes all items from collection
	         */
	
	    }, {
	        key: "removeAll",
	        value: function removeAll() {
	            this._items = [];
	        }
	
	        /**
	         * Removes an object by name
	         * @method Collection#removeWithName
	         * @param  {String}  name
	         * @return {Boolean} Returns true if item removed, false if not
	         */
	
	    }, {
	        key: "removeWithName",
	        value: function removeWithName(name) {
	            var removed = false;
	
	            this._rawEach(function (iterItem, i, iterName, items) {
	                if (name === iterName) {
	                    iterItem = null;
	                    items.splice(i, 1);
	                    removed = true;
	
	                    // break out of loop
	                    return false;
	                }
	            });
	
	            return removed;
	        }
	    }, {
	        key: "remove",
	        value: function remove(item) {
	            var removed = false;
	
	            this._rawEach(function (iterItem, i, iterName, items) {
	                if (item.uuid === iterItem.item.uuid) {
	                    iterItem = null;
	                    items.splice(i, 1);
	                    removed = true;
	
	                    // break out of loop
	                    return false;
	                }
	            });
	
	            return removed;
	        }
	
	        /**
	         * Assigns a new value to an existing item
	         * @param {String} name  The name of the object to modify
	         * @param {Any}    value The new value
	         */
	
	    }, {
	        key: "update",
	        value: function update(name, value) {
	            this._rawEach(function (iterItem, i, iterName) {
	                if (name === iterName) {
	                    iterItem.item = value;
	
	                    // break out of loop
	                    return false;
	                }
	            });
	        }
	
	        /**
	         * Moves item to new index
	         * @param {String}  name  The name of the object being moved
	         * @param {Integer} index The item's new index
	         */
	
	    }, {
	        key: "setIndex",
	        value: function setIndex(name, index) {
	            var item = void 0;
	            var currentIndex = this.getIndexWithName(name);
	
	            if (index === currentIndex) {
	                return;
	            }
	
	            item = this._getRawItem(name);
	            this.removeWithName(name);
	            this._items.splice(index, 0, item);
	        }
	    }]);
	
	    return Collection;
	}();
	
	exports.default = Collection;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * A Finite State Manager (or possibly Flying Spaghetti Monster) that preloads, updates, and cleans up the various game states.
	 * Accepts an object of the following schema:
	<code>{
	    // optional property of paths to assets to preload
	    preload: [
	        "path/to/assets",
	        ...
	    ],
	    init: function () {
	        // initialize entities etc.
	    },
	    update: function (factor) {
	        // do stuff pre tick
	    },
	    render: function (factor) {
	        // render everything on the state's stage
	    },
	    destroy: function () {
	        // remove event listeners
	    }
	}</code>
	 * @class FSM
	 * @param {Canvas}    canvas    A Canvas instance
	 * @param {Ticker}    ticker    A ticker instance
	 * @param {Preloader} Preloader The Preloader
	 * @param {Game}      game      The game instance
	 */
	
	var FSM = function () {
	    function FSM(canvas, ticker, Preloader, game) {
	        _classCallCheck(this, FSM);
	
	        this._canvas = canvas;
	        this._ticker = ticker;
	        this._preloader = Preloader;
	        this._game = game;
	        this._loading = false;
	        this._states = [];
	
	        this._ticker.onPreTick = this._onPreTick.bind(this);
	        this._ticker.onTick = this._onTick.bind(this);
	    }
	
	    /**
	     * Calls the current state's update function. Passes the factor from {@link Ticker}
	     *
	     * @method FSM#_onTick
	     * @param  {Float} factor The time delta
	     */
	
	
	    _createClass(FSM, [{
	        key: "_onPreTick",
	        value: function _onPreTick(factor) {
	            if (!this._loading && this._mounted) {
	                this._mounted.state.update(factor);
	            }
	        }
	
	        /**
	         * Calls the current state's render function.
	         * @method FSM#_onTick
	         */
	
	    }, {
	        key: "_onTick",
	        value: function _onTick() {
	            if (!this._loading && this._mounted) {
	                this._canvas.clear(this._mounted.state.bgColor);
	                this._canvas.render(this._mounted.state.stage);
	            }
	        }
	
	        /**
	         * Add a state to the states list
	         * @method FSM#add
	         * @param  {State}  state  The new state instance
	         * @param  {String} name   The state name
	         * @param  {...Any} [args] The arguments for the constructor
	         */
	
	    }, {
	        key: "add",
	        value: function add(State, name) {
	            for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	                args[_key - 2] = arguments[_key];
	            }
	
	            this._states[name] = {
	                state: new State(this._game, args),
	                args: args
	            };
	        }
	
	        /**
	         * If another state is loaded, destroy it, then set up (and preload if necessary) the named state
	         * @method FSM#load
	         * @param {String} name The name of the state to load
	         */
	
	    }, {
	        key: "load",
	        value: function load(name) {
	            var _this = this;
	
	            this._loading = true;
	
	            if (this._mounted) {
	                this._mounted.state.destroy(this._game);
	            }
	
	            if (this._states[name]) {
	                this._mounted = this._states[name];
	            } else {
	                throw new Error("No state found with the name \"" + name + "\"");
	            }
	
	            if (this._mounted.state.preload.length) {
	                this._preloader.complete = function () {
	                    _this._mounted.state.init(_this._game);
	                    _this._loading = false;
	                };
	
	                this._preloader.load(this._mounted.state.preload);
	            } else {
	                this._loading = false;
	                this._mounted.state.init(this._game);
	            }
	        }
	    }]);
	
	    return FSM;
	}();
	
	exports.default = FSM;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Radio = __webpack_require__(8);
	
	var _Radio2 = _interopRequireDefault(_Radio);
	
	var _keycodes = __webpack_require__(9);
	
	var _keycodes2 = _interopRequireDefault(_keycodes);
	
	var _collision = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @class       Input
	 * @description A module for handling keyboard, mouse, and touch events on the canvas
	 * @author      Chris Peters
	 * @requires    Radio
	 * @requires    lib/keycodes
	 *
	 * @param {HTMLEntity} canvas The canvas element to interact with
	 * @param {Object}     [opts]
	 * @param {Boolean}    [opts.listenForMouse]    Whether or not to listen for mouse events
	 * @param {Boolean}    [opts.listenForTouch]    Whether or not to listen for touch events
	 * @param {Boolean}    [opts.listenForKeyboard] Whether or not to listen for keyboard events
	 * @param {Boolean}    [opts.combineMouseAndTouch] Combines mouse and touch events
	 *                                                 eg: `click` triggers `tap` and visa-versa
	 * @param {Function}   [opts.hitTest] User defined hitTest method
	 * @param {Object}     [opts.window] window object for testing
	 * @param {Object}     [opts.document] document object for testing
	 */
	
	var Input = function () {
	    function Input(canvas) {
	        var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	        _classCallCheck(this, Input);
	
	        // options
	        this._canvas = canvas;
	        this._listenForMouse = opts.listenForMouse !== undefined ? opts.listenForMouse : true;
	        this._listenForTouch = opts.listenForTouch !== undefined ? opts.listenForTouch : true;
	        this._listenForKeyboard = opts.listenForKeyboard !== undefined ? opts.listenForKeyboard : true;
	        this._combineMouseAndTouch = opts.combineMouseAndTouch !== undefined ? opts.combineMouseAndTouch : false;
	        this._hitTest = opts.hitTest !== undefined ? opts.hitTest : _collision.pointRectCollide;
	        this._window = opts.window || window;
	        this._document = opts.document || document;
	
	        this._uiEvents = {
	            DBL_CLICK: "dblclick",
	            DBL_TAP: "dbltap",
	
	            DRAG: "drag",
	            DRAG_END: "dragend",
	            DRAG_START: "dragstart",
	
	            CLICK: "click",
	            TAP: "tap",
	
	            MOUSE_DOWN: "mousedown",
	            MOUSE_UP: "mouseup",
	            TOUCH_START: "touchstart",
	            TOUCH_END: "touchend",
	
	            MOUSE_MOVE: "mousemove",
	            TOUCH_MOVE: "touchmove",
	
	            KEY_UP: "keyup",
	            KEY_DOWN: "keydown"
	        };
	
	        // listeners values are arrays of objects containing handlers and (optional) targets
	        // eg: this._listeners.keyup = [{
	        //         handler: function () {...},
	        //         target: { name: "foo", x: 32, y: 64, ...}
	        //     }];
	        this._listeners = {};
	
	        for (var key in this._uiEvents) {
	            this._listeners[this._uiEvents[key]] = [];
	        }
	
	        this._keycodes = _keycodes2.default;
	        this._canDrag = false;
	        this._isDragging = false;
	        this._keysDown = {};
	        this._userHitTestMethod = null;
	        this._queuedEvents = [];
	        this._draggableHandlers = [];
	
	        if (this._listenForKeyboard) {
	            this._addKeyboardListeners();
	        }
	
	        if (this._listenForMouse) {
	            this._enqueuePointerEvents = this._enqueuePointerEvents.bind(this);
	            this._addMouseListeners();
	        }
	
	        if (this._listenForTouch) {
	            this._addTouchListeners();
	        }
	
	        this._onTick = this._onTick.bind(this);
	        _Radio2.default.tuneIn(this._document, "pretick", this._onTick);
	    }
	
	    /**
	     * Adds keyboard listeners
	     *
	     * @method Input#_addKeyboardListeners
	     * @private
	     */
	
	
	    _createClass(Input, [{
	        key: "_addKeyboardListeners",
	        value: function _addKeyboardListeners() {
	            var events = ["keyup", "keydown"];
	            this._enqueueKeyboardEvents = this._enqueueKeyboardEvents.bind(this);
	
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var event = _step.value;
	
	                    _Radio2.default.tuneIn(this._canvas, event, this._enqueueKeyboardEvents);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	
	        /**
	         * Adds mouse listeners
	         *
	         * @method Input#_addMouseListeners
	         * @private
	         */
	
	    }, {
	        key: "_addMouseListeners",
	        value: function _addMouseListeners() {
	            var events = ["click", "dblclick", "mousedown", "mouseup", "mousemove"];
	
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = events[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var event = _step2.value;
	
	                    _Radio2.default.tuneIn(this._canvas, event, this._enqueuePointerEvents);
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }
	
	        /**
	         * Adds touch listeners
	         *
	         * @method Input#_addTouchListeners
	         * @private
	         */
	
	    }, {
	        key: "_addTouchListeners",
	        value: function _addTouchListeners() {
	            var events = ["tap", "dbltap", "touchstart", "touchend", "touchmove"];
	
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;
	
	            try {
	                for (var _iterator3 = events[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var event = _step3.value;
	
	                    _Radio2.default.tuneIn(this._canvas, event, this._enqueuePointerEvents);
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	        }
	
	        /**
	         * Handler for DOM events. Creates custom event object with helpful properties
	         *
	         * @method Input#_enqueueKeyboardEvents
	         * @param {object} inputEvent the DOM input event object
	         * @private
	         */
	
	    }, {
	        key: "_enqueueKeyboardEvents",
	        value: function _enqueueKeyboardEvents(inputEvent) {
	            inputEvent.preventDefault();
	            inputEvent.stopPropagation();
	
	            var keyName = this._keycodes[inputEvent.keyCode];
	            var event = {
	                domEvent: inputEvent,
	                type: inputEvent.type,
	                keyCode: inputEvent.keyCode,
	                // only pass the default character not the `Shift` alternate
	                keyName: (typeof keyName === "undefined" ? "undefined" : _typeof(keyName)) === "object" && keyName.length ? keyName[0] : keyName
	            };
	
	            switch (event.type) {
	                case this._uiEvents.KEY_DOWN:
	                    this._keysDown[keyName] = inputEvent.keyCode;
	                    break;
	                case this._uiEvents.KEY_UP:
	                    delete this._keysDown[keyName];
	                    break;
	            }
	
	            event.keysDown = this.getKeysDown();
	
	            this._queuedEvents.push(event);
	        }
	
	        /**
	         * Handler for DOM events. Creates custom event object with helpful properties
	         * Creates event objects with x/y coordinates
	         * Not currently supporting multi-touch
	         *
	         * @method Input#_enqueueEvents
	         * @param {object} inputEvent The DOM input event object
	         */
	
	    }, {
	        key: "_enqueuePointerEvents",
	        value: function _enqueuePointerEvents(inputEvent) {
	            inputEvent.preventDefault();
	            inputEvent.stopPropagation();
	
	            var event = {
	                domEvent: inputEvent,
	                type: inputEvent.type
	            };
	
	            if (inputEvent.touches && inputEvent.touches.length) {
	                event.x = inputEvent.touches[0].pageX;
	                event.y = inputEvent.touches[0].pageY;
	            } else if (inputEvent.changedTouches && inputEvent.changedTouches.length) {
	                event.x = inputEvent.changedTouches[0].pageX;
	                event.y = inputEvent.changedTouches[0].pageY;
	            } else {
	                event.x = inputEvent.pageX;
	                event.y = inputEvent.pageY;
	            }
	
	            // push the event regardless of type
	            this._queuedEvents.push(event);
	
	            if (this._combineMouseAndTouch) {
	                switch (event.type) {
	                    case this._uiEvents.MOUSE_DOWN:
	                        this._queuedEvents.push(Object.assign({}, event, {
	                            type: this._uiEvents.TOUCH_START
	                        }));
	                        break;
	                    case this._uiEvents.MOUSE_UP:
	                        this._queuedEvents.push(Object.assign({}, event, {
	                            type: this._uiEvents.TOUCH_END
	                        }));
	                        break;
	                    case this._uiEvents.CLICK:
	                        this._queuedEvents.push(Object.assign({}, event, {
	                            type: this._uiEvents.TAP
	                        }));
	                        break;
	                    case this._uiEvents.TOUCH_START:
	                        this._queuedEvents.push(Object.assign({}, event, {
	                            type: this._uiEvents.MOUSE_DOWN
	                        }));
	                        break;
	                    case this._uiEvents.TOUCH_END:
	                        this._queuedEvents.push(Object.assign({}, event, {
	                            type: this._uiEvents.MOUSE_UP
	                        }));
	                        break;
	                    case this._uiEvents.TAP:
	                        this._queuedEvents.push(Object.assign({}, event, {
	                            type: this._uiEvents.CLICK
	                        }));
	                        break;
	                }
	            }
	
	            // check for drag simulation
	            switch (event.type) {
	                case this._uiEvents.MOUSE_DOWN:
	                case this._uiEvents.TOUCH_START:
	                    this._canDrag = true;
	
	                    var _iteratorNormalCompletion4 = true;
	                    var _didIteratorError4 = false;
	                    var _iteratorError4 = undefined;
	
	                    try {
	                        for (var _iterator4 = this._listeners.drag[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                            var handlerObject = _step4.value;
	
	                            // if handlerObj has a target make sure it is hit first; if not, add it and trigger regardless
	                            if (handlerObject.target) {
	                                if (this._hitTest(event.x, event.y, handlerObject.target.getBoundingBox())) {
	                                    handlerObject.offsetX = event.x - handlerObject.target.x;
	                                    handlerObject.offsetY = event.y - handlerObject.target.y;
	
	                                    this._draggableHandlers.push(handlerObject);
	                                }
	                            } else {
	                                this._draggableHandlers.push(handlerObject);
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError4 = true;
	                        _iteratorError4 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                                _iterator4.return();
	                            }
	                        } finally {
	                            if (_didIteratorError4) {
	                                throw _iteratorError4;
	                            }
	                        }
	                    }
	
	                    break;
	                case this._uiEvents.MOUSE_UP:
	                case this._uiEvents.TOUCH_END:
	                    this._canDrag = false;
	                    this._draggableHandlers = [];
	
	                    if (this._isDragging) {
	                        this._isDragging = false;
	
	                        this._queuedEvents.push(Object.assign({}, event, {
	                            type: this._uiEvents.DRAG_END
	                        }));
	                    }
	
	                    break;
	                case this._uiEvents.MOUSE_MOVE:
	                case this._uiEvents.TOUCH_MOVE:
	                    if (this._canDrag) {
	                        if (!this._isDragging) {
	                            this._isDragging = true;
	
	                            this._queuedEvents.push(Object.assign({}, event, {
	                                type: this._uiEvents.DRAG_START
	                            }));
	                        }
	
	                        this._queuedEvents.push(Object.assign({}, event, {
	                            type: this._uiEvents.DRAG
	                        }));
	                    }
	
	                    break;
	                default:
	                    break;
	            }
	        }
	
	        /**
	         * Checks for duplicate handler in the listener tyoe being added
	         *
	         * @method Input#_isDuplicateHandler
	         * @param  {Function} handler  The handler to check
	         * @param  {Array}    handlers The handlers of the listener type being added
	         * @return {Boolean}
	         * @private
	         */
	
	    }, {
	        key: "_isDuplicateHandler",
	        value: function _isDuplicateHandler(handler, handlerObjects) {
	            var dup = false;
	
	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;
	
	            try {
	                for (var _iterator5 = handlerObjects[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var handlerObject = _step5.value;
	
	                    if (handler === handlerObject.handler) {
	                        dup = true;
	                        break;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }
	
	            return dup;
	        }
	
	        /**
	         * Triggers all queued events. Passes the factor and ticks from {@link Ticker}
	         *
	         * @method Input#_onTick
	         * @param  {Object} e The event object
	         */
	
	    }, {
	        key: "_onTick",
	        value: function _onTick(e) {
	            var _iteratorNormalCompletion6 = true;
	            var _didIteratorError6 = false;
	            var _iteratorError6 = undefined;
	
	            try {
	                for (var _iterator6 = this._queuedEvents[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                    var event = _step6.value;
	
	                    this._triggerHandlers(event);
	                }
	            } catch (err) {
	                _didIteratorError6 = true;
	                _iteratorError6 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                        _iterator6.return();
	                    }
	                } finally {
	                    if (_didIteratorError6) {
	                        throw _iteratorError6;
	                    }
	                }
	            }
	
	            this._queuedEvents = [];
	        }
	
	        /**
	         * executes handlers of the given event's type
	         *
	         * @method Input#_triggerHandlers
	         * @param {object} event
	         * @private
	         */
	
	    }, {
	        key: "_triggerHandlers",
	        value: function _triggerHandlers(event) {
	            switch (event.type) {
	                case this._uiEvents.DRAG:
	                    var _iteratorNormalCompletion7 = true;
	                    var _didIteratorError7 = false;
	                    var _iteratorError7 = undefined;
	
	                    try {
	                        for (var _iterator7 = this._draggableHandlers[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	                            var handlerObject = _step7.value;
	
	                            event.offsetX = handlerObject.offsetX;
	                            event.offsetY = handlerObject.offsetY;
	
	                            handlerObject.handler(event);
	                        }
	                    } catch (err) {
	                        _didIteratorError7 = true;
	                        _iteratorError7 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion7 && _iterator7.return) {
	                                _iterator7.return();
	                            }
	                        } finally {
	                            if (_didIteratorError7) {
	                                throw _iteratorError7;
	                            }
	                        }
	                    }
	
	                    break;
	                default:
	                    var _iteratorNormalCompletion8 = true;
	                    var _didIteratorError8 = false;
	                    var _iteratorError8 = undefined;
	
	                    try {
	                        for (var _iterator8 = this._listeners[event.type][Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	                            var handlerObject = _step8.value;
	
	                            if (handlerObject.target) {
	
	                                // if event was bound with a target, trigger handler ONLY if target hit
	                                if (this._hitTest(event.x, event.y, handlerObject.target.getBoundingBox())) {
	                                    // add to the event obj
	                                    event.target = handlerObject.target;
	
	                                    if (event.type) handlerObject.handler(event);
	                                }
	                            } else {
	                                handlerObject.handler(event);
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError8 = true;
	                        _iteratorError8 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion8 && _iterator8.return) {
	                                _iterator8.return();
	                            }
	                        } finally {
	                            if (_didIteratorError8) {
	                                throw _iteratorError8;
	                            }
	                        }
	                    }
	
	                    break;
	            }
	        }
	
	        /**
	         * Adds a handler to a {@link Sprite} for the given event type
	         *
	         * @method Input#addListener
	         * @param  {string}   type     The event type
	         * @param  {function} handler  The function to execute when event triggered
	         * @param  {object}   [target] The target to check event trigger against
	         * @return {boolean}           Returns true if added and false if callback already exists
	         */
	
	    }, {
	        key: "addListener",
	        value: function addListener(type, handler, target) {
	            var handlerObjects = this._listeners[type];
	            var dup = void 0;
	
	            if (!handlerObjects) {
	                throw new TypeError("Event type \"" + type + "\" does not exist.");
	            }
	
	            if (handlerObjects.length) {
	                dup = this._isDuplicateHandler(handler, handlerObjects);
	            }
	
	            if (!dup) {
	                handlerObjects.push({
	                    handler: handler, target: target
	                });
	                return true;
	            }
	
	            return false;
	        }
	
	        /**
	         * Removes matching handler if found
	         *
	         * @method Input#removeListener
	         * @param  {string}   type    the event type
	         * @param  {function} handler the handler to remove
	         * @return {boolean}  removed Returns true if removed and otherwise false
	         */
	
	    }, {
	        key: "removeListener",
	        value: function removeListener(type, handler) {
	            var handlers = this._listeners[type];
	            var removed = false;
	
	            if (!handlers) {
	                throw new TypeError("Event type \"" + type + "\" does not exist.");
	            }
	
	            for (var i = 0, len = handlers.length; i < len; i++) {
	                var handlerObject = handlers[i];
	                if (handlerObject.handler === handler) {
	                    handlers.splice(i, 1);
	                    removed = true;
	                    break;
	                }
	            }
	
	            return removed;
	        }
	
	        /**
	         * returns an object of the keys currently being pressed
	         * eg: <code>{ LEFT_ARROW: 37, UP_ARROW: 38 }</code>
	         *
	         * @method Input#getKeysDown
	         * @return {Object}
	         */
	
	    }, {
	        key: "getKeysDown",
	        value: function getKeysDown() {
	            return this._keysDown;
	        }
	    }]);
	
	    return Input;
	}();
	
	exports.default = Input;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Wrapper for event listening, removing, & dispatching. Currently only supports broadcasting Custom and Mouse events
	 * @class Radio
	 */
	
	var Radio = function () {
	    function Radio() {
	        _classCallCheck(this, Radio);
	    }
	
	    _createClass(Radio, null, [{
	        key: "tuneIn",
	
	        /**
	         * @method Radio.tuneIn
	         * @param {Any}      target
	         * @param {String}   event
	         * @param {Function} callback
	         */
	        value: function tuneIn(target, event, callback) {
	            target.addEventListener(event, callback, false);
	        }
	
	        /**
	         * @method Radio.tuneOut
	         * @param {Any}      target
	         * @param {String}   event
	         * @param {Function} callback
	         */
	
	    }, {
	        key: "tuneOut",
	        value: function tuneOut(target, event, callback) {
	            target.removeEventListener(event, callback, false);
	        }
	
	        /**
	         * @method Radio.broadcast
	         * @param {Any}    target
	         * @param {String} event
	         * @param {Object} data
	         */
	
	    }, {
	        key: "broadcast",
	        value: function broadcast(target, event, data) {
	            var evt = void 0;
	
	            switch (event) {
	                // TODO verify MouseEvent
	                case "click":
	                case "dblclick":
	                case "mousedown":
	                case "mouseup":
	                case "mousemove":
	                    evt = new MouseEvent(event, {
	                        "view": window,
	                        "bubbles": true,
	                        "cancelable": false
	                    });
	                    break;
	                default:
	                    evt = new CustomEvent(event, {
	                        detail: data
	                    });
	                    break;
	            }
	
	            target.dispatchEvent(evt);
	        }
	    }]);
	
	    return Radio;
	}();
	
	exports.default = Radio;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    8: "BACKSPACE",
	    9: "TAB",
	    13: "ENTER",
	    16: "SHIFT",
	    17: "CTRL",
	    18: "ALT",
	    19: "PAUSE_BREAK",
	    20: "CAPS_LOCK",
	    27: "ESCAPE",
	    33: "PAGE_UP",
	    34: "PAGE_DOWN",
	    35: "END",
	    36: "HOME",
	    37: "LEFT_ARROW",
	    38: "UP_ARROW",
	    39: "RIGHT_ARROW",
	    40: "DOWN_ARROW",
	    45: "INSERT",
	    46: "DELETE",
	    48: [0, ")"],
	    49: [1, "!"],
	    50: [2, "@"],
	    51: [3, "#"],
	    52: [4, "$"],
	    53: [5, "%"],
	    54: [6, "^"],
	    55: [7, "&"],
	    56: [8, "*"],
	    57: [9, "("],
	    65: "A",
	    66: "B",
	    67: "C",
	    68: "D",
	    69: "E",
	    70: "F",
	    71: "G",
	    72: "H",
	    73: "I",
	    74: "J",
	    75: "K",
	    76: "L",
	    77: "M",
	    78: "N",
	    79: "O",
	    80: "P",
	    81: "Q",
	    82: "R",
	    83: "S",
	    84: "T",
	    85: "U",
	    86: "V",
	    87: "W",
	    88: "X",
	    89: "Y",
	    90: "Z",
	    91: "LEFT_WINDOW_KEY",
	    92: "RIGHT_WINDOW_KEY",
	    93: "SELECT_KEY",
	    96: "NUM_PAD_0",
	    97: "NUM_PAD_1",
	    98: "NUM_PAD_2",
	    99: "NUM_PAD_3",
	    100: "NUM_PAD_4",
	    101: "NUM_PAD_5",
	    102: "NUM_PAD_6",
	    103: "NUM_PAD_7",
	    104: "NUM_PAD_8",
	    105: "NUM_PAD_9",
	    106: "NUM_PAD_ASTERISK",
	    107: "NUM_PAD_PLUS",
	    109: "NUM_PAD_MINUS",
	    111: "NUM_PAD_FOWARD_SLASH",
	    112: "F1",
	    113: "F2",
	    114: "F3",
	    115: "F4",
	    116: "F5",
	    117: "F6",
	    118: "F7",
	    119: "F8",
	    120: "F9",
	    121: "F10",
	    122: "F11",
	    123: "F12",
	    144: "NUM_LOCK",
	    145: "SCROLL_LOCK",
	    186: [";", ":"],
	    187: ["=", "+"],
	    188: [",", "<"],
	    189: ["-", "_"],
	    190: [".", ">"],
	    191: ["/", "?"],
	    192: ["`", "~"],
	    219: ["[", "{"],
	    220: ["\\", "|"],
	    221: ["]", "}"],
	    222: ["\"", "'"]
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Detects if point is inside a rectangle
	 * @method pointTest
	 * @memberOf physics
	 * @param  {Integer} x          The hit's x
	 * @param  {Integer} y          The hit's y
	 * @param  {Object} boundingBox The min/max x and min/max y properties of a {@link Sprite}
	 * @return {Boolean}
	 */
	var pointRectCollide = function pointRectCollide(x, y, boundingBox) {
	    return x >= boundingBox.minX && x <= boundingBox.maxX && y >= boundingBox.minY && y <= boundingBox.maxY;
	};
	
	/**
	 * Detects whether two rectangles are overlapping
	 * @method rectTest
	 * @memberOf physics
	 * @param  {Sprite} rect1 [description]
	 * @param  {Sprite} rect2 [description]
	 * @return {Boolean}      
	 */
	var rectRectCollide = function rectRectCollide(rect1, rect2) {
	    var rect1BB = rect1.getBoundingBox();
	    var rect2BB = rect2.getBoundingBox();
	
	    if (rect1BB.minX < rect2BB.maxX && rect1BB.maxX > rect2BB.minX && rect1BB.minY < rect2BB.maxY && rect1BB.maxY > rect2BB.minY) {
	        return true;
	    } else {
	        return false;
	    }
	};
	
	var rectGameDeflect = function rectGameDeflect(rect, currentMoveX, currentMoveY, game) {
	    var moveX = currentMoveX,
	        moveY = currentMoveY;
	
	    if (rect.x < 0 && currentMoveX === -1) {
	        moveX = 1;
	    }
	    if (rect.x + rect.width > game.width && currentMoveX === 1) {
	        moveX = -1;
	    }
	    if (rect.y < 0 && currentMoveY === -1) {
	        moveY = 1;
	    }
	    if (rect.y + rect.width > game.height && currentMoveY === 1) {
	        moveY = -1;
	    }
	
	    return { moveX: moveX, moveY: moveY };
	};
	
	exports.pointRectCollide = pointRectCollide;
	exports.rectRectCollide = rectRectCollide;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Radio = __webpack_require__(8);
	
	var _Radio2 = _interopRequireDefault(_Radio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Executes callback based on requestAnimationFrame
	 * @class    Ticker
	 * @requires Radio
	 * @param {Boolean} [start]            Whether to start on instantiate. Default is true
	 * @param {Object}  [options]          Options
	 * @param {Object}  [options.window]   window object for testing
	 * @param {Object}  [options.document] document object for testing
	 */
	
	var Ticker = function () {
	  function Ticker() {
	    var start = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Ticker);
	
	    this._window = options.window || window;
	    this._document = options.document || document;
	    this._then = Date.now();
	    this._ticks = 0;
	
	    this._update = this._update.bind(this);
	
	    if (start) {
	      this._then = Date.now();
	      this.start();
	    }
	  }
	
	  /**
	   * Calculates whether or not to call {@link Ticker#onTick} based on {@link Ticker#_fps}.
	   * If the correct amount of time has passed the {@link Ticker#onTick} callback will fire and
	   * the <code>tick</code> event will be dispatched via the <code>document</code> object.
	   * @method Ticker#_update
	   */
	
	
	  _createClass(Ticker, [{
	    key: "_update",
	    value: function _update() {
	      var now = Date.now();
	      // cap time delta at 10fps
	      var maxDelta = 0.1;
	      var delta = Math.min((now - this._then) / 1000, maxDelta);
	
	      this._then = now;
	      this._ticks += 1;
	
	      var evtObject = {
	        delta: delta,
	        ticks: this._ticks
	      };
	
	      // fire tick events and execute callbacks
	      this.onPreTick(delta, this._ticks);
	      _Radio2.default.broadcast(this._document, "pretick", evtObject);
	
	      this.onTick(delta, this._ticks);
	      _Radio2.default.broadcast(this._document, "tick", evtObject);
	
	      this.onPostTick(delta, this._ticks);
	      _Radio2.default.broadcast(this._document, "posttick", evtObject);
	
	      this._window.requestAnimationFrame(this._update);
	    }
	
	    /**
	     * A callback executed pre tick.
	     * @method Ticker#onPreTick
	     * @param {Integer} delta The time elapsed between ticks. Multiply against gameplay
	     *                        elements for consistent movement.
	     */
	
	  }, {
	    key: "onPreTick",
	    value: function onPreTick() {}
	
	    /**
	     * A callback executed on each tick.
	     * @method Ticker#onTick
	     * @param {Integer} delta The time elapsed between ticks. Multiply against gameplay
	     *                        elements for consistent movement.
	     */
	
	  }, {
	    key: "onTick",
	    value: function onTick() {}
	
	    /**
	     * A callback executed post tick.
	     * @method Ticker#onPostTick
	     * @param {Integer} delta The time elapsed between ticks. Multiply against gameplay
	     *                        elements for consistent movement.
	     */
	
	  }, {
	    key: "onPostTick",
	    value: function onPostTick() {}
	
	    /**
	     * Starts the ticker
	     * @method Ticker#start
	     */
	
	  }, {
	    key: "start",
	    value: function start() {
	      this._then = Date.now();
	      this._window.requestAnimationFrame(this._update);
	    }
	  }]);
	
	  return Ticker;
	}();
	
	exports.default = Ticker;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _domHelpers = __webpack_require__(13);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @class Viewport
	 * @param {Integer} width               The game width
	 * @param {Integer} height              The game height
	 * @param {Object}  [options]           The viewport options
	 * @param {Object}  [options.document]  Can substitute with mock for testing
	 * @param {Object}  [options.container] Container element, defaults to <body>
	 */
	
	var Viewport = function () {
	    function Viewport(width, height) {
	        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	        _classCallCheck(this, Viewport);
	
	        this._width = width;
	        this._height = height;
	        this._document = options.document || document;
	        this._viewport = this._document.createElement("div");
	        this._viewport.id = "spritewerk";
	
	        var elementTypes = ["video", "canvas", "input"];
	
	        if (options.container) {
	            options.container.appendChild(this._viewport);
	        } else {
	            this._document.body.appendChild(this._viewport);
	        }
	
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	            for (var _iterator = elementTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var type = _step.value;
	
	                this._createElement(type);
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	    }
	
	    _createClass(Viewport, [{
	        key: "_createElement",
	        value: function _createElement(type) {
	            var el = this._document.createElement(type);
	
	            if (type === "canvas") {
	                el.width = this._width;
	                el.height = this._height;
	            }
	
	            if (type !== "input") {
	                (0, _domHelpers.applyStyles)(el, {
	                    height: this._height + "px",
	                    left: 0,
	                    position: "absolute",
	                    top: 0,
	                    width: this._width + "px"
	                });
	            } else {
	                (0, _domHelpers.applyStyles)(el, {
	                    position: "absolute",
	                    top: -999 + "px"
	                });
	            }
	
	            this["_" + type] = el;
	            this._viewport.appendChild(el);
	        }
	
	        /**
	         * Canvas element getter
	         * @method Viewport#canvasElement
	         * @return {HTMLElement} The canvas element
	         */
	
	    }, {
	        key: "canvasElement",
	        get: function get() {
	            return this._canvas;
	        }
	
	        /**
	         * Video element getter
	         * @method Viewport#videoElement
	         * @return {HTMLElement} The video element
	         */
	
	    }, {
	        key: "videoElement",
	        get: function get() {
	            return this._video;
	        }
	    }]);
	
	    return Viewport;
	}();
	
	exports.default = Viewport;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * @memberOf util
	 * @method applyStyles
	 * @param {HTMLElement} el     The element to apply styles to
	 * @param {Object}      styles The key/value pair styles
	 */
	var applyStyles = exports.applyStyles = function applyStyles(el, styles) {
	    for (var key in styles) {
	        el.style[key] = styles[key];
	    }
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Preloads a list of image, video, and audio files
	 * @class Preloader
	 */
	
	var Preloader = function () {
	    function Preloader() {
	        _classCallCheck(this, Preloader);
	    }
	
	    _createClass(Preloader, null, [{
	        key: "load",
	
	        /**
	         * Parses file types and preloads them via element tags
	         * @method Preloader.load
	         * @param {...String|Array} paths File paths to preload
	         */
	        value: function load() {
	            for (var _len = arguments.length, paths = Array(_len), _key = 0; _key < _len; _key++) {
	                paths[_key] = arguments[_key];
	            }
	
	            Preloader.loaded = 0;
	            Preloader.total = paths.length;
	
	            // if array is passed
	            if (paths.length && Array.isArray(paths[0])) {
	                paths = paths[0];
	            }
	
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = paths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var path = _step.value;
	
	                    if (Preloader._isImage(path)) {
	                        var img = new Image();
	                        img.src = path;
	
	                        img.addEventListener("load", Preloader.handleLoad, false);
	                        img.addEventListener("error", Preloader.error, false);
	                    } else if (Preloader._isAudio(path)) {
	                        var audio = new Audio();
	                        audio.src = path;
	
	                        audio.addEventListener("canplaythrough", Preloader.handleLoad, false);
	                        audio.addEventListener("error", Preloader.error, false);
	                    } else if (Preloader._isVideo(path)) {
	                        var video = new Video();
	                        video.src = path;
	
	                        video.addEventListener("canplaythrough", Preloader.handleLoad, false);
	                        video.addEventListener("error", Preloader.error, false);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	
	        /**
	         * Returns if file has audio extension
	         *
	         * @method Preloader._isAudio
	         * @param  {String}  path The file path
	         * @return {Boolean}
	         */
	
	    }, {
	        key: "_isAudio",
	        value: function _isAudio(path) {
	            return path.indexOf(".mp3") > 0 || path.indexOf(".wav") > 0 || path.indexOf(".ogg") > 0;
	        }
	
	        /**
	         * Returns if file has image extension
	         *
	         * @method Preloader._isImage
	         * @param  {String}  path The file path
	         * @return {Boolean}
	         */
	
	    }, {
	        key: "_isImage",
	        value: function _isImage(path) {
	            return path.indexOf(".png") > 0 || path.indexOf(".jpg") > 0 || path.indexOf(".jpeg") > 0 || path.indexOf(".gif") > 0 || path.indexOf(".bmp") > 0;
	        }
	
	        /**
	         * Returns if file has video extension
	         *
	         * @method Preloader._isVideo
	         * @param  {String}  path The file path
	         * @return {Boolean}
	         */
	
	    }, {
	        key: "_isVideo",
	        value: function _isVideo(path) {
	            return path.indexOf(".webm") > 0 || path.indexOf(".mp4") > 0 || path.indexOf(".ogv") > 0;
	        }
	
	        /**
	         * Removes event listener when loaded or errored
	         *
	         * @method Preloader.removeListener
	         * @param  {HTMLEntity} el The html element
	         */
	
	    }, {
	        key: "removeListener",
	        value: function removeListener(el) {
	            var type = el.tagName.toLowerCase();
	
	            switch (type) {
	                case "img":
	                    el.removeEventListener("load", Preloader.handleLoad, false);
	                    el.removeEventListener("error", Preloader.error, false);
	
	                    break;
	                case "audio":
	                    el.removeEventListener("canplaythrough", Preloader.handleLoad, false);
	                    el.removeEventListener("error", Preloader.error, false);
	
	                    break;
	            }
	        }
	
	        /**
	         * Increments loaded count and calls complete or update based on count
	         *
	         * @method Preloader.handleLoad
	         * @param  {Object} e The event object
	         */
	
	    }, {
	        key: "handleLoad",
	        value: function handleLoad(e) {
	            Preloader.removeListener(e.currentTarget);
	
	            Preloader.loaded += 1;
	
	            if (Preloader.loaded === Preloader.total) {
	                Preloader.complete();
	            } else {
	                Preloader.update(Preloader.loaded, Preloader.total);
	            }
	        }
	
	        /**
	         * Callback executed every time an asset has loaded. It gets passed loaded & total
	         * which is useful for displaying percentage feedback.
	         *
	         * @method Preloader.update
	         * @param {Integer} loaded
	         * @param {Integer} total
	         */
	
	    }, {
	        key: "update",
	        value: function update() {}
	
	        /**
	         * Callback executed when loading complete
	         *
	         * @method Preload.complete
	         */
	
	    }, {
	        key: "complete",
	        value: function complete() {}
	
	        /**
	         * Handles errors
	         *
	         * @method Preloader.error
	         * @param {Object} e The event object
	         */
	
	    }, {
	        key: "error",
	        value: function error(e) {
	            console.warn(e.status);
	        }
	    }]);
	
	    return Preloader;
	}();
	
	Preloader.loaded = 0;
	Preloader.total = 0;
	
	exports.default = Preloader;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Group = __webpack_require__(16);
	
	var _Group2 = _interopRequireDefault(_Group);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * The base class for states. Handles a small amount of boilerplating.
	 * @class State
	 */
	
	var State = function () {
	    function State(game) {
	        _classCallCheck(this, State);
	
	        this.preload = [];
	        this.game = game;
	        this.stage = new _Group2.default();
	        this.bgColor = "#FFF";
	    }
	
	    _createClass(State, [{
	        key: "destroy",
	        value: function destroy() {}
	    }, {
	        key: "init",
	        value: function init() {}
	    }, {
	        key: "render",
	        value: function render(context) {
	            this.stage.render(context);
	        }
	    }, {
	        key: "update",
	        value: function update(factor) {
	            this.stage.update(factor);
	        }
	    }]);
	
	    return State;
	}();
	
	exports.default = State;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Collection2 = __webpack_require__(5);
	
	var _Collection3 = _interopRequireDefault(_Collection2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Provides a rendering and updating for items in {@link Collection}s
	 * @class   Group
	 * @extends Collection
	 */
	
	var Group = function (_Collection) {
	    _inherits(Group, _Collection);
	
	    function Group() {
	        _classCallCheck(this, Group);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Group).call(this));
	    }
	
	    /**
	     * Updates all children recursively
	     * @method Group#update
	     * @param {Float} factor [description]
	     */
	
	
	    _createClass(Group, [{
	        key: "update",
	        value: function update(factor) {
	            this.each(function (item) {
	                item.update(factor);
	            }, this);
	        }
	    }]);
	
	    return Group;
	}(_Collection3.default);
	
	exports.default = Group;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Sprite2 = __webpack_require__(4);
	
	var _Sprite3 = _interopRequireDefault(_Sprite2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * A sprite that renders an image asset
	 * @class    Bitmap
	 * @memberof bitmap
	 * @extends  Sprite
	 */
	
	var Bitmap = function (_Sprite) {
	    _inherits(Bitmap, _Sprite);
	
	    function Bitmap(x, y, width, height, image) {
	        _classCallCheck(this, Bitmap);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Bitmap).call(this, x, y, width, height));
	
	        _this._srcX = 0;
	        _this._srcY = 0;
	        _this._srcWidth = 0;
	        _this._srcHeight = 0;
	        _this._imageLoaded = false;
	        _this._image = null;
	        _this._tiling = "no-repeat";
	        _this._animations = {};
	
	        if (image) {
	            _this.image = image;
	        }
	        return _this;
	    }
	
	    /**
	     * @method Bitmap#addAnimation
	     * @param {String}    name      The animation reference name
	     * @param {Animation} animation The animation instance
	     */
	
	
	    _createClass(Bitmap, [{
	        key: "addAnimation",
	        value: function addAnimation(name, animation) {
	            this._animations[name] = animation;
	        }
	
	        /**
	         * image onload callback
	         * @method Bitmap#onLoaded
	         */
	
	    }, {
	        key: "onLoaded",
	        value: function onLoaded() {}
	
	        /**
	         * @method Bitmap#playAnimation
	         * @param {String} name The name of the animation to play
	         */
	
	    }, {
	        key: "playAnimation",
	        value: function playAnimation(name, loop) {
	            this._playingAnimation = name;
	            this._animations[name].play(loop);
	        }
	
	        /**
	         * @method Bitmap#stopAnimation
	         */
	
	    }, {
	        key: "stopAnimation",
	        value: function stopAnimation() {
	            this._playingAnimation = undefined;
	            this._animations[name].stop();
	        }
	
	        /**
	         * Render the entity via context's drawImage
	         * @method Bitmap#render
	         * @param {Object} context The context object
	         */
	
	    }, {
	        key: "render",
	        value: function render(context) {
	            if (!this._imageLoaded) {
	                return;
	            }
	
	            _get(Object.getPrototypeOf(Bitmap.prototype), "render", this).call(this, context);
	
	            if (this._tiling !== "no-repeat") {
	                if (this._dirty) {
	                    this._pattern = context.createPattern(this._image, this._tiling);
	                }
	
	                context.rect(0, 0, this._width * this._sx, this._height * this._sy);
	                context.fillStyle = this._pattern;
	                context.fill();
	            } else {
	                context.drawImage(this._image, this._srcX, this._srcY, this._srcWidth, this._srcHeight, 0, 0, this._width * this._sx, this._height * this._sy);
	            }
	        }
	    }, {
	        key: "update",
	        value: function update(factor) {
	            if (this._playingAnimation) {
	                var _animations$_playingA = this._animations[this._playingAnimation].update();
	
	                var srcX = _animations$_playingA.srcX;
	                var srcY = _animations$_playingA.srcY;
	
	                this._srcX = srcX;
	                this._srcY = srcY;
	            }
	        }
	
	        /**
	         * Set the iamge to render and sets dimensions if not set
	         *
	         * @method Bitmap#setImage
	         * @param  {String} path The image path
	         * @return {Bitmap}
	         */
	
	    }, {
	        key: "image",
	        set: function set(path) {
	            var self = this;
	
	            this._imageLoaded = false;
	            this._image = new Image();
	
	            this._image.onload = function () {
	                if (!self._srcWidth && !self._srcHeight) {
	                    self._srcWidth = self._image.width;
	                    self._srcHeight = self._image.height;
	                }
	
	                if (!self._width && !self._height) {
	                    self._width = self._image.width;
	                    self._height = self._image.height;
	                }
	
	                self._imageLoaded = true;
	                self.onLoaded();
	            };
	
	            this._image.src = path;
	
	            this._dirty = true;
	        }
	
	        /**
	         * Choose how to tile the image. Can be <code>repeat</code>, <code>repeat-x</code>
	         * <code>repeat-y</code> or <code>no-repeat</code>. Default is <code>no-repeat</code>.
	         *
	         * @method Bitmap#setTiling
	         * @param  {String} val The tiling value
	         */
	
	    }, {
	        key: "tiling",
	        set: function set(val) {
	            switch (val) {
	                case "repeat":
	                case "repeat-x":
	                case "repeat-y":
	                case "no-repeat":
	                    this._tiling = val;
	                    break;
	                default:
	                    throw new Error("Bitmap#setTiling: argument must be either \"repeat\", \"repeat-x\", \"repeat-y\", or \"no-repeat\".");
	            }
	
	            this._dirty = true;
	        }
	    }, {
	        key: "srcX",
	        get: function get() {
	            return this._srcX;
	        },
	        set: function set(val) {
	            this._srcX = val;
	            this._dirty = true;
	        }
	    }, {
	        key: "srcY",
	        get: function get() {
	            return this._srcY;
	        },
	        set: function set(val) {
	            this._srcY = val;
	            this._dirty = true;
	        }
	    }, {
	        key: "srcWidth",
	        get: function get() {
	            return this._srcWidth;
	        },
	        set: function set(val) {
	            this._srcWidth = val;
	            this._dirty = true;
	        }
	    }, {
	        key: "srcHeight",
	        get: function get() {
	            return this._srcHeight;
	        },
	        set: function set(val) {
	            this._srcHeight = val;
	            this._dirty = true;
	        }
	    }]);
	
	    return Bitmap;
	}(_Sprite3.default);
	
	exports.default = Bitmap;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _easing = __webpack_require__(19);
	
	var _easing2 = _interopRequireDefault(_easing);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @class Tween
	 * @param {Sprite}  entity [description]
	 * @param {Object}  from   A key/val map of tweenable starting values eg: { x: 0, opacity: 1 }
	 * @param {Object}  to     A key/val map of tweenable ending values eg: { x: 32, opacity: 0 }
	 * @param {Integer} ms     The length of the tween in milliseconds
	 * @param {String}  easing The easing type
	 */
	
	var Tween = function () {
	    function Tween(_from, to, ms) {
	        var easing = arguments.length <= 3 || arguments[3] === undefined ? "linear" : arguments[3];
	
	        _classCallCheck(this, Tween);
	
	        this._from = _from;
	        this._to = to;
	        this._ms = ms;
	        this._easing = easing;
	
	        this._currentFrame = 0;
	        this._startFrame = 1;
	        this._endFrame = null;
	        this._totalFrames = Math.round(this._ms / (1000 / 60));
	    }
	
	    _createClass(Tween, [{
	        key: "isComplete",
	        value: function isComplete() {
	            return this._currentFrame >= this._endFrame;
	        }
	    }, {
	        key: "onComplete",
	        value: function onComplete() {
	            // callback
	        }
	    }, {
	        key: "update",
	        value: function update(entity) {
	            this._startFrame = this._startFrame === null ? this._currentFrame : this._startFrame;
	            this._endFrame = this._endFrame === null ? this._currentFrame + this._totalFrames : this._endFrame;
	
	            if (this._currentFrame < this._endFrame) {
	                for (var prop in this._from) {
	                    // allow users to use either `_x` or `x`
	                    var actualProp = entity[prop] !== undefined ? prop : "_" + prop;
	
	                    entity[actualProp] = _easing2.default[this._easing](this._currentFrame, this._from[actualProp], this._to[actualProp], this._totalFrames);
	                }
	            } else {
	                this.onComplete();
	            }
	
	            this._currentFrame += 1;
	        }
	    }]);
	
	    return Tween;
	}();
	
	exports.default = Tween;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	// t: current time, b: beginning value, _c: final value, d: total duration
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var tweenFunctions = {
	  linear: function linear(t, b, _c, d) {
	    var c = _c - b;
	    return c * t / d + b;
	  },
	  easeInQuad: function easeInQuad(t, b, _c, d) {
	    var c = _c - b;
	    return c * (t /= d) * t + b;
	  },
	  easeOutQuad: function easeOutQuad(t, b, _c, d) {
	    var c = _c - b;
	    return -c * (t /= d) * (t - 2) + b;
	  },
	  easeInOutQuad: function easeInOutQuad(t, b, _c, d) {
	    var c = _c - b;
	    if ((t /= d / 2) < 1) {
	      return c / 2 * t * t + b;
	    } else {
	      return -c / 2 * (--t * (t - 2) - 1) + b;
	    }
	  },
	  easeInCubic: function easeInCubic(t, b, _c, d) {
	    var c = _c - b;
	    return c * (t /= d) * t * t + b;
	  },
	  easeOutCubic: function easeOutCubic(t, b, _c, d) {
	    var c = _c - b;
	    return c * ((t = t / d - 1) * t * t + 1) + b;
	  },
	  easeInOutCubic: function easeInOutCubic(t, b, _c, d) {
	    var c = _c - b;
	    if ((t /= d / 2) < 1) {
	      return c / 2 * t * t * t + b;
	    } else {
	      return c / 2 * ((t -= 2) * t * t + 2) + b;
	    }
	  },
	  easeInQuart: function easeInQuart(t, b, _c, d) {
	    var c = _c - b;
	    return c * (t /= d) * t * t * t + b;
	  },
	  easeOutQuart: function easeOutQuart(t, b, _c, d) {
	    var c = _c - b;
	    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	  },
	  easeInOutQuart: function easeInOutQuart(t, b, _c, d) {
	    var c = _c - b;
	    if ((t /= d / 2) < 1) {
	      return c / 2 * t * t * t * t + b;
	    } else {
	      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	    }
	  },
	  easeInQuint: function easeInQuint(t, b, _c, d) {
	    var c = _c - b;
	    return c * (t /= d) * t * t * t * t + b;
	  },
	  easeOutQuint: function easeOutQuint(t, b, _c, d) {
	    var c = _c - b;
	    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	  },
	  easeInOutQuint: function easeInOutQuint(t, b, _c, d) {
	    var c = _c - b;
	    if ((t /= d / 2) < 1) {
	      return c / 2 * t * t * t * t * t + b;
	    } else {
	      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	    }
	  },
	  easeInSine: function easeInSine(t, b, _c, d) {
	    var c = _c - b;
	    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	  },
	  easeOutSine: function easeOutSine(t, b, _c, d) {
	    var c = _c - b;
	    return c * Math.sin(t / d * (Math.PI / 2)) + b;
	  },
	  easeInOutSine: function easeInOutSine(t, b, _c, d) {
	    var c = _c - b;
	    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	  },
	  easeInExpo: function easeInExpo(t, b, _c, d) {
	    var c = _c - b;
	    return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	  },
	  easeOutExpo: function easeOutExpo(t, b, _c, d) {
	    var c = _c - b;
	    return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	  },
	  easeInOutExpo: function easeInOutExpo(t, b, _c, d) {
	    var c = _c - b;
	    if (t === 0) {
	      return b;
	    }
	    if (t === d) {
	      return b + c;
	    }
	    if ((t /= d / 2) < 1) {
	      return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	    } else {
	      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	    }
	  },
	  easeInCirc: function easeInCirc(t, b, _c, d) {
	    var c = _c - b;
	    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	  },
	  easeOutCirc: function easeOutCirc(t, b, _c, d) {
	    var c = _c - b;
	    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	  },
	  easeInOutCirc: function easeInOutCirc(t, b, _c, d) {
	    var c = _c - b;
	    if ((t /= d / 2) < 1) {
	      return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	    } else {
	      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	    }
	  },
	  easeInElastic: function easeInElastic(t, b, _c, d) {
	    var c = _c - b;
	    var a, p, s;
	    s = 1.70158;
	    p = 0;
	    a = c;
	    if (t === 0) {
	      return b;
	    } else if ((t /= d) === 1) {
	      return b + c;
	    }
	    if (!p) {
	      p = d * 0.3;
	    }
	    if (a < Math.abs(c)) {
	      a = c;
	      s = p / 4;
	    } else {
	      s = p / (2 * Math.PI) * Math.asin(c / a);
	    }
	    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	  },
	  easeOutElastic: function easeOutElastic(t, b, _c, d) {
	    var c = _c - b;
	    var a, p, s;
	    s = 1.70158;
	    p = 0;
	    a = c;
	    if (t === 0) {
	      return b;
	    } else if ((t /= d) === 1) {
	      return b + c;
	    }
	    if (!p) {
	      p = d * 0.3;
	    }
	    if (a < Math.abs(c)) {
	      a = c;
	      s = p / 4;
	    } else {
	      s = p / (2 * Math.PI) * Math.asin(c / a);
	    }
	    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	  },
	  easeInOutElastic: function easeInOutElastic(t, b, _c, d) {
	    var c = _c - b;
	    var a, p, s;
	    s = 1.70158;
	    p = 0;
	    a = c;
	    if (t === 0) {
	      return b;
	    } else if ((t /= d / 2) === 2) {
	      return b + c;
	    }
	    if (!p) {
	      p = d * (0.3 * 1.5);
	    }
	    if (a < Math.abs(c)) {
	      a = c;
	      s = p / 4;
	    } else {
	      s = p / (2 * Math.PI) * Math.asin(c / a);
	    }
	    if (t < 1) {
	      return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	    } else {
	      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
	    }
	  },
	  easeInBack: function easeInBack(t, b, _c, d, s) {
	    var c = _c - b;
	    if (s === void 0) {
	      s = 1.70158;
	    }
	    return c * (t /= d) * t * ((s + 1) * t - s) + b;
	  },
	  easeOutBack: function easeOutBack(t, b, _c, d, s) {
	    var c = _c - b;
	    if (s === void 0) {
	      s = 1.70158;
	    }
	    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	  },
	  easeInOutBack: function easeInOutBack(t, b, _c, d, s) {
	    var c = _c - b;
	    if (s === void 0) {
	      s = 1.70158;
	    }
	    if ((t /= d / 2) < 1) {
	      return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
	    } else {
	      return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	    }
	  },
	  easeInBounce: function easeInBounce(t, b, _c, d) {
	    var c = _c - b;
	    var v;
	    v = tweenFunctions.easeOutBounce(d - t, 0, c, d);
	    return c - v + b;
	  },
	  easeOutBounce: function easeOutBounce(t, b, _c, d) {
	    var c = _c - b;
	    if ((t /= d) < 1 / 2.75) {
	      return c * (7.5625 * t * t) + b;
	    } else if (t < 2 / 2.75) {
	      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
	    } else if (t < 2.5 / 2.75) {
	      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
	    } else {
	      return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
	    }
	  },
	  easeInOutBounce: function easeInOutBounce(t, b, _c, d) {
	    var c = _c - b;
	    var v;
	    if (t < d / 2) {
	      v = tweenFunctions.easeInBounce(t * 2, 0, c, d);
	      return v * 0.5 + b;
	    } else {
	      v = tweenFunctions.easeOutBounce(t * 2 - d, 0, c, d);
	      return v * 0.5 + c * 0.5 + b;
	    }
	  }
	};
	
	exports.default = tweenFunctions;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @class    Animation
	 * @memberof bitmap
	 * @desc     Describes the src positions and timing of spritesheet a animation
	 * @author   Chris Peters
	 *
	 * @param    {Array|Integer} srcXSequence A list of (or singular) srcX position(s)
	 * @param    {Array|Integer} srcYSequence A list of (or singular) srcY position(s)
	 * @param    {Integer}       [step=2]     The amount of frames between each frame step. This is based on
	 *                                        requestAnimationFrame's 60fps rate. eg: 2 would animate @ 30fps, 3 @ 15fps
	 *                                        etc.
	 * @param    {loop}          [loop=false] If true, will start the sequence at the initial position when complete and run
	 *                                        until stopped
	 */
	
	var Animation = function () {
	    function Animation(srcXSequence, srcYSequence) {
	        var step = arguments.length <= 2 || arguments[2] === undefined ? 2 : arguments[2];
	        var loop = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	
	        _classCallCheck(this, Animation);
	
	        this._srcXSequence = srcXSequence;
	        this._srcYSequence = srcYSequence;
	        // at least one sequence must be array
	        this._sequenceLength = Array.isArray(this._srcXSequence) ? this._srcXSequence.length : this._srcYSequence.length;
	        this._step = step;
	        this._frame = 0;
	        this._ticks = 0;
	        this._playing = false;
	        this._loop = loop;
	    }
	
	    /**
	     * Callback executed if loop set to false on sequence completion
	     *
	     * @method Animation#onComplete
	     */
	
	
	    _createClass(Animation, [{
	        key: "onComplete",
	        value: function onComplete() {}
	
	        /**
	         * @memberof bitmap
	         * @method Animation#play
	         * @param {Boolean} [loop] Whether or not to loop in this sequence instance
	         */
	
	    }, {
	        key: "play",
	        value: function play(loop) {
	            this._loop = loop !== undefined ? loop : this._loop;
	            this._ticks = 0;
	            this._frame = 0;
	            this._playing = true;
	        }
	
	        /**
	         * @memberof bitmap
	         * @method Animation#update
	         * @returns {null|Object} If animation not playing returns null else returns object containing current srcX/Y values
	         */
	
	    }, {
	        key: "update",
	        value: function update(factor) {
	            if (!this._playing) {
	                return null;
	            }
	
	            var srcCoords = {
	                srcX: Array.isArray(this._srcXSequence) ? this._srcXSequence[this._frame] : this._srcXSequence,
	                srcY: Array.isArray(this._srcYSequence) ? this._srcYSequence[this._frame] : this._srcYSequence
	            };
	
	            this._ticks += 1;
	            this._frame += this._ticks % this._step === 0 ? 1 : 0;
	
	            if (this._frame >= this._sequenceLength) {
	                if (this._loop) {
	                    this._frame = 0;
	                    this._ticks = 0;
	                } else {
	                    this.stop();
	                    this.onComplete();
	                }
	            }
	
	            return srcCoords;
	        }
	
	        /**
	         * Stops the current animation. Called automatically when sequence ends and loop set to false
	         *
	         * @memberof bitmap
	         * @method Animation#stop
	         */
	
	    }, {
	        key: "stop",
	        value: function stop() {
	            this._playing = false;
	        }
	    }]);
	
	    return Animation;
	}();
	
	exports.default = Animation;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Sprite2 = __webpack_require__(4);
	
	var _Sprite3 = _interopRequireDefault(_Sprite2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * @typedef {Object} Pragma
	 * @property {Integer} rowLength The length of the "rows" in the array. Needed because not using matrices for perf reasons.
	 * @property {Array} legend The various asset paths or colors to render. The index corresponds to the tilemap's values.
	 *                          `null` values will result in an empty tile.
	 * @property {Integer} width The tile width
	 * @property {Integer} height The tile height
	 * @example
	 * <code>{
	 *     rowLength: 8,
	 *     width: 32,
	 *     height: 32,
	 *     legend: [
	 *         null,
	 *         "#000",
	 *         "images/ground.png"
	 *     ]
	 * }</code>
	 */
	
	/**
	 * Maps and renders bitmap and/or color tiles from an array
	 * @class TileMap
	 * @memberOf tile
	 */
	
	var TileMap = function (_Sprite) {
	    _inherits(TileMap, _Sprite);
	
	    function TileMap(x, y, map, pragma) {
	        _classCallCheck(this, TileMap);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TileMap).call(this, x, y));
	
	        _this._map = map;
	        _this._pragma = pragma;
	        _this._width = _this._pragma.rowLength * _this._pragma.width;
	        _this._height = _this._map.length / _this._pragma.rowLength * _this._pragma.height;
	        _this._images = {};
	
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	            for (var _iterator = _this._pragma.legend[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var path = _step.value;
	
	                if (_this._keyIsImage(path)) {
	                    _this._images[path] = new Image();
	                    _this._images[path].src = path;
	                }
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	
	        return _this;
	    }
	
	    _createClass(TileMap, [{
	        key: "_keyIsImage",
	        value: function _keyIsImage(tile) {
	            return (/\.bmp|\.gif|\.jpg|\.jpeg|\.png/.test(tile)
	            );
	        }
	    }, {
	        key: "render",
	        value: function render(context) {
	            _get(Object.getPrototypeOf(TileMap.prototype), "render", this).call(this, context);
	
	            var y = 0,
	                key = void 0,
	                tile = void 0;
	
	            for (var x = 0, len = this._map.length; x < len; x++) {
	                key = this._map[x];
	                tile = this._pragma.legend[key];
	
	                if (x === this._pragma.rowLength - 1) {
	                    y += 1;
	                }
	
	                if (this._keyIsImage(tile)) {
	                    context.drawImage(this._images[tile],
	                    // source
	                    0, 0, this._pragma.width, this._pragma.height,
	                    // physical
	                    x * this._pragma.width, y * this._pragma.height, this._pragma.width, this._pragma.height);
	                } else {
	                    context.fillStyle = tile;
	                    context.fillRect(x * this._pragma.width, y * this._pragma.height, this._pragma.width, this._pragma.height);
	                }
	            }
	        }
	    }]);
	
	    return TileMap;
	}(_Sprite3.default);
	
	exports.default = TileMap;

/***/ },
/* 22 */,
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Timer = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Radio = __webpack_require__(8);
	
	var _Radio2 = _interopRequireDefault(_Radio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * 
	 */
	
	var Timer = exports.Timer = function () {
	    function Timer(callback, msDelay, scope) {
	        var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	        _classCallCheck(this, Timer);
	
	        this._callback = callback;
	        this._msDelay = msDelay;
	        this._scope = scope;
	        this._document = options.document || document;
	        this._ms = 0;
	
	        this._onTick = this._onTick.bind(this);
	
	        _Radio2.default.tuneIn(this._document, "tick", this._onTick);
	    }
	
	    _createClass(Timer, [{
	        key: "_onTick",
	        value: function _onTick(e) {
	            this._ms += e.detail.delta;
	
	            if (this._ms * 1000 >= this._msDelay) {
	                _Radio2.default.tuneOut(this._document, "tick", this._onTick);
	
	                if (this._scope) {
	                    this._callback.apply(this._scope);
	                } else {
	                    this._callback();
	                }
	            }
	        }
	    }, {
	        key: "clear",
	        value: function clear() {
	            _Radio2.default.tuneOut(this._document, "tick", this._onTick);
	        }
	    }]);
	
	    return Timer;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map