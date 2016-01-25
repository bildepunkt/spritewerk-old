/**
 * @class       CanvasTransform
 * @description Retains canvas transformation stack.
 *              Basically a fork from Simon Sarris - www.simonsarris.com - sarris@acm.org
 * @author      Chris Peters
 */
export default class CanvasTransform {
    /**
     * @param  {Object} context The canvas' context object
     */
    constructor(context) {
        this.context = context;
        this.matrix = [1,0,0,1,0,0]; //initialize with the identity matrix
        this.stack = [];
    }

    setContext(context) {
        this.context = context;
    }

    getMatrix() {
        return this.matrix;
    }

    setMatrix(m) {
        this.matrix = [m[0],m[1],m[2],m[3],m[4],m[5]];
        this.setTransform();
    }

    cloneMatrix(m) {
        return [m[0],m[1],m[2],m[3],m[4],m[5]];
    }

    //==========================================
    // Stack
    //==========================================
    save() {
        let matrix = this.cloneMatrix(this.getMatrix());
        this.stack.push(matrix);

        this.context.save();
    }

    restore() {
        if (this.stack.length > 0) {
            let matrix = this.stack.pop();
            this.setMatrix(matrix);
        }

        this.context.restore();
    }

    //==========================================
    // Matrix
    //==========================================
    setTransform() {
        if (this.context) {
            this.context.setTransform(
                this.matrix[0],
                this.matrix[1],
                this.matrix[2],
                this.matrix[3],
                this.matrix[4],
                this.matrix[5]
            );
        }
    }

    translate(x, y) {
        this.matrix[4] += this.matrix[0] * x + this.matrix[2] * y;
        this.matrix[5] += this.matrix[1] * x + this.matrix[3] * y;

        this.setTransform();
    }

    rotate(rad) {
        let c = Math.cos(rad);
        let s = Math.sin(rad);
        let m11 = this.matrix[0] * c + this.matrix[2] * s;
        let m12 = this.matrix[1] * c + this.matrix[3] * s;
        let m21 = this.matrix[0] * -s + this.matrix[2] * c;
        let m22 = this.matrix[1] * -s + this.matrix[3] * c;
        this.matrix[0] = m11;
        this.matrix[1] = m12;
        this.matrix[2] = m21;
        this.matrix[3] = m22;

        this.setTransform();
    }

    scale(sx, sy) {
        this.matrix[0] *= sx;
        this.matrix[1] *= sx;
        this.matrix[2] *= sy;
        this.matrix[3] *= sy;

        this.setTransform();
    }

    //==========================================
    // Matrix extensions
    //==========================================
    rotateDegrees(deg) {
        let rad = deg * Math.PI / 180;
        this.rotate(rad);
    }

    rotateAbout(rad, x, y) {
        this.translate(x, y);
        this.rotate(rad);
        this.translate(-x, -y);
        this.setTransform();
    }

    rotateDegreesAbout(deg, x, y) {
        this.translate(x, y);
        this.rotateDegrees(deg);
        this.translate(-x, -y);
        this.setTransform();
    }

    identity() {
        this.m = [1,0,0,1,0,0];
        this.setTransform();
    }

    multiply(matrix) {
        let m11 = this.matrix[0] * matrix.m[0] + this.matrix[2] * matrix.m[1];
        let m12 = this.matrix[1] * matrix.m[0] + this.matrix[3] * matrix.m[1];

        let m21 = this.matrix[0] * matrix.m[2] + this.matrix[2] * matrix.m[3];
        let m22 = this.matrix[1] * matrix.m[2] + this.matrix[3] * matrix.m[3];

        let dx = this.matrix[0] * matrix.m[4] + this.matrix[2] * matrix.m[5] + this.matrix[4];
        let dy = this.matrix[1] * matrix.m[4] + this.matrix[3] * matrix.m[5] + this.matrix[5];

        this.matrix[0] = m11;
        this.matrix[1] = m12;
        this.matrix[2] = m21;
        this.matrix[3] = m22;
        this.matrix[4] = dx;
        this.matrix[5] = dy;
        this.setTransform();
    }

    invert() {
        let d = 1 / (this.matrix[0] * this.matrix[3] - this.matrix[1] * this.matrix[2]);
        let m0 = this.matrix[3] * d;
        let m1 = -this.matrix[1] * d;
        let m2 = -this.matrix[2] * d;
        let m3 = this.matrix[0] * d;
        let m4 = d * (this.matrix[2] * this.matrix[5] - this.matrix[3] * this.matrix[4]);
        let m5 = d * (this.matrix[1] * this.matrix[4] - this.matrix[0] * this.matrix[5]);
        this.matrix[0] = m0;
        this.matrix[1] = m1;
        this.matrix[2] = m2;
        this.matrix[3] = m3;
        this.matrix[4] = m4;
        this.matrix[5] = m5;
        this.setTransform();
    }

    //==========================================
    // Helpers
    //==========================================
    transformPoint(x, y) {
        return {
            x: x * this.matrix[0] + y * this.matrix[2] + this.matrix[4],
            y: x * this.matrix[1] + y * this.matrix[3] + this.matrix[5]
        };
    }
}