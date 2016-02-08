import Mobile from './src/Mobile';
import Stage from './src/Stage';
import Draw from './src/Draw';
import Input from './src/Input';
import Rectangle from './src/Rectangle';
import Ticker from './src/Ticker';

Mobile.addMetaTags();

let stage = new Stage(800, 600, {
    bgColor: '#222',
    fill: true
});
let draw = new Draw(stage.getCanvas());
let input = new Input(stage.getCanvas());
let ticker = new Ticker();
let rect = new Rectangle();
let fullscreen = new Rectangle();
fullscreen.setX(764);

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}

rect.setFill('#48C');
ticker.onTick = function () {
    draw.clear('#EEE');
    draw.render(fullscreen);
    draw.render(rect);
};

input.addListener('click', toggleFullScreen, fullscreen);

input.addListener('click', function (e) {
    rect.setX(Math.random() * 800);
    rect.setY(Math.random() * 600);
}, rect);
