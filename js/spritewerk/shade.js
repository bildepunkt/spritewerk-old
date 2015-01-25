/**
 * base class for movable objects
 *
 * @class Shade
 */
define([
    '../lib/protos'
], function(Protos) {
    return Protos.extend({
        protosName: 'shade',

        /**
         * @member {number} Shade.prototype.x - the entity's x position
         */
        x: 0,

        /**
         * @member {number} Shade.prototype.y - the entity's y position
         */
        y: 0,

        /**
         * @member {number} Shade.prototype.vx
         */
        vx: 0,

        /**
         * @member {number} Shade.prototype.vy
         */
        vy: 0,

        /**
         * @member {number} Shade.prototype.width
         */
        width: 0,

        /**
         * @member {number} Shade.prototype.height
         */
        height: 0,

        /**
         * if true, the state's camera will scroll over other entities to follow this entity
         *
         * @member {number} Shade.prototype.follow
         */
        follow: false,

        /** 
         * called on every frame, velocity is added to position
         *
         * @method Shade.prototype.update
         */
        update: function() {
            this.x += this.vx;
            this.y += this.vy;
        },

        /** 
         * returns the half-width of the object
         *
         * @method Shade.prototype.halfWidth
         * @return {int}
         */
        halfWidth: function() {
            return this.width / 2;
        },

        /** 
         * returns the half-height of the object
         *
         * @method Shade.prototype.halfHeight
         * @return {int}
         */
        halfHeight: function() {
            return this.height / 2;
        },

        /** 
         * returns the coordinate of the object's right-most area (x + width)
         *
         * @method Shade.prototype.right
         * @return {int}
         */
        right: function() {
            return this.x + this.width;
        },

        /** 
         * returns the coordinate of the object's bottom-most area (y + height)
         *
         * @method Shade.prototype.bottom
         * @return {int}
         */
        bottom: function() {
            return this.y + this.height;
        }
    });
});