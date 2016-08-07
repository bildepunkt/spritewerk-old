/**
 * Display various areas of the game
 * @class Camera
 * @param {Integer} [x=0]
 * @param {Integer} [y=0]
 * @param {Integer} [width=0]
 * @param {Integer} [height=0]
 */
export default class Camera {
    constructor(x=0, y=0, width=0, height=0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.zoom = 1;
    }
}
