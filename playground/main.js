import Camera from './src/Camera';
import Draw from './src/Draw';
import Input from './src/Input';
import Mobile from './src/Mobile';
import Stage from './src/Stage';
import Ticker from './src/Ticker';

Mobile.addMetaTags();

let camera = new Camera();
let stage = new Stage(800, 600, {
    bgColor: '#222',
    fill: true
});
let draw = new Draw(stage.getCanvas(), camera);
let input = new Input(stage.getCanvas());
let ticker = new Ticker();

ticker.onTick = function () {
    draw.clear('#DDD');
}
