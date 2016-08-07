import Sprite from "../Sprite";

/**
 * @typedef {Object} Pragma
 * @property {Integer} rowLength The length of the "rows" in the array. Needed because not using matrices for perf reasons.
 * @property {Array} legend The various asset paths or colors to render. The index corresponds to the tilemap's values.
 *                          `null` values will result in an empty tile.
 * @property {Integer} width The tile width
 * @property {Integer} height The tile height
 * @example
 * <code>{
 *     rowLength: 8,
 *     width: 32,
 *     height: 32,
 *     legend: [
 *         null,
 *         "#000",
 *         "images/ground.png"
 *     ]
 * }</code>
 */

/**
 * Maps and renders bitmap and/or color tiles from an array
 * @class TileMap
 * @memberOf tile
 */
export default class TileMap extends Sprite {
    constructor (x, y, map, pragma) {
        super(x, y);

        this._map = map;
        this._pragma = pragma;
        this._width = this._pragma.rowLength * this._pragma.width;
        this._height = (this._map.length / this._pragma.rowLength) * this._pragma.height;
        this._images = {};

        for (let path of this._pragma.legend) {
            if (this._keyIsImage(path)) {
                this._images[path] = new Image();
                this._images[path].src = path;
            }
        }
    }

    _keyIsImage (tile) {
        return /\.bmp|\.gif|\.jpg|\.jpeg|\.png/.test(tile);
    }

    render (context, xform) {
        super.render(context, xform);

        let y = 0,
            key,
            tile;

        for (let x = 0, len = this._map.length; x < len; x++) {
            key = this._map[x];
            tile = this._pragma.legend[key];

            if (x === this._pragma.rowLength - 1) {
                y += 1;
            }

            if (this._keyIsImage(tile)) {
                context.drawImage(
                    this._images[tile],
                    // source
                    0, 0,
                    this._pragma.width,
                    this._pragma.height,
                    // physical
                    x * this._pragma.width,
                    y * this._pragma.height,
                    this._pragma.width,
                    this._pragma.height
                );
            } else {
                context.fillStyle = tile;
                context.fillRect(
                    x * this._pragma.width, y * this._pragma.height,
                    this._pragma.width, this._pragma.height
                );
            }
        }
    }
}
