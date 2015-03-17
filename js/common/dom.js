SW.Common.Dom = (function() {
    /**
     * manipulates, and listens to, various dom elements
     *
     * @class SW.Common.Dom
     * @belongsto SW.Common
     */
    var Dom = function() {
        SW.Events.Signal.addListener(window, 'resize', this._onWindowResize, this);
        // TODO is this needed?
        SW.Events.Signal.addListener(window, 'orientationchange', this._onWindowResize, this);
    };

    /**
     * @method SW.Common.Dom.prototype._onWindowResize
     * @listens window#resize
     * @listens window#orientationchange
     * @fires SW.Events.Signal#screen/resize
     * @private
     */
    Dom.prototype._onWindowResize = function() {
        /**
         * reports a change in screen size
         * @event SW.Events.Signal#screen/resize
         */
        SW.Events.Signal.dispatch('screen/resize');
    };

    return Dom;
}());