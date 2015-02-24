/**
 * starts game and controls game loop
 *
 * @class SW.Game
 * @belongsto SW
 */
SW.Game = SW.Protos.extend({
    _frame: 0,

    init: function() {
        this.scopedUpdate = this._update.bind(this);
    },

    start: function(name, state, config) {
        if (name && state) {
            SW.FSM.add(name, state);
        }

        if (config) {
            for(var prop in config) {
                if (SW.Config[prop] !== undefined) {
                    SW.Config[prop] = config[prop];
                }
            }
        }

        this._update();
    },

    _update: function() {
        SW.Draw.clear();

        SW.FSM.sortedEach(function(state) {

            if (state.getActive()) {
                state.update();
            }

            if (state.getVisible()) {
                state.render();
            }
        });

        SW.Radio.broadcast('newframe', {
            frame: ++this._frame
        });

        requestAnimationFrame(this.scopedUpdate);
    }
});