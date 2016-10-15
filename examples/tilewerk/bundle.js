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
	
	var _Camera = __webpack_require__(1);
	
	var _Camera2 = _interopRequireDefault(_Camera);
	
	var _Group = __webpack_require__(2);
	
	var _Group2 = _interopRequireDefault(_Group);
	
	var _Scene = __webpack_require__(6);
	
	var _Scene2 = _interopRequireDefault(_Scene);
	
	var _Sprite2 = __webpack_require__(4);
	
	var _Sprite3 = _interopRequireDefault(_Sprite2);
	
	var _Viewport = __webpack_require__(9);
	
	var _Viewport2 = _interopRequireDefault(_Viewport);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @class Pragma
	 * @property {Integer} rowLength - The length of the "rows" in the array. Needed because not using matrices for perf reasons.
	 * @property {Integer} width - The tile width
	 * @property {Integer} height - The tile height
	 * @property {Array} legend - The various asset paths or colors to render.The index corresponds to the tilemap's values.
	 *                          `null` values will result in an empty/transparent tile.
	 */
	var Pragma = function Pragma(rowLength, width, height, legend) {
	    _classCallCheck(this, Pragma);
	
	    this.rowLength = rowLength;
	    this.width = width;
	    this.height = height;
	    this.legend = legend;
	};
	
	/**
	 * Maps and renders bitmap and/or color tiles from an array
	 * @class TileMap
	 */
	
	
	var defaults = {
	    dev: true
	};
	
	var TileMap = function (_Sprite) {
	    _inherits(TileMap, _Sprite);
	
	    /**
	     * @param {Number} x - The x position
	     * @param {Number} y - The y position
	     * @param {Object} maps - An object of arrays with indices mapped to values
	     * @param {String} currentMap - The name of the current map
	     * @param {Pragma} pragma - The pragma for parsing the map
	     * @param {Object} options - General options
	     */
	    function TileMap(x, y, maps, pragma) {
	        var currentMap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "default";
	        var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : defaults;
	
	        _classCallCheck(this, TileMap);
	
	        var _this = _possibleConstructorReturn(this, (TileMap.__proto__ || Object.getPrototypeOf(TileMap)).call(this, x, y));
	
	        _this.maps = maps;
	        _this.pragma = pragma;
	        _this.currentMap = currentMap;
	        _this.options = options;
	
	        var map = _this.maps[_this.currentMap];
	
	        _this.width = _this.pragma.rowLength * _this.pragma.width;
	        _this.height = map.length / _this.pragma.rowLength * _this.pragma.height;
	        return _this;
	    }
	
	    _createClass(TileMap, [{
	        key: "render",
	        value: function render(context) {
	            _get(TileMap.prototype.__proto__ || Object.getPrototypeOf(TileMap.prototype), "render", this).call(this, context);
	
	            var map = this.maps[this.currentMap];
	            var x = 0;
	            var y = 0;
	
	            for (var i = 0, len = map.length; i < len; i++) {
	                var key = map[i];
	                var tile = this.pragma.legend[key];
	                var opacity = context.globalAlpha;
	
	                if (x === this.pragma.rowLength) {
	                    x = 0;
	                    y += 1;
	                }
	
	                if (tile === undefined) {
	                    if (key === null) {
	                        // index purposefully blank
	                        context.globalAlpha = 0;
	                    } else {
	                        if (this.options.dev) {
	                            console.warn("Pragma.legend index `" + key + "` does not exist");
	                        }
	                    }
	                } else {
	                    context.fillStyle = tile;
	                    context.fillRect(x * this.pragma.width, y * this.pragma.height, this.pragma.width, this.pragma.height);
	                }
	
	                x += 1;
	                context.globalAlpha = opacity;
	            }
	        }
	    }]);
	
	    return TileMap;
	}(_Sprite3.default);
	
	(function () {
	    var viewport = new _Viewport2.default(512, 512);
	    var camera = new _Camera2.default(0, 0, 512, 512);
	    var scene = new _Scene2.default(viewport.canvas, camera);
	    var group = new _Group2.default();
	    var tile = new TileMap(256, 256, {
	        default: [0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, null]
	    }, new Pragma(4, 32, 32, ["#DDD", "#EEE"]));
	
	    group.collection.add(tile);
	    group.collection.add(new _Group2.default());
	    group.sprite.opacity = 0.6;
	
	    //camera.x = 64;
	    //camera.rotation = 45;
	    camera.zoom = 2;
	
	    scene.startRender(group);
	}).call(undefined);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @class Camera
	 * @param {Integer} [x=0] - The x coordinate
	 * @param {Integer} [y=0] - The y coordinate
	 * @param {Integer} [width=800] - The viewport width
	 * @param {Integer} [height=600] - The viewport height
	 */
	var Camera = function Camera() {
	  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 800;
	  var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 600;
	
	  _classCallCheck(this, Camera);
	
	  /**
	   * @member {Integer} Camera#x - The camera's x position
	   */
	  this.x = x;
	  /**
	   * @member {Integer} Camera#y - The camera's y position
	   */
	  this.y = y;
	  /**
	   * @member {Integer} Camera#width - The viewport width
	   */
	  this.width = width;
	  /**
	   * @member {Integer} Camera#height - The viewport height
	   */
	  this.height = height;
	  /**
	   * @member {Float} Camera#rotation - The camera's rotation
	   */
	  this.rotation = 0;
	  /**
	   * @member {Float} Camera#zoom - The camera's zoom value
	   */
	  this.zoom = 1;
	};
	
	exports.default = Camera;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Collection = __webpack_require__(3);
	
	var _Collection2 = _interopRequireDefault(_Collection);
	
	var _Sprite = __webpack_require__(4);
	
	var _Sprite2 = _interopRequireDefault(_Sprite);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Composes Sprite and Collection
	 * @class Group
	 * @requires Collection
	 * @requires Sprite
	 */
	var Group = function Group() {
	  _classCallCheck(this, Group);
	
	  /**
	   * @member {Collection} Group#collection - The group's collection
	   */
	  this.collection = new _Collection2.default();
	  /**
	   * @member {Sprite} Group#sprite - The group's display object
	   */
	  this.sprite = new _Sprite2.default();
	  /**
	   * @member {Boolean} Group#isGroup - Denote's the object as a group
	   */
	  this.isGroup = true;
	};
	
	exports.default = Group;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @class Collection
	 */
	var Collection = function () {
	    function Collection() {
	        _classCallCheck(this, Collection);
	
	        /**
	         * @member {Array} Collection#items - the collection of items
	         */
	        this.items = [];
	    }
	
	    /**
	     * Add an item with optional name
	     * @method Collection#add
	     * @param  {Any}    item - The item to add
	     * @param  {String} [name=""] - The optional name of the item
	     */
	
	
	    _createClass(Collection, [{
	        key: "add",
	        value: function add(item) {
	            var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
	
	            this.items.push({
	                item: item, name: name
	            });
	        }
	
	        /**
	         * Add an item at a given index
	         * @method Collection#addAt
	         * @param  {Integer} index - The index to add the item
	         * @param  {Any}     item - The item to add
	         * @param  {String}  [name=""] - The optional name of the item
	         */
	
	    }, {
	        key: "addAt",
	        value: function addAt(index, item) {
	            var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
	
	            if (index > this.getCount()) {
	                this.add(item, name);
	            } else {
	                this.items.splice(index, 0, {
	                    item: item, name: name
	                });
	            }
	        }
	
	        /**
	         * Add multiple items
	         * @method Collection#addMany
	         * @param  {...Object} items - An object containing item and optional name. eg: <code>{item: someItem, name: "someName"}</code>
	         */
	
	    }, {
	        key: "addMany",
	        value: function addMany() {
	            for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
	                items[_key] = arguments[_key];
	            }
	
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var item = _step.value;
	
	                    this.add(item.item, item.name);
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
	         * Iterates the collection's sorted items. The item, index, and name are supplied
	         * to the provided function
	         * @method Collection#each
	         * @param {Function} fn - The function to execute on the iterable
	         * @param {Object} [scope] - The scope with which to execute the function
	         */
	
	    }, {
	        key: "each",
	        value: function each(fn, scope) {
	            fn = scope ? fn.bind(scope) : fn;
	
	            for (var i = 0, len = this.getCount(); i < len; i++) {
	                var item = this.items[i];
	                var doContinue = void 0;
	
	                // if item on last item and an item is removed
	                if (!item) {
	                    break;
	                }
	
	                doContinue = fn(item.item, item.name, i);
	
	                if (doContinue === false) {
	                    break;
	                }
	            }
	        }
	
	        /**
	         * Returns an object by name
	         * @method Collection#fetch
	         * @param  {String} name - The name of the object to fetch
	         * @return {Any}
	         */
	
	    }, {
	        key: "fetch",
	        value: function fetch(name) {
	            for (var i = 0, len = this.getCount(); i < len; i++) {
	                var item = this.items[i];
	                if (item.name === name) {
	                    return item.item;
	                }
	            }
	        }
	
	        /**
	         * Returns an object at a given index
	         * @method Collection#fetchAt
	         * @param  {Integer} index - The index
	         * @return {Any}
	         */
	
	    }, {
	        key: "fetchAt",
	        value: function fetchAt(index) {
	            return this.items[index].item;
	        }
	
	        /**
	         * Returns the count of items in group
	         * @method Collection#getCount
	         * @return {Integer}
	         */
	
	    }, {
	        key: "getCount",
	        value: function getCount() {
	            return this.items.length;
	        }
	
	        /**
	         * Remove item by name
	         * @method Collection#removeBy
	         * @param {String} name - The name of the object to remove
	         */
	
	    }, {
	        key: "remove",
	        value: function remove(name) {
	            for (var i = 0, len = this.getCount(); i < len; i++) {
	                var item = this.items[i];
	                if (item.name === name) {
	                    this.items.splice(i, 1);
	                    break;
	                }
	            }
	        }
	
	        /**
	         * Removes all items
	         * @method Collection#removeAll
	         */
	
	    }, {
	        key: "removeAll",
	        value: function removeAll() {
	            this.items = [];
	        }
	
	        /**
	         * Remove item at given index
	         * @method Collection#removeAt
	         * @param {Integer} index - The index of the item to remove
	         */
	
	    }, {
	        key: "removeAt",
	        value: function removeAt(index) {
	            this.items.splice(index, 1);
	        }
	
	        /**
	         * iterates items and return the ones that meet criteria
	         * @method Collection#filter
	         * @param  {Function} fn - Truth predicate
	         * @param  {Object} [scope] - The scope in which to execute the function
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
	         * Assigns a new value to an existing item
	         * @method Collection#update
	         * @param {String} name - The name of the object to modify
	         * @param {Any} value - The new value
	         */
	
	    }, {
	        key: "update",
	        value: function update(name, value) {
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = this.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var item = _step2.value;
	
	                    if (name === item.name) {
	                        item = value;
	                        break;
	                    }
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
	    }]);
	
	    return Collection;
	}();
	
	exports.default = Collection;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _contextConstants = __webpack_require__(5);
	
	var _contextConstants2 = _interopRequireDefault(_contextConstants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @class Sprite
	 * @requires contextConstants
	 * 
	 * @param {Integer} [x=0] - The x coordinate
	 * @param {Integer} [y=0] - The y coordinate
	 * @param {Integer} [width=64] - The width
	 * @param {Integer} [height=64] - The height
	 */
	var Sprite = function () {
	  function Sprite() {
	    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 64;
	    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 64;
	
	    _classCallCheck(this, Sprite);
	
	    /**
	     * @member {Integer} Sprite#x - The sprite's x coordinate
	     */
	    this.x = x;
	    /**
	     * @member {Integer} Sprite#y - The sprite's y coordinate
	     */
	    this.y = y;
	    /**
	     * @member {Integer} Sprite#width - The sprite's width
	     */
	    this.width = width;
	    /**
	     * @member {Integer} Sprite#height - The sprite's height
	     */
	    this.height = height;
	    /**
	     * @member {Float} Sprite#sx - The sprite's horizontal scale
	     */
	    this.sx = 1;
	    /**
	     * @member {Float} Sprite#sy - The sprite's horizontal scale
	     */
	    this.sy = 1;
	    /**
	     * @member {Float} Sprite#rotation - The sprite's rotation
	     */
	    this.rotation = 0;
	    /**
	     * @member {Float} Sprite#composite - The sprite's composite setting
	     */
	    this.composite = _contextConstants2.default.SOURCE_OVER;
	    /**
	     * @member {Float} Sprite#opacity - The sprite's opacity
	     */
	    this.opacity = 1;
	    /**
	     * @member {Boolean} Sprite#visible - If false sprite is not rendered
	     */
	    this.visible = true;
	    /**
	     * @member {Float} Sprite#uuid - The sprite's unique ID
	     */
	    this.uuid = Sprite.uuidCount++;
	    /**
	     * @member {Float} Sprite#parentTransforms - A parent group's coordinates
	     */
	    this.parentTransforms = {
	      x: 0, y: 0
	    };
	  }
	
	  /**
	   * @method Sprite#render
	   * @param  {CanvasRenderingContext2D} context - The rendering context
	   * @return {undefined}
	   */
	
	
	  _createClass(Sprite, [{
	    key: "render",
	    value: function render(context) {
	      context.globalAlpha *= this.opacity;
	
	      if (this.composite !== Sprite.SOURCE_OVER) {
	        context.globalCompositeOperation = this.composite;
	      }
	    }
	
	    /**
	     * A noop
	     * @method Sprite#update
	     * @return {undefined}
	     */
	
	  }, {
	    key: "update",
	    value: function update() {}
	
	    /**
	     * @member {Integer} Sprite#gx - The global x coordinate (the local + parent transforms)
	     */
	
	  }, {
	    key: "gx",
	    get: function get() {
	      return this.x + this.parentTransforms.x;
	    }
	
	    /**
	     * @member {Integer} Sprite#gy - The global y coordinate (the local + parent transforms)
	     */
	
	  }, {
	    key: "gy",
	    get: function get() {
	      return this.y + this.parentTransforms.y;
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
	var contextConstants = {
	    SOURCE_OVER: "source-over",
	    SOURCE_IN: "source-in",
	    SOURCE_OUT: "source-out",
	    SOURCE_ATOP: "source-atop",
	    DESTINATION_OVER: "destination-over",
	    DESTINATION_IN: "destination-in",
	    DESTINATION_OUT: "destination-out",
	    DESTINATION_ATOP: "destination-atop",
	    LIGHTER: "lighter",
	    COPY: "copy",
	    XOR: "xor",
	    MULTIPLY: "multiply",
	    SCREEN: "screen",
	    OVERLAY: "overlay",
	    DARKEN: "darken",
	    LIGHTEN: "lighten",
	    COLOR_DODGE: "color-dodge",
	    COLOR_BURN: "color-burn",
	    HARD_LIGHT: "hard-light",
	    SOFT_LIGHT: "soft-light",
	    DIFFERENCE: "difference",
	    EXCLUSION: "exclusion",
	    HUE: "hue",
	    SATURATION: "saturation",
	    COLOR: "color",
	    LUMINOSITY: "luminosity"
	};
	
	exports.default = contextConstants;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _math = __webpack_require__(7);
	
	var _Transform = __webpack_require__(8);
	
	var _Transform2 = _interopRequireDefault(_Transform);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var defaults = {
	    debug: true
	};
	
	/**
	 * Handles rendering entities onto the canvas element
	 * @class Scene
	 * @requires Transform
	 * 
	 * @param {HTMLElement} canvas - The active canvas element
	 * @param {Camera} camera - The camera instance
	 * @param {Object} [options]
	 * @param {Boolean} [options.debug=true] - If true, renders debug objects
	 */
	
	var Scene = function () {
	    function Scene(canvas, camera) {
	        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaults;
	
	        _classCallCheck(this, Scene);
	
	        /**
	         * @member {HTMLElement} Scene#canvas - The active canvas element
	         */
	        this.canvas = canvas;
	        /**
	         * @member {Camera} Scene#camera - The camera instance
	         */
	        this.camera = camera;
	        /**
	         * @member {HTMLElement} Scene#options - The Scene's options
	         */
	        this.options = options;
	        /**
	         * @member {CanvasRenderingContext2D} Scene#ctx - The canvas rendering object
	         */
	        this.ctx = canvas.getContext("2d");
	        /**
	         * @member {Transform} Scene#transform - The transformation matrix tracker
	         */
	        this.transform = new _Transform2.default();
	
	        this.xformOffset = null;
	        this.cameraXformOffset = null;
	    }
	
	    /**
	     * Applies the camera's transforms to the Transform > context
	     * @method Scene#_applyCameraTransforms
	     * @param {Camera} cam - The camera instance
	     */
	
	
	    _createClass(Scene, [{
	        key: "_applyCameraTransforms",
	        value: function _applyCameraTransforms(cam) {
	            this.transform.translate(-cam.x, -cam.y);
	
	            if (cam.rotation !== 0) {
	                var rotationOffsetWidth = cam.width / 2;
	                var rotationOffsetHeight = cam.height / 2;
	                this.transform.translate(rotationOffsetWidth, rotationOffsetHeight);
	                this.transform.rotate((0, _math.degreesToRadians)(cam.rotation));
	                this.transform.translate(-rotationOffsetWidth, -rotationOffsetHeight);
	            }
	
	            if (cam.zoom !== 1) {
	                var scaleOffsetWidth = cam.width / 2 * (cam.zoom - 1);
	                var scaleOffsetHeight = cam.height / 2 * (cam.zoom - 1);
	                this.transform.translate(-scaleOffsetWidth, -scaleOffsetHeight);
	                this.transform.scale(cam.zoom, cam.zoom);
	            }
	
	            this.cameraXformOffset = this.transform.transformPoint();
	
	            this.ctx.setTransform.apply(this.ctx, Array.prototype.slice.call(this.transform.matrix));
	        }
	
	        /**
	         * Applies a Sprite's transforms to the Transform > context
	         * @method Scene#_applyTransforms
	         * @param {Sprite} item - The sprite
	         */
	
	    }, {
	        key: "_applyTransforms",
	        value: function _applyTransforms(item) {
	            this.transform.translate(item.x, item.y);
	            this.transform.rotate((0, _math.degreesToRadians)(item.rotation));
	            this.transform.scale(item.sx, item.sy);
	
	            this.xformOffset = this.transform.transformPoint();
	
	            this.ctx.setTransform.apply(this.ctx, Array.prototype.slice.call(this.transform.matrix));
	        }
	
	        /**
	         * [startRender description]
	         * @method Scene#startRender
	         * @param {Group} group The group to render
	         */
	
	    }, {
	        key: "startRender",
	        value: function startRender(group) {
	            var _this = this;
	
	            this.ctx.save();
	            this.transform.save();
	
	            this._applyCameraTransforms(this.camera);
	            group.sprite.render(this.ctx);
	
	            group.collection.each(function (item) {
	                _this.renderItem(item);
	            });
	
	            this.ctx.restore();
	            this.transform.restore();
	        }
	
	        /**
	         * [renderItem description]
	         * @method Scene#renderItem
	         * @param  {Sprite|Group} item The item to render
	         */
	
	    }, {
	        key: "renderItem",
	        value: function renderItem(item) {
	            var _this2 = this;
	
	            if (item.isGroup) {
	                this.ctx.save();
	                this.transform.save();
	
	                this._applyTransforms(item.sprite);
	
	                if (this.options.debug) {
	                    this.ctx.fillRect(-8, -1, 16, 2);
	                    this.ctx.fillRect(-1, -8, 2, 16);
	                }
	
	                item.sprite.render(this.ctx);
	
	                item.collection.each(function (item) {
	                    _this2.renderItem(item);
	                });
	
	                this.ctx.restore();
	                this.transform.restore();
	            } else {
	                item.parentTransforms = this.transform.transformPoint();
	                // assign parent transforms before applying sprite's transforms
	                this._applyTransforms(item);
	                item.render(this.ctx);
	            }
	        }
	
	        /**
	         * [startUpdate description]
	         * @method Scene#startUpdate
	         * @param  {Group} group [description]
	         * @param  {Float} factor [description]
	         */
	
	    }, {
	        key: "startUpdate",
	        value: function startUpdate(group, factor) {
	            var _this3 = this;
	
	            group.collection.each(function (item) {
	                _this3.updateItem(item, factor);
	            });
	        }
	
	        /**
	         * [updateItem description]
	         * @method Scene#updateItem
	         * @param  {Sprite|Group} item [description]
	         * @param  {Float} factor [description]
	         */
	
	    }, {
	        key: "updateItem",
	        value: function updateItem(item, factor) {
	            var _this4 = this;
	
	            if (item.isGroup) {
	                item.collection.each(function (item) {
	                    _this4.updateItem(item, factor);
	                });
	            } else {
	                item.update(factor);
	            }
	        }
	    }]);
	
	    return Scene;
	}();
	
	exports.default = Scene;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.degreesToRadians = degreesToRadians;
	exports.radiansToDegrees = radiansToDegrees;
	/**
	 * @namespace util/math
	 */
	
	/**
	 * Convert degrees to radians
	 * @memberOf util/math
	 * @method degreesToRadians
	 * @param  {Integer} deg The degrees to convert
	 * @return {Float}
	 */
	function degreesToRadians(deg) {
	  return deg * Math.PI / 180;
	}
	
	/**
	 * Convert radians to degrees
	 * @memberOf util/math
	 * @method radiansToDegrees
	 * @param  {Float} rad The radians to convert
	 * @return {Integer}
	 */
	function radiansToDegrees(rad) {
	  return rad * 180 / Math.PI;
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*
	 * A fork from Simon Sarris
	 */
	var Transform = function () {
	    function Transform() {
	        _classCallCheck(this, Transform);
	
	        this.stack = [];
	        this.reset();
	    }
	
	    _createClass(Transform, [{
	        key: "clone",
	        value: function clone() {
	            var m = this.m;
	            return [m[0], m[1], m[2], m[3], m[4], m[5]];
	        }
	    }, {
	        key: "reset",
	        value: function reset() {
	            this.m = [1, 0, 0, 1, 0, 0];
	        }
	    }, {
	        key: "save",
	        value: function save() {
	            this.stack.push(this.clone());
	        }
	    }, {
	        key: "restore",
	        value: function restore() {
	            if (this.stack.length) {
	                var matrix = this.stack.pop();
	                this.m = matrix;
	            }
	        }
	    }, {
	        key: "multiply",
	        value: function multiply(matrix) {
	            var m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
	            var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];
	
	            var m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
	            var m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];
	
	            var dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
	            var dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];
	
	            this.m[0] = m11;
	            this.m[1] = m12;
	            this.m[2] = m21;
	            this.m[3] = m22;
	            this.m[4] = dx;
	            this.m[5] = dy;
	        }
	    }, {
	        key: "invert",
	        value: function invert() {
	            var d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
	            var m0 = this.m[3] * d;
	            var m1 = -this.m[1] * d;
	            var m2 = -this.m[2] * d;
	            var m3 = this.m[0] * d;
	            var m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
	            var m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
	            this.m[0] = m0;
	            this.m[1] = m1;
	            this.m[2] = m2;
	            this.m[3] = m3;
	            this.m[4] = m4;
	            this.m[5] = m5;
	        }
	    }, {
	        key: "rotate",
	        value: function rotate(rad) {
	            var c = Math.cos(rad);
	            var s = Math.sin(rad);
	            var m11 = this.m[0] * c + this.m[2] * s;
	            var m12 = this.m[1] * c + this.m[3] * s;
	            var m21 = this.m[0] * -s + this.m[2] * c;
	            var m22 = this.m[1] * -s + this.m[3] * c;
	            this.m[0] = m11;
	            this.m[1] = m12;
	            this.m[2] = m21;
	            this.m[3] = m22;
	        }
	    }, {
	        key: "translate",
	        value: function translate(x, y) {
	            this.m[4] += this.m[0] * x + this.m[2] * y;
	            this.m[5] += this.m[1] * x + this.m[3] * y;
	        }
	    }, {
	        key: "scale",
	        value: function scale(sx, sy) {
	            this.m[0] *= sx;
	            this.m[1] *= sx;
	            this.m[2] *= sy;
	            this.m[3] *= sy;
	        }
	    }, {
	        key: "transformPoint",
	        value: function transformPoint() {
	            var px = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	            var py = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
	            var x = px;
	            var y = py;
	            px = x * this.m[0] + y * this.m[2] + this.m[4];
	            py = x * this.m[1] + y * this.m[3] + this.m[5];
	
	            return {
	                x: px,
	                y: py
	            };
	        }
	    }, {
	        key: "matrix",
	        get: function get() {
	            return this.m;
	        }
	    }]);
	
	    return Transform;
	}();
	
	exports.default = Transform;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _domHelpers = __webpack_require__(10);
	
	var _radio = __webpack_require__(12);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var defaults = {
	    fitToWindow: true,
	    window: null,
	    document: null,
	    parent: null
	};
	
	/**
	 * @class Viewport
	 * @requires util/domHelpers
	 * @requires util/radio
	 *
	 * @param {Integer} width The game width
	 * @param {Integer} height The game height
	 * @param {Object} options
	 * @param {HTMLElement} [options.parent=document.body] - The parent element
	 * @param {Boolean} [options.fitToWindow=true] - If true, the viewport will fill the screen while maintaining aspect ratio
	 */
	
	var Viewport = function () {
	    function Viewport(width, height) {
	        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaults;
	
	        _classCallCheck(this, Viewport);
	
	        if (options.window === null) {
	            options.window = window;
	        }
	        if (options.document === null) {
	            options.document = document;
	        }
	        if (options.parent === null) {
	            options.parent = options.document.body;
	        }
	
	        /**
	         * @member {Integer} Viewport#width - The viewport's width
	         */
	        this.width = width;
	        /**
	         * @member {Integer} Viewport#height - The viewport's height
	         */
	        this.height = height;
	        /**
	         * @member {Integer} Viewport#options - The viewport's options
	         */
	        this.options = options;
	        /**
	         * @member {HTMLElement} Viewport#canvas - The canvas element
	         */
	        this.canvas = options.document.createElement("canvas");
	        /**
	         * @member {HTMLElement} Viewport#video - The video element
	         */
	        this.video = options.document.createElement("video");
	
	        this.canvas.width = width;
	        this.canvas.height = height;
	
	        var viewportStyles = {
	            height: this.height,
	            left: 0,
	            position: "absolute",
	            top: 0,
	            width: this.width
	        };
	
	        (0, _domHelpers.applyStyles)(this.canvas, viewportStyles);
	        (0, _domHelpers.applyStyles)(this.video, viewportStyles);
	
	        options.parent.appendChild(this.canvas);
	        options.parent.appendChild(this.video);
	
	        if (options.fitToWindow) {
	            (0, _radio.tuneIn)(options.window, "resize", this._onResize, this);
	            (0, _radio.tuneIn)(options.window, "orientationchange", this._onResize, this);
	            this._onResize();
	        }
	    }
	
	    /**
	     * @method Viewport#_onResize
	     */
	
	
	    _createClass(Viewport, [{
	        key: "_onResize",
	        value: function _onResize() {
	            var posCoords = (0, _domHelpers.fitToWindow)(this.width, this.height, this.options.window.innerWidth, this.options.window.innerHeight);
	
	            (0, _domHelpers.applyStyles)(this.canvas, posCoords);
	            (0, _domHelpers.applyStyles)(this.video, posCoords);
	        }
	    }]);
	
	    return Viewport;
	}();
	
	exports.default = Viewport;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.applyStyles = applyStyles;
	exports.fitToWindow = fitToWindow;
	
	var _ = __webpack_require__(11);
	
	/**
	 * @namespace util/domHelpers
	 */
	
	/**
	 * loops through style object and applies values. Adds "px" to numeric values.
	 * @memberOf util/domHelpers
	 * @method applyStyles
	 * @param {HTMLElement} el     The element to apply styles to
	 * @param {Object}      styles The key/value pair styles
	 */
	function applyStyles(el, styles) {
	    for (var key in styles) {
	        var val = styles[key];
	
	        el.style[key] = (0, _.isNumeric)(val) ? val + "px" : val;
	    }
	}
	
	/**
	 * Returns position & dimensions for a DOM element to fit in the viewport while maintaining aspect ratio
	 * @memberOf util/domHelpers
	 * @method fitToWindow
	 * @param  {Integer} elWidth   The element's original width
	 * @param  {Integer} elHeight  The element's original height
	 * @param  {Integer} winWidth  The window's current width
	 * @param  {Integer} winHeight The window's current height
	 * @return {Object}            The calculated left, top, width, height
	 */
	function fitToWindow(elWidth, elHeight, winWidth, winHeight) {
	    var LANDSCAPE_RATIO = elHeight / elWidth;
	    var PORTRAIT_RATIO = elWidth / elHeight;
	    var IS_LANDSCAPE = LANDSCAPE_RATIO < PORTRAIT_RATIO ? true : false;
	    var winLandscapeRatio = winHeight / winWidth;
	    var winPortraitRatio = winWidth / winHeight;
	    var offsetLeft = 0;
	    var offsetTop = 0;
	    var offsetWidth = void 0;
	    var offsetHeight = void 0;
	
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

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @namespace util
	 */
	
	/**
	 * Determine if an input is numeric or not
	 * @method isNumeric
	 * @memberOf util
	 * @param {Any} n - A value to evaluate
	 * @return {Boolean}
	 */
	var isNumeric = function isNumeric(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	};
	
	exports.isNumeric = isNumeric;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var handlers = {};
	
	/**
	 * @namespace util/radio
	 */
	
	/**
	 * @method _addScopedHandler
	 * @memberOf util/radio
	 * @param  {String}   event    [description]
	 * @param  {Function} handler [description]
	 * @param  {Object}   scope    [description]
	 * @return {Function} The scoped handler
	 */
	function _addScopedHandler(event, handler, scope) {
	    if (handlers[event] === undefined) {
	        handlers[event] = [];
	    }
	
	    var scopedHandler = scope ? handler.bind(scope) : handler;
	
	    handlers[event].push({
	        original: handler,
	        scoped: scopedHandler
	    });
	
	    return scopedHandler;
	}
	
	/**
	 * @method _removeScopedHandler
	 * @memberOf util/radio
	 * @param  {String}   event   [description]
	 * @param  {Function} handler [description]
	 * @return {Function}         Returns the scoped handler or original if scope was not passed on `add`
	 */
	function _removeScopedHandler(event, handler) {
	    var scopedHandler = void 0;
	
	    for (var i = 0, len = handlers[event].length; i < len; i++) {
	        if (handler === handler.original) {
	            scopedHandler = handler.scoped;
	            handlers[event].splice(i, 1);
	        }
	    }
	
	    return scopedHandler || handler;
	}
	
	/**
	 * @method tuneIn
	 * @memberOf util/radio
	 * @param {HTMLEntity} target
	 * @param {String}     event
	 * @param {Function}   handler
	 * @param {Object}     [scope]
	 */
	function tuneIn(target, event, handler, scope) {
	    // we add the handler here (even if no scope is passed) so that we don't have to make the user pass scope
	    // on `remove`
	    handler = _addScopedHandler(event, handler, scope);
	
	    target.addEventListener(event, handler, false);
	}
	
	/**
	 * @method tuneOut
	 * @memberOf util/radio
	 * @param {HTMLEntity} target
	 * @param {String}     event
	 * @param {Function}   handler
	 */
	function tuneOut(target, event, handler) {
	    // check that a scoped handler was bound, returns original if not
	    var scopedHandler = _removeScopedHandler(event, handler);
	
	    target.removeEventListener(event, scopedHandler, false);
	}
	
	/**
	 * @method broadcast
	 * @memberOf util/radio
	 * @param {Any}    target
	 * @param {String} event
	 * @param {Object} data
	 */
	function broadcast(target, event, data) {
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
	
	exports.tuneIn = tuneIn;
	exports.tuneOut = tuneOut;
	exports.broadcast = broadcast;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map