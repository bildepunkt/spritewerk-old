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
         * @member {int} Engine._fps - the amount of times per second the game loop executes
         * @private
         */
        _fps:      null,

        /**
         * @member {int} Engine._now
         * @private
         */
        _now:      null,

        /**
         * @member {int} Engine._then
         * @private
         */
        _then:     null,

        /**
         * @member {int} Engine._interval
         * @private
         */
        _interval: null,

        /**
         * @member {int} Engine._delta
         * @private
         */
        _delta:    null,

        /**
         * @member {int} Engine._counter
         * @private
         */
        _counter:  0,

        /**
         * @member {boolean} Engine._paused
         * @private
         */
        _paused:   false,

        init: function() {
            this._fps = config.fps;
            this._interval = 1000 / this._fps;
            this._then = Date.now();
            this._boundUpdate = this._update.bind(this);
        },

        /**
         * triggers the update function
         *
         * @method Engine.start
         */
        start: function() {
            this._update();
        },

        /**
         * calculates the proper time - based on fps - to trigger the rAF and new frame
         *
         * @fires newframe - triggers on every frame
         * @method Engine._update
         * @private
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
         *
         * @method Engine.pause
         */
        pause: function() {
            this._paused = true;
        },

        /**
         * Resumes the game engine
         *
         * @method Engine.resume
         */
        resume: function() {
            this._paused = false;
            this._update();
        }
    };
});