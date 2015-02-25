(function() {
    'use strict';

    function init() {
        SW.Radio.tuneOut('spritewerk/ready', init);

        SW.Radio.tuneIn('preload/complete', function() {
            var sprite = new SW.Sprite();
            sprite.setImage(SW.MediaManager.getImage('ghost'));
        });

        SW.MediaManager.preload({
            ghost: 'img/Ghost.png'
        });
    }

    SW.Radio.tuneIn('spritewerk/ready', init);
}());