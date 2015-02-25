(function() {
    'use strict';

    function init() {
        SW.Radio.tuneOut('spritewerk/ready', init);

        SW.Radio.tuneIn('preload/complete', function() {
            console.log('PreCom');
        });

        SW.MediaManager.preload({
            ghost: 'img/Ghost.png'
        });
    }

    SW.Radio.tuneIn('spritewerk/ready', init);
}());