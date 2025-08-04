import Gameboard from "./Gameboard.js"

describe("Gameboard", () => {
    it("should place a ship at specified coordinates", () => {
        const GB = new Gameboard;
        GB.placeShip([1, 1], [1, 2], [1, 3]);
        expect(GB.board[1, 1]).not.toBeNull()
    })
})
