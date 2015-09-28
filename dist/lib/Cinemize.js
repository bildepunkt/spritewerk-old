/**
 * Keeps canvas element centered and (with aspect ratio intact) in the viewport
 *
 * @class Cinemize
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cinemize = (function () {
    function Cinemize() {
        _classCallCheck(this, Cinemize);
    }

    _createClass(Cinemize, null, [{
        key: "fit",

        /**
         * @param  {number}
         * @param  {number}
         * @return {object}
         */
        value: function fit(width, height) {
            var LANDSCAPE_RATIO = height / width;
            var PORTRAIT_RATIO = width / height;
            var IS_LANDSCAPE = LANDSCAPE_RATIO < PORTRAIT_RATIO ? true : false;
            var winWidth = window.innerWidth;
            var winHeight = window.innerHeight;
            var winLandscapeRatio = winHeight / winWidth;
            var winPortraitRatio = winWidth / winHeight;
            var offsetLeft = 0;
            var offsetTop = 0;
            var offsetWidth = undefined;
            var offsetHeight = undefined;

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
    }]);

    return Cinemize;
})();

exports["default"] = Cinemize;
module.exports = exports["default"];