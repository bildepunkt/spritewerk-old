/**
 * Provides configuration properties
 *
 * @class Config
 * @param {object} [options]
 */
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config =
/**
 *
 */
function Config(options) {
    _classCallCheck(this, Config);

    options = options || {};

    var defaults = {
        fps: 30,
        width: 800,
        height: 600
    };

    for (var key in defaults) {
        this[key] = options[key] || defaults[key];
    }
};

module.exports = Config;