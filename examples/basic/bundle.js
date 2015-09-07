(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Creates a canvas element and provides the context's api
 *
 * @class Canvas
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Canvas = (function () {
    /**
     *
     */

    function Canvas(deps) {
        _classCallCheck(this, Canvas);

        this._deps = deps;

        this._canvas = document.createElement('canvas');
        this._canvas.width = this._deps.config.width;
        this._canvas.height = this._deps.config.height;

        this._canvas.style.position = 'absolute';

        this._context = this._canvas.getContext('2d');

        document.body.appendChild(this._canvas);
    }

    /**
     *
     */

    _createClass(Canvas, [{
        key: 'drawPt',
        value: function drawPt(x, y) {
            this._context.fillRect(x, y, 4, 4);
        }

        /**
         *
         */
    }, {
        key: 'getElement',
        value: function getElement() {
            return this._canvas;
        }
    }]);

    return Canvas;
})();

module.exports = Canvas;
},{}],2:[function(require,module,exports){
/**
 * Provides configuration properties
 *
 * @class Config
 * @param {object} [options]
 */
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config =
/**
 *
 */
function Config(options) {
    _classCallCheck(this, Config);

    options = options || {};

    var defaults = {
        fps: 30,
        width: 800,
        height: 600
    };

    for (var key in defaults) {
        this[key] = options[key] || defaults[key];
    }
};

module.exports = Config;
},{}],3:[function(require,module,exports){
/**
 * Keeps canvas element centered and (with aspect ratio intact) in the viewport
 *
 * @class Cinemize
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cinemize = (function () {
    function Cinemize() {
        _classCallCheck(this, Cinemize);
    }

    _createClass(Cinemize, null, [{
        key: "fit",

        /**
         *
         */
        value: function fit(el) {
            if (!el.height && !el.height) {
                false;
            }

            var LANDSCAPE_RATIO = el.height / el.width;
            var PORTRAIT_RATIO = el.width / el.height;
            var IS_LANDSCAPE = LANDSCAPE_RATIO < PORTRAIT_RATIO ? true : false;
            var winWidth = window.innerWidth;
            var winHeight = window.innerHeight;
            var winLandscapeRatio = winHeight / winWidth;
            var winPortraitRatio = winWidth / winHeight;
            var elWidth = undefined;
            var elHeight = undefined;

            this._offsetLeft = 0;
            this._offsetTop = 0;

            if (IS_LANDSCAPE) {
                if (LANDSCAPE_RATIO < winLandscapeRatio) {
                    elWidth = winWidth;
                    elHeight = elWidth * LANDSCAPE_RATIO;
                    this._offsetTop = (winHeight - elHeight) / 2;
                } else {
                    elHeight = winHeight;
                    elWidth = winHeight * PORTRAIT_RATIO;
                    this._offsetLeft = (winWidth - elWidth) / 2;
                }
            } else {
                if (PORTRAIT_RATIO < winPortraitRatio) {
                    elHeight = winHeight;
                    elWidth = winHeight * PORTRAIT_RATIO;
                    this._offsetLeft = (winWidth - elWidth) / 2;
                } else {
                    elWidth = winWidth;
                    elHeight = elWidth * LANDSCAPE_RATIO;
                    this._offsetTop = (winHeight - elHeight) / 2;
                }
            }

            el.style.width = Math.round(elWidth) + "px";
            el.style.height = Math.round(elHeight) + "px";
            el.style.left = Math.round(this._offsetLeft) + "px";
            el.style.top = Math.round(this._offsetTop) + "px";
        }

        /**
         *
         */
    }, {
        key: "getOffsetLeft",
        value: function getOffsetLeft() {
            return this._offsetLeft;
        }

        /**
         *
         */
    }, {
        key: "getOffsetTop",
        value: function getOffsetTop() {
            return this._offsetTop;
        }
    }]);

    return Cinemize;
})();

module.exports = Cinemize;
},{}],4:[function(require,module,exports){
'use strict';

var Canvas = require('../../dist/Canvas');
var Config = require('../../dist/Config');
var Cinemize = require('../../dist/lib/Cinemize');

var config = new Config();
var canvas = new Canvas({
    config: config
});

Cinemize.fit(canvas.getElement());

canvas.drawPt(32, 32);

},{"../../dist/Canvas":1,"../../dist/Config":2,"../../dist/lib/Cinemize":3}]},{},[4]);
