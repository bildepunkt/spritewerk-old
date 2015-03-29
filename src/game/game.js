SW.Game = (function() {
   'use strict';

   /**
    * @class SW.Game
    * @listens window#load
    * @listens SW.Signal#scene/activated
    * @belongsto SW
    */
   var Game = function(initialSceneName, InitialScene, options) {
        options = options || {};

        /**
         * @member {String} SW.Game.prototype._initialSceneName
         * @private
         */
        this._initialSceneName = initialSceneName;
        /**
         * @member {SW.Scene} SW.Game.prototype._InitialScene
         * @private
         */
        this._InitialScene = InitialScene;

        /**
         * @member {String} SW.Game.prototype._canvasId
         * @private
         */
        this._canvasId = options.canvasId;
        /**
         * @member {Integer} SW.Game.prototype._width
         * @private
         */
        this._width = options.width || 600;
        /**new
         * @member {Integer} SW.Game.prototype._height
         * @private
         */
        this._height = options.height || 400;
        /**
         * @member {Boolean} SW.Game.prototype._bindMouseInput
         * @private
         */
        this._bindMouseInput = options.bindMouseInput || true;
        /**
         * @member {Boolean} SW.Game.prototype._bindTouchInput
         * @private
         */
        this._bindTouchInput = options.bindTouchInput || true;
        /**
         * @member {Boolean} SW.Game.prototype._title
         * @private
         */
        this._title = options.title || 'spritewerk game';
        /**
         * @member {Boolean} SW.Game.prototype._fps
         * @private
         */
        this._fps = options.fps || 60;
        /**
         * @member {Boolean} SW.Game.prototype._canvasFit
         * @private
         */
        this._canvasFit = options.canvasFit || false;

        /**
         * @member {SW.Canvas} SW.Game.prototype.canvas
         */
        this.canvas = null;
        /**
         * @member {SW.Input} SW.Game.prototype.input
         */
        this.input = null;
        /**
         * @member {SW.Engine} SW.Game.prototype.engine
         */
        this.engine = null;

        SW.Signal.addListener(window, 'load', this._onReady, this);
        SW.Signal.addListener('scene/activated', this._onSceneActivated, this);
        SW.Signal.addListener('new/frame', this._onNewFrame, this);
    };

    /**
     *
     */
    Game.prototype._onNewFrame = function() {
        var self = this;
        var activeScene = SW.SceneManager.activeScene();

        this.canvas.clearAll().fillAll(activeScene.bgColor());

        activeScene.each(function(layer) {
            layer.each(function(entity) {
                self.canvas.render(entity);
            });
        });
    };

    /**
     * @method SW.Game.prototype._onReady
     * @requires SW.Dom
     * @requires SW.Canvas
     * @requires SW.Input
     * @requires SW.Engine

     * @fires SW.Signal#spritewerk/ready
     */
    Game.prototype._onReady = function() {
        SW.dom = new SW.Dom({
            title: this._title
        });

        SW.canvas = new SW.Canvas({
            id: this._canvasId,
            width: this._width,
            height: this._height,
            canvasFit: this._canvasFit
        });

        SW.input = new SW.Input({
            eventEl: this.canvas.getCanvasEl(),
            bindMouseInput: this._bindMouseInput,
            bindTouchInput: this._bindTouchInput,
            canvasFit: this._canvasFit
        });

        SW.engine = new SW.Engine({
            fps: this._fps
        });

        SW.SceneManager.addScene(this._initialSceneName, this._InitialScene);

        /**
         * @event SW.Signal#spritewerk/ready
         */
        SW.Signal.dispatch('spritewerk/ready');
    };

    Game.prototype._onSceneActivated = function(e) {
        if (!this.engineStarted) {
            this.engine.start();
        }

        this.input.setScene(e.detail.scene);
    };

    return Game;
}());