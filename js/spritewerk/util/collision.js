/**
 *
 */
var collision = {
    block : function(player, wall) {
        var dx = wall.x - player.x,
            ox = (wall.width + player.width) / 2 - Math.abs(dx),
            dy, oy;

        if (ox > 0) {
            dy = player.y - wall.y;
            oy = (wall.height + player.height) / 2 - Math.abs(dy);

            if (oy > 0) {
                if (ox > oy) {
                    if (dy < 0) {
                        oy *= -1;
                    }
                    return oy;
                } else if (ox < oy) {
                    if (dx > 0) {
                        ox *= -1;
                    }
                    return ox;
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

    hitPoint : function(e, entity) {
        if (e.x >= entity.x && e.x <= entity.x + entity.srcWidth &&
            e.y >= entity.y && e.y <= entity.y + entity.srcHeight) {
            return true;
        }
    }
};