SW.Canvas = (function() {
    'use strict';

    /**
     * displays entities
     *
     * @class SW.Canvas
     * @param {Object} options
     * @param {String} options.id - the canvas element's id
     * @param {String} options.width - the canvas element's width
     * @param {String} options.height - the canvas element's height
     * @param {Boolean} options.canvasFit
     * @belongsto SW
     */
    var Canvas = function(options) {
        /**
         * @member {HTMLEntity} SW.Canvas.prototype._canvasEl - the canvas element
         * @private
         */
        this._canvasEl = document.getElementById(options.id);
        /**
         * @member {HTMLEntity} SW.Canvas.prototype._context - the canvas element's context object
         * @private
         */
        this._context = this._canvasEl.getContext('2d');
        /**
         * @member {Integer} SW.Canvas.prototype._width - the canvas element's width
         * @private
         */
        this._width = options.width;
        /**
         * @member {Integer} SW.Canvas.prototype._height - the canvas element's height
         * @private
         */
        this._height = options.height;

        this._canvasEl.width = this._width;
        this._canvasEl.height = this._height;
        this._canvasEl.style.position = 'absolute';

        if (options.canvasFit) {
            SW.Signal.addListener('screen/resize', this._onScreenResize, this);
            this._onScreenResize();
        }
    };

    /**
     * @method SW.Canvas.prototype._onScreenResize
     * @listens SW.Signal#screen/resize
     * @private
     */
    Canvas.prototype._onScreenResize = function() {
        var LANDSCAPE_RATIO = this._height / this._width;
        var PORTRAIT_RATIO  = this._width / this._height;
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

        this._canvasEl.style.width  = Math.round(canW) + 'px';
        this._canvasEl.style.height = Math.round(canH) + 'px';
        this._canvasEl.style.left   = Math.round(left) + 'px';
        this._canvasEl.style.top    = Math.round(top)  + 'px';

        // we use a timeout here because some mobile browsers
        // don't fire if there is not a short delay
        //setTimeout(function() {
            //window.scrollTo(0,1);
        //}, 1);
    };

    /**
     * @method SW.Canvas.prototype.clearAll
     * @chainable
     */
    Canvas.prototype.clearAll = function() {
        this._context.clearRect(0, 0, this._width, this._height);

        return this;
    };

    /**
     * fills the entire canvas
     *
     * @method SW.Canvas.prototype.fillAll
     * @param {String} color - supports color names, hex & rgb(a)
     * @chainable
     */
    Canvas.prototype.fillAll = function(color) {
        this._context.save();
        this._context.fillStyle = color;
        this._context.fillRect(0, 0, this._width, this._height);
        this._context.restore();

        return this;
    };

    /**
     * prepares context and decides how to render the entity
     *
     * @method SW.Canvas.prototype.render
     * @param {SW.renderable} entity
     */
    Canvas.prototype.render = function(entity) {
        var position = entity.position();
        var scale = entity.scale();
        var rotationOffset = entity.rotationOffset();
        var scaleOffset = entity.scaleOffset();

        // remember: context transforms are cumulative :)
        this._context.save();
        this._context.translate(Math.floor(position.x), Math.floor(position.y));

        if (entity.rotation() !== 0) {
            this._context.translate(rotationOffset.x, rotationOffset.y);
            this._context.rotate((Math.PI / 180) * entity.gsRotation());
            this._context.translate(-rotationOffset.x, -rotationOffset.y);
        }

        if (entity.scaleX !== 1 || entity.scaleY !== 1) {
            this._context.translate(scaleOffset.x, scaleOffset.y);
            this._context.scale(scale.x, scale.y);
            this._context.translate(-scaleOffset.x, -scaleOffset.y);
        }

        this._context.globalAlpha = entity.opacity();
        this._context.globalCompositeOperation = entity.composite();

        switch(entity.getDisplayType()) {
            case 'rectangle':
                this.renderRectangle(entity);
            break;
            case 'line':
                this.renderLine(entity);
            break;
            case 'sprite':
                this.renderSprite(entity);
            break;
        }

        this._context.restore();
    };

    /**
     * @method Draw.prototype.renderRectangle
     * @private
     */
    Canvas.prototype.renderRectangle = function(entity) {
        var dimension = entity.dimensions();

        this._context.save();
        this._context.fillStyle = entity.fillColor();
        this._context.fillRect(0, 0, dimension.x, dimension.y);
        this._context.restore();
    };

    /**
     * @method Draw.prototype.renderRectangle
     * @private
     */
    Canvas.prototype.renderLine = function(entity) {
        var coordinates = entity.coordinates();

        this._context.save();
        this._context.strokeStyle = entity.color();
        this._context.beginPath();

        this._context.moveTo(coordinates[0].x, coordinates[0].y);

        for(var i = 1, len = coordinates.length; i < len; i += 1) {
            this._context.lineTo(coordinates[i].x, coordinates[i].y);
        }

        this._context.stroke();
        this._context.restore();
    };

    /**
     * @method Draw.prototype.renderSprite
     * @private
     */
    Canvas.prototype.renderSprite = function(entity) {
        var dimension = entity.dimensions();
        var srcDimension = entity.srcDimensions();
        var srcPosition = entity.srcPosition();

        this._context.drawImage(
            entity.image(),
            srcPosition.x,
            srcPosition.y,
            srcDimension.x,
            srcDimension.y,
            0, 0,
            dimension.x,
            dimension.y
        );
    };

    /**
     * @method SW.Canvas.prototype.getCanvasEl
     * @return {HTMLEntity}
     */
    Canvas.prototype.getCanvasEl = function() {
        return this._canvasEl;
    };

    return Canvas;
}());