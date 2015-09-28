import Config from '../../dist/Config';
import Viewport from '../../dist/Viewport';
import Canvas from '../../dist/Canvas';
import Group from '../../dist/Group';
import Sprite from '../../dist/Sprite';

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

        let sprite = new Sprite()
            .setWidth(32)
            .setHeight(32);
        let groupA = new Group();
        let groupB = new Group().setX(64).setY(64);


        groupB.addChild(sprite);
        groupA.addChild(groupB);

        groupB.setX(-64);
        sprite.setX(64);

        canvas.drawRect(sprite.getGlobalX(), sprite.getGlobalY(), sprite.getWidth(), sprite.getHeight());
    }
}

new Main();
