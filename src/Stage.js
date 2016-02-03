/**
 * @class       Stage
 * @description Creates and handles the canvas element. included in the options
 *              parameter is optional dependency injection used for testing against
 *              a virtual dom.
 * @requires    Stage
 * @author      Chris Peters
 *
 * @param {Integer}     width                  The width of the canvas
 * @param {Integer}     height                 The height of the canvas
 * @param {Object}      [opts]                 Stage options
 * @param {HTMLElement} [opts.parentEl]        The element with which to attach the canvas.
 *                                             If none given the body is used.
 * @param {String}      [opts.canvasBgColor]   The canvas element's bg color
 * @param {String}      [opts.parentElBgColor] The parent element's bg color
 * @param {Object}      [opts.document]        For testing
 * @param {Object}      [opts.window]          For testing
 * @param {Boolean}     [fill]                 Set to false to not maximally fill viewport.
 *                                             Default is true.
 */
export default class Stage {
    constructor(width = 800, height = 600, opts = {}) {
        this._fit = opts.fill === undefined ? true : opts.fill;
        this._width = width;
        this._height = height;
        this._document = opts.document || document;
        this._window = opts.window || window;
        this._parentEl = opts.parentEl || this._document.body;

        this._createStageElements();

        this._window.addEventListener('resize', this._handleResize.bind(this));
        this._window.addEventListener('orientationchange', this._handleResize.bind(this));

        this._handleResize();
    }

    _createStageElements() {
        this._canvas = this._document.createElement('canvas');
        this._canvas.width = this._width;
        this._canvas.height = this._height;
        this._canvas.style.position = 'absolute';
        this._canvas.style.backgroundColor = opts.canvasBgColor;

        this._parentEl.style.backgroundColor = opts.parentElBgColor;
        this._parentEl.appendChild(this._canvas);
    }

    /**
     * Decides how to handle resize based on options
     *
     * @method Stage#_handleResize
     * @private
     */
    _handleResize() {
        if (this._fit) {
            let { top, left, width, height } = Stage.fill(
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
            let { top, left } = Stage.center(
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
     * @method Stage#getCanvas
     * @return {HTMLElement}
     */
    getCanvas() {
        return this._canvas;
    }

    /**
     * Maximizes an element (with aspect ratio intact) in the viewport via CSS.
     *
     * @method Stage.fill
     * @param  {Integer} width          The element's original width attribute
     * @param  {Integer} height         The element's original height attribute
     * @param  {Integer} viewportWidth  The viewport's current width
     * @param  {Integer} viewportHeight The viewport's current height
     * @return {Object}                 The new top, left, width, & height
     */
    static fill(width, height, viewportWidth, viewportHeight) {
        const LANDSCAPE_RATIO = height / width;
        const PORTRAIT_RATIO  = width / height;
        const IS_LANDSCAPE    = LANDSCAPE_RATIO < PORTRAIT_RATIO ? true : false;

        let winLandscapeRatio = viewportHeight / viewportWidth;
        let winPortraitRatio  = viewportWidth / viewportHeight;
        let offsetLeft = 0;
        let offsetTop  = 0;
        let offsetWidth;
        let offsetHeight;

        if (IS_LANDSCAPE) {
            if (LANDSCAPE_RATIO < winLandscapeRatio) {
                offsetWidth = viewportWidth;
                offsetHeight = offsetWidth * LANDSCAPE_RATIO;
                offsetTop = (viewportHeight - offsetHeight) / 2;
            } else {
                offsetHeight = viewportHeight;
                offsetWidth = viewportHeight * PORTRAIT_RATIO;
                offsetLeft = (viewportWidth - offsetWidth) / 2;
            }
        } else {
            if (PORTRAIT_RATIO < winPortraitRatio) {
                offsetHeight = viewportHeight;
                offsetWidth = viewportHeight * PORTRAIT_RATIO;
                offsetLeft = (viewportWidth - offsetWidth) / 2;
            } else {
                offsetWidth = viewportWidth;
                offsetHeight = offsetWidth * LANDSCAPE_RATIO;
                offsetTop = (viewportHeight - offsetHeight) / 2;
            }
        }

        return {
            width: offsetWidth,
            height: offsetHeight,
            left: offsetLeft,
            top: offsetTop
        };
    }

    /**
     * Keeps stage element centered in the viewport
     *
     * @method Stage.center
     * @param  {Integer} width          The element's original width attribute
     * @param  {Integer} height         The element's original height attribute
     * @param  {Integer} viewportWidth  The viewport's current width
     * @param  {Integer} viewportHeight The viewport's current height
     * @return {Object}                 The top and left
     */
    static center(width, height, viewportWidth, viewportHeight) {
        return {
            left: (viewportWidth - width) / 2,
            top: (viewportHeight - height) / 2
        };
    }
}
