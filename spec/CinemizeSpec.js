'use strict';

var jsdom = require('jsdom');
var Cinemize = require('../build/Cinemize').default;

describe('Cinemize', function () {
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

    it('fits the canvas into the viewport', function () {
        $.innerHeight = 640;
        $.innerWidth = 640;

        expect(
            Cinemize.fit(800, 600, {
                window: $
            })
        ).toEqual({
            top: 80,
            left: 0,
            width: 640,
            height: 480
        });
    });
});
