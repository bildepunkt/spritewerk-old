SW.Input = Protos.extend({
    canvas: null,

    init: function() {
        this.canvas = SW.Canvas.getCanvas();

        if (SW.Config.bindMouseInput) {
            radio.tuneIn(this.canvas, 'click',     this._receiveEvent);
            radio.tuneIn(this.canvas, 'dblclick',  this._receiveEvent);
            radio.tuneIn(this.canvas, 'mousedown', this._receiveEvent);
            radio.tuneIn(this.canvas, 'mouseup',   this._receiveEvent);
        }

        if (SW.Config.bindTouchInput) {
            radio.tuneIn(this.canvas, 'tap',        this._receiveEvent);
            radio.tuneIn(this.canvas, 'dbltap',     this._receiveEvent);
            radio.tuneIn(this.canvas, 'touchstart', this._receiveEvent);
            radio.tuneIn(this.canvas, 'touchend',   this._receiveEvent);
        }
    },

    /**
     * @method Input._getScaleFactor
     * @protected
     */
    _getScaleFactor: function() {
        var factor = 1;
        var canvasCssWidth;

        if (this.canvas.style.width) {
            canvasCssWidth = parseInt(this.canvas.style.width, 10);
            factor = canvasCssWidth / this.canvas.width;
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
});