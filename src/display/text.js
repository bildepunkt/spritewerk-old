SW.Text = (function() {
    'use strict';

    /**
     * a text display entity
     *
     * @class SW.Text
     * @param {Object} [options]
     * @param {Text} options.contents - the literal text
     * @belongsto SW
     */
    var Text = function(options) {
        SW.Sprite.call(this, options);

        options = options || {};

        /**
         * the literal text
         *
         * @member {String} SW.Text.prototype._contents
         * @private
         */
        this._contents = options.contents || '';

        /**
         * the text font
         *
         * @member {String} SW.Text.prototype._font
         * @default '12px sans-serif'
         * @private
         */
        this._font = '12px sans-serif';

        /**
         * the text's alignment
         *
         * @member {String} SW.Text.prototype._align
         * @default 'start'
         * @private
         */
        this._align = 'start';

        /**
         * the text's baseline
         *
         * @member {String} SW.Text.prototype._baseline
         * @default 'top'
         * @private
         */
        this._baseline = 'top';

        /**
         * @member {String} SW.Text.prototype._displayType
         * @private
         */
        this._displayType = 'text';

        /**
         * @member {String} SW.Text.prototype._maxWidth
         * @default
         * @private
         */
        this._maxWidth = null;
    };

    Text.prototype = SW.Util.clone(SW.Sprite.prototype);

    /**
     * @method SW.Text.prototype.getMaxWidth
     * @return {Integer}
     */
    Text.prototype.getMaxWidth = function() {
        return this._maxWidth;
    };

    /**
     * @method SW.Text.prototype.SetMaxWidth
     * @param {Integer} value
     * @return {SW.Text}
     * @chainable
     */
    Text.prototype.SetMaxWidth = function(value) {
        this._maxWidth = value;

        return this;
    };

    /**
     * @method SW.Text.prototype.getContents
     * @return {String}
     * @chainable
     */
    Text.prototype.getContents = function() {
        return this._contents;
    };

    /**
     * @method SW.Text.prototype.setContents
     * @param {String} value
     * @return {SW.Text}
     * @chainable
     */
    Text.prototype.setContents = function(value) {
        this._contents = value;

        return this;
    };

    /**
     * @method SW.Text.prototype.getFont
     * @return {String}
     */
    Text.prototype.getFont = function() {
        return this._font;
    };

    /**
     * @method SW.Text.prototype.setFont
     * @param {String} value
     * @return {String}
     */
    Text.prototype.setFont = function(value) {
        this._font = value;
    };

    /**
     * @method SW.Text.prototype.getBaseline
     * @return {String}
     */
    Text.prototype.getBaseline = function(value) {
        return this._baseline;
    };

    /**
     * @method SW.Text.prototype.setBaseline
     * @param {String} value
     * @return {SW.Text}
     * @chainable
     */
    Text.prototype.setBaseline = function(value) {
        this._baseline = value;

        return this;
    };

    /**
     * @method SW.Text.prototype.getAlign
     * @return {String}
     */
    Text.prototype.getAlign = function() {
        return this._align;
    };

    /**
     * @method SW.Text.prototype.setAlign
     * @return {String}
     */
    Text.prototype.setAlign = function(value) {
        this._align = value;
    };

    return Text;
}());