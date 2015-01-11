/**
 * controls what is shown on the canvas
 * @class Camera
 */
define([
    './config',
    './shade'
], function(config, Shade) {
    return Shade.extend({
        protosName: 'camera',

        /** 
         * @member {int} Camera.prototype.zoom
         */
        zoom: 1,

        /**
         * @member {boolean} Camera.prototype.scrolling - use to override scrolling if other camera moves needed
         */
        scrolling: true,

        init: function() {
            this.$shade.init.apply(this, arguments);

            this.width = config.width;
            this.height = config.height;
        },

        _scroll: function(player, boundingBox, regions) {
            if (!this.scrolling) {
                return false;
            }

            this.vx = 0;
            this.vy = 0;

            if (regions.left && player.vx < 0 &&
                player.x < regions.left && boundingBox.x < 0)
            {
                this.vx = player.vx ;
            }

            if (regions.right && player.vx > 0 &&
                player.x + player.width > regions.right &&
                boundingBox.x > this.width - boundingBox.width)
            {
                this.vx = player.vx;
            }

            if (regions.top && player.vy < 0 &&
                player.y < regions.top && boundingBox.y < 0)
            {
                this.vy = player.vy;
            }

            if (regions.bottom && player.vy > 0 &&
                player.y + player.height > regions.bottom &&
                boundingBox.y > this.height - boundingBox.height)
            {
                this.vy = player.vy;
            }
        },

        _contain : function(player) {
            var position = {};

            if (player.x < 0) {
                player.x = 0;
            } else if (player.x + player.width > this.width) {
                player.x = this.width - player.width;
            }

            if (player.y < 0) {
                player.y = 0;
            } else if (player.y + player.height > this.height) {
                player.y = this.height - player.height;
            }
        },

        center: function(entity) {
            entity.x = this.width  / 2 - entity.halfWidth();
            entity.y = this.height / 2 - entity.halfHeight();
        }
    });
});