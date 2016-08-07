import Game from "../src/Game";
import State from "../src/State";
import Bitmap from "../src/bitmap/Bitmap";

const WIDTH = 480,
    HEIGHT = 320,
    heroPath = "assets/images/hero.png",
    OPTS = {
        fitToWindow: true,
        debug: true
    };

class Demo extends State {
    constructor (game) {
        // call super to setup your new state with all the goodies in the game object
        super(game);

        this.preload = [ heroPath ];
        this.bgColor = "#AAC";
    }

    init () {
        this.hero = new Bitmap(64, 64, 64, 64, heroPath);
        this.hero.srcWidth = 64;
        this.hero.srcHeight = 64;
        this.hero.sx = -1;
        this.hero.sy = -1;

        this.stage.addItem(this.hero);
    }
}

// Make magic!
new Game(WIDTH, HEIGHT, OPTS, {
    state: Demo,
    name: "demo"
});
