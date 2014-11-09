/**
 * @class Config
 * @static
 */
define([], {
    /**
     * @member {int} Config.fps - the frame rate
     */
    fps: 60,

    /**
     * @member {int} Config.width - the width of the canvas
     */
    width: 960,

    /**
     * @member {int} Config.height - the height of the canvas
     */
    height: 600,

    /**
     * @member {boolean} Config.bindMouseInput - set to true if using mouse-enabled devices
     */
    bindMouseInput: true,

    /**
     * @member {boolean} Config.bindTouchInput - set to true if using touch-enabled devices
     */
    bindTouchInput: false,

    /**
     * @member {boolean} Config.bindMouseMove - determines if mousemove event is bound (set to false if not using the event to save cycles)
     */
    bindMousemove: false,

    /**
     * @member {int} Config.backgroundColor - the bg color applied the body
     */
    backgroundColor: '#444',

    /**
     * @member {string} Config.title - the game title (used for dom title tag)
     */
    title: 'spritewerk game',

    /**
     * @member {string} Config.uglyTitle - used for naming stuff
     */
    uglytitle: '',

    init: function() {
        this.uglyTitle = this.title.replace(/[^a-zA-Z0-9]/g, '_');
    }
});