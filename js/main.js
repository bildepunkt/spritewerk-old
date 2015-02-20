(function() {
    'use strict';

    function init() {
        SW.Radio.tuneOut('spritewerkready', init);

        SW.Game.start('desktop', MyGame.Menu);
    }

    SW.Radio.tuneIn('spritewerkready', init);
}());