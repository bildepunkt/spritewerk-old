/**
 * initializes classes, loads initial state/data after dom ready
 *
 * @class Game
 * @static
 */

define([
    '../lib/radio',
    './dom-control',
    './draw',
    './engine',
    './input',
    './state-control'
], function(radio, DomControl, Draw, Engine, Input, StateControl) {
    return {
        /**
         * the state to load after window load
         */
        _State: null,

        /**
         * the data to load after window load
         */
        _data: null,

        /**
         * accepts state and data preps for window load
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
         */
        _onReady: function() {
            radio.tuneOut(window, 'load', this._onReady);

            // dom ctrl first!
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