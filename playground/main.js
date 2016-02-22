import Camera from './src/Camera';
import Canvas from './src/Canvas';
import Input from './src/Input';
import Stage from './src/Stage';
import Rectangle from './src/Rectangle';
import Group from './src/Group';
import Ticker from './src/Ticker';

let camera = new Camera();
let stage = new Stage(800, 600, {
    bgColor: '#222',
    fill: true
});
let canvas = new Canvas(stage.getCanvas(), camera);
let input = new Input(stage.getCanvas());
let ticker = new Ticker();

let groupA = new Group(128, 128).setOpacity(0.4);
let groupB = new Group(64, 64);
let rect = new Rectangle(16);
let r = 0;

groupA.addItem(groupB);
groupB.addItem(rect, 'rect');

ticker.onPreTick = function () {
    r += 2;
    groupB.setRotation(r);
    rect.setRotation(-r*8);
    canvas.update(groupA);
};

ticker.onTick = function (factor) {
    canvas.clear('#DDD');

    canvas.render(groupA);
};
