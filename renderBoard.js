

function renderBoard(board, playerNum){
    const playerBoard = document.querySelector(`#player${playerNum}-board`);
    
    playerBoard.innerHTML = ""

    board.forEach((arr, index) => {
        const x = index
        const row = document.createElement("div");
        row.classList.add("row");
        arr.forEach((cell, y) =>{
            
            const column = document.createElement("div");
            column.dataset.coordinate = [x, y];

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