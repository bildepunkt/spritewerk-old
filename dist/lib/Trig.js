/**
 * A util for calculating trigonometric equations
 *
 * @class Trig
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Trig = (function () {
    function Trig() {
        _classCallCheck(this, Trig);
    }

    _createClass(Trig, null, [{
        key: "rotatePoint",

        /**
         * [rotatePoint description]
         * @param  {[type]} originX [description]
         * @param  {[type]} originY [description]
         * @param  {[type]} pointX  [description]
         * @param  {[type]} pointY  [description]
         * @param  {[type]} angle   [description]
         * @return {[type]}         [description]
         */
        value: function rotatePoint(originX, originY, pointX, pointY, angle) {
            angle = this.getRadiansFromDegrees(angle);

            return {
                x: Math.cos(angle) * (pointX - originX) - Math.sin(angle) * (pointY - originY) + originX,
                y: Math.sin(angle) * (pointX - originX) + Math.cos(angle) * (pointY - originY) + originY
            };
        }

        /**
         * [getRadiansFromDegrees description]
         * @param  {[type]} deg [description]
         * @return {[type]}     [description]
         */
    }, {
        key: "getRadiansFromDegrees",
        value: function getRadiansFromDegrees(deg) {
            return deg * Math.PI / 180;
        }
    }]);

    return Trig;
})();

exports["default"] = Trig;
module.exports = exports["default"];