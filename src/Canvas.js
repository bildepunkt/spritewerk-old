/**
 * Creates a canvas element and provides the context's api
 *
 * @class Canvas
 */
class Canvas {
    /**
     *
     */
    constructor(deps) {
        this._deps = deps;

        this._canvas = document.createElement('canvas');
        this._canvas.width = this._deps.config.width;
        this._canvas.height = this._deps.config.height;
        
        this._canvas.style.position = 'absolute';

        this._context = this._canvas.getContext('2d');

        document.body.appendChild(this._canvas);
    }

    /**
     *
     */
    drawPt(x, y) {
        this._context.fillRect(x, y, 4, 4);
    }

    /**
     *
     */
    getElement() {
        return this._canvas;
    }
}

module.exports = Canvas;
