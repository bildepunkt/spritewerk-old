(function() {
    'use strict';

    function init() {
        radio.tuneOut('spritewerkready', init);

        SW.Game.start('desktop', MyGame.Menu);
    }

    radio.tuneIn('spritewerkready', init);
}());