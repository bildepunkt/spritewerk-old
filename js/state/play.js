/**
 * the base state to extend from
 *
 * @class Title
 * @extends State
 */
define([
    '../spritewerk/state',
    '../spritewerk/util/collision'
], function(State, Collision) {
    return State.extend({
        protosName: 'play',

        init: function() {
            this.$state.init.call(this);

            // TODO move getEntity to state method, add layer name as second, optional param
            this.player = this.layers.main.getEntity('player');
            this.weapon = this.layers.main.getEntity('weapon');
            this.enemy = this.layers.main.getEntity('enemy');

            this.player.containable = true;
            this.player.follow = true;
            this.player.blockable = true;
            this.player.weapon = this.weapon;

            this.canScroll = true;
        },

        press: function(e) {
            if (e.target === this.player) {
                this.player.pressMe();
            }
        },

        pressdown: function(e) {
            this.player.pressdown(e);
        },

        pressup: function() {
            this.player.pressup();
        },

        update: function() {
            if (Collision.hit(this.weapon, this.enemy)) {
                this.layers.main.removeEntity(this.enemy);
                this.enemy = null;
            }

            this.$state.update.apply(this);
        }
    });
});