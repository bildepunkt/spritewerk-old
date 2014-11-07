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

        press: function(e) {
            if (e.target.name === 'start') {
                alert('start!');
            }
        }
    });
});