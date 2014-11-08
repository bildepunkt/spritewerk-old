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
        protosName: 'title',

        init: function() {
            this.$state.init.call(this);

            this.start = this.layers[0].getEntity('start');
        },

        press: function(e) {
            if (e.target == this.start) {
                this.layers[0].setEntityDepth(this.start, '++');
            }
        }
    });
});