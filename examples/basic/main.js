import Config from '../../dist/Config';
import Viewport from '../../dist/Viewport';
import Canvas from '../../dist/Canvas';
import Group from '../../dist/Group';
import Sprite from '../../dist/Sprite';
import Cinemize from '../../dist/lib/Cinemize';
import Ticker from '../../dist/Ticker';
import DebugRenderer from '../../dist/util/DebugRenderer';

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
        let debugRenderer = new DebugRenderer({
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

        let groupA = new Group().setX(64).setY(64);
        let groupB = new Group().setX(64).setY(64);
        let rot = 1;

        groupA.addChild(groupB);
        groupB.addChild(sprite);

        debugRenderer.watch([
            {
                name: 'groupA',
                entity: groupA
            }, {
                name: 'groupB',
                entity: groupB
            }
        ]);

        ticker.onTick = function () {
            canvas.clear();

            groupB.setRotation(rot);
            rot += 1;

            let x = sprite.getGlobalX();
            let y = sprite.getGlobalY();
            let w = sprite.getWidth();
            let h = sprite.getHeight();

            canvas.drawRect(x - w / 2, y - h / 2, w, h);

            debugRenderer.render();
        };

        ticker.start();
    }
}

new Main();
