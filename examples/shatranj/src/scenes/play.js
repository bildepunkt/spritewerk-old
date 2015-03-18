var Play = function() {
    SW.Scene.call(this);

    this.spaceSize = 64;
    this.pieceSize = 36;
    this.piecePadding = (this.spaceSize - this.pieceSize) / 2;
    this.highlightColor = '#C64';
    this.holdingPiece = false;

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

Play.prototype = SW.Util.clone(SW.Scene.prototype);

Play.prototype.init = function() {
    this.addItem('board', new SW.Layer());
    this.addItem('highlight', new SW.Layer());
    this.addItem('lightPieces', new SW.Layer());
    this.addItem('darkPieces', new SW.Layer());

    this.boardLayer = this.getItem('board');
    this.highlightLayer = this.getItem('highlight');
    this.lightPiecesLayer = this.getItem('lightPieces');
    this.darkPiecesLayer = this.getItem('darkPieces');

    this.piecesSprite = SW.MediaManager.getImage('pieces');

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
            space = new SW.Rectangle()
                .dimensions(this.spaceSize, this.spaceSize)
                .fillColor(c % 2 === evenOdd ? lightColor : darkColor)
                .position(c * this.spaceSize, r * this.spaceSize);

            space.name = 'row' + r + 'col' + c;
            this.boardLayer.addItem(space.name, space);
        }
    }
};

Play.prototype.pressdown = function(e) {
    var piece = e.target;

    this.originSpace = this.boardLayer.getItem('row' + piece.row + 'col' + piece.col);

    if (!piece.hasOwnProperty('type')) {
        return false;
    }

    this.holdingPiece = true;

    this.showMoves(piece.type, piece.team, piece.col, piece.row);
};

Play.prototype.pressup = function(e) {
    var piece = e.target;

    if (!piece.hasOwnProperty('type') || !this.holdingPiece) {
        return false;
    }

    this.updatePiecePosition(e, piece);

    this.hideMoves();
};

Play.prototype.getCoordinatesFromName = function(name) {
    var coordinates = name.match(/\d/g);

    return coordinates.length === 2 ? {
        row: parseInt(coordinates[0], 10),
        col: parseInt(coordinates[1], 10)
    } : null;
};

Play.prototype.updatePiecePosition = function(e, piece) {
    var newCoordinates;
    var x, y;

    this.highlightLayer.each(function(potentialSpace) {
        if (SW.Util.hitPoint(e.x, e.y, potentialSpace)) {
            x = potentialSpace.position().x + this.piecePadding;
            y = potentialSpace.position().y + this.piecePadding;

            newCoordinates = this.getCoordinatesFromName(potentialSpace.name);

            this.map[piece.row][piece.col] = {
                type: 0
            };

            piece.row = newCoordinates.row;
            piece.col = newCoordinates.col;

            if (this.map[newCoordinates.row][newCoordinates.col].type !== 0) {
                if (piece.team === 0) {
                    this.lightPiecesLayer.removeItem('row' + newCoordinates.row + 'col' + newCoordinates.col);
                } else {
                    this.darkPiecesLayer.removeItem('row' + newCoordinates.row + 'col' + newCoordinates.col);
                }
            }

            this.map[newCoordinates.row][newCoordinates.col] = {
                type: piece.type,
                team: piece.team
            };

            return false;
        }
    }, this);

     if (x === undefined && y === undefined) {
        x = this.originSpace.position().x + this.piecePadding;
        y = this.originSpace.position().y + this.piecePadding;
    }

    piece.position(x, y);
};

Play.prototype.showMoves = function(type, team, pieceCol, pieceRow) {
    var r, c;

    switch(type) {
        case 1: // sarbaz
            r = pieceRow + (team === 0 ? 1 : -1);
            c = pieceCol;

            if (this.map[r][c].team !== team) {
                this.addHighlightSpace(r, c);
            }
        break;
        case 2: // rukh
            for (c = pieceCol + 1, r = pieceRow; c < this.cols; c += 1) {
                if (this.map[r][c].team !== team) {
                    this.addHighlightSpace(r, c);
                }
                
                if (this.map[r][c].type !== 0) {
                    break;
                }
            }
            for (c = pieceCol - 1, r = pieceRow; c > -1; c -= 1) {
                if (this.map[r][c].team !== team) {
                    this.addHighlightSpace(r, c);
                }
                
                if (this.map[r][c].type !== 0) {
                    break;
                }
            }
            for (r = pieceRow + 1, c = pieceCol; r < this.rows; r += 1) {
                if (this.map[r][c].team !== team) {
                    this.addHighlightSpace(r, c);
                }
                
                if (this.map[r][c].type !== 0) {
                    break;
                }
            }
            for (r = pieceRow - 1, c = pieceCol; r > -1; r -= 1) {
                if (this.map[r][c].team !== team) {
                    this.addHighlightSpace(r, c);
                }
                
                if (this.map[r][c].type !== 0) {
                    break;
                }
            }
        break;
    }
};

Play.prototype.addHighlightSpace = function(r, c) {
    var highlightPiece = new SW.Rectangle()
        .opacity(0.5)
        .fillColor(this.highlightColor)
        .position(c * this.spaceSize, r * this.spaceSize)
        .dimensions(this.spaceSize, this.spaceSize);

    highlightPiece.name = 'row' + r + 'col' + c;

    this.highlightLayer.addItem(highlightPiece.name, highlightPiece);
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
                piece = new SW.Rectangle()
                    .dimensions(this.pieceSize, this.pieceSize)
                    .position(c * this.spaceSize + this.piecePadding, r * this.spaceSize + this.piecePadding)
                    .draggable(true);

                piece.type = this.map[r][c].type;
                piece.team = this.map[r][c].team;
                piece.col = c;
                piece.row = r;

                console.log(piece.type, c, r);

                if (r < 2) {
                    piece.fillColor('#000');
                    this.darkPiecesLayer.addItem('row' + r + 'col' + c, piece);
                } else {
                    piece.fillColor('#FFF');
                    this.lightPiecesLayer.addItem('row' + r + 'col' + c, piece);
                }
            }
        }
    }
};
