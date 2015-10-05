import Config from '../../dist/Config';
import Viewport from '../../dist/Viewport';
import Canvas from '../../dist/Canvas';
import Group from '../../dist/Group';
import Sprite from '../../dist/Sprite';
import Cinemize from '../../dist/lib/Cinemize';
import Ticker from '../../dist/Ticker';

class Main {
    constructor() {
        let config = new Config();
        let viewport = new Viewport({
            config: config,
            document: document
        });
        let canvas = new Canvas({
            viewport: viewport
        });
        let ticker = new Ticker();

        // fit viewport to browser window
        let ltwh = Cinemize.fit(config.gameWidth, config.gameHeight);
        viewport.fit(ltwh.left, ltwh.top, ltwh.width, ltwh.height);

        let sprite = new Sprite()
            .setWidth(32)
            .setHeight(32);

        let groupA = new Group();
        let groupB = new Group().setX(64).setY(64);

        groupB.addChild(sprite);
        groupA.addChild(groupB);

        groupB.setX(-64);
        sprite.setX(64);

        ticker.onTick = function () {
            canvas.drawRect(sprite.getGlobalX(), sprite.getGlobalY(), sprite.getWidth(), sprite.getHeight());
        };

        ticker.start();
    }
}

new Main();
