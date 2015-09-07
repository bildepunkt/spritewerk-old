/**
 * Keeps canvas element centered and (with aspect ratio intact) in the viewport
 *
 * @class Cinemize
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cinemize = (function () {
    function Cinemize() {
        _classCallCheck(this, Cinemize);
    }

    _createClass(Cinemize, null, [{
        key: "fit",

        /**
         *
         */
        value: function fit(el) {
            if (!el.height && !el.height) {
                false;
            }

            var LANDSCAPE_RATIO = el.height / el.width;
            var PORTRAIT_RATIO = el.width / el.height;
            var IS_LANDSCAPE = LANDSCAPE_RATIO < PORTRAIT_RATIO ? true : false;
            var winWidth = window.innerWidth;
            var winHeight = window.innerHeight;
            var winLandscapeRatio = winHeight / winWidth;
            var winPortraitRatio = winWidth / winHeight;
            var elWidth = undefined;
            var elHeight = undefined;

            this._offsetLeft = 0;
            this._offsetTop = 0;

            if (IS_LANDSCAPE) {
                if (LANDSCAPE_RATIO < winLandscapeRatio) {
                    elWidth = winWidth;
                    elHeight = elWidth * LANDSCAPE_RATIO;
                    this._offsetTop = (winHeight - elHeight) / 2;
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
                    this._offsetTop = (winHeight - elHeight) / 2;
                }
            }

            el.style.width = Math.round(elWidth) + "px";
            el.style.height = Math.round(elHeight) + "px";
            el.style.left = Math.round(this._offsetLeft) + "px";
            el.style.top = Math.round(this._offsetTop) + "px";
        }

        /**
         *
         */
    }, {
        key: "getOffsetLeft",
        value: function getOffsetLeft() {
            return this._offsetLeft;
        }

        /**
         *
         */
    }, {
        key: "getOffsetTop",
        value: function getOffsetTop() {
            return this._offsetTop;
        }
    }]);

    return Cinemize;
})();

module.exports = Cinemize;