import { applyStyles, fitToWindow } from "./util/domHelpers";

/**
 * @class Viewport
 * @param {Integer} width The game width
 * @param {Integer} height The game height
 * @param {HTMLElement} [parent=document.body] The parent element
 */
export default class Viewport {
    constructor (width, height, parent=document.body) {
        this.canvas = document.createElement("canvas");
        this.width = width;
        this.height = height;

        this.canvas.width = width;
        this.canvas.height = height;

        applyStyles(this.canvas, {
            height: `${this.height}px`,
            left: 0,
            position: "absolute",
            top: 0,
            width: `${this.width}px`
        });

        parent.appendChild(this.canvas);
    }
}
