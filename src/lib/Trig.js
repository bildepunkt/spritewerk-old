/**
 * A util for calculating trigonometric equations
 *
 * @class Trig
 */
export default class Trig {
    /**
     * [rotatePoint description]
     * @param  {[type]} originX [description]
     * @param  {[type]} originY [description]
     * @param  {[type]} pointX  [description]
     * @param  {[type]} pointY  [description]
     * @param  {[type]} angle   [description]
     * @return {[type]}         [description]
     */
    static rotatePoint(originX, originY, pointX, pointY, angle) {
        angle = this.getRadiansFromDegrees(angle);

        return {
            x: Math.cos(angle) * (pointX-originX) - Math.sin(angle) * (pointY-originY) + originX,
            y: Math.sin(angle) * (pointX-originX) + Math.cos(angle) * (pointY-originY) + originY
        };
    }

    /**
     * [getRadiansFromDegrees description]
     * @param  {[type]} deg [description]
     * @return {[type]}     [description]
     */
    static getRadiansFromDegrees(deg) {
        return deg * Math.PI / 180;
    }
}
