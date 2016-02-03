import Stage from './src/Stage';
import Draw from './src/Draw';
import Input from './src/Input';
import Rectangle from './src/Rectangle';
import Ticker from './src/Ticker';

let stage = new Stage(800, 600, {
    canvasBgColor: '#EEE',
    parentElBgColor: '#222'
});
let draw = new Draw(stage.getCanvas());
let input = new Input(stage.getCanvas());
let ticker = new Ticker();
let rect = new Rectangle();

rect.setFill('#48C');
ticker.onTick = function () {
    draw.clear();
    draw.render(rect);
};

input.addListener('click', function (e) {
    rect.setX(Math.random() * 800);
    rect.setY(Math.random() * 600);
}, rect);
