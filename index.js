import Player from "./Player.js"



const game = {

    
    
    
    player1: "",
    player2: "",
    
    currentPlayer: "",
    currentTarget: "",


    init(){
    this.player1 = new Player("human", 1);
    this.player2 = new Player("ai", 2);

    this.enterStartPhase()

},

startPhase: (() => {     
    let horizontalMode = true;

    let currentDragId = ''
    
    const shipyard = document.querySelector("#shipyard");

    function shipyardEvents(){
        const shipyardContainer = shipyard.parentElement
        shipyardContainer.addEventListener("click", () => {
            horizontalMode = !(horizontalMode);

            const ships = shipyard.querySelectorAll(".row");

            if(!horizontalMode){
                ships.forEach(ship => ship.classList.add("rotate"));
            }
            else{
                ships.forEach(ship => ship.classList.remove("rotate"));
            }
        });

        //Removes all highlights when dragged back over shipyard
        shipyardContainer.addEventListener("dragover", () => {
            const highlighted = document.querySelectorAll(".valid, .invalid");
            highlighted.forEach(highlight => highlight.classList.remove("valid", "invalid"))
        })
    }


    
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
                    ship.remove()
                    game.player1.gameboard.render();
                    dropEvents() 
                }
                else{
                    alert("invalid placement")
                }



            })
        });
            
    };

    return{
        start(){
            dragEvents();
            dropEvents();
            shipyardEvents();
        
        },
    }
})(),

enterStartPhase(){
    this.player1.gameboard.render();
    this.player2.gameboard.render();
    this.startPhase.start()
},



enterBattlePhase(){
    

    
    this.currentPlayer = this.player1
    this.currentTarget = this.player2
    
    this.currentTarget.gameboard.addEventListeners()
    },

    changeTurns(){
        
        this.currentTarget === this.player2 
        ? this.currentTarget.gameboard.render(true)
        : this.currentTarget.gameboard.render()

        if(this.currentPlayer === this.player1){
            this.currentPlayer = this.player2;
            this.currentTarget = this.player1;
            
        }
        else{
            this.currentPlayer = this.player1;
            this.currentTarget = this.player2
           
        }
        this.currentTarget.gameboard.addEventListeners()



        
    },

    onLoss(){
        console.log("oof")
    }



}

game.init()

export default game