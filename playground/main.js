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

let groupA = new Group().setScaleX(2).setOpacity(0.4);
let rect = new Rectangle(128);
let r = 0;

groupA.addItem(rect, 'rect');

ticker.onPreTick = function () {
    r += 0.5;
    groupA.setRotation(r);
    canvas.update(groupA);
};

ticker.onTick = function (factor) {
    canvas.clear('#DDD');

    canvas.render(groupA);
};
