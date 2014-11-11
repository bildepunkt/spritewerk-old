/**
 * base class for movable objects
 *
 * @class Sprite
 */
define([
    '../lib/protos',
    '../lib/radio'
], function(Protos, radio) {
    return Protos.extend({
        protosName: 'sprite',

        /** 
         * @member {number} Sprite.prototype.x - the entity's x position
         */
        x: 0,
                
        /** 
         * @member {number} Sprite.prototype.y - the entity's y position
         */
        y: 0,
                
        //z: null,
                
        /** 
         * @member {number} Sprite.prototype.vx
         */
        vx: 0,
                
        /** 
         * @member {number} Sprite.prototype.vy
         */
        vy: 0,
                
        /** 
         * @member {number} Sprite.prototype.width
         */
        width: 0,
                
        /** 
         * @member {number} Sprite.prototype.height
         */
        height: 0,
                
        //halfWidth: 0,
                
        //halfHeight: 0,

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
         * @member {string} Sprite.prototype.hidden - if true entity will not be rendered
         */
        hidden: false,
                
        /** 
         * @member {boolean} Sprite.prototype.visible - if entity is outside camera bounds, visible is set to false and entity is not rendered
         * @private
         */
        _visible: true,

        init: function() {},

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
        },
                
    });
});