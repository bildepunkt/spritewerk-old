SW.Draw = (function() {

    /**
     * @class SW.Draw
     * @belongsto SW
     */
    var Draw = function(options) {
        this._canvas = options.canvas;
        this._context = this._canvas.getContext('2d');
    };

    /**
     * @method SW.Draw.prototype.clearAll
     * @chainable
     */
    Draw.prototype.clearAll = function() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        return this;
    };

    /**
     * fills the entire Draw
     *
     * @method SW.Draw.prototype.fillAll
     * @param {String} color - supports color names, hex & rgb(a)
     * @chainable
     */
    Draw.prototype.fillAll = function(color) {
        this._context.save();
        this._context.fillStyle = color;
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.restore();

        return this;
    };

    /**
     * prepares context and decides how to render the entity
     *
     * @method SW.Draw.prototype.render
     * @param {SW.renderable} entity
     */
    Draw.prototype.render = function(entity) {
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
            case 'bitmap':
                this._renderBitmap(entity);
            break;
            case 'text':
                this._renderText(entity);
            break;
            default:
                throw new Error('SW.Draw cannot render type: ' + entity.getDisplayType());
            break;
        }

        this._context.restore();
    };

    /**
     * @method Draw.prototype._renderRectangle
     * @private
     */
    Draw.prototype._renderRectangle = function(entity) {
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
    Draw.prototype._renderLine = function(entity) {
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
    Draw.prototype._renderPolygon = function(entity) {
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
    Draw.prototype._renderText = function(entity) {
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

    Draw.prototype._getWrappedText = function(contents, maxWidth) {
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

    Draw.prototype._getLineHeight = function(entity) {
        var factor = 1.2;
        var font = entity.getFont();
        return parseInt(font.match(/[0-9]*px|pt|em/), 10) * factor;
    };

    /**
     * @method Draw.prototype._renderBitmap
     * @private
     */
    Draw.prototype._renderBitmap = function(entity) {
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

    return Draw;
}());