/**
 * Provides configuration properties used by many other classes
 *
 * @class Config
 * @param {object} [options]
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config =
/**
 * [constructor description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
function Config(options) {
    _classCallCheck(this, Config);

    this.gameWidth = 800;
    this.gameHeight = 600;

    for (var option in options) {
        this[option] = options[option];
    }
};

exports["default"] = Config;
module.exports = exports["default"];