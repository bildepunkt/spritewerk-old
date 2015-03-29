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
     * @param {Boolean} [options.canvasFit] - if true, the canvas stretches to fill the viewport width/height
     * @belongsto SW
     */
    var Canvas = function(options) {
        options = options || {};

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
        this._width = options.width || 800;
        /**
         * @member {Integer} SW.Canvas.prototype._height - the canvas element's height
         * @private
         */
        this._height = options.height || 600;

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
        var position = entity.getPosition();
        var scale = entity.getScale();
        var rotation = entity.getRotation();
        var rotationOffset = entity.getRotationOffset();
        var scaleOffset = entity.getScaleOffset();

        // remember: context transforms are cumulative :)
        this._context.save();
        this._context.translate(Math.floor(position.x), Math.floor(position.y));

        if (rotation !== 0) {
            this._context.translate(rotationOffset.x, rotationOffset.y);
            this._context.rotate((Math.PI / 180) * rotation);
            this._context.translate(-rotationOffset.x, -rotationOffset.y);
        }

        if (scale.x !== 1 || scale.y !== 1) {
            this._context.translate(scaleOffset.x, scaleOffset.y);
            this._context.scale(scale.x, scale.y);
            this._context.translate(-scaleOffset.x, -scaleOffset.y);
        }

        this._context.globalAlpha = entity.getOpacity();
        this._context.globalCompositeOperation = entity.getComposite();

        switch(entity.getDisplayType()) {
            case 'rectangle':
                this._renderRectangle(entity);
            break;
            case 'line':
                this._renderLine(entity);
            break;
            case 'polygon':
                this._renderPolygon(entity);
            break;
            case 'sprite':
                this._renderSprite(entity);
            break;
            case 'text':
                this._renderText(entity);
            break;
            default:
                throw new Error('SW.Canvas cannot render type: ' + entity.getDisplayType());
            break;
        }

        this._context.restore();
    };

    /**
     * @method Draw.prototype._renderRectangle
     * @private
     */
    Canvas.prototype._renderRectangle = function(entity) {
        var dimension = entity.getDimensions();
        var fillStyle = entity.getFillStyle();
        var strokeStyle = entity.getStrokeStyle();

        this._context.save();
        this._context.lineWidth = entity.getStrokeWidth();

        if (fillStyle) {
            this._context.fillStyle = fillStyle;
            this._context.fillRect(0, 0, dimension.x, dimension.y);
        }

        if (strokeStyle) {
            this._context.strokeStyle = strokeStyle;
            this._context.strokeRect(0, 0, dimension.x, dimension.y);
        }

        this._context.restore();
    };

    /**
     * @method Draw.prototype._renderLine
     * @private
     */
    Canvas.prototype._renderLine = function(entity) {
        var coordinates = entity.getCoordinates();

        this._context.save();
        this._context.strokeStyle = entity.getStrokeStyle();
        this._context.lineWidth = entity.getStrokeWidth();
        this._context.beginPath();

        this._context.moveTo(coordinates[0].x, coordinates[0].y);

        for(var i = 1, len = coordinates.length; i < len; i += 1) {
            this._context.lineTo(coordinates[i].x, coordinates[i].y);
        }

        this._context.stroke();
        this._context.restore();
    };

    /**
     * @method Draw.prototype._renderPolygon
     * @private
     */
    Canvas.prototype._renderPolygon = function(entity) {
        var coordinates = entity.getCoordinates();
        var fillStyle = entity.getDillStyle();
        var strokeStyle = entity.getStrokeStyle();

        this._context.save();
        this._context.lineWidth = entity.getStrokeWidth();
        this._context.beginPath();

        this._context.moveTo(coordinates[0].x, coordinates[0].y);

        for(var i = 1, len = coordinates.length; i < len; i += 1) {
            this._context.lineTo(coordinates[i].x, coordinates[i].y);
        }

        this._context.lineTo(coordinates[0].x, coordinates[0].y);
        this._context.closePath();

        if (fillStyle) {
            this._context.fillStyle = fillStyle;
            this._context.fill();
        }

        if (strokeStyle) {
            this._context.strokeStyle = strokeStyle;
            this._context.stroke();
        }

        this._context.restore();
    };

    /**
     * @method Draw.prototype._renderText
     * @private
     */
    Canvas.prototype._renderText = function(entity) {
        var fillStyle = entity.getFillStyle();
        var strokeStyle = entity.getStrokeStyle();
        var maxWidth = entity.getMaxWidth();
        var contents = entity.getContents();
        var lineHeight;
        var lines;
        var textDimensions;

        this._context.save();
        this._context.font = entity.getFont();
        this._context.textBaseline = entity.getBaseline();
        this._context.textAlign = entity.getAlign();
        this._context.lineWidth = entity.getStrokeWidth();

        if (typeof maxWidth === 'number') {
            lines = this._getWrappedText(contents, maxWidth);
            lineHeight = this._getLineHeight(entity);
        } else {
            lines[0] = contents;
        }

        for(var i = 0, len = lines.length; i < len; i += 1) {
            if (fillStyle) {
                this._context.fillStyle = fillStyle;
                this._context.fillText(lines[i], 0, lineHeight * i);
            }

            if (strokeStyle) {
                this._context.strokeStyle = strokeStyle;
                this._context.strokeText(lines[i], 0, lineHeight * i);
            }
        }

        textDimensions = this._context.measureText(contents);

        entity.setDimensions(
            maxWidth || textDimensions.width,
            lineHeight * lines.length
        );

        this._context.restore();
    };

    Canvas.prototype._getWrappedText = function(contents, maxWidth) {
        var words = contents.split(' ');
        var lines = [];
        var line = '';
        var testLine;
        var testWidth;

        for(var i = 0, len = words.length; i < len; i += 1) {
            testLine = line + words[i] + ' ';
            testWidth = this._context.measureText(testLine).width;

            if (testWidth > maxWidth) {
                lines.push(line);
                line = words[i] + ' ';
            } else {
                line = testLine;
            }
        }

        // and finally, add leftovers
        lines.push(line);

        return lines;
    };

    Canvas.prototype._getLineHeight = function(entity) {
        var factor = 1.2;
        var font = entity.getFont();
        return parseInt(font.match(/[0-9]*px|pt|em/), 10) * factor;
    };

    /**
     * @method Draw.prototype._renderSprite
     * @private
     */
    Canvas.prototype._renderSprite = function(entity) {
        var dimension = entity.getDimensions();
        var srcDimensions = entity.getSrcDimensions();
        var srcPosition = entity.getSrcPosition();

        this._context.drawImage(
            entity.getImage(),
            srcPosition.x,
            srcPosition.y,
            srcDimensions.x,
            srcDimensions.y,
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

    /**
     * @method SW.Canvas.prototype.getContext
     * @return {CanvasRenderingContext2D}
     */
    Canvas.prototype.getContext = function() {
        return this._context;
    };

    return Canvas;
}());