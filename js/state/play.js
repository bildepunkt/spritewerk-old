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
            var enemy;

            for (var i = 0, len = this.layers.enemies.entities.length; i < len; i += 1) {
                enemy = this.layers.enemies.entities[i];

                if (enemy && Collision.hit(this.player, enemy)) {
                    alert('ouch. :|');
                    this.player.x = 0;
                    this.player.y = 0;
                }

                if (enemy && Collision.hit(this.weapon, enemy)) {
                    this.layers.enemies.removeEntity(enemy);
                    if (!this.layers.enemies.entities.length) {
                        alert('you win. :|');
                    }
                }
            }
            

            this.$state.update.apply(this);
        }
    });
});