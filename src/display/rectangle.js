SW.Rectangle = (function() {
    'use strict';

    /**
     * a rectanglular display entity
     *
     * @class SW.Rectangle
     * @extends SW.Sprite
     * @belongsto SW
     */
    var Rectangle = function() {
        SW.Sprite.call(this);

        /**
         * @member {String} SW.Rectangle.prototype._displayType
         * @default 'rectangle'
         * @private
         * @readonly
         */
        this._displayType = 'rectangle';
    };

    Rectangle.prototype = SW.Util.clone(SW.Sprite.prototype);

    return Rectangle;
}());