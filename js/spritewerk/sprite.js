/**
 * class for movable, visible objects
 *
 * @class Sprite
 */
define([
    './shade',
    '../lib/radio'
], function(Shade, radio) {
    return Shade.extend({
        protosName: 'sprite',

        /** 
         * @member {number} Sprite.prototype.srcX
         */
        srcX: 0,

        /** 
         * @member {number} Sprite.prototype.srcY
         */
        srcY: 0,

        /** 
         * @member {number} Sprite.prototype.srcWidth
         */
        srcWidth: 0,

        /** 
         * @member {number} Sprite.prototype.srcHeight
         */
        srcHeight: 0,

        //scale: 1,

        /** 
         * @member {number} Sprite.prototype.rotation - the rotation of the entity
         */
        rotation: 0,

        /** 
         * @member {number} Sprite.prototype.opacity - the opacity the entity is rendered at
         */
        opacity: 1,

        /** 
         * @member {HTMLElement} Sprite.prototype.img - the image element that the canvas renders
         */
        img: null,

        /** 
         * @member {string} Sprite.prototype.src - the src path for the entity's img element
         */
        src: null,

        /** 
         * @member {boolean} Sprite.prototype.hidden - if true entity will not be rendered
         */
        hidden: false,

        /** 
         * @member {boolean} Sprite.prototype.visible - if entity is outside camera bounds, visible is set to false and entity is not rendered
         * @private
         */
        _visible: true,

        /** 
         * @member {boolean} Sprite.prototype.blockable - if entity can be blocked by shades in state's walls array
         */
        blockable: false,

        /** 
         * @member {boolean} Sprite.prototype.containable - if entity can be contained by camera dimensions
         */
        containable: false,

        /**
         * unbind listener and set w/h and src w/h
         *
         * @method Sprite.prototype._onLoad
         * @private
         */
        _onLoad: function() {
            radio.tuneOut(this.img, 'load', this._onLoad);

            if (!this.srcWidth && !this.srcWidth) {
                this.srcWidth = this.img.width;
                this.srcHeight = this.img.height;
            }

            if (!this.width && !this.height) {
                this.width = this.img.width;
                this.height = this.img.height;
            }
        },

        /**
         * Create object's img element and set the source
         *
         * @method Sprite.prototype.attachImage
         */
        attachImage: function() {
            if (!this.src) {
                throw new Error('Sprite src property must be assigned an image path');
            }

            this.img = new Image();
            radio.tuneIn(this.img, 'load', this._onLoad, this);

            this.img.src = this.src;
        }
    });
});