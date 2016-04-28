Spritewerk
==========

[![Build Status](https://travis-ci.org/c-concat-p/spritewerk.svg?branch=master)](https://travis-ci.org/c-concat-p/spritewerk)
[![Coverage Status](https://coveralls.io/repos/github/c-concat-p/spritewerk/badge.svg?branch=master&stopCachingBadges=true)](https://coveralls.io/github/c-concat-p/spritewerk?branch=master&stopCachingBadges=true)

### A small, friendly HTML5 framework for device-agnostic game development
Spritewerk is a lightweight, fun and easy-to-use solution for producing traditional, console-style games that perform beautifully on any device. The code consists of flexible, generic classes for rapidly developing an HTML5 game.

Does not support:

* physics
* nested transforms

#### To install
    git clone https://github.com/c-concat-p/spritewerk.git

or download archive [here](https://github.com/c-concat-p/spritewerk/archive/master.zip).

#### To Use
**ES(6/2015/next)**
`import` classes from `./src` as needed.

**ES5**
Run `npm run xpile`, then `require` modules from `./xpile` as needed.

**Playground**
Want to play with Spritewerk right away? To set up a rather bare-bones development environment run `mkdir -p ./playground && touch ./playground/index.html && touch ./playground/main.js`, and then watch for `main.js` changes via webpack with:

    npm run webpack

Here is an example main.js file to get you started:

    import Camera from '../src/Camera';
    import Canvas from '../src/Canvas';
    import Stage from '../src/Stage';
    import Rectangle from '../src/shape/Rectangle';
    import Ticker from '../src/Ticker';

    const WIDTH = 800;
    const HEIGHT = 600;

    let camera = new Camera();
    let stage = new Stage(WIDTH, HEIGHT, {
        bgColor: '#222',
        fill: true
    });
    let canvas = new Canvas(stage.getCanvas(), camera);
    let rect = new Rectangle()
        .setWidth(64)
        .setHeight(64);
    let ticker = new Ticker();
    let vx = 4;
    let vy = 4;

    ticker.onTick = function () {
        if (rect.getX() < 0) {
            vx = 4;
        }
        if (rect.getX() + rect.getWidth() > WIDTH) {
            vx = -4; 
        }
        if (rect.getY() < 0) {
            vy = 4;
        }
        if (rect.getY() + rect.getHeight() > HEIGHT) {
            vy = -4;
        }

        canvas.clear("#DDD");
        rect.translate(vx, vy);
        canvas.render(rect);
    };


#### Test
To run Spritewerk's unit tests, first run `npm run xpile` and then:

    npm run test

#### Documentation
Generate the documentation.

    npm run doc

#### Build
(Not for running locally) Jenkins build with code coverage via Coveralls/Istanbul configuration

    npm run build

#### TODO
* support calculating entity's bounding area/position when rotated on an offset pivot
* support clipping objects
* copy camera ideas over from old code/ghastlyjs
* use data/state scaffolding again?
* reinstate clickCandidate from old [code](https://github.com/c-concat-p/spritewerk/blob/worlds/src/events/input.js)
