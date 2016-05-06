/**
 * @memberOf util
 * @method applyStyles
 * @param {HTMLElement} el     The element to apply styles to
 * @param {Object}      styles The key/value pair styles
 */
export const applyStyles = (el, styles) => {
    for (let key in styles) {
        el.style[key] = styles[key];
    }
}