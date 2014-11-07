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
        init: function() {
            var canvas = DomControl.getCanvas();

            if (config.bindMouseInput) {
                radio.tuneIn(canvas, 'click',     this._receiveEvent);
                radio.tuneIn(canvas, 'dblclick',  this._receiveEvent);
                radio.tuneIn(canvas, 'mousedown', this._receiveEvent);
                radio.tuneIn(canvas, 'mouseup',   this._receiveEvent);

                if (config.bindMousemove) {
                    radio.tuneIn(canvas, 'mousemove', this._receiveEvent);
                }
            }

            if (config.bindTouchInput) {
                radio.tuneIn(canvas, 'tap',        this._receiveEvent);
                radio.tuneIn(canvas, 'dbltap',     this._receiveEvent);
                radio.tuneIn(canvas, 'touchstart', this._receiveEvent);
                radio.tuneIn(canvas, 'touchend',   this._receiveEvent);
            }
        },

        /**
         *
         */
        _receiveEvent: function(e) {
            radio.broadcast('inputreceived', {
                inputEvent: e
            });
        }
    };
});