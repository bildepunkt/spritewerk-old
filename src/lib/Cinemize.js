/**
 * Keeps canvas element centered and (with aspect ratio intact) in the viewport
 *
 * @class Cinemize
 */
export default class Cinemize {
    /**
     * @param  {number}
     * @param  {number}
     * @return {object}
     */
    static fit(width, height) {
        let LANDSCAPE_RATIO = height / width;
        let PORTRAIT_RATIO  = width / height;
        let IS_LANDSCAPE    = LANDSCAPE_RATIO < PORTRAIT_RATIO ? true : false;
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
