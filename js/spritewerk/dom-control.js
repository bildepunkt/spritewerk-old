/**
 * sets up the canvas and handles window resizing
 *
 * @class DomControl
 * @static
 */
define([
    '../lib/radio',
    './config'
], function(radio, config) {
    return {
        /**
         * @member {HTMLEntity} DomControl._canvas
         * @private
         */
        _canvas: null,

        /**
         * @member {object} DomControl._context - the canavas drawing context
         * @private
         */
        _context: null,

        init: function() {
            this._width   = config.width;
            this._height  = config.height;
            this._canvas  = document.getElementById('spritewerk');
            this._context = this._canvas.getContext('2d');
            this._canvas.width  = this._width;
            this._canvas.height = this._height;

            document.title = config.title;

            this._styleElements();

            if (config.stretch) {
                radio.tuneIn(window, 'resize', this._onWindowResize, this);
                // TODO is this needed?
                radio.tuneIn(window, 'orientationchange', this._onWindowResize, this);
                
                this._onWindowResize();
            }
        },

        /**
         * @method DomControl._styleElements
         * @private
         */
        _styleElements: function() {
            var body = document.getElementsByTagName('body')[0];

            body.style.backgroundColor = config.backgroundColor;
            body.style.margin = 0;
            body.style.padding = 0;

            this._canvas.style.position = 'absolute';
        },

        /**
         * @method DomControl._onWindowResize
         * @private
         */
        _onWindowResize: function() {
            var LANDSCAPE_RATIO = config.height / config.width;
            var PORTRAIT_RATIO  = config.width / config.height;
            var IS_LANDSCAPE    = LANDSCAPE_RATIO < PORTRAIT_RATIO ? true : false;
            var winW = window.innerWidth;
            var winH = window.innerHeight;
            var winLandscapeRatio = winH / winW;
            var winPortraitRatio  = winW / winH;
            var left = 0;
            var top  = 0;
            var canW;
            var canH;

            if (IS_LANDSCAPE) {
                if (LANDSCAPE_RATIO < winLandscapeRatio) {
                    canW = winW;
                    canH = canW * LANDSCAPE_RATIO;
                    top  = (winH - canH) / 2;
                } else {
                    canH = winH;
                    canW = winH * PORTRAIT_RATIO;
                    left = (winW - canW) / 2;
                }
            } else {
                if (PORTRAIT_RATIO < winPortraitRatio) {
                    canH = winH;
                    canW = winH * PORTRAIT_RATIO;
                    left = (winW - canW) / 2;
                } else {
                    canW = winW;
                    canH = canW * LANDSCAPE_RATIO;
                    top  = (winH - canH) / 2;
                }
            }

            this._canvas.style.width  = Math.round(canW) + 'px';
            this._canvas.style.height = Math.round(canH) + 'px';
            this._canvas.style.left   = Math.round(left) + 'px';
            this._canvas.style.top    = Math.round(top)  + 'px';

            // we use a timeout here because some mobile browsers
            // don't fire if there is not a short delay
            setTimeout(function() {
                window.scrollTo(0,1);
            }, 1);
        },

        /**
         * returns the Canvas object
         *
         * @method DomControl.getCanvas
         * @returns {HTMLEntity} canvas
         */
        getCanvas: function() {
            return this._canvas;
        },

        /**
         * returns the 2D Context object
         *
         * @method DomControl.getContext
         * @returns {object} context
         */
        getContext: function() {
            return this._context;
        }
    };
});