var Game = Protos.extend({
    frame: 0,

    start: function(name, state) {
        if (name && state) {
            FSM.add(name, state);
        }

        this.scopedUpdate = this.update.bind(this);

        this.update();
    },

    update: function() {
        FSM.sortedEach(function(state) {
            Draw.clear();

            if (state.active) {
                state.update();
            }

            if (state.visible) {
                Draw.clear().fill(state.config.bgColor);

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