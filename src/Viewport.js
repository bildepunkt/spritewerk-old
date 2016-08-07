import { applyStyles, fitToWindow } from "./util/domHelpers";
import { tuneIn } from "./util/radio";

/**
 * @class Viewport
 * @param {Integer} width The game width
 * @param {Integer} height The game height
 * @param {HTMLElement} [parent=document.body] The parent element
 */
const defaults = {
    parent: document.body,
    fitToWindow: true
};

export default class Viewport {
    constructor (width, height, options=defaults) {
        this.width = width;
        this.height = height;
        this.options = options;

        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;

        applyStyles(this.canvas, {
            height: this.height,
            left: 0,
            position: "absolute",
            top: 0,
            width: this.width
        });

        options.parent.appendChild(this.canvas);

        if (options.fitToWindow) {
            tuneIn(window, "resize", this._onResize, this);
            tuneIn(window, "orientationchange", this._onResize, this);
            this._onResize();
        }
    }

    _onResize () {
        var posCoords = fitToWindow(this.width, this.height, window.innerWidth, window.innerHeight);
        applyStyles(this.canvas, posCoords);
    }
}
