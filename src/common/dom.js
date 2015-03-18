SW.Dom = (function() {
    /**
     * manipulates, and listens to, various dom elements
     *
     * @class SW.Dom
     * @belongsto SW
     */
    var Dom = function() {
        SW.Signal.addListener(window, 'resize', this._onWindowResize, this);
        // TODO is this needed?
        SW.Signal.addListener(window, 'orientationchange', this._onWindowResize, this);
    };

    /**
     * @method SW.Dom.prototype._onWindowResize
     * @listens window#resize
     * @listens window#orientationchange
     * @fires SW.Signal#screen/resize
     * @private
     */
    Dom.prototype._onWindowResize = function() {
        /**
         * reports a change in screen size
         * @event SW.Signal#screen/resize
         */
        SW.Signal.dispatch('screen/resize');
    };

    return Dom;
}());