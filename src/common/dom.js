SW.Dom = (function() {
    'use strict';

    /**
     * manipulates, and listens to, various dom elements
     *
     * @class SW.Dom
     * @belongsto SW
     */
    var Dom = function() {

        /**
         * @member {String} SW.Dom.prototype.title
         */
        this.title = options.title;

        /**
         * @member {String} SW.Dom.prototype.frameColor
         */
        this.frameColor = options.frameColor || '#444';

        document.title = this.title || 'spritewerk game';

        this._styleElements();

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

    /**
     * @method SW.Dom.prototype._styleElements
     * @private
     */
    Dom.prototype._styleElements = function() {
        var body = document.getElementsByTagName('body')[0];

        body.style.backgroundColor = this.bgColor;
        body.style.margin = 0;
        body.style.padding = 0;
    };

    return Dom;
}());