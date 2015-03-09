SW.Game.Game = (function() {
   'use strict';

   /**
    * @class SW.Game.Game
    * @listens window#load
    * @listens SW.Events.Signal#scene/activated
    * @belongsto SW.Game
    */
   var Game = function() {
        /**
         * @member {String}  
         */
        this._canvasId = options.canvasId;
        /**
         * @member {Integer} 
         */
        this._width = options.width;
        /**
         * @member {Integer} 
         */
        this._height = options.height;
        /**
         * @member {Boolean} 
         */
        this._bindMouseInput = options.bindMouseInput;
        /**
         * @member {Boolean} SW.Game.Game.prototype.input
         */
        this._bindTouchInput = options.bindTouchInput;
        /**
         * an instance of Canvas
         * @member {SW.Display.Canvas} SW.Game.Game.prototype.canvas
         */
        this.canvas = null;
        /**
         * an instance of Input
         * @member {SW.Events.Input} SW.Game.Game.prototype.input
         */
        this.input = null;

        SW.Events.Signal.addListener(window, 'load', this._onReady, this);
        SW.Events.Signal.addListener('scene/activated', this._onSceneActivated, this);
    };

    Game.prototype._onReady = function() {
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
    };

    Game.prototype._onSceneActivated = function(e) {
        this.input.setScene(e.detail.scene);
    };

    return Game;
}());