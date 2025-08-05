

function renderBoard(board, playerNum){
    const playerBoard = document.querySelector(`#player${playerNum}-board`);
    

    board.forEach((arr) => {

        const row = document.createElement("div");
        row.classList.add("row");
        arr.forEach((cell) =>{
            const column = document.createElement("div");

            if(cell === null){
                column.classList.add("column");
            }
            else if(cell === "miss"){
                column.classList.add("miss");
            }
            else if(cell === "hit"){
                column.classList.add("hit");
            }
            else{
                column.classList.add("ship");
            }

            row.appendChild(column);
        });
    playerBoard.appendChild(row);
    })
    };
 


export default renderBoard;