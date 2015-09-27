/**
 * Provides configuration properties used by many other classes
 *
 * @class Config
 * @param {object} [options]
 */
export default class Config {
    /**
     * [constructor description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    constructor(options) {
        this.gameWidth = 800;
        this.gameHeight = 600;

        for(let option in options) {
            this[option] = options[option];
        }
    }
}
