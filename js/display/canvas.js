SW.Canvas = (function() {
    'use strict';

    /**
     * displays entities
     *
     * @class SW.Canvas
     * @requires SW.Collection
     * @belongsto SW
     * @singleton
     */
    var Canvas = function(options) {
        /**
         * @member {HTMLEntity} SW.Canvas.prototype.canvasEl - the canvas element
         * @private
         */
        this.canvasEl = document.getElementById(options.id);
        /**
         * @member {integer} SW.Canvas.prototype.width - the canvas element's width
         * @private
         */
        this.width = options.width;
        /**
         * @member {integer} SW.Canvas.prototype.height - the canvas element's height
         * @private
         */
        this.height = options.height;
    };

    return Canvas;
}());