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
        SW.Renderable.call(this, options);

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

    Text.prototype = SW.Util.clone(SW.Renderable.prototype);

    /**
     * @method SW.Text.prototype.maxWidth
     * @param {Integer} [value]
     * @return {Integer|SW.Text}
     * @chainable
     */
    Text.prototype.maxWidth = function(value) {
        if (value === undefined) {
            return this._maxWidth;
        }

        if (typeof value === 'number') {
            this._maxWidth = value;
        }

        return this;
    };

    /**
     * @method SW.Text.prototype.contents
     * @param {String} [value]
     * @return {String|SW.Text}
     * @chainable
     */
    Text.prototype.contents = function(value) {
        if (value === undefined) {
            return this._contents;
        }

        if (typeof value === 'string') {
            this._contents = value;
        }

        return this;
    };

    /**
     * @method SW.Text.prototype.font
     * @param {String} [value]
     * @return {String|SW.Text}
     * @chainable
     */
    Text.prototype.font = function(value) {
        if (value === undefined) {
            return this._font;
        }

        if (typeof value === 'string') {
            this._font = value;
        }

        return this;
    };

    /**
     * @method SW.Text.prototype.baseline
     * @param {String} [value]
     * @return {String|SW.Text}
     * @chainable
     */
    Text.prototype.baseline = function(value) {
        if (value === undefined) {
            return this._baseline;
        }

        if (typeof value === 'string') {
            this._baseline = value;
        }

        return this;
    };

    /**
     * @method SW.Text.prototype.align
     * @param {String} [value]
     * @return {String|SW.Text}
     * @chainable
     */
    Text.prototype.align = function(value) {
        if (value === undefined) {
            return this._align;
        }

        if (typeof value === 'string') {
            this._align = value;
        }

        return this;
    };

    return Text;
}());