import Camera from './src/Camera';
import Canvas from './src/Canvas';
import Input from './src/Input';
import Stage from './src/Stage';
import Rectangle from './src/shapes/Rectangle';
import Group from './src/Group';
import Ticker from './src/Ticker';

let camera = new Camera();
let stage = new Stage(800, 600, {
    bgColor: '#222',
    fill: true
});
let canvas = new Canvas(stage.getCanvas(), camera);
let input = new Input(stage.getCanvas());
let group = new Group();
let rect = new Rectangle();
let ticker = new Ticker();

group.addItem(rect);

ticker.onTick = function (factor) {
    canvas.clear('#DDD');
    canvas.render(group);
};
