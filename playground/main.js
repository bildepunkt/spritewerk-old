import Camera from './src/Camera';
import Canvas from './src/Canvas';
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
let canvas = new Canvas(stage.getCanvas(), camera);
let input = new Input(stage.getCanvas());
let ticker = new Ticker();

let groupA = new Group(128, 128).setOpacity(0.4);
let groupB = new Group(64, 64);
let rect = new Rectangle(16);
let r = 0;

groupA.addItem(groupB);
groupB.addItem(rect, 'rect');

ticker.onPreTick = function () {
    r += 2;
    groupB.setRotation(r);
    rect.setRotation(-r*8);
    canvas.update(groupA);
};

ticker.onTick = function (factor) {
    canvas.clear('#DDD');

    canvas.render(groupA);
};

// or this is how to do it...
/*
const can = document.querySelector('canvas');
const ctx = can.getContext('2d');

class Point {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

class Group extends Point {
  constructor(item) {
    super();
    this.r = 0;
    this.item = item;
  }

  update() {
    ctx.rotate(this.r * Math.PI / 180);
    ctx.translate(this.x, this.y);
    this.item.update();
  }
}

class Sprite extends Point {
  update() {
    ctx.rotate(this.r * Math.PI / 180);
    ctx.translate(this.x, this.y);
    const size = 16;
    ctx.fillRect(-size / 2,-size / 2, size, size);
  }
}

let sprt = new Sprite();
let grp = new Group(sprt);
grp.x = 96;
grp.r = 15;

function getRotatedCoords(x, y, cx, cy, deg) {
  let rad = deg * Math.PI / 180;
  let cos = Math.cos(rad);
  let sin = Math.sin(rad);

  let newx = (x - cx) * cos - (y - cy) * sin;
  let newy = (x - cx) * sin + (y - cy) * cos;

  return {
    x: newx + cx,
    y: newy + cy
  };
}

function update() {
  ctx.save();
  grp.update();
  ctx.restore();

  console.log(getRotatedCoords(, 0, 96, 0, 15));

  //window.requestAnimationFrame(update);
}

update();
*/