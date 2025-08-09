import Gameboard from "./Gameboard.js"



class Player{
    constructor(type, num){
        this.num = num
        this.type = type
        this.gameboard = new Gameboard(num)
    }
}

export default Player