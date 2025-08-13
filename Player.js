import Gameboard from "./Gameboard.js"
import game from "./index.js"
import ai from "./ai.js"


class Player{
    constructor(type, num){
        this.num = num
        this.type = type
        this.gameboard = new Gameboard(num)
    }
    
    
   
}

export default Player