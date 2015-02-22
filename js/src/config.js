/**
 * Configuration object
 *
 * @prop SW.Config
 * @belongsto SW
 */
SW.Config = {
    /**
     * @property {number} SW.Config.width
     */
    width: 600,
    /**
     * @prop {number} SW.Config.height
     */
    height: 400,
    /**
     * @member {number} SW.Config.fps
     */
    fps: 60,
    /**
     * @member {boolean} SW.Config.stretch
     */
    stretch: true,
    /**
     * the loading screen type. options: "progress", "spinner"
     * @member {string} SW.Config.loader
     */
    loader: 'progress',
    /**
     * @member {boolean} SW.Config.imageSmoothing
     */
    imageSmoothing: false,
    /**
     * the bg color that fills the remainder of the screen around the canvas
     * @member {string} SW.Config.backgroundColor
     */
    backgroundColor: '#444',
    /**
     * @member {boolean} SW.Config.bindMouseInput
     */
    bindMouseInput: true,
    /**
     * @member {boolean} SW.Config.bindTouchInput
     */
    bindTouchInput: true,
    /**
     * assigned to the title tag of the page
     * @member {string} SW.Config.title
     */
    title: 'spritewerk game'
};