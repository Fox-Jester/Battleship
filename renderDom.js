
const player1Board = document.querySelector("#player1-board")

const player2Board = document.querySelector("#player2-board")

const renderDom = {

    createBoard(){
        const rowArray = []
        const coordinateArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

        for(let i = 0; i <= 10; i++){
            const row = document.createElement("div");
         
           
            row.classList.add("row");
            
            const x = i
            

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

export default renderDom