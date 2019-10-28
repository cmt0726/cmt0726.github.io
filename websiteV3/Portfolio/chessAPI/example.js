const chessBoard = require("./chess").moves
const board = require("./chess").board

console.log(chessBoard.pawn.move([1,0],[2,0]))
console.log(board)

console.log(chessBoard.pawn.move([6,0],[5,0]))
console.log(board)

chessBoard.knight.move([0,1],[2,2])
console.log(board)


