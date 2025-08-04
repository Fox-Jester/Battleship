import Ship from "./Ship.js"

describe("Ship", () => {
    const BS = new Ship(2);
    it("should have a hit method", () => {
        expect(BS.hit()).toBe("hit")
    });
    it("should have a isSunk method", () => {
        expect(BS.isSunk()).toBeFalsy();
    })

    

})