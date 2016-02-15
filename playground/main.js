import Camera from './src/Camera';
import Draw from './src/Draw';
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
let draw = new Draw(stage.getCanvas(), camera);
let input = new Input(stage.getCanvas());
let ticker = new Ticker();

let groupA = new Group(32).setScaleX(2).setOpacity(0.5);
let groupB = new Group(0, 32);
let rect = new Rectangle();

groupB.addItem(rect, 'rect');
groupA.addItem(groupB, 'grp');

ticker.onTick = function (factor) {
    draw.clear('#DDD');

    draw.render(groupA);
}
