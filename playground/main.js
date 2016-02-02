import Canvas from './src/Canvas';
import Draw from './src/Draw';
import Input from './src/Input';
import Rectangle from './src/Rectangle';
import Ticker from './src/Ticker';

let canvas = new Canvas(800, 600, {
    canvasBgColor: '#EEE',
    parentElBgColor: '#222',
    fit: false
});
let draw = new Draw(canvas.getEl());
let input = new Input(canvas.getEl());
let ticker = new Ticker();
let rect = new Rectangle();

rect.setFill('#48C');
draw.render(rect);

input.addListener('click', function (e) {
    console.log(e);
}, rect);
