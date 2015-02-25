(function() {
    'use strict';

    /**
     * @fires SW.Radio#spritewerk/ready
     */
    function init() {
        SW.Radio.tuneOut(window, 'load', init);

        SW.MediaManager = new SW.MediaManager();

        SW.Radio.broadcast('spritewerkready');
    }

    SW.Radio.tuneIn(window, 'load', init);
}());