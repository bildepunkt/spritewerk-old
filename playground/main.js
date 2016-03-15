import Camera from './src/Camera';
import Canvas from './src/Canvas';
import Input from './src/Input';
import Stage from './src/Stage';
import Rect from './src/shapes/Rectangle';
import Text from './src/text/Text';
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
let rect = new Rect().setFill('#999');
let text = new Text();
let ticker = new Ticker();

rect.setWidth(64);
rect.setHeight(64);
rect.setRotation(45);

text.setValue('foobar');
//text.setRotation(90);

group.addItem(rect);
group.addItem(text);

ticker.onTick = function (factor) {
    canvas.clear('#DDD');
    canvas.render(group);
};
