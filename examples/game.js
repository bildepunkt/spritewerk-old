import Game from "../src/Game";
import State from "../src/State";
import Bitmap from "../src/bitmap/Bitmap";
import Group from "../src/Group";
import Tween from "../src/tween/Tween";
import Animation from "../src/bitmap/Animation";
import TileMap from "../src/tile/TileMap";
import { rectRectCollide } from "../src/physics/collision";
import { Timer } from "../src/util/timer.js";

const SCROLL_SPEED = 3.4,
    HERO_ATTACK_TIME = 30,
    heroPath = "assets/images/hero.png",
    bgPath = "assets/images/bg.png",
    WIDTH = 480,
    HEIGHT = 320,
    OPTS = {
        // activate Spritewerk's various debugging functions
        debug: true,
        // stretch the canvas with css to fit to the browser window
        fitToWindow: true
    };

class Demo extends State {
    constructor (game) {
        // call super to setup your new state with all the goodies in the game object
        super(game);

        // preload image, video, audio assets by adding them the preload property
        this.preload = [
            bgPath,
            heroPath
        ];

        // set the state's background color
        this.bgColor = "#000";

        // create the tilemap for the bg
        // the bg image height matches the viewport so we only need one row
        // we add more columns than the width because we are going to scroll it!
        this.bg = new TileMap(0, 0, [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ], {
            width: 64,
            height: 320,
            // rowLength is needed so that we can use one array instead of a matrix.
            rowLength: 11,
            // the indeces of the legend values corresponds to the values in the map
            legend: [
                bgPath
            ]
        });

        // create a sprite and add it to the stage for updating/rendering
        this.hero = new Bitmap(64, 192, 64, 64, heroPath);
        this.hero.srcWidth = 64;
        this.hero.srcHeight = 64;
        this.hero.setHitBox(16, 0, 32, 64);
        // add and play run animation
        this.hero.addAnimation("run", new Animation([64, 128, 192, 256], 0, 8));
        this.hero.playAnimation("run", true);

        // create enenmy group
        this.enemyGroup = new Group();

        // add all items to the stage
        this.stage.addItems(this.bg, this.hero, this.enemyGroup);

        // add a click listener and handler
        this.game.input.addListener(null, "click", this.onClick, this);
    }

    addEnemy () {
        let enemy = new Bitmap(WIDTH + 64, 192, 64, 64, heroPath);
        enemy.srcWidth = 64;
        enemy.srcHeight = 64;
        enemy.sx = -1;
        this.enemyGroup.addItem(enemy);

        this.enemyTimer = new Timer(this.addEnemy, Math.round(Math.random() * 1000) + 700, this);
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
        const scrollDelta = SCROLL_SPEED;

        if (this.heroAttackTime) {
            this.heroAttackTime -= 1;
        } else {
            this.heroAttacking = false;
        }

        this.bg.translate(-scrollDelta);

        this.enemyGroup.each((enemy)=> {
            enemy.translate(-scrollDelta);
        });

        if (this.bg.x <= -128) {
            this.bg.translate(128);
        }

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
