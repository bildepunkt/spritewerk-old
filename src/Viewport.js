import { applyStyles, fitToWindow } from "./util/domHelpers";
import { tuneIn } from "./util/radio";

const defaults = {
    fitToWindow: true,
    window: null,
    document: null,
    parent: null
};

/**
 * @class Viewport
 * @requires util/domHelpers
 * @requires util/radio
 *
 * @param {Integer} width The game width
 * @param {Integer} height The game height
 * @param {Object} options
 * @param {HTMLElement} [options.parent=document.body] - The parent element
 * @param {Boolean} [options.fitToWindow=true] - If true, the viewport will fill the screen while maintaining aspect ratio
 */
export default class Viewport {
    constructor (width, height, options=defaults) {
        if (options.window === null) {
            options.window = window;
        }
        if (options.document === null) {
            options.document = document;
        }
        if (options.parent === null) {
            options.parent = options.document.body;
        }

        /**
         * @member {Integer} Viewport#width - The viewport's width
         */
        this.width = width;
        /**
         * @member {Integer} Viewport#height - The viewport's height
         */
        this.height = height;
        /**
         * @member {Integer} Viewport#options - The viewport's options
         */
        this.options = options;
        /**
         * @member {HTMLElement} Viewport#canvas - The canvas element
         */
        this.canvas = options.document.createElement("canvas");
        /**
         * @member {HTMLElement} Viewport#video - The video element
         */        
        this.video = options.document.createElement("video");

        this.canvas.width = width;
        this.canvas.height = height;

        const viewportStyles = {
            height: this.height,
            left: 0,
            position: "absolute",
            top: 0,
            width: this.width
        };
    
        applyStyles(this.canvas, viewportStyles);
        applyStyles(this.video, viewportStyles);

        options.parent.appendChild(this.canvas);
        options.parent.appendChild(this.video);

        if (options.fitToWindow) {
            tuneIn(options.window, "resize", this._onResize, this);
            tuneIn(options.window, "orientationchange", this._onResize, this);
            this._onResize();
        }
    }

    /**
     * @method Viewport#_onResize
     */
    _onResize () {
        const posCoords = fitToWindow(this.width, this.height, this.options.window.innerWidth, this.options.window.innerHeight);

        applyStyles(this.canvas, posCoords);
        applyStyles(this.video, posCoords);
    }
}
