/**
 * @class Camera
 * @param {Integer} [x=0] - The x coordinate
 * @param {Integer} [y=0] - The y coordinate
 * @param {Integer} [width=800] - The viewport width
 * @param {Integer} [height=600] - The viewport height
 */
export default class Camera {
    constructor (x=0, y=0, width=800, height=600) {
        /**
         * @member {Integer} Camera#x - The camera's x position
         */
        this.x = x;
        /**
         * @member {Integer} Camera#y - The camera's y position
         */
        this.y = y;
        /**
         * @member {Integer} Camera#width - The viewport width
         */
        this.width = width;
        /**
         * @member {Integer} Camera#height - The viewport height
         */
        this.height = height;
        /**
         * @member {Float} Camera#rotation - The camera's rotation
         */
        this.rotation = 0;
        /**
         * @member {Float} Camera#zoom - The camera's zoom value
         */
        this.zoom = 1;
    }
}
