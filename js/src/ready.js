(function() {
    'use strict';

    /**
     * @fires SW.Radio#spritewerk/ready
     */
    function init() {
        SW.Radio.tuneOut(window, 'load', init);

        SW.MediaManager = new SW.MediaManager();

        /**
         * reports that the DOM and Spritewerk are ready
         *
         * @event SW.Radio#spritewerk/ready
         */
        SW.Radio.broadcast('spritewerk/ready');
    }

    SW.Radio.tuneIn(window, 'load', init);
}());