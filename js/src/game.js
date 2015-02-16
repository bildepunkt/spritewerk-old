SW.Game = Protos.extend({
    frame: 0,

    start: function(name, state) {
        if (name && state) {
            SW.FSM.add(name, state);
        }

        this.scopedUpdate = this.update.bind(this);

        this.update();
    },

    update: function() {
        SW.FSM.sortedEach(function(state) {
            SW.Draw.clear();

            if (state.active) {
                state.update();
            }

            if (state.visible) {
                SW.Draw.clear().fill(state.config.bgColor);

                state.sortedEach(function(group) {
                    group.sortedEach(function(entity) {
                        Draw.render(entity);
                    });
                });
            }
        });

        radio.broadcast('newframe', {
            detail: {
                frame: ++this.frame
            }
        });

        requestAnimationFrame(this.scopedUpdate);
    }
});