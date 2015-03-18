SW.GameDom = (function() {
    /**
     * manipulates various dom elements
     *
     * @class SW.Dom
     * @extends SW.Dom
     * @belongsto SW
     */
    var GameDom = function(options) {
        SW.Dom.call(this, options);

        /**
         * @member {String} SW.Dom.prototype.title
         */
        this.title = options.title;

        this.bgColor = options.bgColor || '#444';

        document.title = this.title || 'spritewerk game';

        this._styleElements();
    };

    GameDom.prototype = SW.Util.clone(SW.Dom.prototype);

    /**
     * @method SW.Dom.prototype._styleElements
     * @private
     */
    GameDom.prototype._styleElements = function() {
        var body = document.getElementsByTagName('body')[0];

        body.style.backgroundColor = this.bgColor;
        body.style.margin = 0;
        body.style.padding = 0;
    };

    return GameDom;
}());