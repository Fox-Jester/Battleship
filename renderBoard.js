

function renderBoard(hidden, board,  grid){
    
    board.innerHTML = ""

    grid.forEach((arr, index) => {
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
            else if(!(hidden)){
                column.classList.add("ship");
            }
            else{
                column.classList.add("column");
            }

            row.appendChild(column);
        });
    board.appendChild(row);
    })
    };
 


export default renderBoard;