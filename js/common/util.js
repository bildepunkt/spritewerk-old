SW.Common.Util = (function() {
    /**
     * provides generic, useful functions
     *
     * @class SW.Common.Util
     * @belongsto SW
     * @singleton
     */
    var Util = function() {};

    /**
     * recursively deep copies an object
     *
     * @method SW.Common.Util.prototype.clone
     * @param {Object} src
     * @return {Object}
     */
    Util.prototype.clone = function(src) {
        // check for arrays too!
        var obj = (typeof src === 'object' && src.hasOwnProperty('length')) ? [] : {},
            prop;

        for (prop in src) {
            if (typeof src[prop] === 'object' && src[prop] !== null) {
                obj[prop] = this.clone(src[prop]);
            } else {
                obj[prop] = src[prop];
            }
        }
        return obj;
    };

    /**
     * checks if an object contains members
     *
     * @method SW.Common.Util.prototype.hasMemebers
     * @param {Object} obj
     * @return {Boolean}
     */
    Util.prototype.hasMembers = function(obj) {
        var count = 0;

        for(var key in obj) {
            count++;
            if (count) {
                break;
            }
        }

        return count ? true : false;
    };

    /**
     * adds parent properties and methods to the child
     * we don't want to overwrite existing methods because 
     * due to the nature of prototypal inheritance, we can reference (or "super") this method inside the original
     * eg:
     *      Child.prototype.foo = function(...args) {
     *          // do stuff
     *          Parent.prototype.foo.call(this, ...args);
     *      };
     *
     * @method SW.Common.Util.prototype.inherit
     * @param {Object} child
     * @param {constructor} Parent
     */
    Util.prototype.inherit = function(child, Parent) {
        var parent = new Parent();

        for(var key in parent) {
            if (child[key] === undefined) {
                if (typeof parent[key] === 'function') {
                    child[key] = parent[key];
                } else if (typeof parent[key] === 'object' && parent[key] !== null) {
                    child[key] = this.clone(parent[key]);
                } else {
                    child[key] = parent[key];
                }
            }
        }
    };

    /**
     * returns true if x/y is inside entity's bounding box
     *
     * @method SW.Common.Util.prototype.hitPoint
     * @param {Integer} x - mouse/touch position
     * @param {Integer} y - mouse/touch position
     * @param {SW.Display.Renderable} entity
     * @return {Boolean}
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