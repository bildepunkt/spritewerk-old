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

        halfWidth: function() {
            return this.width / 2;
        },

        halfHeight: function() {
            return this.height / 2;
        }
    });
});