SW.Draw = SW.Protos.extend({
    _canvas: null,

    _context: null,

    init: function() {
        this._canvas = SW.Canvas.getCanvas();
        this._context = this._canvas.getContext('2d');
        this._context.imageSmoothingEnabled = SW.Config.imageSmoothing;
    },

    clear: function() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        return this;
    },

    fill: function(color) {
        this._context.save();
        this._context.fillStyle = color;
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.restore();

        return this;
    },

    render: function(entity) {
        // remember: context transforms are cumulative :)
        this._context.save();
        this._context.translate(entity.x, entity.y);

        if (entity.rotation !== 0) {
            this._context.translate(entity.rotationOffsetX, entity.rotationOffsetY);
            this._context.rotate((Math.PI / 180) * entity.rotation);
            this._context.translate(-entity.rotationOffsetX, -entity.rotationOffsetY);
        }

        if (entity.scaleX !== 1 || entity.scaleY !== 1) {
            this._context.translate(entity.scaleOffsetX, entity.scaleOffsetY);
            this._context.scale(entity.scaleX, entity.scaleY);
            this._context.translate(-entity.scaleOffsetX, -entity.scaleOffsetY);
        }

        this._context.globalAlpha = entity.opacity;
        this._context.globalCompositeOperation = entity.composite;

        switch(entity.displayType) {
            case 'rectangle':
                this._renderRectangle(entity);
            break;
            case 'sprite':
                this._renderSprite(entity);
            break;
        }

        this._context.restore();
    },

    /**
     * @method Draw.prototype._renderRectangle
     * @private
     */
    _renderRectangle: function(entity) {
        this._context.fillStyle = entity.fill;
        this._context.fillRect(0, 0, entity.width, entity.height);
    },

    /**
     * @method Draw.prototype._renderSprite
     * @private
     */
    _renderSprite: function(entity) {
        this._context.drawImage(
            entity.img,
            entity.srcX,
            entity.srcY,
            entity.srcWidth,
            entity.srcHeight,
            0, 0,
            entity.width,
            entity.height
        );
    }
});