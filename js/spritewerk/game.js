/**
 * initializes classes, loads initial state/data after dom ready
 *
 * @class Game
 * @static
 */

define([
    '../lib/radio',
    './config',
    './dom-control',
    './draw',
    './engine',
    './input',
    './state-control'
], function(radio, Config, DomControl, Draw, Engine, Input, StateControl) {
    return {
        /**
         * @member {constructor} Game._State - the state to load after window load
         * @private
         */
        _State: null,

        /**
         * @member {object} Game._data - the data to load after window load
         * @private
         */
        _data: null,

        /**
         * accepts state and data preps for window load
         *
         * @method Game.start
         */
        start: function(State, data) {
            this._State = State;
            this._data = data;

            // for those quick dom loads
            if (SPRITEWERK.windowLoaded) {
                this._onReady();
            } else {
                radio.tuneIn(window, 'load', this._onReady, this);
            }
        },

        /**
         * init modules, load state/data and start game engine
         *
         * @method Game._onReady
         * @private
         */
        _onReady: function() {
            radio.tuneOut(window, 'load', this._onReady);

            // config first!
            Config.init();
            // dom next
            DomControl.init();
            //
            Draw.init();
            Engine.init();
            Input.init();
            StateControl.init();
            //
            StateControl.setState(this._State, this._data);
            // go!
            Engine.start();
        }
    };
});