(function() {
    'use strict';

    /**
     * @fires SW.Radio#spritewerk/ready
     */
    function init() {
        SW.Radio.tuneOut(window, 'load', init);

        SW.Util = new SW.Util();
        SW.Dom = new SW.Dom();
        SW.Canvas = new SW.Canvas();
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