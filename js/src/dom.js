
SW.Dom = (function() {
    /**
     * class for controlling various dom elements
     *
     * @class SW.Dom
     * @belongsto SW
     * @requires SW.Config
     * @singleton
     */
    var Dom = function() {
        document.title = SW.Config.title;

        this._styleElements();

        if (SW.Config.stretch) {
            SW.Radio.tuneIn(window, 'resize', this._onWindowResize, this);
            // TODO is this needed?
            SW.Radio.tuneIn(window, 'orientationchange', this._onWindowResize, this);
        }
    };

    /**
     * @method SW.Dom.prototype._onWindowResize
     * @listens window#resize
     * @listens window#orientationchange
     * @fires SW.Radio#screen/resize
     * @private
     */
    Dom.prototype._onWindowResize = function() {
        /**
         * reports that the window size has changed
         * @event SW.Radio#screen/resize
         */
        SW.Radio.broadcast('screen/resize');
    };

    /**
     * @method SW.Dom.prototype._styleElements
     * @private
     */
    Dom.prototype._styleElements = function() {
        var body = document.getElementsByTagName('body')[0];

        body.style.backgroundColor = SW.Config.backgroundColor;
        body.style.margin = 0;
        body.style.padding = 0;
    };

    return Dom;
}());