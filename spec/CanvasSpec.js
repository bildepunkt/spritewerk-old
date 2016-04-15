'use strict';

var jsdom = require('jsdom');
var Stage = require('../build/Stage').default;

describe('Stage', function () {
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

    it('instantiates a Stage object', function () {
        var stage = new Stage(800, 600, {
            window: $,
            document: $.document
        });

        expect(stage instanceof Stage).toBe(true);
    });

    it('creates a <canvas> tag in the DOM', function () {
        var stage = new Stage(640, 480, {
            window: $,
            document: $.document
        });
        var canvas = $.document.querySelector('canvas');

        expect(canvas).toEqual(stage.getCanvas());
        expect(canvas.width).toEqual(640);
        expect(canvas.height).toEqual(480);
    });

    it('creates a <video> tag in the DOM', function () {
        var stage = new Stage(640, 480, {
            window: $,
            document: $.document
        });

        var video = $.document.querySelector('video');

        expect(video).toEqual(stage.getVideo());
    });

    it('resizes DOM elements', function () {
        var stage = new Stage(640, 480, {
            window: $,
            document: $.document
        });

        $.innerHeight = 640;
        $.innerWidth = 640;

        stage._handleResize();

        var video = $.document.querySelector('video');
        var canvas = $.document.querySelector('canvas');

        expect(video.style.width).toEqual('640px');
        expect(video.style.height).toEqual('480px');
        expect(canvas.style.width).toEqual('640px');
        expect(canvas.style.height).toEqual('480px');
    });

    it('fills the stage into the viewport', function () {
        var stage = new Stage(800, 600, {
            window: $,
            document: $.document
        });

        $.innerHeight = 640;
        $.innerWidth = 640;

        expect(
            Stage.fill(800, 600, $.innerWidth, $.innerHeight)
        ).toEqual({
            top: 80,
            left: 0,
            width: 640,
            height: 480
        });
    });

    it('centers the stage into the viewport', function () {
        var stage = new Stage(640, 480, {
            window: $,
            document: $.document
        });

        $.innerHeight = 600;
        $.innerWidth = 800;

        expect(
            Stage.center(640, 480, $.innerWidth, $.innerHeight)
        ).toEqual({
            left: 80,
            top: 60
        });
    });
});
