/**
 * @class Config
 * @static
 */
define([], {
    /**
     *
     */
    fps: 60,

    /**
     *
     */
    width: 960,

    /**
     *
     */
    height: 600,

    /**
     *
     */
    bindMouseInput: true,

    /**
     *
     */
    bindTouchInput: false,

    /**
     *
     */
    bindMousemove: false,

    /**
     *
     */
    backgroundColor: '#444',

    /**
     *
     */
    title: 'spritewerk game',

    init: function() {
        this.uglyName = this.title.replace(/[^a-zA-Z0-9]/g, '_');
    }
});