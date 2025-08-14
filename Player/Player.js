import Gameboard from "../Gameboard/Gameboard.js"
import ai from "./ai.js"
import setShips from "./setShips.js"


class Player{
    constructor(type, num){
        this.num = num
        this.type = type
        this.gameboard = new Gameboard(num);

        if(type === "ai"){
            this.ai = new ai(this);
        }
        else{
            this.setShips = setShips;
            }
        }
    }
    
    
   


export default Player