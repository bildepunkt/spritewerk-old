/**
 * Provides configuration properties
 *
 * @class Config
 * @param {object} [options]
 */
class Config {
    /**
     *
     */
    constructor(options) {
        options = options || {};
        
        let defaults = {
            fps: 30,
            width: 800,
            height: 600
        };

        for(let key in defaults) {
            this[key] = options[key] || defaults[key];
        }
    }
}

module.exports = Config;
