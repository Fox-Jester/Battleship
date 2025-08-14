

export default function shipBuilder(name, size){
    const ship = document.createElement("div");

    ship.classList.add("row");
    ship.id = name;
    ship.dataset.width = size;
    ship.draggable = true;

    for(let i = 0; i < size; i++){
        const shipSquare = document.createElement("div");
        shipSquare.classList.add("ship");
        ship.appendChild(shipSquare);
    }

    return ship

}