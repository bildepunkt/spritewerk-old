import { degreesToRadians } from "./util/math";
import Transform from "./lib/Transform";

let defaults = {
    debug: true
};

/**
 * Handles rendering entities onto the canvas element
 * @class Scene
 * @requires Transform
 * 
 * @param {HTMLElement} canvas - The active canvas element
 * @param {Camera} camera - The camera instance
 * @param {Object} [options]
 * @param {Boolean} [options.debug=true] - If true, renders debug objects
 */
export default class Scene {
    constructor (canvas, camera, options=defaults) {
        /**
         * @member {HTMLElement} Scene#canvas - The active canvas element
         */
        this.canvas = canvas;
        /**
         * @member {Camera} Scene#camera - The camera instance
         */
        this.camera = camera;
        /**
         * @member {HTMLElement} Scene#options - The Scene's options
         */
        this.options = options;
        /**
         * @member {CanvasRenderingContext2D} Scene#ctx - The canvas rendering object
         */
        this.ctx = canvas.getContext("2d");
        /**
         * @member {Transform} Scene#transform - The transformation matrix tracker
         */        
        this.transform = new Transform();

        this.xformOffset = null;
        this.cameraXformOffset = null;
    }
    
    /**
     * Applies the camera's transforms to the Transform > context
     * @method Scene#_applyCameraTransforms
     * @param {Camera} cam - The camera instance
     */
    _applyCameraTransforms (cam) {
        this.transform.translate(-cam.x, -cam.y);
        
        if (cam.rotation !== 0) {
            let rotationOffsetWidth = cam.width / 2;
            let rotationOffsetHeight = cam.height / 2;
            this.transform.translate(rotationOffsetWidth, rotationOffsetHeight);
            this.transform.rotate(degreesToRadians(cam.rotation));
            this.transform.translate(-rotationOffsetWidth, -rotationOffsetHeight);
        }
        
        if (cam.zoom !== 1) {
            let scaleOffsetWidth = (cam.width / 2) * (cam.zoom - 1);
            let scaleOffsetHeight = (cam.height / 2) * (cam.zoom - 1);
            this.transform.translate(-scaleOffsetWidth, -scaleOffsetHeight);
            this.transform.scale(cam.zoom, cam.zoom);
        }

        this.cameraXformOffset = this.transform.transformPoint();
        
        this.ctx.setTransform.apply(
            this.ctx, Array.prototype.slice.call(this.transform.matrix)
        );
    }

    /**
     * Applies a Sprite's transforms to the Transform > context
     * @method Scene#_applyTransforms
     * @param {Sprite} item - The sprite
     */
    _applyTransforms (item) {
        this.transform.translate(item.x, item.y);
        this.transform.rotate(degreesToRadians(item.rotation));
        this.transform.scale(item.sx, item.sy);

        this.xformOffset = this.transform.transformPoint();

        this.ctx.setTransform.apply(
            this.ctx, Array.prototype.slice.call(this.transform.matrix)
        );
    }

    /**
     * [startRender description]
     * @method Scene#startRender
     * @param {Group} group The group to render
     */
    startRender (group) {
        this.ctx.save();
        this.transform.save();
        
        this._applyCameraTransforms(this.camera);
        group.sprite.render(this.ctx);

        group.collection.each((item)=> {
            this.renderItem(item);
        });

        this.ctx.restore();
        this.transform.restore();
    }

    /**
     * [renderItem description]
     * @method Scene#renderItem
     * @param  {Sprite|Group} item The item to render
     */
    renderItem (item) {
        if (item.isGroup) {
            this.ctx.save();
            this.transform.save();

            this._applyTransforms(item.sprite);

            if (this.options.debug) {
                this.ctx.fillRect(-8, -1, 16, 2);
                this.ctx.fillRect(-1, -8, 2, 16);
            }

            item.sprite.render(this.ctx);
            
            item.collection.each((item)=> {
                this.renderItem(item);
            });

            this.ctx.restore();
            this.transform.restore();
        } else {
            item.parentTransforms = this.transform.transformPoint();
            // assign parent transforms before applying sprite's transforms
            this._applyTransforms(item);
            item.render(this.ctx);
        }
    }

    /**
     * [startUpdate description]
     * @method Scene#startUpdate
     * @param  {Group} group [description]
     * @param  {Float} factor [description]
     */
    startUpdate (group, factor) {
        group.collection.each((item)=> {
            this.updateItem(item, factor);
        });
    }

    /**
     * [updateItem description]
     * @method Scene#updateItem
     * @param  {Sprite|Group} item [description]
     * @param  {Float} factor [description]
     */
    updateItem (item, factor) {
        if (item.isGroup) {
            item.collection.each((item)=> {
                this.updateItem(item, factor);
            });
        } else {
            item.update(factor);
        }
    }
}
