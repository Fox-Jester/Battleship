
import game from "./main.js"

 //Handles ai controls
    class ai {

        constructor(player){
            this.player = player 
        }
        
        //Attacks made
        #attacks = [];
        
        //Board indexes
        #overIndex = 10;
        #undexIndex = -1;
        
        //Checks to see if the coordinate has been attacked yet
        #isNewAttack([y, x]){
            return !this.#attacks.some(([yCoordinate, xCoordinate]) => yCoordinate === y && xCoordinate === x);
        };
        
        //Returns HTML column based on coordinates
        #getColumn([y, x]){
            return document.querySelector(`[data-coordinate="${y},${x}"]`)
        };
        
        //Holds coordinate of newly attacked ship
        #lead = [];
        
        //Axis of the lead
        #axisLead = "";
        

        #clearLeads(){
            this.#lead.length = 0;
            this.#axisLead = "";
        };

        //Checks to see if the space is not a ship
        #checkMiss(targetCoordinate){
            const targetColumn = this.#getColumn(targetCoordinate);
            return (targetColumn.classList.contains("column"));
        };

        //Targets next cordinates based on ship hits
        #trackingCoordinate(){

            let targetCoordinate = null
            
            if(this.#axisLead){
                targetCoordinate = this.#trackAxis();
            }
            else{
                targetCoordinate = this.#trackLead();
            }
            
            return targetCoordinate;
        };

        //Checks if the coordinate is unattacked and possiable
        #isOpen([y, x]){
            return(
                this.#isNewAttack([y, x]) && 
                y < this.#overIndex && y > this.#undexIndex &&
                x < this.#overIndex && x > this.#undexIndex
            );
        };

        #addCoordinates(coord1, coord2){
            return [coord1[0] + coord2[0], coord1[1] + coord2[1]];
        }
        
        //Targets coordinates based on known axis
        #trackAxis(){
            
            const lastAttack = this.#attacks[(this.#attacks.length - 1)];
            
            const attackedColumn = this.#getColumn(lastAttack);
            
            const justHit = attackedColumn.classList.contains("hit");

            let targetCoordinate;
            
            const isX = this.#axisLead === "x"
    
            //forward and backward directions for x or y
            const directions = isX
            ? [[0, 1], [0, -1]]
            : [[1,0], [-1, 0]];


            const [forwardOffset, backwardOffset] = directions;
        
            const forwardFromLast = this.#addCoordinates(lastAttack, forwardOffset);
            const backwardFromLast = this.#addCoordinates(lastAttack, backwardOffset);

            const nextFromForward = this.#addCoordinates(lastAttack, [(forwardOffset[0] * 2), forwardOffset[1] * 2])
            const nextFromBackward = this.#addCoordinates(lastAttack, [(backwardOffset[0] * 2), backwardOffset[1] * 2])

            const forwardFromLead = this.#addCoordinates(this.#lead, forwardOffset);
            const backwardFromLead = this.#addCoordinates(this.#lead, backwardOffset);

            const forwardSpotOpen= this.#isOpen(forwardFromLast);
            const backwardSpotOpen = this.#isOpen(backwardFromLast);

            const nextForwardOpen = this.#isOpen(nextFromForward)
            const nextBackwardOpen = this.#isOpen(nextFromBackward)

            const forwardLeadOpen = this.#isOpen(forwardFromLead);
            const backwardLeadOpen = this.#isOpen(backwardFromLead);
            
            if(justHit && forwardSpotOpen){
                targetCoordinate = forwardFromLast;
                
                //Checks if you miss and is the other direction possiable, or if there is any spots after you move
                if((this.#checkMiss(targetCoordinate) && !backwardLeadOpen) || (!nextForwardOpen && !backwardLeadOpen)){
                    this.#clearLeads();
                    
                };
            }
            else if(justHit && backwardSpotOpen){
                targetCoordinate = backwardFromLast;
                if((this.#checkMiss(targetCoordinate) && !forwardLeadOpen) || (!nextBackwardOpen && !forwardLeadOpen)){
                    this.#clearLeads();
                };
            }
            else if(forwardLeadOpen){
                targetCoordinate = forwardFromLead;
                if(this.#checkMiss(targetCoordinate)){
                     this.#clearLeads();
                };
                
            }
            else if(backwardLeadOpen){
                targetCoordinate = backwardFromLead;
                if(this.#checkMiss(targetCoordinate)){
                         this.#clearLeads();
                };
                } 
            else{
                this.#clearLeads();
            };
            
            return targetCoordinate;
        }
        
        //Sets the axisLead when it hits a ship around the lead
        #trackLead(){
            const [targetCoordinate, targetAxis] = this.#checkAxis();


            if(targetCoordinate){
                const attackedColumn = this.#getColumn(targetCoordinate);

                if(attackedColumn.classList.contains("ship")){
                    this.#axisLead = targetAxis;
                }
            }
            else{
                this.#clearLeads();
            }
            
            return targetCoordinate
   
        }

        //Targets columns around the lead
        #checkAxis(){
          
            const y = this.#lead[0];
            const x = this.#lead[1];
            let targetCoordinate
            let targetAxis
            
            if((x + 1) < this.#overIndex && this.#isNewAttack([y, (x + 1)])){
                targetCoordinate = [y, (x + 1)];
                targetAxis = "x";
              
            }
            
            else if((y + 1) < this.#overIndex && this.#isNewAttack([(y + 1), x])){
                targetCoordinate = [(y + 1), x];
                targetAxis = "y";
             
                
            }
            
            else if((x - 1) > this.#undexIndex && this.#isNewAttack([y, (x - 1)])){
                targetCoordinate = [y, (x - 1)];
                targetAxis = "x";
             
            }
            
            else if((y - 1) > this.#undexIndex && this.#isNewAttack([(y - 1), x])){
                targetCoordinate = [(y - 1), x];
                targetAxis = "y";
                
            }
            
            
            return [targetCoordinate, targetAxis]
        };
        
        
        #randomBoardIndex(){
            const maxCoordinate = this.#overIndex - 1
            return Math.floor(Math.random() * (maxCoordinate + 1))
        }

        #randomAxis(){
            const randomNum = Math.floor(Math.random() * 2);
            return (randomNum === 0 ? "x" : "y"); 
        }
        
        #getRandomCoordinate(){ 
            
            let randomCoordinate = [this.#randomBoardIndex(), this.#randomBoardIndex()]
            while(!(this.#isNewAttack(randomCoordinate))){
                randomCoordinate = [this.#randomBoardIndex(), this.#randomBoardIndex()];
            }
            const attackedColumn = this.#getColumn(randomCoordinate);
            
            if(attackedColumn.classList.contains("ship") && this.#lead.length === 0){
                this.#lead.push(...randomCoordinate);
            
             
            };
            return randomCoordinate;
        };

        
        play(){
                const coordinate = []
            
                if(this.#lead.length === 0){
                    coordinate.push(...this.#getRandomCoordinate());
                }
                else{
                    const trackedCoordinate = this.#trackingCoordinate();
                    if(trackedCoordinate){
                        coordinate.push(...trackedCoordinate);
                    }
                    else{
                    coordinate.push(...this.#getRandomCoordinate());
                    }
                    
                }
                
                game.currentTarget.gameboard.receiveAttack(coordinate);
                this.#attacks.push(coordinate);
                
              
                
                game.changeTurns();
            };

        #gridCoordOpen([y, x]){
            return this.player.gameboard.grid[x][y] === null;
        }

        #randomShipPosition(length, axis){

            let shipCoords = [];
            
            while(shipCoords.length === 0){
                
                let randomCoord = [this.#randomBoardIndex(), this.#randomBoardIndex()];
                while(!this.#gridCoordOpen(randomCoord)){
                    randomCoord = [this.#randomBoardIndex(), this.#randomBoardIndex()];
                }
    
                for(let i = 0; i < length; i++){
                    if(axis === "x"){
                        if(randomCoord[1] + length > this.#overIndex){
                            shipCoords.push([randomCoord[0], randomCoord[1] - i]);
                        }
                        else shipCoords.push([randomCoord[0], randomCoord[1] + i]);
                    }
                    else{
                        if(randomCoord[0] + length > this.#overIndex){
                            shipCoords.push([randomCoord[0] - i, randomCoord[1]]);
                        }
                        else shipCoords.push([randomCoord[0] + i, randomCoord[1]]);
                    }
    
                }
    
                shipCoords.forEach((coord) => {
                    if(!this.#gridCoordOpen(coord)){
                        shipCoords.length = 0
                    }
                    });

            };

            return shipCoords;

            
        };

        #addShipToBoard(ship){

            const length = ship.length;

            const axis = this.#randomAxis();

            const shipCoords = this.#randomShipPosition(length, axis);

            shipCoords.forEach((coord) => {
                this.player.gameboard.grid[coord[1]][coord[0]] = "ship"
            })
        }

        placeShips(){
            const carrier = {length: 5};
            const battleship = {length: 4};
            const destroyer = {length: 3};
            const submarine = {length: 3};
            const patrolboat = {length: 2};

            const ships = [carrier, battleship, destroyer, submarine, patrolboat];

            ships.forEach(ship => this.#addShipToBoard(ship));
        }

          
        };
    
    

    export default ai;