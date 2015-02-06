var Engine = Protos.extend({
    protosName: 'engine',
    /**
     * @member {int} Engine.fps - the amount of times per second the game loop executes
     * @private
     */
    fps:      null,

    /**
     * @member {int} Engine.now
     * @private
     */
    now:      null,

    /**
     * @member {int} Engine.then
     * @private
     */
    then:     null,

    /**
     * @member {int} Engine.interval
     * @private
     */
    interval: null,

    /**
     * @member {int} Engine.delta
     * @private
     */
    delta:    null,

    /**
     * @member {int} Engine.counter
     * @private
     */
    counter:  0,

    /**
     * @member {boolean} Engine.paused
     * @private
     */
    paused:   false,

    init: function() {
        this.fps = config.fps;
        this.interval = 1000 / this.fps;
        this.then = Date.now();
        this.boundUpdate = this.update.bind(this);
    },

    /**
     * triggers the update function
     *
     * @method Engine.start
     */
    start: function() {
        this.update();
    },

    /**
     * calculates the proper time - based on fps - to trigger the rAF and new frame
     *
     * @fires newframe - triggers on every frame
     * @method Engine.update
     * @private
     */
    update: function() {
        if (!this.paused) {
            requestAnimationFrame(this.boundUpdate);
        }
        
        this.now = Date.now();
        this.delta = this.now - this.then;
        
        if (this.delta > this.interval) {
            // trim @then if it's more than @interval
            this.then = this.now - (this.delta % this.interval);
            this.counter += 1;

            radio.broadcast('newframe', {
                frame: this.counter
            });
        }
    },

    /**
     * Pauses the game by stopping the engine
     *
     * @method Engine.pause
     */
    pause: function() {
        this.paused = true;
    },

    /**
     * Resumes the game engine
     *
     * @method Engine.resume
     */
    resume: function() {
        this.paused = false;
        this.update();
    }
});