SW.Canvas = (function() {
    /**
     * manages the canvas element
     *
     * @class SW.Canvas
     * @belongsto SW
     * @singleton
     */
    var Canvas = function() {
        /**
         * @member {HTMLEntity} SW.Canvas.prototype.canvas - the canvas element
         */
        this.canvas = document.getElementById('spritewerk');

        this.canvas.width = SW.Config.width;
        this.canvas.height = SW.Config.height;
        this.canvas.style.position = 'absolute';

        if (SW.Config.stretch) {
            SW.Radio.tuneIn('screen/resize', this._onScreenResize, this);
            this._onScreenResize();
        }
    };

    /**
     * @method SW.Canvas.prototype._onScreenResize
     * @listens SW.Radio#screen/resize
     * @private
     */
    Canvas.prototype._onScreenResize = function() {
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

        this.canvas.style.width  = Math.round(canW) + 'px';
        this.canvas.style.height = Math.round(canH) + 'px';
        this.canvas.style.left   = Math.round(left) + 'px';
        this.canvas.style.top    = Math.round(top)  + 'px';

        // we use a timeout here because some mobile browsers
        // don't fire if there is not a short delay
        //setTimeout(function() {
            //window.scrollTo(0,1);
        //}, 1);
    };

    /**
     * @method SW.Canvas.prototype.getCanvas
     */
    Canvas.prototype.getCanvas = function() {
        return this.canvas;
    };

    return Canvas;
});