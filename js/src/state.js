SW.State = SW.Collection.extend({
    active: true,

    visible: true,

    data: null,

    init: function() {
        radio.tuneIn('inputreceived', this.inputHandler, this);
    },

    inputHandler: function(e) {
        if (this.active) {
            // normalize event

            switch(e.type) {
                case 'click':
                    //
                break;
            }
        }
    },

    update: function() {},

    destroy: function() {
        radio.tuneOut('inputreceived', this.inputHandler);
    }
});