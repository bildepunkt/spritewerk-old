/**
 * @namespace util
 */

/**
 * Determine if an imput is numeric or not
 * @method isNumeric
 * @memberOf util
 * @param  {Any} n A value to evaluate
 * @return {Boolean}
 */
const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

export {
    isNumeric
};