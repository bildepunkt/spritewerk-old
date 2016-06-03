import Game from "../src/Game";
import State from "../src/State";
import Bitmap from "../src/bitmap/Bitmap";
import Group from "../src/Group";
import Tween from "../src/tween/Tween";
import Animation from "../src/bitmap/Animation";
import TileMap from "../src/tile/TileMap";
import { rectRectCollide } from "../src/physics/collision";
import { Timer } from "../src/util/timer.js";

const SCROLL_SPEED = 176,
    HERO_ATTACK_TIME = 12,
    WIDTH = 480,
    HEIGHT = 320,
    OPTS = {};

class Demo extends State {
    constructor (game) {
        // call super to setup your new state with all the goodies in the game object
        super(game);

        // preload image, video, audio assets by adding them the preload property
        this.preload = [
            "assets/images/bg.png",
            "assets/images/hero.png"
        ];

        // set the state's background color
        this.bgColor = "#000";

        // create the tilemap for the bg
        this.bg = new TileMap(0, 0, [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ], {
            width: 64,
            height: 320,
            rowLength: 11,
            legend: [
                "assets/images/bg.png"
            ]
        });

        // create a sprite and add it to the stage for updating/rendering
        this.hero = new Bitmap(64, 192, 64, 64, "assets/images/hero.png");
        this.hero.srcWidth = 64;
        this.hero.srcHeight = 64;
        // add and play run animation
        this.hero.addAnimation("run", new Animation([64, 128, 192, 256], 0, 8));
        this.hero.playAnimation("run", true);

        // create enenmy group
        this.enemyGroup = new Group();

        // add all items to the stage
        this.stage.addItems(this.bg, this.hero, this.enemyGroup);

        // add a click listener and handler
        this.game.input.addListener("click", this.onClick.bind(this));
    }

    addEnemy () {
        let enemy = new Bitmap(WIDTH + 64, 192, 64, 64, "assets/images/enemy.png");
        enemy.srcWidth = 64;
        enemy.srcHeight = 64;
        this.enemyGroup.addItem(enemy);

        this.enemyTimer = new Timer(this.addEnemy, Math.round(Math.random() * 1000) + 1000, this);
    }

    init () {
        // initialize some props
        this.bg.x = 0;
        this.heroAttacking = false;
        this.enemyGroup.removeAll();

        if (this.enemyTimer) {
            this.enemyTimer.clear();
        }

        this.addEnemy();
    }

    onClick (e) {
        this.heroAttacking = true;
        this.heroAttackTime = HERO_ATTACK_TIME;
    }

    update (factor) {
        if (this.bg.x > -128) {
            this.bg.translate(-SCROLL_SPEED * factor);
        } else {
            this.bg.x = (this.bg.x * factor);
        }

        if (this.heroAttackTime) {
            this.heroAttackTime -= 1;
        } else {
            this.heroAttacking = false;
        }

        this.enemyGroup.each((enemy)=> {
            enemy.translate(-SCROLL_SPEED * factor);
        });

        this.enemyGroup.each((enemy)=> {
            if (rectRectCollide(this.hero, enemy)) {
                this.enemyGroup.remove(enemy);

                if (this.heroAttacking) {
                    console.log("GOT ONE!!!!");
                } else {
                    this.init();
                    console.log("START");
                }
            }
        }, this);

        super.update(factor);
    }
}

// Make magic!
new Game(WIDTH, HEIGHT, OPTS, {
    state: Demo,
    name: "demo"
});
