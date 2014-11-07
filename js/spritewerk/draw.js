
define([
    '../lib/radio',
    './config',
    './dom-control'
], function(radio, config, DomControl) {
    return {
        /**
         *
         */
        _canvas: null,

        /**
         *
         */
        _context: null,

        init: function() {
            this._canvas = DomControl.getCanvas();
            this._context = DomControl.getContext();
        },

        renderEntity: function(entity) {
            var x, y;

            this._context.save();
            this._context.globalAlpha = entity.opacity;

            /*if (entity.scale !== 1) {
                this._context.scale = entity.scale;
            }*/

            if (entity.rotation !== 0) {
                 this._context.translate(entity._screenX + entity.width / 2, entity.screenY + entity.height / 2);
                 this._context.rotate(entity.rotation);

                 x = -entity.width / 2;
                 y = -entity.height / 2;
             } else {
                 x = entity.x;
                 y = entity.y;
             }

            this._context.drawImage(
                entity.img,
                entity.srcX,
                entity.srcY,
                entity.srcWidth,
                entity.srcHeight,
                Math.floor(x),
                Math.floor(y),
                entity.width,
                entity.height
            );

            this._context.restore();
        },

        /**
         * clears the entire canvas
         *
         * @returns {draw}
         */
        clearCanvas: function() {
            this._context.clearRect(0, 0, config.width, config.height);
            return this;
        },

        /**
         * fills the entire canvas
         *
         * @param color - the color to fill the canvas
         * @returns {draw}
         */
        fillCanvas: function(color) {
            this._context.fillStyle = color;
            this._context.fillRect(0, 0, config.width, config.height);

            return this;
        }
    };
});