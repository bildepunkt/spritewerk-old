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
        this._width = options.width || 600;
        /**new
         * @member {Integer} SW.Game.Game.prototype._height
         * @private
         */
        this._height = options.height || 400;
        /**
         * @member {Boolean} SW.Game.Game.prototype._bindMouseInput
         * @private
         */
        this._bindMouseInput = options.bindMouseInput || true;
        /**
         * @member {Boolean} SW.Game.Game.prototype._bindTouchInput
         * @private
         */
        this._bindTouchInput = options.bindTouchInput || true;
        /**
         * @member {Boolean} SW.Game.Game.prototype._title
         * @private
         */
        this._title = options.title || 'spritewerk game';
        /**
         * @member {Boolean} SW.Game.Game.prototype._fps
         * @private
         */
        this._fps = options.fps || 60;
        /**
         * @member {Boolean} SW.Game.Game.prototype._canvasFit
         * @private
         */
        this._canvasFit = options.canvasFit || false;

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

        SW.Events.Signal.addListener(window, 'load', this._onReady, this);
        SW.Events.Signal.addListener('scene/activated', this._onSceneActivated, this);
        SW.Events.Signal.addListener('new/frame', this._onNewFrame, this);
    };

    /**
     *
     */
    Game.prototype._onNewFrame = function() {
        var self = this;
        var activeScene = SW.Game.SceneManager.activeScene();

        this.canvas.clearAll().fillAll(activeScene.bgColor());

        activeScene.each(function(layer) {
            layer.each(function(entity) {
                self.canvas.render(entity);
            });
        });
    };

    /**
     * @method SW.Game.Game.prototype._onReady
     * @fires SW.Events.Signal#spritewerk/ready
     */
    Game.prototype._onReady = function() {
        this.dom = new SW.Game.Dom({
            title: this._title
        });

        this.canvas = new SW.Display.Canvas({
            id: this._canvasId,
            width: this._width,
            height: this._height,
            canvasFit: this._canvasFit
        });

        this.input = new SW.Events.Input({
            eventEl: this.canvas.getCanvasEl(),
            bindMouseInput: this._bindMouseInput,
            bindTouchInput: this._bindTouchInput,
            canvasFit: this._canvasFit
        });

        this.engine = new SW.Game.Engine({
            fps: this._fps
        });

        // @todo engine firing before scene set
        //this.engine.start();

        /**
         * @event SW.Events.Signal#spritewerk/ready
         */
        SW.Events.Signal.dispatch('spritewerk/ready');
    };

    Game.prototype._onSceneActivated = function(e) {
        this.input.setScene(e.detail.scene);
    };

    return Game;
}());