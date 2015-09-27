/**
 *
 */
describe('Config', function() {
    var Config = require('../dist/Config');
    var config;

    beforeEach(function () {
        config = new Config({
            width: 1337
        });
    });

    it('should update defaults', function () {
        expect(config.width).toEqual(1337);
    });
});
