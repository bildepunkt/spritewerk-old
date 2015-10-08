/**
 * @class
 */
import MathPlus from './MathPlus';

export default class DebugRenderer {
    constructor(deps) {
        this._deps = deps;

        this._context = this._deps.viewport.getContext();

        this._displaySize = 12;
        this._items = [];
    }

    _getRandRGB() {
        return {
            r: MathPlus.clamp(Math.round(Math.random() * 255), 64, 191),
            g: MathPlus.clamp(Math.round(Math.random() * 255), 64, 191),
            b: MathPlus.clamp(Math.round(Math.random() * 255), 64, 191)
        };
    }

    watch(list) {
        for(let item of list) {
            let rgb = this._getRandRGB();

            this._items.push({
                name: item.name,
                entity: item.entity,
                rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
            });
        }
    }

    render() {
        let size = this._displaySize;

        for(let item of this._items) {
            let x = item.entity.getGlobalX();
            let y = item.entity.getGlobalY();
            let rotation = item.entity.getRotation();

            this._context.save();

            if (rotation) {
                this._context.translate(x, y);
                this._context.rotate(rotation * Math.PI / 180);

                x = 0;
                y = 0;
            }

            this._context.strokeStyle = item.rgb;
            this._context.fillStyle = item.rgb;

            let crosshair = new Path2D();
            crosshair.moveTo(x, y - size / 2);
            crosshair.lineTo(x, y + size / 2);
            crosshair.moveTo(x - size / 2, y);
            crosshair.lineTo(x + size / 2, y);
            crosshair.closePath();
            this._context.stroke(crosshair);

            this._context.fillText(item.name, x + size, y + size);
            this._context.restore();
        }
    }
}