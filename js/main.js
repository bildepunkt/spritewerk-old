require([
    'spritewerk/game',
    'state/play',
    'data/play'
], function(Game, PlayState, playData) {
    Game.start(PlayState, playData);
});