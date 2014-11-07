require([
    'spritewerk/game',
    'state/title',
    'data/title'
], function(Game, TitleState, titleData) {
    Game.start(TitleState, titleData);
});