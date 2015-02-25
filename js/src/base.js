SW.Base = (function() {
    /**
     * @class SW.Base
     * @extends SW.Unique
     * @belongsto SW
     */
    var Base = function() {};

    Base.prototype = new SW.Unique();

   /**
     * @method SW.Base.prototype._set
     * @param {string} key
     * @param {any} value
     * @private
     */
    Base.prototype._set = function(key, value) {
        if (/\-\=[0-9]+/.test(value)) {
            this[key] -= value;
        } else if (/\+\=[0-9]+/.test(value)) {
            this[key] += value;
        } else {
            this[key] = value;
        }
    };

    /**
     * @method SW.Base.prototype.set
     * @param {string} key
     * @param {any} value
     */
    Base.prototype.set = function(key, value) {
        value = this._parseValue(value);
        this[key] = value;
    };

    /**
     * @method SW.Base.prototype.setMany
     * @param {object} values
     */
    Base.prototype.setMany = function(values) {
        for(var prop in values) {
            if (this[prop] !== undefined) {
                this._set(prop, values[prop]);
            }
        }
    };

    /**
     * @method SW.Base.prototype.get
     * @param {string} key
     * @return {any}
     */
    Base.prototype.get = function(key) {
        return this[key];
    };

    return Base; 
}());