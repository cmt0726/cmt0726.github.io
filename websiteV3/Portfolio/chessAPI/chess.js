class Chess {
    constructor() {
        this.hasMoved;
        this.board = [
            ['wRo','wKn','wBi','wQu','wKi','wBi','wKn','wRo'],
            ['wPa','wPa','wPa','wPa','wPa','wPa','wPa','wPa'],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            ['bPa','bPa','bPa','bPa','bPa','bPa','bPa','bPa'],
            ['bRo','bKn','bBi','bQu','bKi','bBi','bKn','bRo']
        ];

        this.turn = "white";

    }

    collision(endPos) {
        if(endPos) {
            return true;
        } else {
            return false;
        }
    }

    moveVertHorz(initPos, endPos) {
        let movingPiece = board.board[initPos[0]][initPos[1]].slice(1);
        let teamPiece = board.board[initPos[0]][initPos[1]][0];
        if(movingPiece != 'Qu' && movingPiece != 'Ro') {
            return 'invalid piece move!';
        }
        
            if(initPos[0] - endPos[0] == 0) { //moving left and right
                let distance = endPos[1] - initPos[1]; //get distance to figure out in which direction they're moving the piece
                if(distance > 0) { //moving right
                    for(let i = initPos[1]; i <= endPos[1]; i++) {//loop over the section of the board that they're trying to mvoe between
                        
                        if(board.board[0][i]) { //returns truthy value, i.e., theres a piece there
                            //check if it's a friendly piece or not
                            //define what friendly piece means
                            return "piece in the way";
                        }
                    }
                    board.board[initPos[0]][initPos[1]] = null;
                    board.board[endPos[0]][endPos[1]] = teamPiece+movingPiece;
                } else { //moving left
                    for(let i = endPos[1]; i < initPos[1]; i++) { //loop over the section of the board that they're trying to mvoe between

                        if(board.board[0][i]) {
                            console.log(board.board[0][i])
                            //check if it's a friendly piece or not
                            //define what friendly piece means
                            return "piece in the way";
                        }

                    }
                    board.board[initPos[0]][initPos[1]] = null;
                    board.board[endPos[0]][endPos[1]] = teamPiece+movingPiece;
                }
                
            } else { //moving up and down
                let distance = endPos[0] - initPos[0]; 
                if(distance > 0) { //moving up
                    for(let i = initPos[0]; i <= endPos[0]; i++) {//loop over the section of the board that they're trying to mvoe between
                        
                        if(board.board[i][initPos[1]]) { //returns truthy value, i.e., theres a piece there
                            //check if it's a friendly piece or not
                            //define what friendly piece means
                            return "piece in the way";
                        }
                    }
                    board.board[initPos[0]][initPos[1]] = null;
                    board.board[endPos[0]][endPos[1]] = teamPiece+movingPiece;
                } else { //moving down
                    for(let i = endPos[0]; i < initPos[0]; i++) {//loop over the section of the board that they're trying to mvoe between

                        if(board.board[i][initPos[1]]) {
                            //check if it's a friendly piece or not
                            //define what friendly piece means
                            console.log(board.board[i][initPos[1]])
                            return "piece in the way";
                        }

                    }
                    board.board[initPos[0]][initPos[1]] = null;
                    board.board[endPos[0]][endPos[1]] = teamPiece+movingPiece; //if all checks passed, set the endPos to that piece
                }

            }
            
    }

    moveDiag(initPos, endPos) {
        let movingPiece = board.board[initPos[0]][initPos[1]].slice(1);
        let teamPiece = board.board[initPos[0]][initPos[1]][0];

        if(movingPiece != 'Qu' && movingPiece != 'Bi') {
            return 'invalid piece move';
        }
        let vertDist = endPos[0] - initPos[0];
        let horzDist = endPos[1] - initPos[1];

        
            if(vertDist > 0 && horzDist > 0){ //up and to the right
                for(let i = initPos[0] + 1, j = initPos[1] + 1; i <= endPos[0]; i++, j++) {
                    if(board.board[i][j]) {
                        console.log(board.board[i][j])
                        return "piece in the way";
                    }
                }
                board.board[initPos[0]][initPos[1]] = null;
                board.board[endPos[0]][endPos[1]] = teamPiece+movingPiece;
            } else if(vertDist < 0 && horzDist > 0) {//down and to the right
                for(let i = initPos[0] - 1, j = initPos[1] + 1; i >= endPos[0]; i--, j++) {
                    if(board.board[i][j]) {
                        console.log(board.board[i][j])
                        return "piece in the way";
                    }
                }
                board.board[initPos[0]][initPos[1]] = null;
                board.board[endPos[0]][endPos[1]] = teamPiece+movingPiece;

            } else if(vertDist< 0 && horzDist< 0) {//down and to the left
                for(let i = initPos[0] - 1, j = initPos[1] - 1; i >= endPos[0]; i--, j--) {
                    if(board.board[i][j]) {
                        console.log(board.board[i][j])
                        return "piece in the way";
                    }
                }
                board.board[initPos[0]][initPos[1]] = null;
                board.board[endPos[0]][endPos[1]] = teamPiece+movingPiece;

            } else { //up and to the left
                for(let i = initPos[0] + 1, j = initPos[1] - 1; i <= endPos[0]; i++, j--) {
                    if(board.board[i][j]) {
                        console.log(board.board[i][j])
                        return "piece in the way";
                    }
                }
                board.board[initPos[0]][initPos[1]] = null;
                board.board[endPos[0]][endPos[1]] = teamPiece+movingPiece;

            }
        
    }

}

let board = new Chess();

class Pawn extends Chess {
    constructor(){
        super();
        //super.hasMoved = true;
        this.hasMoved = false; //temp for testing
    }
    move(initPos, endPos) {
        let movingPiece = board.board[initPos[0]][initPos[1]].slice(1);
        let teamPiece = board.board[initPos[0]][initPos[1]][0];

        //console.log(endPos[0])
        if(this.turn === "white") {
            if(!this.hasMoved) { //moved yet?
                if ((endPos[0] - initPos[0]) == 2) { // moving up the board 1 or 2
                    //console.log('suc')
                    if(board.board[initPos[0] + 1][initPos[1]]) {
                        return "Piece in the way - invalid move";
                    }
                    if(board.board[initPos[0] + 2][initPos[1]]) {
                        return "Piece in the way - invalid move";
                    }
                    board.board[initPos[0]][initPos[1]] = null;
                    board.board[endPos[0]][endPos[1]] = teamPiece + movingPiece;
                    
                } else if ((endPos[0] - initPos[0]) == 1) {
                    if(board.board[initPos[0] + 1][initPos[1]]) {
                        return "Piece in the way - invalid move";
                    }
                    board.board[initPos[0]][initPos[1]] = null;
                    board.board[endPos[0]][endPos[1]] = teamPiece + movingPiece;
                } else {
                    return "invalid move";
                }
                
            } else {
                if((endPos[0] - initPos[0]) == 1) { //moves up board just one spot
                    
                    board.board[endPos[0]][endPos[1]] = 'pawn';
                    
                } else {
                    return "invalid move";
                }
            }
        } else { //blacks turn
            if(!this.hasMoved) { //has this piece moved yet?
                
                if ((endPos[0] - initPos[0]) ==-2) { //moves down the board 2
                    if(board.board[initPos[0] - 2][initPos[1]]) {
                        return "Piece in the way - Invalid move";
                    }
                    board.board[initPos[0]][initPos[1]] = null;
                    board.board[endPos[0]][endPos[1]] = teamPiece+movingPiece;
                    
                } else if ((endPos[0] - initPos[0]) == -1 ) {
                    if(board.board[initPos[0] - 1][initPos[1]]) {
                        return "Piece in the way - Invalid move";
                    }
                    board.board[initPos[0]][initPos[1]] = null;
                    board.board[endPos[0]][endPos[1]] = teamPiece+movingPiece;
                } else {
                    return "Invalid move";
                }

            } else {
                
                if ((endPos[0] - initPos[0]) == -1) { //moves down just one
                    //console.log('suc')
                    board.board[endPos[0]][endPos[1]] = 'pawn';
                    
                } else {
                    return "invalid move";
                }
            }
        }
    }
}


//enable differences based on team
//remove original piece title
class Rook extends Chess {
    constructor(team) {
        super();
        this.team = team;
    }

    
    
}

class Bishop extends Chess {
    constructor(team) {
        super();
        this.team = team;
    }
}

class Queen extends Chess {
    constructor(team) {
        super();
        this.team = team;
    }
}

class Knight extends Chess{
    constructor() {
        super();
    }
    move(initPos, endPos) {
        let movingPiece = board.board[initPos[0]][initPos[1]].slice(1);
        let teamPiece = board.board[initPos[0]][initPos[1]][0];
        if(board.board[endPos[0]][endPos[1]]) {
            var endMovingPiece = board.board[endPos[0]][endPos[1]][0]
        }
        let fixedMoves = [[2, -1],[2,1],[1,2],[-1,2],[-2,1],[-2,-1],[1, -2], [-1, -2]];
        let vert = endPos[0] - initPos[0];
        let horz = endPos[1] - initPos[1];
        
        for(let i = 0; i < fixedMoves.length; i++) {
            
            if(fixedMoves[i][0] == vert && fixedMoves[i][1] == horz) {
                var foundMove = true;
                break;
            } else {
                var foundMove = false;
            }
        }

        if(!foundMove) return "invalid move - move outside of allowed moveset for Knight";

        if(board.board[endPos[0]][endPos[1]] && endMovingPiece != teamPiece){

            board.board[endPos[0]][endPos[1]] = teamPiece+movingPiece
            board.board[initPos[0]][initPos[1]] = null;

        } else if (board.board[endPos[0]][endPos[1]]) {
            return "invalid move - friendly piece in the way";
        } else {
            board.board[endPos[0]][endPos[1]] = teamPiece+movingPiece
            board.board[initPos[0]][initPos[1]] = null;
        }
        return "valid move was found";
    }
}

class King extends Chess {

    constructor() {
        super();
    }

    move(initPos, endPos) {

        let movingPiece = board.board[initPos[0]][initPos[1]].slice(1);
        let teamPiece = board.board[initPos[0]][initPos[1]][0];

        if(board.board[endPos[0]][endPos[1]]) {
            var endMovingPiece = board.board[endPos[0]][endPos[1]][0]
        }

        let vert = endPos[0] - initPos[0];
        let horz = endPos[1] - initPos[1];

        if(!((vert >= -1 && vert <=1) && (horz >= -1 && horz <= 1))) {
            return "invalid move - not in King moveset";
        }

        

        if(board.board[endPos[0]][endPos[1]] && teamPiece == endMovingPiece) {

            return "invalid move - friendly piece in the way";

        } else {
            board.board[endPos[0]][endPos[1]] = teamPiece+movingPiece
            board.board[initPos[0]][initPos[1]] = null;
        }

        return "a valid move was found";
    }
}

console.log(board.board)
let king = new King();

console.log(king.move([7,4],[7,3]));


console.log(board.board);