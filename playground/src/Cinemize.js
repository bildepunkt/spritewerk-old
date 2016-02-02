/**
 * @class       Cinemize
 * @description Helpers for keeping the canvas nicely positioned in the viewport
 * @author      Chris Peters
 */
export default class Cinemize {
    /**
     * Maximizes canvas (with aspect ratio intact) in the viewport via CSS.
     *
     * @param  {Integer} width          The element's original width attribute
     * @param  {Integer} height         The element's original height attribute
     * @param  {Integer} viewportWidth  The viewport's current width
     * @param  {Integer} viewportHeight The viewport's current height
     * @return {Object}                 The new top, left, width, & height
     */
    static fit(width, height, viewportWidth, viewportHeight) {
        const LANDSCAPE_RATIO = height / width;
        const PORTRAIT_RATIO  = width / height;
        const IS_LANDSCAPE    = LANDSCAPE_RATIO < PORTRAIT_RATIO ? true : false;

        let winLandscapeRatio = viewportHeight / viewportWidth;
        let winPortraitRatio  = viewportWidth / viewportHeight;
        let offsetLeft = 0;
        let offsetTop  = 0;
        let offsetWidth;
        let offsetHeight;

        if (IS_LANDSCAPE) {
            if (LANDSCAPE_RATIO < winLandscapeRatio) {
                offsetWidth = viewportWidth;
                offsetHeight = offsetWidth * LANDSCAPE_RATIO;
                offsetTop = (viewportHeight - offsetHeight) / 2;
            } else {
                offsetHeight = viewportHeight;
                offsetWidth = viewportHeight * PORTRAIT_RATIO;
                offsetLeft = (viewportWidth - offsetWidth) / 2;
            }
        } else {
            if (PORTRAIT_RATIO < winPortraitRatio) {
                offsetHeight = viewportHeight;
                offsetWidth = viewportHeight * PORTRAIT_RATIO;
                offsetLeft = (viewportWidth - offsetWidth) / 2;
            } else {
                offsetWidth = viewportWidth;
                offsetHeight = offsetWidth * LANDSCAPE_RATIO;
                offsetTop = (viewportHeight - offsetHeight) / 2;
            }
        }

        return {
            width: offsetWidth,
            height: offsetHeight,
            left: offsetLeft,
            top: offsetTop
        };
    }

    /**
     * Keeps canvas element centered in the viewport
     *
     * @param  {Integer} width          The element's original width attribute
     * @param  {Integer} height         The element's original height attribute
     * @param  {Integer} viewportWidth  The viewport's current width
     * @param  {Integer} viewportHeight The viewport's current height
     * @return {Object}                 The top and left
     */
    static center(width, height, viewportWidth, viewportHeight) {
        return {
            left: (viewportWidth - width) / 2,
            top: (viewportHeight - height) / 2
        };
    }
}
