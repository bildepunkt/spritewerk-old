/**
 * @class       Cinemize
 * @description Helpers for keeping the canvas nicely positioned in the viewport
 * @author      Chris Peters
 */
export default class Cinemize {
    /**
     * Keeps canvas element centered and (with aspect ratio intact) in the viewport
     *
     * @param  {Integer} width  The element's original width attribute
     * @param  {Integer} height The element's original height attribute
     * @return {Object}         The new top, left, width, & height
     */
    static fit(width, height) {
        const LANDSCAPE_RATIO = height / width;
        const PORTRAIT_RATIO  = width / height;
        const IS_LANDSCAPE    = LANDSCAPE_RATIO < PORTRAIT_RATIO ? true : false;

        let winWidth = window.innerWidth;
        let winHeight = window.innerHeight;
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
}
