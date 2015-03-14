var Play = function() {
    SW.Game.Scene.call(this);

    this.spaceSize = 64;
    this.pieceSize = 48;
    this.highlightColor = '#C64';

    this.legend = ['', 'sarbaz', 'rukh', 'asb', 'pil', 'fers', 'shah'];
    this.map = [
        [2, 3, 4, 6, 5, 4, 3, 2],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [2, 3, 4, 5, 6, 4, 3, 2],
    ];

    this.rows = this.map.length;
    this.cols = this.map[0].length;

    this.assets({
        pieces: 'images/chess-pieces.png'
    });
};

Play.prototype = SW.Game.Scene.prototype;

Play.prototype.init = function() {
    this.addItem('board', new SW.Game.Layer());
    this.addItem('highlight', new SW.Game.Layer());
    this.addItem('lightPieces', new SW.Game.Layer());
    this.addItem('darkPieces', new SW.Game.Layer());

    this.boardLayer = this.getItem('board');
    this.highlightLayer = this.getItem('highlight');
    this.lightPiecesLayer = this.getItem('lightPieces');
    this.darkPiecesLayer = this.getItem('darkPieces');

    this.piecesSprite = SW.Media.MediaManager.getImage('pieces');

    this.createBoard();

    this.addPieces();
};

Play.prototype.createBoard = function() {
    var evenOdd = 0;
    var lightColor = '#999';
    var darkColor = '#666';
    var space;

    for(var r = 0; r < this.rows; r += 1) {
        evenOdd = evenOdd ? 0 : 1;
        for(var c = 0; c < this.cols; c += 1) {
            space = new SW.Display.Rectangle()
                .dimensions(this.spaceSize, this.spaceSize)
                .fillColor(c % 2 === evenOdd ? lightColor : darkColor)
                .position(c * this.spaceSize, r * this.spaceSize);

            this.boardLayer.addItem('row' + r + 'col' + c, space);
        }
    }
};

Play.prototype.pressdown = function(e) {
    var piece = e.target;

    if (!piece.hasOwnProperty('type')) {
        return false;
    }

    this.showMoves(piece.type, piece.col, piece.row);
};

Play.prototype.pressup = function() {
    this.hideMoves();
};

Play.prototype.showMoves = function(type, col, row) {
    
};

Play.prototype.hideMoves = function() {
    this.highlightLayer.removeAllItems();
};

Play.prototype.addPieces = function() {
    var piece;
    var key;

    for(var r = 0; r < this.rows; r += 1) {
        for(var c = 0; c < this.cols; c += 1) {
            if (this.map[r][c]) {
                piece = new SW.Display.Rectangle()
                    .dimensions(this.pieceSize, this.pieceSize)
                    .position(c * this.spaceSize + 8, r * this.spaceSize + 8)
                    .draggable(true);

                piece.type = this.legend[this.map[r][c]];
                console.log(piece.type);

                if (r < 2) {
                    piece.fillColor('#000');
                    this.darkPiecesLayer.addItem('col' + c + 'row' + r, piece);
                } else {
                    piece.fillColor('#FFF');
                    this.lightPiecesLayer.addItem('col' + c + 'row' + r, piece);
                }
            }
        }
    }
};
