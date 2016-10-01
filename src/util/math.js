/**
 * @namespace util/math
 */

/**
 * Convert degrees to radians
 * @memberOf util/math
 * @method degreesToRadians
 * @param  {Integer} deg The degrees to convert
 * @return {Float}
 */
export function degreesToRadians (deg) {
    return deg * Math.PI / 180;
}

/**
 * Convert radians to degrees
 * @memberOf util/math
 * @method radiansToDegrees
 * @param  {Float} rad The radians to convert
 * @return {Integer}
 */
export function radiansToDegrees (rad) {
    return rad * 180 / Math.PI;
}