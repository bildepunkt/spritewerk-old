/**
 * Configuration object
 *
 * @class SW.Config
 * @belongsto SW
 */
SW.Config = {
    /**
     * the width of the game canvas
     * @member {number} SW.Config.prototype.width
     */
    width: 600,
    /**
     * @member {number} SW.Config.prototype.height
     */
    height: 400,
    /**
     * @member {number} SW.Config.prototype.fps
     */
    fps: 60,
    /**
     * @member {boolean} SW.Config.prototype.stretch
     */
    stretch: true,
    /**
     * the loading screen type. options: "progress", "spinner"
     * @member {string} SW.Config.prototype.loader
     */
    loader: 'progress',
    /**
     * @member {boolean} SW.Config.prototype.imageSmoothing
     */
    imageSmoothing: false,
    /**
     * the bg color that fills the remainder of the screen around the canvas
     * @member {string} SW.Config.prototype.backgroundColor
     */
    backgroundColor: '#444',
    /**
     * @member {boolean} SW.Config.prototype.bindMouseInput
     */
    bindMouseInput: true,
    /**
     * @member {boolean} SW.Config.prototype.bindTouchInput
     */
    bindTouchInput: true,
    /**
     * assigned to the title tag of the page
     * @member {string} SW.Config.prototype.title
     */
    title: 'spritewerk game'
};