import { degToRad } from "./util/math";

/**
 * @class Xform
 */
export default class Xform {
    constructor () {
        this.matrix = this.getIdentity();
    }

    clone () {
        let m = this.matrix;
        return [m[0], m[1], m[2], m[3], m[4], m[5]];
    }

    getIdentity () {
        return [1, 0, 0, 1, 0, 0];
    }

    getMatrix () {
        return this.matrix;
    }

    rotate (deg) {
        var rad = degToRad(deg);
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        var m11 = this.matrix[0] * c + this.matrix[2] * s;
        var m12 = this.matrix[1] * c + this.matrix[3] * s;
        var m21 = this.matrix[0] * -s + this.matrix[2] * c;
        var m22 = this.matrix[1] * -s + this.matrix[3] * c;
        this.matrix[0] = m11;
        this.matrix[1] = m12;
        this.matrix[2] = m21;
        this.matrix[3] = m22;
    }

    scale (sx, sy) {
        this.matrix[0] *= sx;
        this.matrix[1] *= sx;
        this.matrix[2] *= sy;
        this.matrix[3] *= sy;
    }

    setMatrix (matrix) {
        this.matrix = matrix;
    }

    translate (x, y) {
        this.matrix[4] += this.matrix[0] * x + this.matrix[2] * y;
        this.matrix[5] += this.matrix[1] * x + this.matrix[3] * y;
    }
}
