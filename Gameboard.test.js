import Gameboard from "./Gameboard.js"

describe("Gameboard", () => {
    it("should place a ship at specified coordinates", () => {
        const GB = new Gameboard;
        GB.placeShip([1, 1], [1, 2], [1, 3]);
        expect(GB.board[1, 1]).not.toBeNull()
    })
    describe("receiveAttack", () => {
        it("should return miss if it doesn't hit a ship", () => {
            const GB = new Gameboard;
            expect(GB.receiveAttack(1, 1)).toBe("miss");
        })
        it("should return hit if it hits a ship", () => {
            const GB = new Gameboard;
            GB.placeShip([1, 1], [1, 2], [1, 3]);
            expect(GB.receiveAttack(1, 1)).toBe("hit");
        })

    })
})
