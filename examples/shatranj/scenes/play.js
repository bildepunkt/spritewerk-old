var Play = function() {
    SW.Game.Scene.call(this);

    this.spaceSize = 64;
    this.pieceSize = 36;
    this.piecePadding = (this.spaceSize - this.pieceSize) / 2;
    this.highlightColor = '#C64';

    this.legend = ['', 'sarbaz', 'rukh', 'asb', 'pil', 'fers', 'shah'];
    this.map = [
        [{type: 2, team: 0}, {type: 3, team: 0}, {type: 4, team: 0}, {type: 6, team: 0}, {type: 5, team: 0}, {type: 4, team: 0}, {type: 3, team: 0}, {type: 2, team: 0}],
        [{type: 1, team: 0}, {type: 1, team: 0}, {type: 1, team: 0}, {type: 1, team: 0}, {type: 1, team: 0}, {type: 1, team: 0}, {type: 1, team: 0}, {type: 1, team: 0}],
        [{type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}],
        [{type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}],
        [{type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}],
        [{type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}],
        [{type: 1, team: 1}, {type: 1, team: 1}, {type: 1, team: 1}, {type: 1, team: 1}, {type: 1, team: 1}, {type: 1, team: 1}, {type: 1, team: 1}, {type: 1, team: 1}],
        [{type: 2, team: 1}, {type: 3, team: 1}, {type: 4, team: 1}, {type: 5, team: 1}, {type: 6, team: 1}, {type: 4, team: 1}, {type: 3, team: 1}, {type: 2, team: 1}]
    ];

    this.rows = this.map.length;
    this.cols = this.map[0].length;

    /*this.assets({
        pieces: 'images/chess-pieces.png'
    });*/
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

    this.originSpace = this.boardLayer.getItem('row' + piece.row + 'col' + piece.col);

    if (!piece.hasOwnProperty('type')) {
        return false;
    }

    this.showMoves(piece.type, piece.team, piece.col, piece.row);
};

Play.prototype.pressup = function(e) {
    var piece = e.target;
    var x, y;

    if (!piece.hasOwnProperty('type')) {
        return false;
    }

    this.highlightLayer.each(function(potentialSpace) {
        if (SW.Common.Util.hitPoint(e.x, e.y, potentialSpace)) {
            x = potentialSpace.position().x + this.piecePadding;
            y = potentialSpace.position().y + this.piecePadding;
        }
    }, this);

     if (x === undefined && y === undefined) {
        x = this.originSpace.position().x + this.piecePadding;
        y = this.originSpace.position().y + this.piecePadding;
    }

    piece.position(x, y);

    this.hideMoves();
};

Play.prototype.showMoves = function(type, team, pieceCol, pieceRow) {
    var r, c;

    switch(type) {
        case 'sarbaz':
            r = pieceRow + (team === 0 ? 1 : -1);
            c = pieceCol;
            if (this.map[r][c].type === 0) {
                this.addHighlightSpace(r, c);
            }
        break;
        case 'rukh':
            for (c = pieceCol + 1, r = pieceRow; c < this.cols; c += 1) {
                if (this.map[r][c].type !== 0) {
                    break;
                } else {
                    this.addHighlightSpace(r, c);
                }
            }
            for (c = pieceCol - 1, r = pieceRow; c > -1; c -= 1) {
                if (this.map[r][c].type !== 0) {
                    break;
                } else {
                    this.addHighlightSpace(r, c);
                }
            }
            for (r = pieceRow + 1, c = pieceCol; r < this.rows; r += 1) {
                if (this.map[r][c].type !== 0) {
                    break;
                } else {
                    this.addHighlightSpace(r, c);
                }
            }
            for (r = pieceRow - 1, c = pieceCol; r > -1; r -= 1) {
                if (this.map[r][c].type !== 0) {
                    break;
                } else {
                    this.addHighlightSpace(r, c);
                }
            }
        break;
    }
};

Play.prototype.addHighlightSpace = function(r, c) {
    this.highlightLayer.addItem(
        'row' + r + 'col' + c,
        new SW.Display.Rectangle()
            .opacity(0.5)
            .fillColor(this.highlightColor)
            .position(c * this.spaceSize, r * this.spaceSize)
            .dimensions(this.spaceSize, this.spaceSize)
    );
};

Play.prototype.hideMoves = function() {
    this.highlightLayer.removeAllItems();
};

Play.prototype.addPieces = function() {
    var piece;
    var key;

    for(var r = 0; r < this.rows; r += 1) {
        for(var c = 0; c < this.cols; c += 1) {
            if (this.map[r][c].type !== 0) {
                piece = new SW.Display.Rectangle()
                    .dimensions(this.pieceSize, this.pieceSize)
                    .position(c * this.spaceSize + this.piecePadding, r * this.spaceSize + this.piecePadding)
                    .draggable(true);

                piece.type = this.legend[this.map[r][c].type];
                piece.team = this.map[r][c].team;
                piece.col = c;
                piece.row = r;

                console.log(piece.type, c, r);

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
