SW.Game.Game = (function() {
   'use strict';

   /**
    * @class SW.Game.Game
    * @listens window#load
    * @listens SW.Events.Signal#scene/activated
    * @belongsto SW.Game
    */
   var Game = function(options) {
        /**
         * @member {String} SW.Game.Game.prototype._canvasId
         * @private
         */
        this._canvasId = options.canvasId;
        /**
         * @member {Integer} SW.Game.Game.prototype._width
         * @private
         */
        this._width = options.width;
        /**new
         * @member {Integer} SW.Game.Game.prototype._height
         * @private
         */
        this._height = options.height;
        /**
         * @member {Boolean} SW.Game.Game.prototype._bindMouseInput
         * @private
         */
        this._bindMouseInput = options.bindMouseInput;
        /**
         * @member {Boolean} SW.Game.Game.prototype._bindTouchInput
         * @private
         */
        this._bindTouchInput = options.bindTouchInput;
        /**
         * @member {Boolean} SW.Game.Game.prototype._title
         * @private
         */
        this._title = options.title;
        /**
         * @member {Boolean} SW.Game.Game.prototype._fps
         * @private
         */
        this._fps = options.fps;

        /**
         * @member {SW.Display.Canvas} SW.Game.Game.prototype.canvas
         */
        this.canvas = null;
        /**
         * @member {SW.Events.Input} SW.Game.Game.prototype.input
         */
        this.input = null;
        /**
         * @member {SW.Game.Engine} SW.Game.Game.prototype.engine
         */
        this.engine = null;
        /**
         * @member {SW.Game.SceneManager} SW.Game.Game.prototype.sceneManager
         */
        this.sceneManager = null;

        SW.Events.Signal.addListener(window, 'load', this._onReady, this);
        SW.Events.Signal.addListener('scene/activated', this._onSceneActivated, this);
    };

    Game.prototype._onReady = function() {
        this.dom = new SW.Game.Dom({
            title: this._title
        });

        this.canvas = new SW.Display.Canvas({
            id: this._canvasId,
            width: this._width,
            height: this._height
        });

        this.input = new SW.Events.Input({
            eventEl: this.canvas.getCanvasEl(),
            bindMouseInput: this._bindMouseInput,
            bindTouchInput: this._bindTouchInput
        });

        this.engine = new SW.Game.Engine({
            fps: options._fps
        });

        this.sceneManager = new SW.Game.SceneManager();
    };

    Game.prototype._onSceneActivated = function(e) {
        this.input.setScene(e.detail.scene);
    };

    return Game;
}());