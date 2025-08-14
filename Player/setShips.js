
import shipBuilder from "./shipBuilder.js";

const shipyard = document.querySelector("#shipyard");


export default function setShips(){

    const ships = [
        {name: "carrier", width: 5},
        {name: "battleship", width: 4},
        {name: "destroyer", width: 3},
        {name: "submarine", width: 3},
        {name: "patrol-boat", width: 2}
    ];

    ships.forEach((ship) => {
        const builtShip = shipBuilder(ship.name, ship.width);
        shipyard.appendChild(builtShip);
    })
}