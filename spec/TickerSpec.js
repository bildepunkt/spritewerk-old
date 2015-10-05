/**
 *
 */
describe('Ticker', function() {
    var Ticker = require('../dist/Ticker');
    var Config = require('../dist/Config');
    var targets = {
        onTick: function () {}
    };
    var config = new Config();
    var ticker;

    beforeEach(function (done) {
        ticker = new Ticker({
            config: config,
            window: {
                requestAnimationFrame: function () {
                    setTimeout(function () {
                        targets.onTick();
                        done();
                    }, 16);
                }
            }
        });

        ticker.onTick = targets.onTick;
        ticker.start();

        spyOn(targets, 'onTick');
    });

    it('calls "onTick"', function () {
        console.log(targets.onTick.calls.count());
        expect(targets.onTick).toHaveBeenCalled();
    });
});
