import Gameboard from "./Gameboard.js"
import ai from "./ai.js"


class Player{
    constructor(type, num){
        this.num = num
        this.type = type
        this.gameboard = new Gameboard(num);

        if(type === "ai"){
            this.ai = new ai(this);
        }
    }
    
    
   
}

export default Player