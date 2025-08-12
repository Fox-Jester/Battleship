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
                targetCoordinate =trackAxis();
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

            let targetCoordinate
            
            function checkMiss(){
                const targetColumn = getColumn(targetCoordinate);
                return (targetColumn.classList.contains("column"))
            }
            
        
            if(axisLead === "x"){
                const rightSpotOpen = isNewAttack([lastAttack[0], (lastAttack[1] + 1)]) && (lastAttack[1] + 1) < 10;
                const leftSpotOpen = isNewAttack([lastAttack[0], (lastAttack[1] - 1)]) && (lastAttack[1] - 1) > -1;

                const leadRightOpen = isNewAttack([lead[0], (lead[1] + 1)]) && (lead[1] + 1) < 10
                const leadLeftOpen = isNewAttack([lead[0], (lead[1] - 1)]) && (lead[1] - 1) > -1
                
                if(justHit && rightSpotOpen){
                    targetCoordinate = [lastAttack[0],(lastAttack[1] + 1)];
                    
                    if(checkMiss() && !(leadLeftOpen)){
                        clearLeads()
                    }
                }
                else if(justHit && leftSpotOpen){
                    targetCoordinate = [lastAttack[0],(lastAttack[1] - 1)];

                    if(checkMiss() && !(leadRightOpen)){
                        clearLeads()
                    }
                }
                else if(leadRightOpen){
                    targetCoordinate = [lead[0],(lead[1] + 1)];

                    if(checkMiss()){
                         clearLeads()
                    };
                    
                }
                else if(leadLeftOpen){
                    targetCoordinate = [lead[0],(lead[1] - 1)];

                    if(checkMiss()){
                         clearLeads()
                    };
                } 
            }

            else if(axisLead === "y"){
                const topSpotOpen = isNewAttack([(lastAttack[0] + 1), lastAttack[1]]) && (lastAttack[0] + 1) < 10;
                const bottomSpotOpen = isNewAttack([(lastAttack[0] - 1), lastAttack[1]]) && (lastAttack[0] - 1) > -1;

                const leadTopOpen = isNewAttack([(lead[0] + 1), lead[1]]) && (lead[0] + 1) < 10
                const leadBottomOpen = isNewAttack([(lead[0] - 1), lead[1]]) && (lead[0] - 1) > -1
                
                if(justHit && topSpotOpen){
                    targetCoordinate = [(lastAttack[0] + 1),lastAttack[1]];
                    
                    if(checkMiss() && !(leadBottomOpen)){
                        clearLeads()
                    }
                }
                else if(justHit && bottomSpotOpen){
                    targetCoordinate = [(lastAttack[0] - 1),lastAttack[1]];

                    if(checkMiss() && !(leadTopOpen)){
                        clearLeads()
                    }
                }
                else if(leadTopOpen){
                    targetCoordinate = [(lead[0] + 1),lead[1]];

                    if(checkMiss()){
                         clearLeads()
                    };
                    
                }
                else if(leadBottomOpen){
                    targetCoordinate = [(lead[0] - 1),lead[1]];

                    if(checkMiss()){
                         clearLeads()
                    };
                } 

            }
            return targetCoordinate;
        }
        
        //Sets the axisLead when it hits a ship around the lead
        function trackLead(){
            const [targetCoordinate, targetAxis] = checkAxis();

            
            const attackedColumn = getColumn(targetCoordinate);
          
                
            if(attackedColumn.classList.contains("ship")){
                axisLead = targetAxis
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
                
                const attackedColumn = getColumn(coordinate);
            
                if(attackedColumn.classList.contains("ship") && lead.length === 0){
                    lead.push(...coordinate);
             
                };
                
                game.changeTurns()
            }
        }
    })();
}

export default Player