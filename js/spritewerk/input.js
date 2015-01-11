/**
 * @class Input
 * @static
 */
define([
    '../lib/radio',
    './config',
    './dom-control'
], function(radio, config, DomControl) {
    return {
        _canvas: null,

        init: function() {
            this._canvas = DomControl.getCanvas();

            if (config.bindMouseInput) {
                radio.tuneIn(this._canvas, 'click',     this._receiveEvent);
                radio.tuneIn(this._canvas, 'dblclick',  this._receiveEvent);
                radio.tuneIn(this._canvas, 'mousedown', this._receiveEvent);
                radio.tuneIn(this._canvas, 'mouseup',   this._receiveEvent);

                if (config.bindMousemove) {
                    radio.tuneIn(canvas, 'mousemove', this._receiveEvent);
                }
            }

            if (config.bindTouchInput) {
                radio.tuneIn(this._canvas, 'tap',        this._receiveEvent);
                radio.tuneIn(this._canvas, 'dbltap',     this._receiveEvent);
                radio.tuneIn(this._canvas, 'touchstart', this._receiveEvent);
                radio.tuneIn(this._canvas, 'touchend',   this._receiveEvent);
            }
        },

        scaleFactor: function() {
            var factor = 1;
            var canvasCssWidth;

            if (this._canvas.style.width) {
                canvasCssWidth = parseInt(this._canvas.style.width, 10);
                factor = canvasCssWidth / this._canvas.width;
            }

            return factor;
        },

        /**
         * handle dom events
         *
         * @method Input._receiveEvent
         * @private
         */
        _receiveEvent: function(e) {
            radio.broadcast('inputreceived', {
                inputEvent: e
            });
        }
    };
});