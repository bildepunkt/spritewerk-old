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
            this.player = this.layers.main.getEntity('player');
            this.player.containable = true;
            this.player.follow = true;
            this.player.blockable = true;

            this.canScroll = true;
        },

        pressdown: function(e) {
            this.player.pressdown(e);
        },

        pressup: function() {
            this.player.pressup();
        }
    });
});