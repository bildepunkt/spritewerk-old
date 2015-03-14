var Play = function() {
    SW.Game.Scene.call(this);

    this.rows = 8;
    this.cols = 8;
    this.spaceSize = 64;
    this.pieceSize = 56;

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
    this.highlightColor = '#C64';

    this.piecesSprite = SW.Media.MediaManager.getImage('pieces');

    this.createBoard();

    this.addPieces();
};

Play.prototype.createBoard = function() {
    var evenOdd = 0;
    var lightColor = '#999';
    var darkColor = '#666';
    var rect;

    for(var c = 0; c < this.cols; c += 1) {
        evenOdd = evenOdd ? 0 : 1;
        for(var r = 0; r < this.rows; r += 1) {
            rect = new SW.Display.Rectangle()
                .dimensions(this.spaceSize, this.spaceSize)
                .fillColor(r % 2 === evenOdd ? lightColor : darkColor)
                .position(r * this.spaceSize, c * this.spaceSize);

            this.boardLayer.addItem('col' + c + 'row' +  r, rect);
        }
    }
};

Play.prototype.pressdown = function(e) {
    var piece = e.target;

    if (!piece.hasOwnProperty('type')) {
        return false;
    }

    this.displayMoves(piece.type, piece.col, piece.row);
};

Play.prototype.pressup = function() {
    this.removeMoves();
};

Play.prototype.displayMoves = function(type, col, row) {
    var colrow = 'col' + col + 'row' + row;
    var highlightSpace;
    var spaceNames;
    var i, len;

    switch(type) {
        case 'rukh':
            spaceNames = [
                'col' + col + 'row0',
                'col' + col + 'row1',
                'col' + col + 'row2',
                'col' + col + 'row3',
                'col' + col + 'row4',
                'col' + col + 'row5',
                'col' + col + 'row6',
                'col' + col + 'row7',
                'col0row' + row,
                'col1row' + row,
                'col2row' + row,
                'col3row' + row,
                'col4row' + row,
                'col5row' + row,
                'col6row' + row,
                'col7row' + row
            ];
        break;
    }

    // remove hightlight-space-name that piece is currently on
    for(i = 0, len = spaceNames.length; i < len; i += 1) {
        if (spaceNames[i] == colrow) {
            spaceNames.splice(i, 1);
        }
    }

    this.boardLayer.each(function(space, index, name) {
        for(i = 0, len = spaceNames.length; i < len; i += 1) {
            if (name == spaceNames[i]) {
                highlightSpace = new SW.Display.Rectangle()
                    .position(space.position().x, space.position().y)
                    .dimensions(this.spaceSize, this.spaceSize)
                    .fillColor(this.highlightColor)
                    .opacity(0.5);

                this.highlightLayer.addItem('_' + i, highlightSpace);
            }
        }
    }, this);
};

Play.prototype.removeMoves = function() {
    this.highlightLayer._items = [];
};

Play.prototype.addPieces = function() {
    this.darkRukhA = new SW.Display.Rectangle().position(8, 8).dimensions(48, 48);
    this.darkRukhA.type = 'rukh';
    this.darkRukhA.row = 0;
    this.darkRukhA.col = 0;

    this.darkRukhB = new SW.Display.Rectangle().position(456, 8).dimensions(48, 48);
    this.darkRukhB.type = 'rukh';
    this.darkRukhB.row = 7;
    this.darkRukhB.col = 0;

    this.darkPiecesLayer.addItem('darkRukhA', this.darkRukhA);
    this.darkPiecesLayer.addItem('darkRukhB', this.darkRukhB);

    this.lightRukhA = new SW.Display.Rectangle().position(8, 456).dimensions(48, 48).fillColor('#FFF');
    this.lightRukhA.type = 'rukh';
    this.lightRukhA.row = 0;
    this.lightRukhA.col = 7;

    this.lightRukhB = new SW.Display.Rectangle().position(456, 456).dimensions(48, 48).fillColor('#FFF');
    this.lightRukhB.type = 'rukh';
    this.lightRukhB.row = 7;
    this.lightRukhB.col = 7;

    this.lightPiecesLayer.addItem('lightRukhA', this.lightRukhA);
    this.lightPiecesLayer.addItem('lightRukhB', this.lightRukhB);
};