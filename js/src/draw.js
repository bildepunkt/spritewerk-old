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

        init: function() {
            var _canvas = canvas.getCanvas();
            this.context = _canvas.getContext('2d');
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
            // remember: context transforms are cumulative :)
            this.context.save();
            this.context.translate(entity.x, entity.y);

            if (entity.rotation !== 0) {
                this.context.translate(entity.rotationOffsetX, entity.rotationOffsetY);
                this.context.rotate((Math.PI / 180) * entity.rotation);
                this.context.translate(-entity.rotationOffsetX, -entity.rotationOffsetY);
            }

            if (entity.scaleX !== 1 || entity.scaleY !== 1) {
                this.context.translate(entity.scaleOffsetX, entity.scaleOffsetY);
                this.context.scale(entity.scaleX, entity.scaleY);
                this.context.translate(-entity.scaleOffsetX, -entity.scaleOffsetY);
            }

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

            this.context.restore();
        },

        renderShape: function(entity) {
            switch(entity.shape.type) {
                case 'rectangle':
                    this.context.fillRect(0, 0, entity.width, entity.height);
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
                0, 0,
                entity.width,
                entity.height
            );
        }
    });

    return new Draw();
});