'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class       Stage
 * @description Creates and handles the canvas element. included in the options
 *              parameter is optional dependency injection used for testing against
 *              a virtual dom.
 * @author      Chris Peters
 *
 * @param {Integer}     [width]         The width of the canvas
 * @param {Integer}     [height]        The height of the canvas
 * @param {Object}      [opts]          Stage options
 * @param {HTMLElement} [opts.parentEl] The element with which to attach the canvas.
 *                                      If none given the body is used.
 * @param {String}      [opts.bgColor]  The parent element's bg color
 * @param {Object}      [opts.document] For testing
 * @param {Object}      [opts.window]   For testing
 * @param {Boolean}     [opts.fill]     Set to false to not maximally fill viewport.
 *                                      Default is true.
 */

var Stage = function () {
    function Stage() {
        var width = arguments.length <= 0 || arguments[0] === undefined ? 800 : arguments[0];
        var height = arguments.length <= 1 || arguments[1] === undefined ? 600 : arguments[1];
        var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, Stage);

        this._fill = opts.fill === undefined ? true : opts.fill;
        this._width = width;
        this._height = height;
        this._document = opts.document || document;
        this._window = opts.window || window;
        this._parentEl = opts.parentEl || this._document.body;

        this._document.documentElement.style.backgroundColor = opts.bgColor;

        this._createStageElements();

        this._window.addEventListener('resize', this._handleResize.bind(this));
        this._window.addEventListener('orientationchange', this._handleResize.bind(this));

        this._handleResize();
    }

    _createClass(Stage, [{
        key: '_createStageElements',
        value: function _createStageElements() {
            this._stage = this._document.createElement('div');
            this._parentEl.appendChild(this._stage);

            this._textfield = this._document.createElement('input');
            this._textfield.type = 'text';
            this._textfield.style.position = 'absolute';
            this._textfield.style.top = '-999px';
            // TODO verify value 'none'
            this._textfield.autocapitalize = 'none';
            this._textfield.id = 'textfield';
            this._stage.appendChild(this._textfield);

            this._video = this._document.createElement('video');
            this._video.id = 'video';
            this._video.style.position = 'absolute';
            this._stage.appendChild(this._video);

            this._canvas = this._document.createElement('canvas');
            this._canvas.width = this._width;
            this._canvas.height = this._height;
            this._canvas.style.position = 'absolute';
            this._stage.appendChild(this._canvas);
        }

        /**
         * Calls _resizeElement for stage elements
         *
         * @method Stage#_handleResize
         */

    }, {
        key: '_handleResize',
        value: function _handleResize() {
            this._resizeElement(this._canvas);
            this._resizeElement(this._video);
        }

        /**
         * Decides how to handle resize based on options
         *
         * @method Stage#_resizeElement
         * @param  {HTMLEntity} el The element to resize
         */

    }, {
        key: '_resizeElement',
        value: function _resizeElement(el) {
            if (this._fill) {
                var _Stage$fill = Stage.fill(this._width, this._height, this._window.innerWidth, this._window.innerHeight);

                var top = _Stage$fill.top;
                var left = _Stage$fill.left;
                var width = _Stage$fill.width;
                var height = _Stage$fill.height;


                el.style.top = Math.round(top) + 'px';
                el.style.left = Math.round(left) + 'px';
                el.style.width = Math.round(width) + 'px';
                el.style.height = Math.round(height) + 'px';
            } else {
                var _Stage$center = Stage.center(this._width, this._height, this._window.innerWidth, this._window.innerHeight);

                var top = _Stage$center.top;
                var left = _Stage$center.left;


                el.style.top = Math.round(top) + 'px';
                el.style.left = Math.round(left) + 'px';
            }
        }

        /**
         * Returns the canvas element
         *
         * @method Stage#getCanvas
         * @return {HTMLElement}
         */

    }, {
        key: 'getCanvas',
        value: function getCanvas() {
            return this._canvas;
        }

        /**
         * Returns the video element
         *
         * @method Stage#getVideo
         * @return {HTMLElement}
         */

    }, {
        key: 'getVideo',
        value: function getVideo() {
            return this._video;
        }

        /**
         * Maximizes an element (with aspect ratio intact) in the viewport via CSS.
         *
         * @method Stage.fill
         * @param  {Integer} width          The element's original width attribute
         * @param  {Integer} height         The element's original height attribute
         * @param  {Integer} viewportWidth  The viewport's current width
         * @param  {Integer} viewportHeight The viewport's current height
         * @return {Object}                 The new top, left, width, & height
         */

    }], [{
        key: 'fill',
        value: function fill(width, height, viewportWidth, viewportHeight) {
            var LANDSCAPE_RATIO = height / width;
            var PORTRAIT_RATIO = width / height;
            var IS_LANDSCAPE = LANDSCAPE_RATIO < PORTRAIT_RATIO ? true : false;

            var winLandscapeRatio = viewportHeight / viewportWidth;
            var winPortraitRatio = viewportWidth / viewportHeight;
            var offsetLeft = 0;
            var offsetTop = 0;
            var offsetWidth = undefined;
            var offsetHeight = undefined;

            if (IS_LANDSCAPE) {
                if (LANDSCAPE_RATIO < winLandscapeRatio) {
                    offsetWidth = viewportWidth;
                    offsetHeight = offsetWidth * LANDSCAPE_RATIO;
                    offsetTop = (viewportHeight - offsetHeight) / 2;
                } else {
                    offsetHeight = viewportHeight;
                    offsetWidth = viewportHeight * PORTRAIT_RATIO;
                    offsetLeft = (viewportWidth - offsetWidth) / 2;
                }
            } else {
                if (PORTRAIT_RATIO < winPortraitRatio) {
                    offsetHeight = viewportHeight;
                    offsetWidth = viewportHeight * PORTRAIT_RATIO;
                    offsetLeft = (viewportWidth - offsetWidth) / 2;
                } else {
                    offsetWidth = viewportWidth;
                    offsetHeight = offsetWidth * LANDSCAPE_RATIO;
                    offsetTop = (viewportHeight - offsetHeight) / 2;
                }
            }

            return {
                width: offsetWidth,
                height: offsetHeight,
                left: offsetLeft,
                top: offsetTop
            };
        }

        /**
         * Keeps stage element centered in the viewport
         *
         * @method Stage.center
         * @param  {Integer} width          The element's original width attribute
         * @param  {Integer} height         The element's original height attribute
         * @param  {Integer} viewportWidth  The viewport's current width
         * @param  {Integer} viewportHeight The viewport's current height
         * @return {Object}                 The top and left
         */

    }, {
        key: 'center',
        value: function center(width, height, viewportWidth, viewportHeight) {
            return {
                left: (viewportWidth - width) / 2,
                top: (viewportHeight - height) / 2
            };
        }
    }]);

    return Stage;
}();

exports.default = Stage;