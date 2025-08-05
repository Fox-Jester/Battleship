
const player1Board = document.querySelector("#player1-board")

const player2Board = document.querySelector("#player2-board")

const domManager = {

    createBoard(){
        const rowArray = []

        for(let i = 0; i <= 9; i++){
            const row = document.createElement("div");
            row.classList.add("row");
            const x = i
            

            for(let i = 0; i <= 9; i++){
                const column = document.createElement("div");
                column.classList.add("column");
                column.dataset.coordinate = [x, i];
                row.appendChild(column);
            }

            rowArray.push(row);
        }

        return(rowArray);
    },
    
    createPlayer1Board(){
        const rowArray = this.createBoard()
        rowArray.forEach(row => player1Board.appendChild(row));
    },

    createPlayer2Board(){
         const rowArray = this.createBoard()
        rowArray.forEach(row => player2Board.appendChild(row));
    }
}

export default domManager