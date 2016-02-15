'use strict';

var jsdom = require('jsdom');
var Input = require('../build/Input').default;

describe('Input', function () {
    var $, canvas, input;

    beforeEach(function (done) {
        jsdom.env(
            '<body><canvas></canvas></body>',
            [],
            function (err, window) {
                $ = window;
                canvas = $.document.querySelector('canvas');
                input = new Input(canvas, {
                    window: $,
                    document: $.document
                });

                // async notifier
                done();
            }
        );
    });

    it('creates an Input instance', function () {
        expect(input instanceof Input).toBe(true);
    });

    it('queues mouse events', function () {
        var click = $.document.createEvent("HTMLEvents");
        var mouseup = $.document.createEvent("HTMLEvents");
        var mousemove = $.document.createEvent("HTMLEvents");

        click.initEvent("click", false, true);
        canvas.dispatchEvent(click);
        mouseup.initEvent("mouseup", false, true);
        canvas.dispatchEvent(mouseup);
        mousemove.initEvent("mousemove", false, true);
        canvas.dispatchEvent(mousemove);

        expect(input._queuedEvents.length).toEqual(3);
    });

    it('triggers event handlers', function () {
        var evt = $.document.createEvent("HTMLEvents");
        var onClick = jasmine.createSpy('onclick');

        evt.initEvent("click", false, true);
        input.addListener('click', onClick);
        canvas.dispatchEvent(evt);
        // manually trigger the queued events to be handled
        input._onTick();

        expect(onClick).toHaveBeenCalled();
    });
});
