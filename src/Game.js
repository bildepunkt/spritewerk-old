import Camera from "./Camera";
import Canvas from "./Canvas";
import FSM from "./FSM";
import Input from "./Input";
import Ticker from "./Ticker";
import Viewport from "./Viewport";

export default class Game {
    constructor(width, height, ...states) {
        this.viewport = new Viewport(width, height);
        this.ticker = new Ticker();
        this.camera = new Camera(0, 0, width, height);
        this.input = new Input(this.viewport.canvasElement);
        this.canvas = new Canvas(this.viewport.canvasElement, this.camera);
        this.fsm = new FSM(this.canvas, this.ticker);

        let initialStateName;

        for (let state of states) {
            if (!initialStateName) {
                initialStateName = state.name;
            }

            this.fsm.add(state.state, state.name, this);
        }

        this.fsm.load(initialStateName);
    }
}
