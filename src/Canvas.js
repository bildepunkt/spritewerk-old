import Cinemize from './Cinemize';

/**
 * @class       Canvas
 * @description Creates and handles the canvas element
 * @requires    Cinemize
 * @author      Chris Peters
 */
export default class Canvas {
    /**
     * @param {Integer}     width                  The width of the canvas
     * @param {Integer}     height                 The height of the canvas
     * @param {Object}      [opts]                 Canvas options
     * @param {HTMLElement} [opts.parentEl]        The element with which to attach the canvas.
     *                                             If none given the body is used.
     * @param {String}      [opts.canvasBgColor]   The canvas element's bg color
     * @param {String}      [opts.parentElBgColor] The parent element's bg color
     * @param {Object}      [opts.document]        For testing
     * @param {Object}      [opts.window]          For testing
     */
    constructor(width = 800, height = 600, opts = {}) {
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
     * adjust canvas Cinemize to fit canvas to resized window
     */
    _handleResize() {
        let { top, left, width, height } = Cinemize.fit(
            this._width, this._height, this._window
        );

        this._canvas.style.top = `${Math.round(top)}px`;
        this._canvas.style.left = `${Math.round(left)}px`;
        this._canvas.style.width = `${Math.round(width)}px`;
        this._canvas.style.height = `${Math.round(height)}px`;

        this.onResize();
    }

    /**
     * @return {HTMLElement} canvas
     */
    getEl() {
        return this._canvas;
    }

    /**
     * window resize callback
     */
    onResize() {}
}
