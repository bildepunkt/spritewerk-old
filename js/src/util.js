SW.Util = (function() {
    /**
     * @class SW.Util
     * @belongsto SW
     * @singleton
     */
    var Util = function() {

    };

    /**
     * returns true if x/y is inside entity's bounding box
     *
     * @method SW.Util.prototype.hitPoint
     * @param {integer} x - mouse/touch position
     * @param {integer} y - mouse/touch position
     * @param {SW.Renderable} entity
     * @return {boolean}
     */
    Util.prototype.hitPoint = function(x, y, entity) {
        if (x >= entity.x &&
            x <= entity.x + entity.width &&
            y >= entity.y &&
            y <= entity.y + entity.height) {
            return true;
        }
        return false;
    };

    return Util;
}());