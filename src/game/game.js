SW.Game = (function() {
    'use strict';

    /**
     * unifies required classes for ease of development
     * @class SW.Game
     * @belongsto SW
     */
    var Game = function(options) {
        /**
         * @member {String} SW.Game.prototype._initialSceneName
         * @private
         */
        this._initialSceneName = options.initialSceneName;

        /**
         * @member {SW.Scene} SW.Game.prototype._initialScene
         * @private
         */
        this._initialScene = options.initialScene;

        /**
         * the (desired) amount of times per second the game loop executes
         *
         * @member {Integer} SW.Game.prototype._fps
         * @private
         */
        this._fps = options.fps || 60;

        /**
         * @member {Integer} SW.Game.prototype._now
         * @private
         */
        this._now = null;

        /**
         * @member {Integer} SW.Game.prototype._then
         * @private
         */
        this._then = Date.now();

        /**
         * @member {Integer} SW.Game.prototype._interval
         * @private
         */
        this._interval = 1000 / this._fps;

        /**
         * @member {Integer} SW.Game.prototype._delta
         * @private
         */
        this._delta = null;

        /**
         * the amount of frames that have elapsed
         *
         * @member {Integer} SW.Game.prototype._counter
         * @private
         */
        this._counter = 0;

        /**
         * @member {Boolean} SW.Game.prototype._paused
         * @private
         */
        this._paused = false;

        /**
         * the update method with the proper scope (for use with rAF)
         *
         * @method SW.Game.prototype._boundUpdate
         * @private
         */
        this._boundUpdate = this._update.bind(this);

        this._dom = new SW.Dom({
            title: options.title,
            barsColor: options.barsColor
        });

        this._canvas = new SW.Canvas({
            canvasFit: options.canvasFit,
            id: 'spritewerk'
        });

        this._draw = new SW.Draw({
            canvas: this._canvas.getCanvasEl()
        });

        this._input = new SW.Input({
            eventEl: this._canvas.getCanvasEl(),
            bindMouseInput: true
        });

        window.requestAnimationFrame =
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

        this._boot();
    }

    // use for future reset functionality
    Game.prototype._boot = function() {
        SW.Signal.addListener('scene/activated', this._onInitialSceneActivated, this);

        SW.SceneManager.addScene(this._initialSceneName, this._initialScene);
    };

    Game.prototype._onInitialSceneActivated = function() {
        SW.Signal.removeListener('scene/activated', this._onInitialSceneActivated);
        this.resume();
    };

    /**
     * calculates the proper time - based on fps - to rAF and dispatch new frame events
     *
     * @fires newframe - triggers on every frame
     * @method SW.Game.prototype._update
     * @fires SW.Game#new/frame
     * @private
     */
    Game.prototype._update = function() {
        var self;
        var activeScene;
        var activeLayers;

        if (this._paused) {
            return false;
        }

        this._now = Date.now();
        this._delta = this._now - this._then;
        
        if (this._delta > this._interval) {
            // trim @then if it's more than @interval
            this._then = this._now - (this._delta % this._interval);
            this._counter += 1;

            /**
             * @event SW.Signal#game/update
             * @property {Integer} frame - the current frame count
             */
            SW.Signal.dispatch('game/update', {
                frame: this._counter
            });

            self = this;
            activeScene = SW.SceneManager.getActiveScene();
            activeLayers = activeScene.getLayers();
            this._draw.clearAll();
            this._draw.fillAll(activeScene.getBgColor());
            activeLayers.each(function(layer) {
                layer.each(function(entity) {
                    self._draw.render(entity);
                });
            });
        }

        requestAnimationFrame(this._boundUpdate);
    };

    /**
     * Pauses the game by stopping the engine
     *
     * @method SW.Game.prototype.pause
     */
    Game.prototype.pause = function() {
        this._paused = true;
    };

    /**
     * Resumes the game engine
     *
     * @method SW.Game.prototype.resume
     */
    Game.prototype.resume = function() {
        this._paused = false;
        this._update();
    };
    
    return Game;
}());