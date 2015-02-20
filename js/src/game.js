SW.Game = SW.Protos.extend({
    _frame: 0,

    start: function(name, state) {
        if (name && state) {
            SW.FSM.add(name, state);
        }

        this.scopedUpdate = this._update.bind(this);

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