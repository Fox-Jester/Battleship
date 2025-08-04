import Ship from "./Ship"
class Gameboard{

    #createBoard(){
        const arrayRow = new Array(10).fill(null);
        const board = new Array(10).fill(arrayRow);
        return board;
    }

    constructor(){
        this.board = this.#createBoard();
        this.misses = [];
    }

    placeShip(...coordinates){
        const ship = new Ship(coordinates.length)
        coordinates.forEach((coordinate) => {
            this.board[coordinate[0]][coordinate[1]] = ship;
        })
    }

    receiveAttack(x, y){
        if(this.board[x][y] !== null){
            return (this.board[x][y].hit());
        }
        else{
            return "miss"
        }
    }
}



export default Gameboard