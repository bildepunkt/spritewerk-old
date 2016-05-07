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
    constructor(width, height, options={}) {
        this._width = width;
        this._height = height;
        this._document = options.document || document;
        const elementTypes = ["canvas", "video", "input"];

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

        if (type !== "input") {
            applyStyles(el, {
                height: `${this._height}px`,
                left: 0,
                position: "absolute",
                top: 0,
                width: `${this._width}px`
            });
        } else {
            applyStyles(el, {
                position: "absolute",
                top: `${-999}px`
            });
        }

        this["_" + type] = el;
        this._viewport.appendChild(el);
    }

    /**
     * Canvas element getter
     * @method Viewport#canvasElement
     * @return {HTMLElement} The canvas element
     */
    get canvasElement() { return this._canvas; }
    set canvasElement(val) {
        this._canvas = val;
    }

    /**
     * Video element getter
     * @method Viewport#videoElement
     * @return {HTMLElement} The video element
     */
    get videoElement() { this._video; }
}