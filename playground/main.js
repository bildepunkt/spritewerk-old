import Camera from './src/Camera';
import Draw from './src/Draw';
import Input from './src/Input';
import Mobile from './src/Mobile';
import Stage from './src/Stage';
import Rectangle from './src/Rectangle';
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
let rect = new Rectangle();

ticker.onTick = function (factor) {
    draw.clear('#DDD');
    console.log(factor);

    let speed = 800 * factor;
    rect.setX(rect.getX() + speed);

    draw.render(rect);
}
