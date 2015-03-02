SW.Common.Util = (function() {
    /**
     * provides generic, useful functions
     * @class SW.Common.Util
     * @belongsto SW
     * @singleton
     */
    var Util = function() {};

    /**
     * recursively deep copies an object
     *
     * @method SW.Common.Util.prototype.clone
     * @param {object} src
     * @return {object}
     */
    Util.prototype.clone = function(src) {
        // check for arrays too!
        var obj = (src.hasOwnProperty('length')) ? [] : {},
            prop;

        for (prop in src) {
            if (typeof src[prop] === 'object' && src[prop] !== null) {
                obj[prop] = clone(src[prop]);
            } else {
                obj[prop] = src[prop];
            }
        }
        return obj;
    };

    /**
     * adds parent properties and methods to the child
     *
     * @method SW.Common.Util.prototype.inherit
     * @param {object} child
     * @param {constructor} Parent
     */
    Util.prototype.inherit = function(child, Parent) {
        var parent = new Parent();

        for(var key in parent) {
            if (typeof parent[key] === 'function') {
                child[key] = parent[key];
            } else if (typeof parent[key] === 'object' && parent[key] !== null) {
                child[key] = this.clone(parent[key]);
            } else {
                child[key] = parent[key];
            }
        }
    };

    /**
     * returns true if x/y is inside entity's bounding box
     *
     * @method SW.Common.Util.prototype.hitPoint
     * @param {integer} x - mouse/touch position
     * @param {integer} y - mouse/touch position
     * @param {SW.Display.Renderable} entity
     * @return {boolean}
     */
    Util.prototype.hitPoint = function(x, y, entity) {
        var position = entity.position();
        var dimension = entity.dimension();

        if (x >= position.x &&
            x <= position.x + dimension.x &&
            y >= position.y &&
            y <= position.y + dimension.y) {
            return true;
        }
        return false;
    };

    return new Util();
}());