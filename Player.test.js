import Player from "./Player.js"


describe("Player", () => {
    it("should have it's own Gameboard", () => {
        const will = new Player("real");
        will.gameboard.placeShip([1, 1], [1, 2], [1, 3]);
        expect(will.gameboard.board[1][3]).not.toBeNull()
    } )
})