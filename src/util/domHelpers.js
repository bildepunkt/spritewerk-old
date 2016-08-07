import { isNumeric } from "./";

/**
 * loops through style object and applies values. Adds "px" to numeric values.
 * @memberOf util
 * @method applyStyles
 * @param {HTMLElement} el     The element to apply styles to
 * @param {Object}      styles The key/value pair styles
 */
export function applyStyles (el, styles) {
    for (let key in styles) {
        let val = styles[key];
        
        el.style[key] = isNumeric(val) ? `${val}px` : val;
    }
}

/**
 * Returns position & dimensions for a DOM element to fit in the viewport while maintaining aspect ratio
 * @memberOf util
 * @method fitToWindow
 * @param  {Integer} elWidth   The element's original width
 * @param  {Integer} elHeight  The element's original height
 * @param  {Integer} winWidth  The window's current width
 * @param  {Integer} winHeight The window's current height
 * @return {Object}            The calculated left, top, width, height
 */
export function fitToWindow (elWidth, elHeight, winWidth, winHeight) {
    const LANDSCAPE_RATIO = elHeight / elWidth;
    const PORTRAIT_RATIO  = elWidth / elHeight;
    const IS_LANDSCAPE    = LANDSCAPE_RATIO < PORTRAIT_RATIO ? true : false;
    let winLandscapeRatio = winHeight / winWidth;
    let winPortraitRatio  = winWidth / winHeight;
    let offsetLeft = 0;
    let offsetTop  = 0;
    let offsetWidth;
    let offsetHeight;

    if (IS_LANDSCAPE) {
        if (LANDSCAPE_RATIO < winLandscapeRatio) {
            offsetWidth = winWidth;
            offsetHeight = offsetWidth * LANDSCAPE_RATIO;
            offsetTop = (winHeight - offsetHeight) / 2;
        } else {
            offsetHeight = winHeight;
            offsetWidth = winHeight * PORTRAIT_RATIO;
            offsetLeft = (winWidth - offsetWidth) / 2;
        }
    } else {
        if (PORTRAIT_RATIO < winPortraitRatio) {
            offsetHeight = winHeight;
            offsetWidth = winHeight * PORTRAIT_RATIO;
            offsetLeft = (winWidth - offsetWidth) / 2;
        } else {
            offsetWidth = winWidth;
            offsetHeight = offsetWidth * LANDSCAPE_RATIO;
            offsetTop = (winHeight - offsetHeight) / 2;
        }
    }

    return {
        width: offsetWidth,
        height: offsetHeight,
        left: offsetLeft,
        top: offsetTop
    };
}
