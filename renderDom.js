
const player1Board = document.querySelector("#player1-board")

const player2Board = document.querySelector("#player2-board")

const renderDom = {

    renderBoard(board, playerType){
        player1Board.innerHTML = "";

        
        const coordinateArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

        //Creates 11 rows, the first one for coordinates.
        for(let i = 0; i <= 10; i++){
            const row = document.createElement("div");
         
           
            row.classList.add("row");
            
            const x = i
            
            //Creates 11 columns, the first one for coordinates.
            for(let i = 0; i <= 10; i++){
                const column = document.createElement("div");
                const coordinate = [(x - 1), (i - 1)]
                if(x === 0){
                    column.classList.add("coordinate");
                    if(i !== 0){
                        column.textContent = coordinateArray[(i - 1)];
                    }
                }
                else if(i === 0 && x > 0){
                    column.classList.add("coordinate");
                    column.textContent = x
                }
                else{
                    column.classList.add("column");
                    column.dataset.coordinate = coordinate;
                }
                row.appendChild(column);
            }

            
        }

        return(rowArray);
    },
 
}

export default renderDom;