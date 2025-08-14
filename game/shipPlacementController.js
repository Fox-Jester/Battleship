import game from "./game.js";


const shipPlacementController = (() => {     
    let horizontalMode = true;

    let currentDragId = ''
    
    const shipyard = document.querySelector("#shipyard");

    const shipyardContainer = shipyard.parentElement

    
    function dragEvents(){
        const ships = shipyard.querySelectorAll(".row");
        
        ships.forEach((ship) => {
            ship.addEventListener("dragstart", () => {
                currentDragId = ship.id
              
                
            });
        });
    };
    
    function dropEvents(){ 
        const board = document.querySelector("#player1-board")
        
        const columns = board.querySelectorAll(".column");

        //stores currently highlight columns
        let highlighted = []
        
        columns.forEach((column) => {
            
            column.addEventListener("dragover", (e) => {
                e.preventDefault();

                const row = column.parentElement
                const columnArray = Array.from(row.children);
                const columnIndex = columnArray.indexOf(column);
                
                const ship = document.getElementById(`${currentDragId}`)
                const shipWidth = Number(ship.dataset.width);
                
                //if currently hoveredColumns are in a valid position
                let isValid = true;
                const hoveredColumns = [];
                
                if(horizontalMode){
                    for(let i = 0; i < shipWidth; i++){
                        if((columnIndex + i) < 10){
                            hoveredColumns.push(columnArray[columnIndex + i]);

                            
                        }
                        else{
                            isValid = false
                        }
                    }
                    
                    
                }
                
                if(!horizontalMode){
                    const rowArray = Array.from(board.children);
                   
                    const rowIndex = rowArray.indexOf(row);

                    for(let i = 0; i < shipWidth; i++){
                        if((rowIndex + i) < 10){
                            const currentRow = rowArray[rowIndex + i]
                            const currentColumnArray = Array.from(currentRow.children);
                          
                            hoveredColumns.push(currentColumnArray[columnIndex]);
                        }
                        else{
                            isValid = false
                        }
                    }
                    
                }
                //Checks to see if both arrays don't have the exact same content
                if(!(hoveredColumns.every((currentValue) => highlighted.includes(currentValue))) 
                   || hoveredColumns.length !== highlighted.length){
                    
                    //Checks if hovered columns overlap with a placed ship
                    hoveredColumns.forEach((column) => {
                        if(column.classList.contains("ship")){
                            isValid = false
                        }
                    })

                    game.player1.gameboard.highlight(hoveredColumns, isValid);
                    highlighted = hoveredColumns;
                }
                
                
            });
            column.addEventListener("drop", (e) => {
                
                e.preventDefault();
                const stringData = column.dataset.coordinate;
                const numArray = stringData.split(",").map(string => Number(string));
                
          
                const ship = document.getElementById(`${currentDragId}`)
                const shipWidth = Number(ship.dataset.width);
                
                const selectedColumns = []
              
                if(horizontalMode){
                    for (let i = 0; i < shipWidth; i++) {
                        const selected = document.querySelector(`[data-coordinate='${numArray[0]},${(numArray[1] + i)}']`);
                        if(selected && !(selected.classList.contains("ship"))){
                            selectedColumns.push(selected)
                        }
                        else{ selectedColumns.push(null)}
                         
                    };
                  
                }
                else if(!horizontalMode){
                    for (let i = 0; i < shipWidth; i++) {
                        const selected = document.querySelector(`[data-coordinate='${(numArray[0] + i)},${numArray[1]}']`)
                        if(selected && !(selected.classList.contains("ship"))){
                            selectedColumns.push(selected)
                        }
                        else{ selectedColumns.push(null)} 
                    }
                }
              
                if(!(selectedColumns.includes(null))){
                    selectedColumns.forEach((column) => {
                        //turns the string data into a array of 2 numbers representing the coordinate
                        const coordinate = column.dataset.coordinate.split(",").map(string => Number(string));

                        game.player1.gameboard.placeShip(coordinate);
                    })

                    ship.remove();

                    game.player1.gameboard.render();

                    //Checks for more placeable ships
                    shipyard.children.length === 0
                    ? game.enterBattlePhase()
                    : dropEvents();

                    
                    
                }
                else{
                    alert("invalid placement")
                }



            })
        });
            
    };


    return{
        shipEvents(){
            horizontalMode = true;
            dragEvents();
            dropEvents();
            
        },

        shipyardEvents(){
        
        shipyardContainer.addEventListener("click", () => {
            horizontalMode = !(horizontalMode);

            const ships = shipyard.querySelectorAll(".row");

            !horizontalMode 
            ? ships.forEach(ship => ship.classList.add("rotate"))
            : ships.forEach(ship => ship.classList.remove("rotate"));
            
           
        });

        //Removes all highlights when dragged back over shipyard
        shipyardContainer.addEventListener("dragover", () => {
            const highlighted = document.querySelectorAll(".valid, .invalid");
            highlighted.forEach(highlight => highlight.classList.remove("valid", "invalid"))
        })
        }

    }
})();

export default shipPlacementController;