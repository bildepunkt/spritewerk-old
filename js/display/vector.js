SW.Display.Vector = (function() {
    'use strict';
    
    /**
     * a two-dimensional vector
     *
     * @class SW.Display.Vector
     * @param {integer} [x]
     * @param {integer} [y]
     * @belongsto SW
     */
    var Vector = function(x, y) {
        /**
         * @member {float} SW.Display.Vector.x - calculation along the x axis
         * @default 0
         */
        this.x = (typeof x === 'number') ? x : 0;
        /**
         * @member {float} SW.Display.Vector.y - calculation along the y axis
         * @default 0
         */
        this.y = (typeof y === 'number') ? y : 0;
    };

    return Vector; 
}());