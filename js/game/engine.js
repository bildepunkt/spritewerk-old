SW.Game.Engine = (function() {

    var Engine = function(options) {
        /**
         * the (desired) amount of times per second the game loop executes
         *
         * @member {Integer} SW.Game.Engine.prototype._fps
         * @private
         */
        this._fps = options.fps;

        /**
         * @member {Integer} SW.Game.Engine.prototype._now
         * @private
         */
        this._now = null;

        /**
         * @member {Integer} SW.Game.Engine.prototype._then
         * @private
         */
        this._then = Date.now();

        /**
         * @member {Integer} SW.Game.Engine.prototype._interval
         * @private
         */
        this._interval = 1000 / this._fps;

        /**
         * @member {Integer} SW.Game.Engine.prototype._delta
         * @private
         */
        this._delta = null;

        /**
         * the amount of frames that have elapsed
         *
         * @member {Integer} SW.Game.Engine.prototype._counter
         * @private
         */
        this._counter = 0;

        /**
         * @member {Boolean} SW.Game.Engine.prototype._paused
         * @private
         */
        this._paused = false;

        /**
         * the update method with the proper scope (for use with rAF)
         *
         * @method SW.Game.Engine.prototype._boundUpdate
         * @private
         */
        this._boundUpdate = this._update.bind(this);
    };

    /**
     * triggers the update function
     *
     * @method SW.Game.Engine.prototype.start
     */
    Engine.prototype.start = function() {
        this._update();
    };

    /**
     * calculates the proper time - based on fps - to trigger the rAF and new frame
     *
     * @fires newframe - triggers on every frame
     * @method SW.Game.Engine.prototype._update
     * @fires SW.Game.Engine#new/frame
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

            radio.broadcast('new/frame', {
                frame: this._counter
            });
        }
    };

    /**
     * Pauses the game by stopping the engine
     *
     * @method SW.Game.Engine.prototype.pause
     */
    Engine.prototype.pause = function() {
        this._paused = true;
    };

    /**
     * Resumes the game engine
     *
     * @method SW.Game.Engine.prototype.resume
     */
    Engine.prototype.resume = function() {
        this._paused = false;
        this._update();
    };
    
    return Engine;
}());