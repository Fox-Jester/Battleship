import Ship from "./Ship.js"
class Gameboard{

    #createBoard(){
        const board = [];
        for(let i = 1; i <= 10; i++){
            const column = new Array(10).fill(null);
            board.push(column);
        }
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
            this.misses.push([x, y]);
            return "miss"
        }
    }
}



export default Gameboard