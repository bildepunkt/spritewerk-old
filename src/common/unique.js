SW.Common.Unique = (function() {
    'use strict';

    var uidCounter = 0;

    /**
     * provides a unique identifier to sub prototypes
     *
     * @class SW.Common.Unique
     * @belongsto SW
     */
    var Unique = function() {
        /**
         * @member {Integer} SW.Common.Unique.prototype._uid - the object's unique ID
         * @private
         * @readonly
         */
        this._uid = ++uidCounter;
    };

    return Unique;
}());