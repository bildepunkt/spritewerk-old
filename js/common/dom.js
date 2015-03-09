SW.Game.Dom = (function() {
    /**
     * manipulates various dom elements
     *
     * @class SW.Game.Dom
     * @belongsto SW.Game
     */
    var Dom = function() {
        SW.Events.Signal.addListener(window, 'resize', this._onWindowResize, this);
        // TODO is this needed?
        SW.Events.Signal.addListener(window, 'orientationchange', this._onWindowResize, this);
    };

    /**
     * @method SW.Game.Dom.prototype._onWindowResize
     * @listens window#resize
     * @listens window#orientationchange
     * @fires SW.Events.Signal#screen/resize
     * @private
     */
    Dom.prototype._onWindowResize = function() {
        /**
         * reports either a click, a tap or both
         * @event SW.Events.Signal#screen/resize
         */
        SW.Events.Signal.dispatch('screen/resize');
    };

    return Dom;
}());