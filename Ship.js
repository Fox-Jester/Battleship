
class Ship {

    #hits = 0

    constructor(length){
        this.length = length
    }

    hit(){
        this.#hits++
        return "hit"
    }

   
}

export default Ship