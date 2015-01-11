/**
 * the base state to extend from
 *
 * @class Title
 * @extends State
 */
define([
    '../spritewerk/state'
], function(State) {
    return State.extend({
        protosName: 'play',

        init: function() {
            this.$state.init.call(this);

            // TODO move getEntity to state method, add layer name as second, optional param
            this.player = this.layers[0].getEntity('player');
            this.player.containable = true;
            this.player.follow = true;

            this.canScroll = true;
        },

        pressdown: function(e) {
            console.log(e);

            if (e.y < this.player.y) {
                this.player.vy = -8;
            } else if (e.y > this.player.bottom()) {
                this.player.vy = 8;
            }

            if (e.x < this.player.x) {
                this.player.vx = -8;
            } else if (e.x > this.player.right()) {
                this.player.vx = 8;
            }
        },

        pressup: function(e) {
            this.player.vy = 0;
            this.player.vx = 0;
        }
    });
});