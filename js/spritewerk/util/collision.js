/**
 *
 */
define([], function(Input) {
    return {
        block : function(player, wall) {
            var dx = wall.x - player.x,
                ox = (wall.width + player.width) / 2 - Math.abs(dx),
                dy, oy;

            if (ox > 0) {
                dy = player.y - wall.y;
                oy = (wall.height + player.height) / 2 - Math.abs(dy);

                if (oy >= 0) {
                    if (ox > oy) {
                        if (dy < 0) {
                            oy *= -1;
                        }
                        
                        return {
                            x: 0,
                            y: oy
                        };
                    } else if (ox < oy) {
                        if (dx > 0) {
                            ox *= -1;
                        }

                        return {
                            x: ox,
                            y: 0
                        };
                    }
                }
            }
        },

        hit : function(a, b) {
            if (a.x + a.width > b.x || a.x < b.x + b.width) {
                if (a.y + a.height > b.y || a.y < b.y + b.width) {
                    return true;
                }
            }
        },

        /**
         * @method State.prototype._hitPoint
         * @param {number} x - mouse/touch position
         * @param {number} y - mouse/touch position
         * @param {Sprite} entity
         */
        hitPoint: function(x, y, entity) {
            if (x >= entity.x &&
                x <= entity.x + entity.width &&
                y >= entity.y &&
                y <= entity.y + entity.height) {
                return true;
            }
            return false;
        }
    };
});