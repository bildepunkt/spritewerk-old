SW.Canvas = SW.Protos.extend({
    _canvas: null,
    _width: null,
    _height: null,

    init: function() {
        this._canvas = document.getElementById('spritewerk');
        this._width = SW.Config.width;
        this._height = SW.Config.height;
        this._canvas.width = this._width;
        this._canvas.height = this._height;

        this._canvas.style.position = 'absolute';

        if (SW.Config.stretch) {
            SW.Radio.tuneIn('screenresize', this._onScreenResize, this);
            this._onScreenResize();
        }
    },

    /**
     * @method Canvas.prototype._onScreenResize
     * @private
     */
    _onScreenResize: function() {
        var LANDSCAPE_RATIO = SW.Config.height / SW.Config.width;
        var PORTRAIT_RATIO  = SW.Config.width / SW.Config.height;
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
        //setTimeout(function() {
            //window.scrollTo(0,1);
        //}, 1);
    },

    /**
     * @method Canvas.prototype.getCanvas
     */
    getCanvas: function() {
        return this._canvas;
    }
});