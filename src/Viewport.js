import { applyStyles } from "./util/domHelpers";

/**
 * @class Viewport
 * @param {Integer} width               The game width
 * @param {Integer} height              The game height
 * @param {Object}  [options]           The viewport options
 * @param {Object}  [options.document]  Can substitute with mock for testing
 * @param {Object}  [options.container] Container element, defaults to <body>
 */
export default class Viewport {
    constructor(width, height, options = {}) {
        this._width = width;
        this._height = height;
        this._document = options.document || document;
        const elementTypes = ["canvas", "video"];

        this._viewport = this._document.createElement("div");
        this._viewport.id = "spritewerk";

        if (options.container) {
            options.container.appendChild(this._viewport);
        } else {
            this._document.body.appendChild(this._viewport);
        }

        for (let type of elementTypes) {
            this._createElement(type);
        }
    }

    _createElement(type) {
        const el = this._document.createElement(type);

        if (type === "canvas") {
            el.width = this._width;
            el.height = this._height;
        }

        applyStyles(el, {
            height: `${this._height}px`,
            left: 0,
            position: "absolute",
            top: 0,
            width: `${this._width}px`
        });

        this["_" + type] = el;
        this._viewport.appendChild(el);
    }

    /**
     * Canvas element getter
     * @method Viewport#canvas
     * @return {HTMLElement} The canvas element
     */
    get canvas() { this._canvas; }

    /**
     * Video element getter
     * @method Viewport#video
     * @return {HTMLElement} The video element
     */
    get video() { this._video; }
}