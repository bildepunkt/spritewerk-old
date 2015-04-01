SW.Sprite = (function() {
    'use strict';

    /**
     * is the base prototype for all renderable entities
     *
     * @class SW.Sprite
     * @extends SW.Unique
     * @requires SW.Vector
     * @belongsto SW
     */
    var Sprite = function() {
        SW.Unique.call(this);
 
        /**
         * @member {SW.Vector} SW.Sprite.prototype._position
         * @default 0
         * @private
         */
        this._position = new SW.Vector();

        /**
         * @member {SW.Vector} SW.Sprite.prototype._velocity
         * @default 0
         * @private
         */
        this._velocity = new SW.Vector();

        /**
         * @member {SW.Vector} SW.Sprite.prototype._dimensions
         * @private
         */
        this._dimensions = new SW.Vector();

        /**
         * @member {SW.Vector} SW.Sprite.prototype._scale
         * @default 1
         * @private
         */
        this._scale = new SW.Vector(1, 1);

        /**
         * @member {SW.Vector} SW.Sprite.prototype._rotationOffset
         * @default 0
         * @private
         */
        this._rotationOffset = new SW.Vector();

        /**
         * @member {SW.Vector} SW.Sprite.prototype._scaleOffset
         * @default 0
         * @private
         */
        this._scaleOffset = new SW.Vector();

        /**
         * @member {Boolean} SW.Sprite.prototype._draggable
         * @default false
         * @private
         */
        this._draggable = false;

        /**
         * @member {Integer} SW.Sprite.prototype._rotation
         * @default 0
         * @private
         */
        this._rotation = 0;

        /**
         * @member {Integer} SW.Sprite.prototype._opacity
         * @default 1
         * @private
         */
        this._opacity = 1;

        /**
         * the entity's fill display
         *
         * @member {String} SW.Sprite.prototype._fillStyle
         * @default '#000'
         * @private
         */
        this._fillStyle = '#999';

        /**
         * the entity's stroke display
         *
         * @member {String} SW.Sprite.prototype._strokeStyle
         * @default null
         * @private
         */
        this._strokeStyle = null;

        /**
         * the entity's stroke width
         *
         * @member {String} SW.Sprite.prototype._strokeWidth
         * @default 4
         * @private
         */
        this._strokeWidth = 4;

        /**
         * @member {Boolean} SW.Sprite.prototype._visible
         * @default true
         * @private
         */
        this._visible = true;

        /**
         * @member {Boolean} SW.Sprite.prototype._hidden
         * @default false
         * @private
         */
        this._hidden = false;

        /**
         * @member {String} SW.Sprite.prototype._composite
         * @default 'source-over'
         * @private
         */
        this._composite = 'source-over';

        /**
         * @member {String} SW.Sprite.prototype._displayType
         * @default ''
         * @private
         * @readonly
         */
        this._displayType = '';
    };

    Sprite.prototype = SW.Util.clone(SW.Unique.prototype);

    /**
     * @method SW.Sprite.prototype.getDisplayType
     * @return {String}
     * @chainable
     */
    Sprite.prototype.getDisplayType = function() {
        return this._displayType;
    };

    /**
     * @method SW.Sprite.prototype.getPosition
     * @return {SW.Vector}
     */
    Sprite.prototype.getPosition = function() {
        return this._position;
    };

    /**
     * @method SW.Sprite.prototype.setPosition
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setPosition = function(x, y) {
        if (typeof x === 'number') {
            this._position.x = x;
        }

        if (typeof y === 'number') {
            this._position.y = y;
        }

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getDimensions
     * @return {SW.Vector}
     */
    Sprite.prototype.getDimensions = function() {
        return this._dimensions;
    };

    /**
     * @method SW.Sprite.prototype.setDimensions
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setDimensions = function(x, y) {
        if (typeof x === 'number') {
            this._dimensions.x = x;
        }

        if (typeof y === 'number') {
            this._dimensions.y = y;
        }

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getRotation
     * @return {Float}
     */
    Sprite.prototype.getRotation = function(value) {
        return this._rotation;
    };

    /**
     * @method SW.Sprite.prototype.setRotation
     * @param {Float} value
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setRotation = function(value) {
        this._rotation = value;
    };

    /**
     * @method SW.Sprite.prototype.getRotationOffset
     * @return {SW.Vector}
     */
    Sprite.prototype.getRotationOffset = function() {
        return this._rotationOffset;
    };

    /**
     * @method SW.Sprite.prototype.setRotationOffset
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setRotationOffset = function(x, y) {
        if (typeof x === 'number') {
            this._rotationOffset.x = x;
        }

        if (typeof y === 'number') {
            this._rotationOffset.y = y;
        }

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getScale
     * @return {SW.Vector}
     */
    Sprite.prototype.getScale = function() {
        return this._scale;
    };

    /**
     * @method SW.Sprite.prototype.setScale
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Vector}
     * @chainable
     */
    Sprite.prototype.setScale = function(x, y) {
        if (typeof x === 'number') {
            this._scale.x = x;
        }

        if (typeof y === 'number') {
            this._scale.y = y;
        }

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getScaleOffset
     * @return {SW.Vector}
     */
    Sprite.prototype.getScaleOffset = function() {
        return this._scaleOffset;
    };

    /**
     * @method SW.Sprite.prototype.setScaleOffset
     * @param {Float} [x]
     * @param {Float} [y]
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setScaleOffset = function(x, y) {
        if (typeof x === 'number') {
            this._scaleOffset.x = x;
        }

        if (typeof y === 'number') {
            this._scaleOffset.y = y;
        }

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getDraggable
     * @return {Boolean}
     */
    Sprite.prototype.getDraggable = function() {
        return this._draggable;
    };

    /**
     * @method SW.Sprite.prototype.setDraggable
     * @param {Boolean} value
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setDraggable = function(value) {
        this._draggable = value;

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getOpacity
     * @return {Float}
     */
    Sprite.prototype.getOpacity = function() {
        return this._opacity;
    };

    /**
     * @method SW.Sprite.prototype.setOpacity
     * @param {Boolean} value
     * @return {Float}
     * @chainable
     */
    Sprite.prototype.setOpacity = function(value) {
        this._opacity = value;

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getComposite
     * @return {String}
     */
    Sprite.prototype.getComposite = function() {
        return this._composite;
    };

    /**
     * @method SW.Sprite.prototype.setComposite
     * @param {String} value
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setComposite = function(value) {
        this._composite = value;

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getFillStyle
     * @return {String}
     */
    Sprite.prototype.getFillStyle = function(value) {
        return this._fillStyle;
    };

    /**
     * @method SW.Sprite.prototype.setFillStyle
     * @param {String} value
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setFillStyle = function(value) {
        this._fillStyle = value;

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getStrokeStyle
     * @return {String}
     */
    Sprite.prototype.getStrokeStyle = function() {
        return this._strokeStyle;
    };

    /**
     * @method SW.Sprite.prototype.setStrokeStyle
     * @param {String} value
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setStrokeStyle = function(value) {
        this._strokeStyle = value;

        return this;
    };

    /**
     * @method SW.Sprite.prototype.getStrokeWidth
     * @return {String}
     */
    Sprite.prototype.getStrokeWidth = function() {
        return this._strokeWidth;
    };

    /**
     * @method SW.Sprite.prototype.setStrokeWidth
     * @param {String} value
     * @return {SW.Sprite}
     * @chainable
     */
    Sprite.prototype.setStrokeWidth = function(value) {
        this._strokeWidth = value;

        return this;
    };

    /**
     * returns entity's right-most x and bottom-most y positions
     * @method SW.Sprite.prototype.getOuterPosition
     * @return {SW.Vector}
     */
    Sprite.prototype.getOuterPosition = function() {
        return new SW.Vector(this._position.x + this._dimensions.x, this._position.y + this._dimensions.y);
    };

    /**
     * returns the entity's coordinates at center
     * @method SW.Sprite.prototype.getCenterPosition
     * @return {SW.Vector}
     */
    Sprite.prototype.getCenterPosition = function() {
        return new SW.Vector(this._position.x - this._dimensions.x / 2, this._position.y - this._dimensions.y / 2);
    };

    /**
     * returns entity's half dimensions
     * @method SW.Sprite.prototype.getHalfDimension
     * @return {SW.Vector}
     */
    Sprite.prototype.getHalfDimension = function() {
        return new SW.Vector(this._dimensions.x / 2, this._dimensions.y / 2);
    };

    /**
     * @method SW.Sprite.prototype.alignToCanvas
     * @return {SW.Sprite}
     */
    /*Sprite.prototype.alignToCanvas = function(x, y) {
        if (typeof x === 'string') {
            switch(x) {
                case 'top':
                    //
                break;
                case 'center':
                    //
                break;
                case 'bottom':
                    //
                break;
            }
        }

        if (typeof y === 'string') {
            switch(y) {
                case 'top':
                    this.setPosition(null, 0);
                break;
                case 'center':
                    this.setPosition(null, 0);
                break;
                case 'bottom':
                    //
                break;
            }
        }
    };*/

    return Sprite;
}());