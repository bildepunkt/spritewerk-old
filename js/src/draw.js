define([
    './config',
    './canvas',
    '../lib/protos'
], function(config, canvas, Protos) {

    /**
     *
     */
    var Draw = Protos.extend({
        protosName: 'draw',

        context: null,

        drawCenter: false,

        centerColor: '#C00',

        init: function() {
            var _canvas = canvas.getCanvas();
            this.context = _canvas.getContext('2d');

            this.drawCenter = true;
        },

        clear: function(dimensions) {
            if (!dimensions) {
                this.context.clearRect(0, 0, config.width, config.height);
            } else {
                this.context.clearRect(
                    dimensions.x,
                    dimensions.y,
                    dimensions.width,
                    dimensions.height
                );
            }
        },

        render: function(entity) {
            this.context.save();
            this.context.translate(Math.floor(entity.x), Math.floor(entity.y));
            if (entity.rotation !== 0) {
                this.context.rotate((Math.PI / 180) * entity.rotation);
            }
            this.context.scale(entity.scaleX, entity.scaleY);
            this.context.globalAlpha = entity.opacity;
            this.context.globalCompositeOperation = entity.composite;

            switch(entity.displayType) {
                case 'shape':
                    this.renderShape(entity);
                break;
                case 'polygon':
                    //
                break;
                case 'line':
                    //
                break;
                case 'sprite':
                    this.renderSprite(entity);
                break;
            }

            if (this.drawCenter) {
                this.context.globalCompositeOperation = 'source-over';
                this.context.globalAlpha = 1;
                this.context.fillStyle = this.centerColor;
                this.context.fillRect(-2, -2, 4, 4);
            }

            this.context.restore();
        },

        renderShape: function(entity) {
            switch(entity.shape.type) {
                case 'rectangle':
                    this.context.fillRect(-entity.getHalfWidth(), -entity.getHalfHeight(), entity.width, entity.height);
                break;
            }
        },

        /*renderPolygon: function(entity) {

        },

        renderPath: function(entity) {

        },*/

        renderSprite: function(entity) {
            this.context.drawImage(
                entity.image,
                entity.srcX,
                entity.srcY,
                entity.srcWidth,
                entity.srcHeight,
                -entity.getHalfWidth(),
                -entity.getHalfHeight(),
                entity.width,
                entity.height
            );
        }
    });

    return new Draw();
});