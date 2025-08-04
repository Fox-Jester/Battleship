
class Ship {

    #hits = 0

    constructor(length){
        this.length = length
    }

    hit(){
        this.#hits++
        return "hit"
    }

    isSunk(){
        return (this.#hits >= this.length);
    }
   
}

export default Ship