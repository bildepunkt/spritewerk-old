SW.Renderable = (function() {
    'use strict';

    /**
     * is the base prototype for all renderable entities
     *
     * @class SW.Renderable
     * @extends SW.Unique
     * @requires SW.Vector
     * @belongsto SW
     */
    var Renderable = function() {
        SW.Unique.call(this);
 
        /**
         * @member {SW.Vector} SW.Renderable.prototype._position
         * @default 0
         * @private
         */
        this._position = new SW.Vector();

        /**
         * @member {SW.Vector} SW.Renderable.prototype._velocity
         * @default 0
         * @private
         */
        this._velocity = new SW.Vector();

        /**
         * @member {SW.Vector} SW.Renderable.prototype._dimensions
         * @private
         */
        this._dimensions = new SW.Vector();

        /**
         * @member {SW.Vector} SW.Renderable.prototype._scale
         * @default 1
         * @private
         */
        this._scale = new SW.Vector(1, 1);

        /**
         * @member {SW.Vector} SW.Renderable.prototype._rotationOffset
         * @default 0
         * @private
         */
        this._rotationOffset = new SW.Vector();

        /**
         * @member {SW.Vector} SW.Renderable.prototype._scaleOffset
         * @default 0
         * @private
         */
        this._scaleOffset = new SW.Vector();

        /**
         * @member {Boolean} SW.Renderable.prototype._draggable
         * @default false
         * @private
         */
        this._draggable = false;

        /**
         * @member {Integer} SW.Renderable.prototype._rotation
         * @default 0
         * @private
         */
        this._rotation = 0;

        /**
         * @member {Integer} SW.Renderable.prototype._opacity
         * @default 1
         * @private
         */
        this._opacity = 1;

        /**
         * the entity's fill display
         *
         * @member {String} SW.Text.prototype._fillStyle
         * @default '#000'
         * @private
         */
        this._fillStyle = '#999';

        /**
         * the entity's stroke display
         *
         * @member {String} SW.Text.prototype._strokeStyle
         * @default null
         * @private
         */
        this._strokeStyle = null;

        /**
         * the entity's stroke width
         *
         * @member {String} SW.Text.prototype._strokeWidth
         * @default 4
         * @private
         */
        this._strokeWidth = 4;

        /**
         * @member {Boolean} SW.Renderable.prototype._visible
         * @default true
         * @private
         */
        this._visible = true;

        /**
         * @member {Boolean} SW.Renderable.prototype._hidden
         * @default false
         * @private
         */
        this._hidden = false;

        /**
         * @member {String} SW.Renderable.prototype._composite
         * @default 'source-over'
         * @private
         */
        this._composite = 'source-over';

        /**
         * @member {String} SW.Renderable.prototype._displayType
         * @default ''
         * @private
         * @readonly
         */
        this._displayType = '';
    };

    Renderable.prototype = SW.Util.clone(SW.Unique.prototype);

    /**
     * @method SW.Renderable.prototype.getDisplayType
     * @return {String}
     * @chainable
     */
    Renderable.prototype.getDisplayType = function() {
        return this._displayType;
    };

    /**
     * @method SW.Renderable.prototype.position
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Vector|SW.Renderable}
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
     * @method SW.Renderable.prototype.dimensions
     * @param {Float} [value]
     * @return {float|SW.Renderable}
     * @chainable
     */
    Renderable.prototype.dimensions = function(x, y) {
        if (x === undefined && y === undefined) {
            return this._dimensions;
        }

        if (typeof x === 'number') {
            this._dimensions.x = x;
        }

        if (typeof y === 'number') {
            this._dimensions.y = y;
        }

        return this;
    };

    /**
     * @method SW.Renderable.prototype.rotation
     * @param {Float} [value]
     * @return {float|SW.Renderable}
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
     * @method SW.Renderable.prototype.rotationOffset
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Vector|SW.Renderable}
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
     * @method SW.Renderable.prototype.scale
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Vector|SW.Renderable}
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
     * @method SW.Renderable.prototype.scaleOffset
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Vector|SW.Renderable}
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
     * @method SW.Renderable.prototype.draggable
     * @param {Boolean} [value]
     * @return {boolean|SW.Renderable}
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
     * @method SW.Renderable.prototype.opacity
     * @param {Float} [value]
     * @return {float|SW.Renderable}
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
     * @method SW.Renderable.prototype.composite
     * @param {String} [value]
     * @return {string|SW.Renderable}
     * @chainable
     */
    Renderable.prototype.composite = function(value) {
        if (value === undefined) {
            return this._composite;
        }

        if (typeof value === 'string') {
            this._composite = value;
        }

        return this;
    };

    /**
     * @method SW.Renderable.prototype.fillStyle
     * @param {String} [value]
     * @return {String|SW.Renderable}
     * @chainable
     */
    Renderable.prototype.fillStyle = function(value) {
        if (value === undefined) {
            return this._fillStyle;
        }

        if (typeof value === 'string') {
            this._fillStyle = value;
        }

        return this;
    };

    /**
     * @method SW.Renderable.prototype.strokeStyle
     * @param {String} [value]
     * @return {String|SW.Renderable}
     * @chainable
     */
    Renderable.prototype.strokeStyle = function(value) {
        if (value === undefined) {
            return this._strokeStyle;
        }

        if (typeof value === 'string') {
            this._strokeStyle = value;
        }

        return this;
    };

    /**
     * @method SW.Renderable.prototype.strokeWidth
     * @param {String} [value]
     * @return {String|SW.Renderable}
     * @chainable
     */
    Renderable.prototype.strokeWidth = function(value) {
        if (value === undefined) {
            return this._strokeWidth;
        }

        if (typeof value === 'number') {
            this._strokeWidth = value;
        }

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getOuterPosition
     * @return {SW.Vector}
     */
    Renderable.prototype.getOuterPosition = function() {
        return new SW.Vector(this._position.x + this._dimensions.x, this._position.y + this._dimensions.y);
    };

    /**
     * @method SW.Renderable.prototype.getCenterPosition
     * @return {SW.Vector}
     */
    Renderable.prototype.getCenterPosition = function() {
        return new SW.Vector(this._position.x - this._dimensions.x / 2, this._position.y - this._dimensions.y / 2);
    };

    /**
     * @method SW.Renderable.prototype.getHalfDimension
     * @return {SW.Vector}
     */
    Renderable.prototype.getHalfDimension = function() {
        return new SW.Vector(this._dimensions.x / 2, this._dimensions.y / 2);
    };

    return Renderable;
}());