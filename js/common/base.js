SW.Base = (function() {
    'use strict';

    /**
     * provides an interface for getting and setting properties
     *
     * @class SW.Base
     * @extends SW.Unique
     * @belongsto SW
     */
    var Base = function() {};

    // inherit Unique
    Base.prototype = new SW.Unique();

   /**
     * @method SW.Base.prototype.parseValue
     * @param {string} key
     * @param {any} value
     * @private
     */
    Base.prototype.parseValue = function(key, value) {
        if (/\-\=[0-9]+/.test(value)) {
            this[key] -= parseInt(value.replace('-=', ''), 10);
        } else if (/\+\=[0-9]+/.test(value)) {
            this[key] += parseInt(value.replace('+=', ''), 10);
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
        this[key] = this.parseValue(value);
    };

    /**
     * @method SW.Base.prototype.setMany
     * @param {object} values
     */
    Base.prototype.setMany = function(values) {
        for(var prop in values) {
            if (this[prop] !== undefined) {
                this.parseValue(prop, values[prop]);
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