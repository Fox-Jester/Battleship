

import renderBoard from "./renderBoard.js";
import game from "./index.js";

class Gameboard{

    #createGrid(){
        const grid = [];
        for(let i = 1; i <= 10; i++){
            const column = new Array(10).fill(null);
            grid.push(column);
        }
        return grid;
    }

    constructor(playerNum){
     
        this.playerNum = playerNum
        this.grid = this.#createGrid();
        this.board = document.querySelector(`#player${playerNum}-board`)
        
       
    }

    placeShip(coordinate){
        this.grid[coordinate[0]][coordinate[1]] = "ship";
      
     
    }


    receiveAttack([x, y]){
        if(this.grid[x][y] !== null && typeof this.grid[x][y] === "object"){
            this.grid[x][y].hit();
            this.grid[x][y] = "hit";
            this.checkLoss()
        }
        else{
            this.grid[x][y] = "miss"
        }
        
    }

    highlight(columnArray, isValid){
        const prevHighlighted = document.querySelectorAll(".valid, .invalid");
        prevHighlighted.forEach(highlight => highlight.classList.remove("valid", "invalid"))

      columnArray.forEach((column) => {
        column.classList.add((isValid ? "valid" : "invalid"));
      })
    };
    
    render(hidden){
        renderBoard(hidden, this.board, this.grid);

    };

    addEventListeners(){
   
    const columns = this.board.querySelectorAll(".column, .ship");
    columns.forEach(column => column.addEventListener(("click"), () => {
        const stringData = column.dataset.coordinate
        const numArray = stringData.split(",").map(string => Number(string));
        this.receiveAttack(numArray);
        
     
        game.changeTurns()
        
    }));
    };


    checkLoss(){
        const unSunkShips = this.board.querySelectorAll(".ship");

        if(unSunkShips.length === 0){
            game.onLoss()
        } 
        
    }
    
}



export default Gameboard