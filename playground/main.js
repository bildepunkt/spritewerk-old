import Canvas from './src/Canvas';
import Draw from './src/Draw';
import Input from './src/Input';
import Ticker from './src/Ticker';


function log(e) {
    console.log(e);
}

let canvas = new Canvas(800, 600, {
    canvasBgColor: '#EEE',
    parentElBgColor: '#222'
});
let draw = new Draw(canvas.getEl());
let input = new Input(canvas.getEl());
let ticker = new Ticker(4);

ticker.onTick = (delta, ticks)=> {
    console.log(delta, ticks);
};
