import State from "../src/State";
import Text from "../src/text/Text";
import Ball from './Ball';
import Paddle from './Paddle';
import { rectRectCollide } from "../src/physics/collision";

export default class Play extends State {
    constructor (game) {
        super(game);

        this.bgColor = "#F6F";
        this.lives = new Text();

        this.paddle = new Paddle(0, 0, 64, 12, this.game.width);
        this.ball = new Ball(0, 0, 12, 12, {
            onHitBottom: this.loseLife.bind(this),
            game: this.game,
            paddle: this.paddle
        });
        this.stage.addItems(this.ball, this.lives, this.paddle);

        this.launchBall = this.launchBall.bind(this);

        this.reset();
    }

    init () {
        this.ball.reset();
        this.paddle.reset();
        this.lives.value = `Lives: ${this.game.store.lives}`;

        this.game.input.addListener("click", this.launchBall);
        this.game.input.addListener("drag", this.paddle.move);
    }

    launchBall () {
        this.ball.launch();
    }

    loseLife () {
        this.game.store.lives -= 1;

        if (this.game.store.lives) {
            this.ball.reset();
            this.paddle.reset();
            this.lives.value = `Lives: ${this.game.store.lives}`;
        } else {
            this.reset();
            this.game.fsm.load("title");
        }
    }

    reset () {
        this.game.store.lives = 3;
    }

    update (factor) {
        //

        super.update(factor);
    }

    destroy () {
        this.game.input.removeListener("click", this.launchBall);
        this.game.input.removeListener("drag", this.paddleMove);
    }
}