SW.Dom = Protos.extend({
    
    init: function() {
        document.title = config.title;

        this._styleElements();

        if (SW.Config.stretch) {
            radio.tuneIn(window, 'resize', this._onWindowResize, this);
            // TODO is this needed?
            radio.tuneIn(window, 'orientationchange', this._onWindowResize, this);
            
            this._onWindowResize();
        }
    },

    _onWindowResize: function() {
        radio.broadcast('screenresize');
    },

    /**
     * @method DomControl._styleElements
     * @private
     */
    _styleElements: function() {
        var body = document.getElementsByTagName('body')[0];

        body.style.backgroundColor = SW.Config.backgroundColor;
        body.style.margin = 0;
        body.style.padding = 0;

        this.canvas.style.position = 'absolute';
    }
});