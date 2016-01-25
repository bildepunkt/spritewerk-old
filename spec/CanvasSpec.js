'use strict';

var jsdom = require('jsdom');
var Canvas = require('../build/Canvas').default;

describe('Canvas', function () {
    var $;

    beforeEach(function (done) {
        jsdom.env(
            '<body></body>',
            [],
            function (err, window) {
                $ = window;

                done();
            }
        );
    });

    it('instantiates a Canvas object', function () {
        var canvas = new Canvas(800, 600, {
            window: $,
            document: $.document
        });

        expect(canvas).toBeTruthy();
    });

    it('creates a <canvas> tag in the DOM', function () {
        var canvas = new Canvas(800, 600, {
            window: $,
            document: $.document
        });
        var canvasEl = $.document.querySelector('canvas');

        expect(canvasEl).toEqual(canvas.getEl());
        expect(canvasEl.width).toEqual(800);
        expect(canvasEl.height).toEqual(600);
    });
});
