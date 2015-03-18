SW.Vector = (function() {
    'use strict';
    
    /**
     * a two-dimensional vector
     *
     * @class SW.Vector
     * @param {Integer} [x]
     * @param {Integer} [y]
     * @belongsto SW
     */
    var Vector = function(x, y) {
        /**
         * @member {Float} SW.Vector.x - calculation along the x axis
         * @default 0
         */
        this.x = (typeof x === 'number') ? x : 0;
        /**
         * @member {Float} SW.Vector.y - calculation along the y axis
         * @default 0
         */
        this.y = (typeof y === 'number') ? y : 0;
    };

    return Vector; 
}());