SW.Util = (function() {
    /**
     * provides generic, useful functions
     * @class SW.Util
     * @belongsto SW
     * @singleton
     */
    var Util = function() {};

    /**
     * recursively deep copies an object
     *
     * @method SW.Util.prototype.clone
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
     * @method SW.Util.prototype.inherit
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

    return new Util();
}());