(function() {
    'use strict';

    function init() {
        radio.tuneOut(window, 'load', init);

        SW.MediaManager = new SW.MediaManager();
        SW.Dom = new SW.Dom();
        SW.Canvas = new SW.Canvas();
        SW.Draw = new SW.Draw();
        SW.Collision = new SW.Collision();
        SW.Input = new SW.Input();
        SW.FSM = new SW.FSM();
        SW.Game = new SW.Game();

        radio.broadcast('spritewerkready');
    }

    radio.tuneIn(window, 'load', init);
}());