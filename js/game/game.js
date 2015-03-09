SW.Game.Game = (function() {
   'use strict';

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
         * @member {Boolean} 
         */
        this._bindTouchInput = options.bindTouchInput;

        SW.Events.Signal.addListener(window, 'load', this._onReady, this);
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

    return Game;
}());