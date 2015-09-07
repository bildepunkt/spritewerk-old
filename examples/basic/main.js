var Canvas = require('../../dist/Canvas');
var Config = require('../../dist/Config');
var Cinemize = require('../../dist/lib/Cinemize');

let config = new Config();
let canvas = new Canvas({
    config: config
});

Cinemize.fit(canvas.getElement());

canvas.drawPt(32, 32);