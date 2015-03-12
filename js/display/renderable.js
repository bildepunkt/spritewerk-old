SW.Display.Renderable = (function() {
    'use strict';

    /**
     * is the base prototype for all renderable entities
     *
     * @class SW.Display.Renderable
     * @extends SW.Common.Unique
     * @requires SW.Display.Vector
     * @belongsto SW.Display
     */
    var Renderable = function() {
        SW.Common.Unique.call(this);
 
        /**
         * @member {SW.Display.Vector} SW.Display.Renderable.prototype._position
         * @default 0
         * @private
         */
        this._position = new SW.Display.Vector();

        /**
         * @member {SW.Display.Vector} SW.Display.Renderable.prototype._velocity
         * @default 0
         * @private
         */
        this._velocity = new SW.Display.Vector();

        /**
         * @member {SW.Display.Vector} SW.Display.Renderable.prototype._dimension
         * @private
         */
        this._dimension = new SW.Display.Vector();

        /**
         * @member {SW.Display.Vector} SW.Display.Renderable.prototype._scale
         * @default 1
         * @private
         */
        this._scale = new SW.Display.Vector(1, 1);

        /**
         * @member {SW.Display.Vector} SW.Display.Renderable.prototype._rotationOffset
         * @default 0
         * @private
         */
        this._rotationOffset = new SW.Display.Vector();

        /**
         * @member {SW.Display.Vector} SW.Display.Renderable.prototype._scaleOffset
         * @default 0
         * @private
         */
        this._scaleOffset = new SW.Display.Vector();

        /**
         * @member {Boolean} SW.Display.Renderable.prototype._draggable
         * @default true
         * @private
         */
        this._draggable = true;

        /**
         * @member {Integer} SW.Display.Renderable.prototype._rotation
         * @default 0
         * @private
         */
        this._rotation = 0;

        /**
         * @member {Integer} SW.Display.Renderable.prototype._opacity
         * @default 1
         * @private
         */
        this._opacity = 1;

        /**
         * @member {Boolean} SW.Display.Renderable.prototype._visible
         * @default true
         * @private
         */
        this._visible = true;

        /**
         * @member {Boolean} SW.Display.Renderable.prototype._hidden
         * @default false
         * @private
         */
        this._hidden = false;

        /**
         * @member {String} SW.Display.Renderable.prototype._composite
         * @default 'source-over'
         * @private
         */
        this._composite = 'source-over';

        /**
         * @member {String} SW.Display.Renderable.prototype._displayType
         * @default ''
         * @private
         * @readonly
         */
        this._displayType = '';
    };

    Renderable.prototype = SW.Common.Unique.prototype;

    /**
     * @method SW.Display.Renderable.prototype.getDisplayType
     * @return {String}
     * @chainable
     */
    Renderable.prototype.getDisplayType = function() {
        return this._displayType;
    };

    /**
     * @method SW.Display.Renderable.prototype.position
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Display.Vector|SW.Display.Renderable}
     * @chainable
     */
    Renderable.prototype.position = function(x, y) {
        if (x === undefined && y === undefined) {
            return this._position;
        }

        if (typeof x === 'number') {
            this._position.x = x;
        }

        if (typeof y === 'number') {
            this._position.y = y;
        }

        return this;
    };

    /**
     * @method SW.Display.Renderable.prototype.dimensions
     * @param {Float} [value]
     * @return {float|SW.Display.Renderable}
     * @chainable
     */
    Renderable.prototype.dimensions = function(x, y) {
        if (x === undefined && y === undefined) {
            return this._dimension;
        }

        if (typeof x === 'number') {
            this._dimension.x = x;
        }

        if (typeof y === 'number') {
            this._dimension.y = y;
        }

        return this;
    };

    /**
     * @method SW.Display.Renderable.prototype.rotation
     * @param {Float} [value]
     * @return {float|SW.Display.Renderable}
     * @chainable
     */
    Renderable.prototype.rotation = function(value) {
        if (value === undefined) {
            return this._rotation;
        }

        if (typeof value === 'number') {
            this._rotation = value;
        }

        return this;
    };

    /**
     * @method SW.Display.Renderable.prototype.rotationOffset
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Display.Vector|SW.Display.Renderable}
     * @chainable
     */
    Renderable.prototype.rotationOffset = function(x, y) {
        if (x === undefined && y === undefined) {
            return this._rotationOffset;
        }

        if (typeof x === 'number') {
            this._rotationOffset.x = x;
        }

        if (typeof y === 'number') {
            this._rotationOffset.y = y;
        }

        return this;
    };

    /**
     * @method SW.Display.Renderable.prototype.scale
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Display.Vector|SW.Display.Renderable}
     * @chainable
     */
    Renderable.prototype.scale = function(x, y) {
        if (x === undefined && y === undefined) {
            return this._scale;
        }

        if (typeof x === 'number') {
            this._scale.x = x;
        }

        if (typeof y === 'number') {
            this._scale.y = y;
        }

        return this;
    };

    /**
     * @method SW.Display.Renderable.prototype.scaleOffset
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Display.Vector|SW.Display.Renderable}
     * @chainable
     */
    Renderable.prototype.scaleOffset = function(x, y) {
        if (x === undefined && y === undefined) {
            return this._scale;
        }

        if (typeof x === 'number') {
            this._scaleOffset.x = x;
        }

        if (typeof y === 'number') {
            this._scaleOffset.y = y;
        }

        return this;
    };

    /**
     * @method SW.Display.Renderable.prototype.draggable
     * @param {Boolean} [value]
     * @return {boolean|SW.Display.Renderable}
     * @chainable
     */
    Renderable.prototype.draggable = function(value) {
        if (value === undefined) {
            return this._draggable;
        }

        if (typeof value === 'boolean') {
            this._draggable = value;
        }

        return this;
    };

    /**
     * @method SW.Display.Renderable.prototype.opacity
     * @param {Float} [value]
     * @return {float|SW.Display.Renderable}
     * @chainable
     */
    Renderable.prototype.opacity = function(value) {
        if (value === undefined) {
            return this._opacity;
        }

        if (typeof value === 'number') {
            this._opacity = value;
        }

        return this;
    };

    /**
     * @method SW.Display.Renderable.prototype.composite
     * @param {String} [value]
     * @return {string|SW.Display.Renderable}
     * @chainable
     */
    Renderable.prototype.composite = function(value) {
        if (value === undefined) {
            return this._composite;
        }

        if (typeof value === 'number') {
            this._composite = value;
        }

        return this;
    };

    /**
     * @method SW.Display.Renderable.prototype.getOuterPosition
     * @return {SW.Display.Vector}
     */
    Renderable.prototype.getOuterPosition = function() {
        return new SW.Display.Vector(this._position.x + this._dimension.x, this._position.y + this._dimension.y);
    };

    /**
     * @method SW.Display.Renderable.prototype.getCenterPosition
     * @return {SW.Display.Vector}
     */
    Renderable.prototype.getCenterPosition = function() {
        return new SW.Display.Vector(this._position.x - this._dimension.x / 2, this._position.y - this._dimension.y / 2);
    };

    /**
     * @method SW.Display.Renderable.prototype.getHalfDimension
     * @return {SW.Display.Vector}
     */
    Renderable.prototype.getHalfDimension = function() {
        return new SW.Display.Vector(this._dimension.x / 2, this._dimension.y / 2);
    };

    return Renderable;
}());