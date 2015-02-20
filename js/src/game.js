SW.Game = Protos.extend({
    frame: 0,

    start: function(name, state) {
        if (name && state) {
            SW.FSM.add(name, state);
        }

        this.scopedUpdate = this._update.bind(this);

        this._update();
    },

    _update: function() {
        SW.FSM.sortedEach(function(state) {
            SW.Draw.clear();

            if (state.active) {
                state.update();
            }

            if (state.visible) {
                SW.Draw.clear().fill(state.config.bgColor);

                state.sortedEach(function(group) {
                    group.sortedEach(function(entity) {
                        SW.Draw.render(entity);
                    });
                });
            }
        });

        radio.broadcast('newframe', {
            frame: ++this.frame
        });

        requestAnimationFrame(this.scopedUpdate);
    }
});