class Chess {
    constructor() {
        this.blackRookKingMoved = false
        this.whiteRookKingMoved = false
        this.turnCounter = 0;
        this.hasMoved;
        this.board = [
            ['wRo','wKn','wBi','wQu','wKI','wBi','wKn','wRo'],
            ['wPa','wPa','wPa','wPa','wPa','wPa','wPa','wPa'],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            ['bPa','bPa','bPa','bPa','bPa','bPa','bPa','bPa'],
            ['bRo','bKn','bBi','bQu','bKI','bBi',"bKn",'bRo']
        ];

        this.turn = "white";
        this.kingPos = {
            white : {
                y : 0,
                x : 4
            },
            black : {
                y : 3,
                x : 4
            }
        }

    }

    //Bool : returns if King is in Checkmate
    isCheckMate() {
        let kingTeamCheck = this.kingInCheck(true);
        if(kingTeamCheck[0]) {
            
            //an array of possible tile directions the king could go to to escape Check
            let moveRange = [
                [1,1],[1,0],[1,-1],[0,1],[0,-1],[-1,-1],[-1,0],[-1,1]
            ]
            if(kingTeamCheck[1] == 'b') {

            
                for(let i = 0; i < moveRange.length; i++) {
                    
                    let kingx = this.kingPos.black.x;
                    let kingy = this.kingPos.black.y;
                    let x1 = moveRange[i][1];
                    let y1 = moveRange[i][0];
                    if(king.move([kingy, kingx],[kingy + y1, kingx + x1], false)) {
                        let potPiece = board.board[kingy + y1][kingx + x1]
                        this.kingPos.black.x = kingx + x1;
                        this.kingPos.black.y = kingy + y1;

                        board.board[kingy + y1][kingx + x1] = 'bKi';
                        board.board[kingy][kingx] = null;

                        let tempKingCheck = this.kingInCheck(true)

                        board.board[kingy][kingx] = 'bKi';
                        board.board[kingy + y1][kingx + x1] = potPiece;

                        this.kingPos.black.x = kingx;
                        this.kingPos.black.y = kingy;
                        if(tempKingCheck[0]) {
                            continue
                        } else {
                            return false;
                        }
                    } else {
                        continue;
                    }
                }
                return [true, 'b'];
            } else if(kingTeamCheck[1] == 'w') {
                for(let i = 0; i < moveRange.length; i++) {
                    
                    let kingx = this.kingPos.white.x;
                    let kingy = this.kingPos.white.y;
                    let x1 = moveRange[i][1];
                    let y1 = moveRange[i][0];
                    if(king.move([kingy, kingx],[kingy + y1, kingx + x1], false)) {
                        let potPiece = board.board[kingy + y1][kingx + x1]
                        this.kingPos.white.x = kingx + x1;
                        this.kingPos.white.y = kingy + y1;

                        board.board[kingy + y1][kingx + x1] = 'wKi';
                        board.board[kingy][kingx] = null;

                        let tempKingCheck = this.kingInCheck(true)

                        board.board[kingy][kingx] = 'wKi';
                        board.board[kingy + y1][kingx + x1] = potPiece;

                        this.kingPos.white.x = kingx;
                        this.kingPos.white.y = kingy;
                        if(tempKingCheck[0]) {
                            continue
                        } else {
                            return false;
                        }
                    } else {
                        continue;
                    }
                }
                return [true, 'w'];
            }
            
        }

    }

    //Bool : mutates Chess.board and returns if castling was successful
    castling(pos, endPos) {
        let [y1, x1] = pos;
        let [y2, x2] = endPos;
        if(this.turn == "white") {
            
            if(!this.whiteRookKingMoved) {

                if(x1 - x2 == -2) {
                    
                    if(board.board[0][7] != 'wRo') return "invalid Move - there's no rook to castle"

                    for(let i = x1+1; i < x2; i++) {
                        if(board.board[y1][i]) {
                            return "invalid move - piece in the way"
                        }
                    }
                    board.board[0][7] = null
                    board.board[y1][x1] = null;
                    board.board[y2][x2] = 'wKi';
                    board.board[y1][x1 + 1] = 'wRo'
                    this.turn = this.turn == "white" ? 'black' : "white";
                    return true;
                } else if(x1 - x2 == 3) {

                    if(board.board[0][0] != 'wRo') return "invalid Move - there's no rook to castle"
                    
                    for(let i = x1-1; i > x2; i--) {
                        if(board.board[y1][i]) {
                            return "invalid move - piece in the way"
                        }
                    }
                    board.board[0][0] = null
                    board.board[y1][x1] = null;
                    board.board[y2][x2] = 'wKi';
                    board.board[y1][x1 - 2] = 'wRo'
                    this.turn = this.turn == "white" ? 'black' : "white";
                    return true;
                } else {
                    return "invalid move - not a proper castling"
                }
            } else if(this.whiteRookKingMoved) {
                return "can\'t castle king or rook have already moved";
            }
        } else if (this.turn == "black") {
            if(!this.blackRookKingMoved) {
                

                if(x1 - x2 == -2) {
                    
                    if(board.board[7][7] != 'bRo') return "invalid Move - there's no rook to castle"

                    for(let i = x1+1; i < x2; i++) {
                        if(board.board[y1][i]) {
                            return "invalid move - piece in the way"
                        }
                    }
                    board.board[7][7] = null
                    board.board[y1][x1] = null;
                    board.board[y2][x2] = 'bKi';
                    board.board[y1][x1 + 1] = 'bRo'
                    this.turn = this.turn == "white" ? 'black' : "white";
                    return true;
                } else if(x1 - x2 == 3) {

                    if(board.board[7][0] != 'bRo') return "invalid Move - there's no rook to castle"
                    
                    for(let i = x1-1; i > x2; i--) {
                        if(board.board[y1][i]) {
                            return "invalid move - piece in the way"
                        }
                    }
                    board.board[7][0] = null
                    board.board[y1][x1] = null;
                    board.board[y2][x2] = 'bKi';
                    board.board[y1][x1 - 2] = 'bRo'
                    this.turn = this.turn == "white" ? 'black' : "white";
                    return true;
                } else {
                    return "invalid move - not a proper castling"
                }
            } else if(this.blackRookKingMoved){
                return "can\'t castle, have already moved"
            }
        }
    }
    tertMoveChecker(initPos, endPos, flag = true) {
        let movingPiece = board.board[initPos[0]][initPos[1]].slice(1);
        let teamPiece = board.board[initPos[0]][initPos[1]][0];
        
        let endMovingPiece = (board.board[endPos[0]][endPos[1]]) ? board.board[endPos[0]][endPos[1]][0] : null
        let endPiece = (board.board[endPos[0]][endPos[1]]) ? board.board[endPos[0]][endPos[1]] : null

        board.board[initPos[0]][initPos[1]] = null;
        board.board[endPos[0]][endPos[1]] = teamPiece+movingPiece;
        let kingCheck = flag ? this.kingInCheck() : null;
        if(kingCheck[0]) {
            board.board[initPos[0]][initPos[1]] = teamPiece+movingPiece;
            board.board[endPos[0]][endPos[1]] = endMovingPiece ? endMovingPiece+endPiece : null;
            return true
        }
    }
    
    kingInCheck(checkMateCall = false) {

        
        //gets current king position for both black and white
        if(!checkMateCall) { 
            for(let i = 0; i < board.board.length; i++) {
                for(let j = 0; j < board.board[i].length; j++) {
                    if(board.board[i][j]) {
                        if(board.board[i][j].endsWith('I') && board.board[i][j][0] == 'w') {
                            this.kingPos.white.y = i;
                            this.kingPos.white.x = j;
                        } else if (board.board[i][j].endsWith('I') && board.board[i][j][0] == 'b') {
                            this.kingPos.black.y = i;
                            this.kingPos.black.x = j;
                        }
                    }

                }
            }
        }
        
        let whitePos = this.kingPos.white
        let blackPos = this.kingPos.black
        for(let i = 0; i < board.board.length; i++) {
            for(let j = 0; j < board.board[i].length; j++) {
                switch(board.board[i][j]) {
                    case "bPa":
                        if( pawn.move([i,j],[whitePos.y,whitePos.x],false) == true) {
                            console.log(board.board[i][j], i, j)
                            return [true, 'w']
                        }
                        break
                    case "bKn":
                        if( knight.move([i,j],[whitePos.y,whitePos.x],false) == true) {
                            console.log(board.board[i][j], i, j)
                            return [true, 'w']
                        }
                        break
                    case "bQu":
                        if( queen.moveVertHorz([i,j],[whitePos.y,whitePos.x],false) == true ||  queen.moveDiag([i,j],[whitePos.y,whitePos.x],false) == true) {
                            console.log(board.board[i][j], i, j)
                            return [true, 'w']
                        }
                        break;
                    case "bBi":
                        if( bishop.moveDiag([i,j],[whitePos.y,whitePos.x],false) == true) {
                            console.log(board.board[i][j], i, j)
                            return [true, 'w']
                        }
                        break;
                    case "bRo":
                        if( rook.moveVertHorz([i,j],[whitePos.y,whitePos.x],false) == true) {
                            console.log(board.board[i][j], i, j)
                            return [true, 'w']
                        }
                        break;
                    //now checking for white pieces against black King
                    case "wPa":
                        if( pawn.move([i,j],[blackPos.y,blackPos.x],false) == true) {
                            console.log(board.board[i][j], i, j)
                            return [true, 'b']
                        }
                        break
                    case "wKn":
                        if( knight.move([i,j],[blackPos.y,blackPos.x],false) == true) {
                            console.log(board.board[i][j], i, j)
                            return [true, 'b']
                        }
                        break
                    case "wQu":
                        if( queen.moveVertHorz([i,j],[blackPos.y,blackPos.x],false) == true ||  queen.moveDiag([i,j],[blackPos.y,blackPos.x],false) == true) {
                            console.log(board.board[i][j], i, j)
                            return [true, 'b']
                        }
                        break;
                    case "wBi":
                        if( bishop.moveDiag([i,j],[blackPos.y,blackPos.x],false) == true) {
                            console.log(board.board[i][j], i, j)
                            return [true, 'b']
                        }
                        break;
                    case "wRo":
                        if( rook.moveVertHorz([i,j],[blackPos.y,blackPos.x],false) == true) {
                            console.log(board.board[i][j], i, j)
                            return [true, 'b']
                        }
                        break;
                }
            }
        }
        return [false, null]
    }

     moveVertHorz(initPos, endPos, flag = true) {
        let kingCheck;
        kingCheck = flag ? this.kingInCheck() : null;
        let movingPiece = board.board[initPos[0]][initPos[1]].slice(1);
        let teamPiece = board.board[initPos[0]][initPos[1]][0];
        
        let endMovingPiece = (board.board[endPos[0]][endPos[1]]) ? board.board[endPos[0]][endPos[1]][0] : null
        let endPiece = (board.board[endPos[0]][endPos[1]]) ? board.board[endPos[0]][endPos[1]] : null
        

        let vertDist = endPos[0] - initPos[0];
        let horzDist = endPos[1] - initPos[1];
        
        if(movingPiece != 'Qu' && movingPiece != 'Ro') {
            return 'invalid piece move!';
        }
        
            if(initPos[0] - endPos[0] == 0) { //moving left and right
                let distance = endPos[1] - initPos[1]; //get distance to figure out in which direction they're moving the piece
                if(distance > 0) { //moving right
                    for(let i = initPos[1]; i <= endPos[1]; i++) {//loop over the section of the board that they're trying to mvoe between
                        endMovingPiece = (board.board[initPos[0]][i + 1]) ? board.board[initPos[0]][i + 1][0] : null
                        if(board.board[initPos[0]][i] && teamPiece == endMovingPiece) { //returns truthy value, i.e., theres a piece there
                            
                            return " friendly piece in the way";
                        } else if (board.board[initPos[0]][i] && teamPiece != endMovingPiece) {
                            if(flag) {
                                return !this.tertMoveChecker(initPos, endPos)
                            }
                            this.turn = this.turn == "white" ? 'black' : "white";
                            return true; 
                        } 
                    }
                } else { //moving left
                    for(let i = endPos[1]; i < initPos[1]; i++) { //loop over the section of the board that they're trying to mvoe between
                        endMovingPiece = (board.board[initPos[0]][i + 1]) ? board.board[initPos[0]][i + 1][0] : null
                        if(board.board[endPos[0]][i] && teamPiece == endMovingPiece) {
                            
                            return "piece in the way";
                        } else if (board.board[initPos[0]][i] && teamPiece != endMovingPiece) {
                            if(flag) {
                                return !this.tertMoveChecker(initPos, endPos)
                            }
                            this.turn = this.turn == "white" ? 'black' : "white";
                            return true;
                        }
                    }
                }
                
            } else if(horzDist == 0){ //moving up and down
                let distance = endPos[0] - initPos[0]; 
                if(distance > 0) { //moving up
                    for(let i = initPos[0]; i <= endPos[0]; i++) {//loop over the section of the board that they're trying to mvoe between
                        endMovingPiece = (board.board[i + 1][initPos[1]]) ? board.board[i + 1][initPos[1]][0] : null
                        if(board.board[i][initPos[1]] && teamPiece == endMovingPiece) { //returns truthy value, i.e., theres a piece there
                            
                            return "piece in the way";
                        } else if(board.board[i][initPos[1]] && teamPiece != endMovingPiece) {
                            if(flag) {
                                return !this.tertMoveChecker(initPos, endPos)
                            }
                            this.turn = this.turn == "white" ? 'black' : "white";
                            return true;
                        }
                    }
                    
                } else { //moving down
                    for(let i = endPos[0]; i < initPos[0]; i++) {//loop over the section of the board that they're trying to mvoe between
                        endMovingPiece = (board.board[i + 1][initPos[1]]) ? board.board[i + 1][initPos[1]][0] : null
                        if(board.board[i][initPos[1]] && teamPiece == endMovingPiece) { //returns truthy value, i.e., theres a piece there
                                
                            return "piece in the way";
                        } else if(board.board[i][initPos[1]] && teamPiece != endMovingPiece) {
                            if(flag) {
                                return !this.tertMoveChecker(initPos, endPos)
                            }
                            this.turn = this.turn == "white" ? 'black' : "white";
                            return true;
                        }

                    } //if all checks passed, set the endPos to that piece
                }

            } else {
                return "invalid move";
            }
            this.turnCounter++;
            if(movingPiece == 'Ro') {
                if (teamPiece == 'w') {
                    this.whiteRookKingMoved = true
                } else if (teamPiece == 'b') {
                    this.blackRookKingMoved = true
                }
            }
            this.turn = this.turn == "white" ? 'black' : "white";
            return true;
            
    }

     moveDiag(initPos, endPos, flag = true) {
        let kingCheck;
        kingCheck = flag ? this.kingInCheck() : null;
        let movingPiece = board.board[initPos[0]][initPos[1]].slice(1);
        let teamPiece = board.board[initPos[0]][initPos[1]][0];
        
        let endMovingPiece = (board.board[endPos[0]][endPos[1]]) ? board.board[endPos[0]][endPos[1]][0] : null
        let endPiece = (board.board[endPos[0]][endPos[1]]) ? board.board[endPos[0]][endPos[1]] : null

        if(movingPiece != 'Qu' && movingPiece != 'Bi') {
            return 'invalid piece move';
        }

        let vertDist = endPos[0] - initPos[0];
        let horzDist = endPos[1] - initPos[1];
        if(vertDist/horzDist != 1 && vertDist/horzDist != -1) return "invalid move";
        
            if(vertDist > 0 && horzDist > 0){ //up and to the right
                for(let i = initPos[0] + 1, j = initPos[1] + 1; i <= endPos[0]; i++, j++) {
                    if(board.board[i][j] && teamPiece == endMovingPiece) {
                        return "invalid move - friendly collision";
                    } else if (board.board[i][j] && teamPiece != endMovingPiece) {
                        if(flag) {
                            return !this.tertMoveChecker(initPos, endPos)
                        }
                        this.turn = this.turn == "white" ? 'black' : "white";
                        return true;
                    }
                }
                
            } else if(vertDist < 0 && horzDist > 0) {//down and to the right
                for(let i = initPos[0] - 1, j = initPos[1] + 1; i >= endPos[0]; i--, j++) {
                    if(board.board[i][j] && teamPiece == endMovingPiece) {
                        //console.log(board.board[i][j])
                        return "invalid move - friendly collision";
                    } else if(board.board[i][j] && teamPiece != endMovingPiece) {
                        if(flag) {
                            return !this.tertMoveChecker(initPos, endPos)
                        }
                        this.turn = this.turn == "white" ? 'black' : "white";
                        return true;
                    }
                }
                

            } else if(vertDist< 0 && horzDist< 0) {//down and to the left
                for(let i = initPos[0] - 1, j = initPos[1] - 1; i >= endPos[0]; i--, j--) {
                    if(board.board[i][j] && teamPiece == endMovingPiece) {
                        //console.log(board.board[i][j])
                        return "invalid move - friendly collision";
                    } else if(board.board[i][j] && teamPiece != endMovingPiece) {
                        if(flag) {
                            return !this.tertMoveChecker(initPos, endPos)
                        }
                        this.turn = this.turn == "white" ? 'black' : "white";
                        return true;
                    }
                }

            } else { //up and to the left
                for(let i = initPos[0] + 1, j = initPos[1] - 1; i <= endPos[0]; i++, j--) {
                    if(board.board[i][j] && teamPiece == endMovingPiece) {
                        //console.log(board.board[i][j])
                        return "invalid move - friendly collision";
                    } else if(board.board[i][j] && teamPiece != endMovingPiece) {
                        if(flag) {
                            return !this.tertMoveChecker(initPos, endPos)
                        }
                        this.turn = this.turn == "white" ? 'black' : "white";
                        return true;
                    }
                }

            }
        this.turnCounter++;
        return true;
    }
    

    }

    

    class Pawn extends Chess {
        constructor(){
            super();
            
        }
        move(initPos, endPos, flag = true) {
            let kingCheck;
            kingCheck = flag ? this.kingInCheck() : null;
            let movingPiece = board.board[initPos[0]][initPos[1]].slice(1);
            let teamPiece = board.board[initPos[0]][initPos[1]][0];
            
            let endMovingPiece = (board.board[endPos[0]][endPos[1]]) ? board.board[endPos[0]][endPos[1]][0] : null
            let endPiece = (board.board[endPos[0]][endPos[1]]) ? board.board[endPos[0]][endPos[1]] : null

            let vertDist = endPos[0] - initPos[0];
            let horzDist = endPos[1] - initPos[1];

            if(vertDist != 1 && vertDist != -1) {
                return "invalid move"
            }
            if(!(horzDist >= -1 && horzDist <= 1)) {
                return "invalid move";
            }
            if (flag) {
                if(!this.kingInCheck()){
                    console.log("not in check :)")
                }
            }

            //console.log(endPos[0])
            if(teamPiece == 'w') {
                
                if(initPos[0] == 1) { //moved yet?
                    
                    if ((endPos[0] - initPos[0]) == 2 && (endPos[1] - initPos[1]) == 0) { // moving up the board 1 or 2
                        
                        if(board.board[initPos[0] + 1][initPos[1]]) {
                            return "Piece in the way - invalid move";
                        }
                        if(board.board[initPos[0] + 2][initPos[1]]) {
                            return "Piece in the way - invalid move";
                        }
                        if(flag) {
                            return !this.tertMoveChecker(initPos, endPos)
                        }
                        this.turn = this.turn == "white" ? 'black' : "white";
                        return true
                        
                    } else if ((endPos[0] - initPos[0]) == 1 && ((endPos[1] - initPos[1]) == 0)) {
                        
                        if(board.board[initPos[0] + 1][initPos[1]]) {
                            return "Piece in the way - invalid move";
                        }

                        if(flag) {
                            return !this.tertMoveChecker(initPos, endPos)
                        }
                        this.turn = this.turn == "white" ? 'black' : "white";
                        return true

                    } else if ((endPos[0] - initPos[0]) == 1 && (endPos[1] - initPos[1] == -1 || (endPos[1]) - initPos[1]) == 1) {
                        
                        if(board.board[endPos[0] + 1][endPos[1]] && endMovingPiece == 'b') {
                            if(flag) {
                                return !this.tertMoveChecker(initPos, endPos)
                            }
                            this.turn = this.turn == "white" ? 'black' : "white";
                            return true
                        } else {
                            return "invalid move";
                        }

                    }
                    return "invalid move";
                    
                } else {
                    if((endPos[0] - initPos[0]) == 1 && (endPos[1] - initPos[1]) == 0) { //moves up board just one spot
                        
                        if(board.board[endPos[0]][endPos[1]]) {
                            return "invalid Move";
                        } else {
                            if(flag) {
                                return !this.tertMoveChecker(initPos, endPos)
                            }
                            this.turn = this.turn == "white" ? 'black' : "white";
                            return true
                        }
                        
                    } else if((endPos[0] - initPos[0]) == 1 && ((endPos[1] - initPos[1]) == 1 || ((endPos[1] - initPos[1]) == -1))) {
                        if(board.board[endPos[0]][endPos[1]] && endMovingPiece == 'b') {
                            if(flag) {
                                return !this.tertMoveChecker(initPos, endPos)
                            }
                            this.turn = this.turn == "white" ? 'black' : "white";
                            return true
                        } else {
                            return "invalid move - friendly piece";
                        }
                    } 
                    return "invalid move"
                }
            } else { //blacks turn

                if(initPos[0] == 6) { //moved yet?

                    if ((endPos[0] - initPos[0]) == -2 && (endPos[1] - initPos[1]) == 0) { // moving up the board 1 or 2
                        
                        if(board.board[initPos[0] - 1][initPos[1]]) {
                            return "Piece in the way - invalid move";
                        }
                        if(board.board[initPos[0] - 2][initPos[1]]) {
                            return "Piece in the way - invalid move";
                        }
                        if(flag) {
                            return !this.tertMoveChecker(initPos, endPos)
                        }
                        this.turn = this.turn == "white" ? 'black' : "white";
                        return true
                        
                    } else if ((endPos[0] - initPos[0]) == -1 && (endPos[1] - initPos[1]) == 0) {

                        if(board.board[initPos[0] - 2][initPos[1]]) {
                            return "Piece in the way - invalid move";
                        }

                        if(flag) {
                            return !this.tertMoveChecker(initPos, endPos)
                        }
                        this.turn = this.turn = "white" ? 'black' : "white";
                        return true;

                    } else if ((endPos[0] - initPos[0]) == -1 && ((endPos[1] - initPos[1] == -1 || (endPos[1]) - initPos[1]) == 1)) {
                        if(board.board[endPos[0]][endPos[1]] && endMovingPiece == 'w') {
                            if(flag) {
                                return !this.tertMoveChecker(initPos, endPos)
                            }
                            this.turn = this.turn == "white" ? 'black' : "white";
                            return true
                        } else {
                            return "invalid move";
                        }

                    }
                    return "invalid move";
                    
                } else {
                    if((endPos[0] - initPos[0]) == -1 && (endPos[1] - initPos[1]) == 0) { //moves up board just one spot
                        
                        if(board.board[endPos[0]][endPos[1]]) {
                            return "invalid Move";
                        } else {
                            if(flag) {
                                return !this.tertMoveChecker(initPos, endPos)
                            }
                            this.turn = this.turn == "white" ? 'black' : "white";
                            return true
                        }
                        
                    } else if((endPos[0] - initPos[0]) == -1 && ((endPos[1] - initPos[1]) == 1 || ((endPos[1] - initPos[1]) == -1))) {
                        if(board.board[endPos[0]][endPos[1]] && endMovingPiece == 'w') {
                            if(flag) {
                                return !this.tertMoveChecker(initPos, endPos)
                            }
                            this.turn = this.turn == "white" ? 'black' : "white";
                            return true
                        } else {
                            return "invalid move - friendly piece";
                        }
                    } 
                    
                }
                
            }
            this.turn = this.turn == "white" ? 'black' : "white";
            this.turnCounter++;
            return true;
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
        move(initPos, endPos, flag = true) {
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

                if(flag) {
                    this.turn = this.turn == "white" ? 'black' : "white";
                    return !this.tertMoveChecker(initPos, endPos)
                }

            } else if (board.board[endPos[0]][endPos[1]]) {
                return "invalid move - friendly piece in the way";
            } else {
                if(flag) {
                    this.turn = this.turn == "white" ? 'black' : "white";
                    return !this.tertMoveChecker(initPos, endPos)
                }
            }
            this.turn = this.turn == "white" ? 'black' : "white";
            this.turnCounter++;
            return true;
        }
    }

    class King extends Chess {

        constructor() {
            super();
        }

        move(initPos, endPos, flag = true) {


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
                if(flag) {
                    return !this.tertMoveChecker(initPos, endPos)
                }    
            }

            if (teamPiece == 'w') {
                this.whiteRookKingMoved = true
            } else if (teamPiece == 'b') {
                this.blackRookKingMoved = true
            }
            return true;
        }
    }
let board = new Chess();
let pawn = new Pawn();
let knight = new Knight()
let queen = new Queen()
let rook = new Rook()
let bishop = new Bishop()
let king = new King()

module.exports.moves = {
    pawn, knight, queen, rook, bishop, king
}
module.exports.board = board
