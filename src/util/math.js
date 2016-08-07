/**
 * Convert degrees to radians
 * @memberOf util
 * @method degreesToRadians
 * @param  {Integer} deg The degrees to convert
 * @return {Integer}
 */
export function degreesToRadians (deg) {
    return deg * Math.PI / 180;
}

/**
 * Convert radians to degrees
 * @memberOf util
 * @method radiansToDegrees
 * @param  {Integer} rad The radians to convert
 * @return {Integer}
 */
export function radiansToDegrees (rad) {
    return rad * 180 / Math.PI;
}
