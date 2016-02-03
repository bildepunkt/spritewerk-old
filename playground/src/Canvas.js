import Cinemize from './Cinemize';

/**
 * @class       Stage
 * @description Creates and handles the canvas element. included in the options
 *              parameter is optional dependency injection used for testing against
 *              a virtual dom.
 * @requires    Cinemize
 * @author      Chris Peters
 *
 * @param {Integer}     width                  The width of the canvas
 * @param {Integer}     height                 The height of the canvas
 * @param {Object}      [opts]                 Canvas options
 * @param {HTMLElement} [opts.parentEl]        The element with which to attach the canvas.
 *                                             If none given the body is used.
 * @param {String}      [opts.canvasBgColor]   The canvas element's bg color
 * @param {String}      [opts.parentElBgColor] The parent element's bg color
 * @param {Object}      [opts.document]        For testing
 * @param {Object}      [opts.window]          For testing
 * @param {Boolean}     [fill]                 Set to false to not maximally fill viewport.
 *                                             Default is true.
 */
export default class Canvas {
    constructor(width = 800, height = 600, opts = {}) {
        this._fit = opts.fill === undefined ? true : opts.fill;
        this._width = width;
        this._height = height;
        this._document = opts.document || document;
        this._window = opts.window || window;

        this._parentEl = opts.parentEl || this._document.body;

        this._canvas = this._document.createElement('canvas');
        this._canvas.width = this._width;
        this._canvas.height = this._height;
        this._canvas.style.position = 'absolute';
        this._canvas.style.backgroundColor = opts.canvasBgColor;

        this._parentEl.style.backgroundColor = opts.parentElBgColor;
        this._parentEl.appendChild(this._canvas);

        this._window.addEventListener('resize', this._handleResize.bind(this));
        this._window.addEventListener('orientationchange', this._handleResize.bind(this));

        this._handleResize();
    }

    /**
     * Adjust canvas Cinemize to fill canvas to resized window
     *
     * @method Canvas#_handleResize
     * @private
     */
    _handleResize() {
        if (this._fit) {
            let { top, left, width, height } = Cinemize.fill(
                this._width,
                this._height,
                this._window.innerWidth,
                this._window.innerHeight
            );

            this._canvas.style.top = `${Math.round(top)}px`;
            this._canvas.style.left = `${Math.round(left)}px`;
            this._canvas.style.width = `${Math.round(width)}px`;
            this._canvas.style.height = `${Math.round(height)}px`;
        } else {
            let { top, left } = Cinemize.center(
                this._width,
                this._height,
                this._window.innerWidth,
                this._window.innerHeight
            );

            this._canvas.style.top = `${Math.round(top)}px`;
            this._canvas.style.left = `${Math.round(left)}px`;
        }

        this.onResize(this._canvas);
    }

    /**
     * Returns the canvas element
     *
     * @method Canvas#getEl
     * @return {HTMLElement} canvas
     */
    getEl() {
        return this._canvas;
    }

    /**
     * The window resize callback
     *
     * @method Canvas#onResize
     */
    onResize() {}
}
