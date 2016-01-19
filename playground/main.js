import Canvas from './src/Canvas';
import Draw from './src/Draw';
import Input from './src/Input';
import Ticker from './src/Ticker';

let canvas = new Canvas(800, 600, {
    canvasBgColor: '#EEE',
    parentElBgColor: '#222'
});
let draw = new Draw(canvas.getEl());
let input = new Input({
    canvas: canvas.getEl()
});
let ticker = new Ticker(4);

let log = function (e) {
    console.log(e);
};

ticker.onTick = (delta, ticks)=> {
    console.log(delta, ticks);
};

input.addListener('dragstart', log);
input.addListener('drag', log);

input.addListener('dragend', (e)=> {
    log(e);
    input.removeListener('drag', log);
});
