requestAnimationFrame = function() {
return requestAnimationFrame ||
    webkitRequestAnimationFrame ||
    mozRequestAnimationFrame ||
    msRequestAnimationFrame ||
    oRequestAnimationFrame ||
    function(f) {
        setTimeout(f, 1e3/60);
    };
}();

/**
 * handles the game loop, pause and resume
 *
 * @class Engine
 * @static
 */
define([
    '../lib/radio',
    './config'
], function(radio, config) {
    return {
        /**
         * @member
         */
        _fps:      null,

        /**
         * @member
         */
        _now:      null,

        /**
         * @member
         */
        _then:     null,

        /**
         * @member
         */
        _interval: null,

        /**
         * @member
         */
        _delta:    null,

        /**
         * @member
         */
        _counter:  0,

        /**
         * @member
         */
        _paused:   false,

        /**
         * @member
         */
        init: function() {
            this._fps = config.fps;
            this._interval = 1000 / this._fps;
            this._then = Date.now();
            this._boundUpdate = this._update.bind(this);
        },

        /**
         *
         */
        start: function() {
            this._update();
        },

        /**
         * calculates the proper time - based on fps - to trigger the rAF and new frame
         *
         * @fires newframe - triggers on every frame
         */
        _update: function() {
            if (!this._paused) {
                requestAnimationFrame(this._boundUpdate);
            }
            
            this._now = Date.now();
            this._delta = this._now - this._then;
            
            if (this._delta > this._interval) {
                // trim @then if it's more than @interval
                this._then = this._now - (this._delta % this._interval);
                this._counter += 1;

                radio.broadcast('newframe', {
                    frame: this._counter
                });
            }
        },

        /**
         * Pauses the game by stopping the engine
         */
        pause: function() {
            this._paused = true;
        },

        /**
         * Resumes the game engine
         */
        resume: function() {
            this._paused = false;
            this._update();
        }
    };
});