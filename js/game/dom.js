SW.Game.Dom = (function() {
    /**
     * manipulates various dom elements
     *
     * @class SW.Game.Dom
     * @extends SW.Common.Dom
     * @belongsto SW.Game
     */
    var Dom = function(options) {
        SW.Common.Dom.call(this, options);

        /**
         * @member {String} SW.Game.Dom.prototype.title
         */
        this.title = options.title;

        document.title = this.title || 'spritewerk game';

        this._styleElements();
    };

    Dom.prototype = SW.Common.Dom.prototype;

    /**
     * @method SW.Game.Dom.prototype._styleElements
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