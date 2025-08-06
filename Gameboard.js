import Ship from "./Ship.js"
import boardEvents from "./boardEvents.js";
import renderBoard from "./renderBoard.js";
import game from "./index.js";

class Gameboard{

    #createBoard(){
        const board = [];
        for(let i = 1; i <= 10; i++){
            const column = new Array(10).fill(null);
            board.push(column);
        }
        return board;
    }

    constructor(playerNum){
     
        this.playerNum = playerNum
        this.board = this.#createBoard();
        this.misses = [];
        this.ships = []
    }

    placeShip(...coordinates){
        const ship = new Ship(coordinates.length)
        this.ships.push(ship);
        coordinates.forEach((coordinate) => {
            this.board[coordinate[0]][coordinate[1]] = ship;
        })
     
    }

    receiveAttack([x, y]){
        if(this.board[x][y] !== null && typeof this.board[x][y] === "object"){
            this.board[x][y].hit();
            this.board[x][y] = "hit";
            this.checkLoss()
        }
        else{
            this.board[x][y] = "miss"
        }
        this.resetBoard()
    }

    resetBoard(){
        renderBoard(this.board, this.playerNum);
        boardEvents(this)
    }

    checkLoss(){
        const unSunkShips = []
        this.ships.forEach((ship) => {
            if(!(ship.isSunk())){
                unSunkShips.push(ship)
            }
        })
        if(unSunkShips.length === 0){
            game.onLose();
        }
    }
    
}



export default Gameboard