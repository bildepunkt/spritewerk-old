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
            config: config,
            viewport: viewport
        });
        let ticker = new Ticker();

        // fit viewport to browser window
        let ltwh = Cinemize.fit(config.gameWidth, config.gameHeight);
        viewport.fit(ltwh.left, ltwh.top, ltwh.width, ltwh.height);

        let sprite = new Sprite()
            .setWidth(32)
            .setHeight(32)
            .setX(64);

        let groupA = new Group().setX(128).setY(128);
        let rot = 0;

        groupA.addChild(sprite);

        ticker.onTick = function () {
            canvas.clear();

            groupA.setRotation(rot);
            rot += 4;

            canvas.drawRect(sprite.getGlobalX(), sprite.getGlobalY(), sprite.getWidth(), sprite.getHeight());
        };

        ticker.start();
    }
}

new Main();
