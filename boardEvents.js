

export default function boardEvents(Gameboard){
    const board = document.querySelector(`#player${Gameboard.playerNum}-board`);

    const columns = board.querySelectorAll(".column, .ship");
    columns.forEach(column => column.addEventListener(("click"), () => {
        const stingData = column.dataset.coordinate
        const numArray = stingData.split(",").map(string => Number(string));
        Gameboard.receiveAttack(numArray)
    }))
}