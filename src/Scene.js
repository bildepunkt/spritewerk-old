import Transform from "./Transform";

/**
 * Handles rendering entities onto the canvas element
 * @class Canvas
 * @param {HTMLElement} canvas The active canvas element
 * @param {Boolean} [debug=false]
 * @requires Transform
 */
class Scene {
    constructor (canvas, debug=false) {
        this.canvas = canvas;
        this.debug = debug;

        this.ctx = canvas.getContext("2d");
        this.transform = new Transform();
    }
    
    _applyTransforms (item) {
        this.transform.translate(item.x, item.y);
        this.transform.rotate(degreesToRadians(item.rot));
        this.transform.scale(item.sx, item.sy);

        this.ctx.setTransform.apply(
            this.ctx, Array.prototype.slice.call(this.transform.matrix)
        );
    }

    /**
     * [startRender description]
     * @method Scene#startRender
     * @param {State} state The state to render
     */
    startRender (state) {
        if (state.bgColor) {
            this.ctx.fillStyle = state.bgColor;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        this.ctx.save();
        this.transform.save();

        for (let item of state.items) {
            this.renderItem(item);
        }

        this.ctx.restore();
        this.transform.restore();
    }

    /**
     * [renderItem description]
     * @method renderItem
     * @param  {Sprite|Group} item The item to render
     */
    renderItem (item) {
        if (item.isGroup) {
            this.ctx.save();
            this.transform.save();

            this._applyTransforms(item);

            if (this.debug) {
                this.ctx.fillRect(-8, -1, 16, 2);
                this.ctx.fillRect(-1, -8, 2, 16);
            }

            for (let item of item.items) {
                this.renderItem(item);
            }

            this.ctx.restore();
            this.transform.restore();
        } else {
            item.parentTransforms = this.transform.transformPoint();
            // assign parent transforms before applying sprite's transforms
            this._applyTransforms(item);

            item.render(this.ctx);
            item.dirty = false;
            console.log(item.parentTransforms);
        }
    }

    /**
     * [startUpdate description]
     * @method startUpdate
     * @param  {State}    state [description]
     */
    startUpdate (state) {
        for (let item of state.items) {
            this.updateItem(item);
        }
    }

    /**
     * [updateItem description]
     * @method updateItem
     * @param  {Sprite|Group} item [description]
     */
    updateItem (item) {
        if (item.isGroup) {
            for (let item of item.items) {
                this.updateItem(item);
            }
        } else {
            item.update();
        }
    }
}
