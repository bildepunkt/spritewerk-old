var Viewport = require('../../dist/Viewport');
var Config = require('../../dist/Config');
var Line = require('../../dist/geometry/Line');
var Point = require('../../dist/geometry/Point');
var Vector = require('../../dist/Vector');

class Main {
    constructor() {
        let config = new Config();
        let viewport = new Viewport({
            config: config,
            document: document
        });

        let pt = new Point({
            viewport: viewport
        });
        pt.render();

        let line = new Line({
            viewport: viewport
        });
        line.setPoints(new Vector(4, 4), new Vector(6, 6));
        line.render();
    }
}

new Main();