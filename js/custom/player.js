/**
 * class for movable, visible objects
 *
 * @class Sprite
 */
define([
    '../spritewerk/sprite'
], function(Sprite) {
    return Sprite.extend({
        protosName: 'player',

        movingUp   : false,
        movingDown : false,
        movingLeft : false,
        movingRight: false,

        pressdown: function(e) {
            if (e.y < this.y) {
                this.movingUp = true;
            } else if (e.y > this.bottom()) {
                this.movingDown = true;
            }

            if (e.x < this.x) {
                this.movingLeft = true;
            } else if (e.x > this.right()) {
                this.movingRight = true;
            }
        },

        pressup: function() {
            this.movingUp    = false;
            this.movingDown  = false;
            this.movingLeft  = false;
            this.movingRight = false;
        },

        update: function() {
            this.vx = 0;
            this.vy = 0;

            if (this.movingUp) {
                this.vy = -8;
            }

            if (this.movingDown) {
                this.vy = 8;
            }

            if (this.movingLeft) {
                this.vx = -8;
            }

            if (this.movingRight) {
                this.vx = 8;
            }

            this.$sprite.update.apply(this);
        }
    });
});