import State from "../src/State";
import Text from "../src/text/Text";

export default class Title extends State {
    constructor (game) {
        super(game);

        this.title = new Text("HTML5 Breakout", 68, 32);
        this.title.size = 24;
        this.start = new Text("Start", 146, 320);

        this.stage.addItems(this.title, this.start);

        this._onStart = this._onStart.bind(this);
    }

    _onStart () {
        this.game.fsm.load("play");
    }

    init () {
        this.game.input.addListener("click", this._onStart, this.start);
    }

    destroy () {
        this.game.input.removeListener("click", this._onStart, this.start);
    }
}