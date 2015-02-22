/**
 * Singleton of collision methods
 *
 * @class SW.Collision
 * @belongsto SW
 * @singleton
 */
SW.Collision = SW.Protos.extend({
    /**
     * blocks an entity
     *
     * @method SW.Collision.prototype.block
     * @param {SW.Renderable} entity
     * @param {object} wall
     * @return {object} point vector
     */
    block : function(entity, wall) {
        var dx = wall.x - entity.x,
            ox = (wall.width + entity.width) / 2 - Math.abs(dx),
            dy, oy;

        if (ox > 0) {
            dy = entity.y - wall.y;
            oy = (wall.height + entity.height) / 2 - Math.abs(dy);

            if (oy > 0) {
                if (ox >= oy) {
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

    /**
     * returns true if two entities are touching/overlapping
     *
     * @method SW.Collision.prototype.hit
     * @param {SW.Renderable} a
     * @param {SW.Renderable} b
     */
    hit : function(a, b) {
        if ((a.x + a.width >= b.x && a.x + a.width <= b.x + b.width) ||
            (a.x >= b.x && a.x <= b.x + b.width)) {
            if ((a.y + a.height >= b.y && a.y + a.height <= b.y + b.height) ||
                (a.y >= b.y && a.y <= b.y + b.height)) {
                return true;
            }
        }
    },

    /**
     * returns true if x/y is inside entity's bounding box
     *
     * @method SW.Collision.prototype.hitPoint
     * @param {int} x - mouse/touch position
     * @param {int} y - mouse/touch position
     * @param {SW.Renderable} entity
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
});