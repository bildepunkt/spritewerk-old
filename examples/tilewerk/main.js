import Camera from "../src/Camera";
import Group from "../src/Group";
import Scene from "../src/Scene";
import Sprite from "../src/Sprite";
import Viewport from "../src/Viewport";

/**
 * @class Pragma
 * @property {Integer} rowLength - The length of the "rows" in the array. Needed because not using matrices for perf reasons.
 * @property {Integer} width - The tile width
 * @property {Integer} height - The tile height
 * @property {Array} legend - The various asset paths or colors to render.The index corresponds to the tilemap's values.
 *                          `null` values will result in an empty/transparent tile.
 */
class Pragma {
    constructor (rowLength, width, height, legend) {
        this.rowLength = rowLength;
        this.width = width;
        this.height = height;
        this.legend = legend;
    }
}

/**
 * Maps and renders bitmap and/or color tiles from an array
 * @class TileMap
 */
let defaults = {
    dev: true
};

class TileMap extends Sprite {
    /**
     * @param {Number} x - The x position
     * @param {Number} y - The y position
     * @param {Object} maps - An object of arrays with indices mapped to values
     * @param {String} currentMap - The name of the current map
     * @param {Pragma} pragma - The pragma for parsing the map
     * @param {Object} options - General options
     */
    constructor (x, y, maps, pragma, currentMap="default", options=defaults) {
        super(x, y);

        this.maps = maps;
        this.pragma = pragma;
        this.currentMap = currentMap;
        this.options = options;
        
        let map = this.maps[this.currentMap];

        this.width = this.pragma.rowLength * this.pragma.width;
        this.height = (map.length / this.pragma.rowLength) * this.pragma.height;
    }

    render (context) {
        super.render(context);
        
        let map = this.maps[this.currentMap];
        let x = 0;
        let y = 0;

        for (let i = 0, len = map.length; i < len; i++) {
            let key = map[i];
            let tile = this.pragma.legend[key];
            let opacity = context.globalAlpha;

            if (x === this.pragma.rowLength) {
                x = 0;
                y += 1;
            }
            
            if (tile === undefined) {
                if (key === null) { // index purposefully blank
                    context.globalAlpha = 0;
                } else {
                    if (this.options.dev) {
                        console.warn(`Pragma.legend index \`${key}\` does not exist`);
                    }
                }
            } else {
                context.fillStyle = tile;
                context.fillRect(
                    x * this.pragma.width, y * this.pragma.height,
                    this.pragma.width, this.pragma.height
                );
            }

            x += 1;
            context.globalAlpha = opacity;
        }
    }
}

(() => {
    let viewport = new Viewport(512, 512);
    let camera = new Camera(0, 0, 512, 512);
    let scene = new Scene(viewport.canvas, camera);
    let group = new Group();
    let tile = new TileMap(256, 256, {
        default: [
            0, 1, 0, 1,
            1, 0, 1, 0,
            0, 1, 0, 1,
            1, 0, 1, null
        ]
    }, new Pragma(4, 32, 32, [
        "#DDD",
        "#EEE"
    ]));

    group.collection.add(tile);
    group.collection.add(new Group());
    group.sprite.opacity = 0.6;
    
    //camera.x = 64;
    //camera.rotation = 45;
    camera.zoom = 2;
    
    scene.startRender(group);
}).call(this);
