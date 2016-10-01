import contextConstants from "./util/contextConstants";

/**
 * @class Sprite
 * @requires contextConstants
 * 
 * @param {Integer} [x=0] - The x coordinate
 * @param {Integer} [y=0] - The y coordinate
 * @param {Integer} [width=64] - The width
 * @param {Integer} [height=64] - The height
 */
class Sprite {
    constructor (x=0, y=0, width=64, height=64) {
        /**
         * @member {Integer} Sprite#x - The sprite's x coordinate
         */
        this.x = x;
        /**
         * @member {Integer} Sprite#y - The sprite's y coordinate
         */
        this.y = y;
        /**
         * @member {Integer} Sprite#width - The sprite's width
         */
        this.width = width;
        /**
         * @member {Integer} Sprite#height - The sprite's height
         */
        this.height = height;
        /**
         * @member {Float} Sprite#sx - The sprite's horizontal scale
         */
        this.sx = 1;
        /**
         * @member {Float} Sprite#sy - The sprite's horizontal scale
         */
        this.sy = 1;
        /**
         * @member {Float} Sprite#rotation - The sprite's rotation
         */
        this.rotation = 0;
        /**
         * @member {Float} Sprite#composite - The sprite's composite setting
         */
        this.composite = contextConstants.SOURCE_OVER;
        /**
         * @member {Float} Sprite#opacity - The sprite's opacity
         */
        this.opacity = 1;
        /**
         * @member {Boolean} Sprite#visible - If false sprite is not rendered
         */
        this.visible = true;
        /**
         * @member {Float} Sprite#uuid - The sprite's unique ID
         */
        this.uuid = Sprite.uuidCount++;
        /**
         * @member {Float} Sprite#parentTransforms - A parent group's coordinates
         */
        this.parentTransforms = {
            x: 0, y: 0
        };
    }
    
    /**
     * @method Sprite#render
     * @param  {CanvasRenderingContext2D} context - The rendering context
     * @return {undefined}
     */
    render (context) {
        context.globalAlpha *= this.opacity;

        if (this.composite !== Sprite.SOURCE_OVER) {
            context.globalCompositeOperation = this.composite;
        }
    }
    
    /**
     * @member {Integer} Sprite#gx - The global x coordinate (the local + parent transforms)
     */
    get gx () {
        return this.x + this.parentTransforms.x;
    }
    
    /**
     * @member {Integer} Sprite#gy - The global y coordinate (the local + parent transforms)
     */
    get gy () {
        return this.y + this.parentTransforms.y;
    }
}

Sprite.uuidCount = 0;

export default Sprite;
