/**
 * @class ContextXform
 * @param {Object} context The canvas 2d context
 * @param {Xform} xform
 */
export default class ContextXform {
    constructor (context, xform) {
        this.context = context;
        this.xform = xform;
        this.stack = [];
    }

    getStack () {
        return this.stack;
    }

    restore () {
        if (this.stack.length) {
            let matrix = this.stack.pop();
            this.xform.setMatrix(matrix);
        }

        this.context.restore();
    }

    rotate (degrees) {
        this.xform.rotate(degrees);
        this.setTransform();
    }

    save () {
        this.stack.push(this.xform.clone());
        this.context.save();
    }

    scale (sx, sy) {
        this.xform.scale(sx, sy);
        this.setTransform();
    }

    setTransform () {
        let m = this.xform.getMatrix();
        this.context.setTransform( m[0], m[1], m[2], m[3], m[4], m[5] );
    }

    translate (x, y) {
        this.xform.translate(x, y);
        this.setTransform();
    }
}
