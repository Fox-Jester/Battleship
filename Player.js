import Gameboard from "./Gameboard.js"
import game from "./index.js"



class Player{
    constructor(type, num){
        this.num = num
        this.type = type
        this.gameboard = new Gameboard(num)
    }
    
    
    //Handles ai controls
    ai = (() => {
        const attacks = [];
        
        function isNewAttack([y, x]){
            return !attacks.some(([yCoordinate, xCoordinate]) => yCoordinate === y && xCoordinate === x);
        };
        
        //Returns HTML column based on coordinates
        function getColumn([y, x]){
            return document.querySelector(`[data-coordinate="${y},${x}"]`)
        };
        
        const lead = [];
        
        let axisLead = "";
        
        function clearLeads(){
            lead.length = 0;
            axisLead = "";
        }

        //Targets next cordinates based on ship hits
        function trackingCoordinate(){

            let targetCoordinate = null
            
            if(axisLead){
                targetCoordinate = trackAxis();
            }
            else{
                targetCoordinate = trackLead();
            }
            
            return targetCoordinate;
        };
        
        //Targets coordinates based on known axis
        function trackAxis(){
            
            const lastAttack = attacks[(attacks.length - 1)];
            
            const attackedColumn = getColumn(lastAttack);
            
            const justHit = attackedColumn.classList.contains("hit");

            let targetCoordinate;
            
            function checkMiss(){
                const targetColumn = getColumn(targetCoordinate);
                return (targetColumn.classList.contains("column"));
            };

            const isX = axisLead === "x"
    
            //forward and backward directions for x or y
            const directions = isX
            ? [[0, 1], [0, -1]]
            : [[1,0], [-1, 0]];

            function isOpen([y, x]){
                return(
                    isNewAttack([y, x]) && 
                    y < 10 && y > -1 &&
                    x < 10 && x > -1
                );
            }

            const [forwardOffset, backwardOffset] = directions;
        
            const forwardFromLast = [forwardOffset[0] + lastAttack[0], forwardOffset[1] + lastAttack[1]];
            const backwardFromLast = [backwardOffset[0] + lastAttack[0], backwardOffset[1] + lastAttack[1]];

            const nextFromForward = [(forwardOffset[0] * 2) + lastAttack[0], (forwardOffset[1] * 2) + lastAttack[1]];
            const nextFromBackward = [(backwardOffset[0] * 2) + lastAttack[0], (backwardOffset[1] * 2) + lastAttack[1]];

            const forwardFromLead = [forwardOffset[0] + lead[0], forwardOffset[1] + lead[1]];
            const backwardFromLead = [backwardOffset[0] + lead[0], backwardOffset[1] + lead[1]];

            const forwardSpotOpen= isOpen(forwardFromLast);
            const backwardSpotOpen = isOpen(backwardFromLast);

            const nextForwardOpen = isOpen(nextFromForward)
            const nextBackwardOpen = isOpen(nextFromBackward)

            const forwardLeadOpen = isOpen(forwardFromLead);
            const backwardLeadOpen = isOpen(backwardFromLead);
            
            if(justHit && forwardSpotOpen){
                targetCoordinate = forwardFromLast;
                
                if(checkMiss() && !(backwardLeadOpen) || !nextForwardOpen && !backwardLeadOpen){
                    clearLeads();
                    
                };
            }
            else if(justHit && backwardSpotOpen){
                targetCoordinate = backwardFromLast;
                if(checkMiss() && !(forwardLeadOpen) || !nextBackwardOpen && !forwardLeadOpen){
                    clearLeads();
                };
            }
            else if(forwardLeadOpen){
                targetCoordinate = forwardFromLead;
                if(checkMiss()){
                     clearLeads();
                };
                
            }
            else if(backwardLeadOpen){
                targetCoordinate = backwardFromLead;
                if(checkMiss()){
                         clearLeads();
                };
                } 
            
            
            return targetCoordinate;
        }
        
        //Sets the axisLead when it hits a ship around the lead
        function trackLead(){
            const [targetCoordinate, targetAxis] = checkAxis();

            
            const attackedColumn = getColumn(targetCoordinate);
          
            
            if(attackedColumn.classList.contains("ship")){
                axisLead = targetAxis;
                
        
            }
            return targetCoordinate
   
        }

        //Targets columns around the lead
        function checkAxis(){
            const y = lead[0];
            const x = lead[1];
            let targetCoordinate
            let targetAxis
            
            if((x + 1) < 10 && isNewAttack([y, (x + 1)])){
                targetCoordinate = [y, (x + 1)];
                targetAxis = "x";
              
            }
            
            else if((y + 1) < 10 && isNewAttack([(y + 1), x])){
                targetCoordinate = [(y + 1), x];
                targetAxis = "y";
             
                
            }
            
            else if((x - 1) > -1 && isNewAttack([y, (x - 1)])){
                targetCoordinate = [y, (x - 1)];
                targetAxis = "x";
             
            }
            
            else if((y - 1) > -1 && isNewAttack([(y - 1), x])){
                targetCoordinate = [(y - 1), x];
                targetAxis = "y";
                
            };
            
            return [targetCoordinate, targetAxis]
        };
        
        
        
        function getRandomCoordinate(){ 
            const random = () => {
                const highestCoordinate = 9
                return Math.floor(Math.random() * (highestCoordinate + 1))
            }
            
            let randomCoordinate = [random(), random()]
            while(!(isNewAttack(randomCoordinate))){
                randomCoordinate = [random(), random()];
            }
            const attackedColumn = getColumn(randomCoordinate);
            
            if(attackedColumn.classList.contains("ship") && lead.length === 0){
                lead.push(...randomCoordinate);
            
             
            };
            return randomCoordinate;
        };

        return{
            play(){
                const coordinate = []
            
                if(lead.length === 0){
                    coordinate.push(...getRandomCoordinate());
                }
                else{
                    const trackedCoordinate = trackingCoordinate();
                    if(trackedCoordinate){
                        coordinate.push(...trackedCoordinate);
                    }
                    else{
                    coordinate.push(...getRandomCoordinate());
                    }
                    
                }
                
                game.currentTarget.gameboard.receiveAttack(coordinate);
                attacks.push(coordinate);
                
              
                
                game.changeTurns();
            }
        }
    })();
}

export default Player