/**
 * 
 */
describe('Ticker', function() {
    var Ticker = require('../dist/Ticker');
    var Config = require('../dist/Config');
    var requestAnimationFrame = function (callback) {
        callback();
    };
    var targets = {
        onTick: function () {}
    };
    var config;
    var ticker;

    beforeEach(function () {
        config = new Config();
        ticker = new Ticker({
            onTick: targets.onTick,
            config: config
        });

        spyOn(targets, 'onTick');
    });

    it('should call "onTick"', function () {
        expect(targets.onTick).toHaveBeenCalled();
    });
});
