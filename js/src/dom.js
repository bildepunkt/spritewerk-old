/**
 * class for controlling various dom elements
 *
 * @class SW.Dom
 * @belongsto SW
 */
SW.Dom = SW.Protos.extend({
    
    init: function() {
        document.title = SW.Config.title;

        this._styleElements();

        if (SW.Config.stretch) {
            SW.Radio.tuneIn(window, 'resize', this._onWindowResize, this);
            // TODO is this needed?
            SW.Radio.tuneIn(window, 'orientationchange', this._onWindowResize, this);
        }
    },

    /**
     * @method Dom._onWindowResize
     * @private
     */
    _onWindowResize: function() {
        SW.Radio.broadcast('screenresize');
    },

    /**
     * @method Dom._styleElements
     * @private
     */
    _styleElements: function() {
        var body = document.getElementsByTagName('body')[0];

        body.style.backgroundColor = SW.Config.backgroundColor;
        body.style.margin = 0;
        body.style.padding = 0;
    }
});