SW.Engine = (function() {
    'use strict';

    /**
     * runs the game loop
     * @class SW.Engine
     * @belongsto SW
     */
    var Engine = function(options) {
        /**
         * the (desired) amount of times per second the game loop executes
         *
         * @member {Integer} SW.Engine.prototype._fps
         * @private
         */
        this._fps = options.fps;

        /**
         * @member {Integer} SW.Engine.prototype._now
         * @private
         */
        this._now = null;

        /**
         * @member {Integer} SW.Engine.prototype._then
         * @private
         */
        this._then = Date.now();

        /**
         * @member {Integer} SW.Engine.prototype._interval
         * @private
         */
        this._interval = 1000 / this._fps;

        /**
         * @member {Integer} SW.Engine.prototype._delta
         * @private
         */
        this._delta = null;

        /**
         * the amount of frames that have elapsed
         *
         * @member {Integer} SW.Engine.prototype._counter
         * @private
         */
        this._counter = 0;

        /**
         * @member {Boolean} SW.Engine.prototype._paused
         * @private
         */
        this._paused = false;

        /**
         * the update method with the proper scope (for use with rAF)
         *
         * @method SW.Engine.prototype._boundUpdate
         * @private
         */
        this._boundUpdate = this._update.bind(this);
    };

    /**
     * triggers the update function
     *
     * @method SW.Engine.prototype.start
     */
    Engine.prototype.start = function() {
        requestAnimationFrame =
            requestAnimationFrame       ||
            webkitRequestAnimationFrame ||
            mozRequestAnimationFrame    ||
            oRequestAnimationFrame      ||
            msRequestAnimationFrame     ||
            function(fn) {
                setTimeout(function() {
                    fn();
                }, this._interval);
            };

        this._update();
    };

    /**
     * calculates the proper time - based on fps - to rAF and dispatch new frame events
     *
     * @fires newframe - triggers on every frame
     * @method SW.Engine.prototype._update
     * @fires SW.Engine#new/frame
     * @private
     */
    Engine.prototype._update = function() {
        if (!this._paused) {
            requestAnimationFrame(this._boundUpdate);
        }
        
        this._now = Date.now();
        this._delta = this._now - this._then;
        
        if (this._delta > this._interval) {
            // trim @then if it's more than @interval
            this._then = this._now - (this._delta % this._interval);
            this._counter += 1;

            /**
             * @event SW.Signal#new/frame
             * @property {Integer} frame - the current frame count
             */
            SW.Signal.dispatch('new/frame', {
                frame: this._counter
            });
        }
    };

    /**
     * Pauses the game by stopping the engine
     *
     * @method SW.Engine.prototype.pause
     */
    Engine.prototype.pause = function() {
        this._paused = true;
    };

    /**
     * Resumes the game engine
     *
     * @method SW.Engine.prototype.resume
     */
    Engine.prototype.resume = function() {
        this._paused = false;
        this._update();
    };
    
    return Engine;
}());