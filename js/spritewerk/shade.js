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
         * @member {number} Sprite.prototype.x - the entity's x position
         */
        x: 0,

        /**
         * @member {number} Sprite.prototype.y - the entity's y position
         */
        y: 0,

        /**
         * @member {number} Sprite.prototype.vx
         */
        vx: 0,

        /**
         * @member {number} Sprite.prototype.vy
         */
        vy: 0,

        /**
         * @member {number} Sprite.prototype.width
         */
        width: 0,

        /**
         * @member {number} Sprite.prototype.height
         */
        height: 0,

        /**
         * if true, the state's camera will scroll over other entities to follow this entity
         *
         * @member {number} Sprite.prototype.follow
         */
        follow: false,

        /** 
         *
         */
        init: function() {},

        /** 
         *
         */
        update: function() {
            this.x += this.vx;
            this.y += this.vy;
        },

        /** 
         *
         */
        halfWidth: function() {
            return this.width / 2;
        },

        /** 
         *
         */
        halfHeight: function() {
            return this.height / 2;
        },

        /** 
         *
         */
        right: function() {
            return this.x + this.width;
        },

        /** 
         *
         */
        bottom: function() {
            return this.y + this.height;
        }
    });
});