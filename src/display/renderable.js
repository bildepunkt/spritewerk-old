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
     * @method SW.Renderable.prototype.getPosition
     * @return {SW.Vector}
     */
    Renderable.prototype.getPosition = function() {
        return this._position;
    };

    /**
     * @method SW.Renderable.prototype.setPosition
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Renderable}
     * @chainable
     */
    Renderable.prototype.setPosition = function(x, y) {
        if (typeof x === 'number') {
            this._position.x = x;
        }

        if (typeof y === 'number') {
            this._position.y = y;
        }

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getDimensions
     * @return {SW.Vector}
     */
    Renderable.prototype.getDimensions = function() {
        return this._dimensions;
    };

    /**
     * @method SW.Renderable.prototype.setDimensions
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Renderable}
     * @chainable
     */
    Renderable.prototype.setDimensions = function(x, y) {
        if (typeof x === 'number') {
            this._dimensions.x = x;
        }

        if (typeof y === 'number') {
            this._dimensions.y = y;
        }

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getRotation
     * @return {Float}
     */
    Renderable.prototype.getRotation = function(value) {
        return this._rotation;
    };

    /**
     * @method SW.Renderable.prototype.setRotation
     * @param {Float} value
     * @return {SW.Renderable}
     * @chainable
     */
    Renderable.prototype.setRotation = function(value) {
        this._rotation = value;
    };

    /**
     * @method SW.Renderable.prototype.getRotationOffset
     * @return {SW.Vector}
     */
    Renderable.prototype.getRotationOffset = function() {
        return this._rotationOffset;
    };

    /**
     * @method SW.Renderable.prototype.setRotationOffset
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Renderable}
     * @chainable
     */
    Renderable.prototype.setRotationOffset = function(x, y) {
        if (typeof x === 'number') {
            this._rotationOffset.x = x;
        }

        if (typeof y === 'number') {
            this._rotationOffset.y = y;
        }

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getScale
     * @return {SW.Vector}
     */
    Renderable.prototype.getScale = function() {
        return this._scale;
    };

    /**
     * @method SW.Renderable.prototype.setScale
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Vector}
     * @chainable
     */
    Renderable.prototype.setScale = function(x, y) {
        if (typeof x === 'number') {
            this._scale.x = x;
        }

        if (typeof y === 'number') {
            this._scale.y = y;
        }

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getScaleOffset
     * @return {SW.Vector}
     */
    Renderable.prototype.getScaleOffset = function() {
        return this._scaleOffset;
    };

    /**
     * @method SW.Renderable.prototype.setScaleOffset
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Renderable}
     * @chainable
     */
    Renderable.prototype.setScaleOffset = function(x, y) {
        if (typeof x === 'number') {
            this._scaleOffset.x = x;
        }

        if (typeof y === 'number') {
            this._scaleOffset.y = y;
        }

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getDraggable
     * @return {Boolean}
     */
    Renderable.prototype.getDraggable = function() {
        return this._draggable;
    };

    /**
     * @method SW.Renderable.prototype.setDraggable
     * @param {Boolean} value
     * @return {SW.Renderable}
     * @chainable
     */
    Renderable.prototype.setDraggable = function(value) {
        this._draggable = value;

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getOpacity
     * @return {Float}
     */
    Renderable.prototype.getOpacity = function() {
        return this._opacity;
    };

    /**
     * @method SW.Renderable.prototype.setOpacity
     * @param {Boolean} value
     * @return {Float}
     * @chainable
     */
    Renderable.prototype.setOpacity = function(value) {
        this._opacity = value;

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getComposite
     * @return {String}
     */
    Renderable.prototype.getComposite = function() {
        return this._composite;
    };

    /**
     * @method SW.Renderable.prototype.setComposite
     * @param {String} value
     * @return {SW.Renderable}
     * @chainable
     */
    Renderable.prototype.setComposite = function(value) {
        this._composite = value;

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getFillStyle
     * @return {String}
     */
    Renderable.prototype.getFillStyle = function(value) {
        return this._fillStyle;
    };

    /**
     * @method SW.Renderable.prototype.setFillStyle
     * @param {String} value
     * @return {SW.Renderable}
     * @chainable
     */
    Renderable.prototype.setFillStyle = function(value) {
        this._fillStyle = value;

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getStrokeStyle
     * @return {String}
     */
    Renderable.prototype.getStrokeStyle = function() {
        return this._strokeStyle;
    };

    /**
     * @method SW.Renderable.prototype.setStrokeStyle
     * @param {String} value
     * @return {SW.Renderable}
     * @chainable
     */
    Renderable.prototype.setStrokeStyle = function(value) {
        this._strokeStyle = value;

        return this;
    };

    /**
     * @method SW.Renderable.prototype.getStrokeWidth
     * @return {String}
     */
    Renderable.prototype.getStrokeWidth = function() {
        return this._strokeWidth;
    };

    /**
     * @method SW.Renderable.prototype.setStrokeWidth
     * @param {String} value
     * @return {SW.Renderable}
     * @chainable
     */
    Renderable.prototype.setStrokeWidth = function(value) {
        this._strokeWidth = value;

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