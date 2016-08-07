import Camera from "./Camera";
import Canvas from "./Canvas";
import FSM from "./state/FSM";
import Input from "./Input";
import Preloader from "./Preloader";
import Ticker from "./Ticker";
import Store from "./data/Store";
import Viewport from "./Viewport";

/**
 * The Spritewerk class sets all core module instances as properties. It also takes width/height properties of the game
 * and takes the states for adding to the FSM; the first being the initially loaded state.
 * @class Spritewerk
 * @param {Integer} width The game width
 * @param {Integer} height The game height
 * @param {Object}  ]options] The game options
 * @param {Boolean} [options.debug]             Turns on debugging for all modules
 * @param {Boolean} [options.container]         Container element for Spritewerk elements, defaults to <body>
 * @param {Boolean} [options.listenForMouse]    Whether or not to listen for mouse events
 * @param {Boolean} [options.listenForTouch]    Whether or not to listen for touch events
 * @param {Boolean} [options.listenForKeyboard] Whether or not to listen for keyboard events
 * @param {Boolean} [options.combineMouseAndClick] Combines mouse and touch events
 *                                                 eg: `click` triggers `tap` and visa-versa
 * @param {...State} states A key/val pair of the state and its name
 */
export default class Spritewerk {
    constructor (width, height, options={}, ...states) {
        this.width = width;
        this.height = height;
        this.viewport = new Viewport(width, height, options);
        this.ticker = new Ticker();
        this.camera = new Camera(0, 0, width, height);
        this.input = new Input(this.viewport.canvas, options);
        this.scene = new Scene(this.viewport.canvas, this.camera, options);
        this.fsm = new FSM(this.scene, this.ticker, this);
        this.store = new Store();

        let initialStateName;

        for (let state of states) {
            if (!initialStateName) {
                initialStateName = state.name;
            }

            this.fsm.add(state.state, state.name, state.args);
        }

        this.fsm.load(initialStateName);
    }
}
