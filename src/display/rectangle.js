SW.Rectangle = (function() {
    'use strict';

    /**
     * a rectanglular display entity
     *
     * @class SW.Rectangle
     * @extends SW.Renderable
     * @belongsto SW
     */
    var Rectangle = function() {
        SW.Renderable.call(this);

        /**
         * @member {String} SW.Rectangle.prototype._displayType
         * @default 'rectangle'
         * @private
         * @readonly
         */
        this._displayType = 'rectangle';
    };

    Rectangle.prototype = SW.Util.clone(SW.Renderable.prototype);

    return Rectangle;
}());