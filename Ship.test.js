import Ship from "./Ship.js"

describe("Ship", () => {
    const BS = new Ship(2);
    it("should have a hit method", () => {
        expect(BS.hit()).toBe("hit")
    })
    

})