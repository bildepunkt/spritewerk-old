/**
 * Keeps canvas element centered and (with aspect ratio intact) in the viewport
 *
 * @class Cinemize
 */
class Cinemize {
    /**
     *
     */
    static fit(el) {
        if (! el.height && ! el.height) {
            false;
        }

        let LANDSCAPE_RATIO = el.height / el.width;
        let PORTRAIT_RATIO  = el.width / el.height;
        let IS_LANDSCAPE    = LANDSCAPE_RATIO < PORTRAIT_RATIO ? true : false;
        let winWidth = window.innerWidth;
        let winHeight = window.innerHeight;
        let winLandscapeRatio = winHeight / winWidth;
        let winPortraitRatio  = winWidth / winHeight;
        let elWidth;
        let elHeight;

        this._offsetLeft = 0;
        this._offsetTop  = 0;

        if (IS_LANDSCAPE) {
            if (LANDSCAPE_RATIO < winLandscapeRatio) {
                elWidth = winWidth;
                elHeight = elWidth * LANDSCAPE_RATIO;
                this._offsetTop  = (winHeight - elHeight) / 2;
            } else {
                elHeight = winHeight;
                elWidth = winHeight * PORTRAIT_RATIO;
                this._offsetLeft = (winWidth - elWidth) / 2;
            }
        } else {
            if (PORTRAIT_RATIO < winPortraitRatio) {
                elHeight = winHeight;
                elWidth = winHeight * PORTRAIT_RATIO;
                this._offsetLeft = (winWidth - elWidth) / 2;
            } else {
                elWidth = winWidth;
                elHeight = elWidth * LANDSCAPE_RATIO;
                this._offsetTop  = (winHeight - elHeight) / 2;
            }
        }

        el.style.width  = `${Math.round(elWidth)}px`;
        el.style.height = `${Math.round(elHeight)}px`;
        el.style.left   = `${Math.round(this._offsetLeft)}px`;
        el.style.top    = `${Math.round(this._offsetTop)}px`;
    }

    /**
     *
     */
    static getOffsetLeft() {
        return this._offsetLeft;
    }

    /**
     *
     */
    static getOffsetTop() {
        return this._offsetTop;
    }
}

module.exports = Cinemize;
