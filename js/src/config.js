/**
 * Configuration object
 *
 * @member SW.Config
 * @belongsto SW
 */
SW.Config = {
    /**
     * @member {int} SW.Config.width
     */
    width: 600,
    /**
     * @member {int} SW.Config.height
     */
    height: 400,
    /**
     * @member {int} SW.Config.fps
     */
    fps: 60,
    /**
     * @member {boolean} SW.Config.stretch
     */
    stretch: true,
    /**
     * the loading screen type. options: "progress", "spinner"
     * @member {enum} SW.Config.loader
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