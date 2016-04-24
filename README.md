Spritewerk
==========

[![Build Status](https://travis-ci.org/c-concat-p/spritewerk.svg?branch=master)](https://travis-ci.org/c-concat-p/spritewerk)
[![Coverage Status](https://coveralls.io/repos/github/c-concat-p/spritewerk/badge.svg?branch=master&stopCachingBadges=true)](https://coveralls.io/github/c-concat-p/spritewerk?branch=master&stopCachingBadges=true)

### A small, friendly HTML5 framework for device-agnostic game development
Spritewerk is a lightweight, fun and easy-to-use solution for producing traditional, console-style games that perform beautifully on any device. The code consists of flexible, generic classes for rapidly developing an HTML5 game.

*NOTE:* Spritewerk does not, at the moment, support physics, or nested transforms.

#### To install
    git clone https://github.com/c-concat-p/spritewerk.git

or download archive [here](https://github.com/c-concat-p/spritewerk/archive/master.zip).

#### To Use
**ES(6/2015/next)**
`import` classes from `./src` as needed.

**ES5**
Run `npm run xpile`, then `require` modules from `./build` as needed.

#### Test
Run Spritewerk's unit tests

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
* copy camera ideas over from ghastlyjs
* use data/state scaffolding again?
