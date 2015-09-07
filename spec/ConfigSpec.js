/**
 * 
 */
describe('Config', function() {
    var Config = require('../dist/Config');
    var config;

    beforeEach(function () {
        config = new Config({
            fps: 60
        });
    });

    it('should update defaults', function () {
        expect(config.fps).toEqual(60);
    });
});
