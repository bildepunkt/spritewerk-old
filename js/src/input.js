/**
 * manages user input
 *
 * @class SW.Input
 * @belongsto SW
 */
SW.Input = SW.Protos.extend({
    _canvas: null,

    init: function() {
        this._canvas = SW.Canvas.getCanvas();

        if (SW.Config.bindMouseInput) {
            SW.Radio.tuneIn(this._canvas, 'click',     this._receiveEvent);
            SW.Radio.tuneIn(this._canvas, 'dblclick',  this._receiveEvent);
            SW.Radio.tuneIn(this._canvas, 'mousedown', this._receiveEvent);
            SW.Radio.tuneIn(this._canvas, 'mouseup',   this._receiveEvent);
        }

        if (SW.Config.bindTouchInput) {
            SW.Radio.tuneIn(this._canvas, 'tap',        this._receiveEvent);
            SW.Radio.tuneIn(this._canvas, 'dbltap',     this._receiveEvent);
            SW.Radio.tuneIn(this._canvas, 'touchstart', this._receiveEvent);
            SW.Radio.tuneIn(this._canvas, 'touchend',   this._receiveEvent);
        }
    },

    /**
     * @method Input._getScaleFactor
     * @protected
     */
    _getScaleFactor: function() {
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
        SW.Radio.broadcast('inputreceived', {
            inputEvent: e
        });
    }
});