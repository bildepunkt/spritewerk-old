/**
 * @class       Draw
 * @description Handles rendering entities onto the canvas element
 * @author      Chris Peters
 */
export default class Draw {
    /**
     * @param {HTMLElement} canvas The active canvas element
     */
    constructor(canvas) {
        this._context = canvas.getContext('2d');
    }

    /**
     * @return {Object} The context object
     */
    getContext() {
        return this._context;
    }

    /**
     * [render description]
     */
    render() {

    }
}
