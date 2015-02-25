SW.Unique = (function() {
    var uidCounter = 0;

    /**
     * @class SW.Unique
     * @belongsto SW
     */
    var Unique = function() {
        /**
         * @member {integer} SW.Unique.prototype._uid - the object's unique ID
         * @private
         * @readonly
         */
        this._uid = ++uidCounter;
    };

    return Unique;
}());