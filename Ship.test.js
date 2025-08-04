import Ship from "./Ship.js"

describe("Ship", () => {
    it("should have a hit method", () => {
        const BS = new Ship(2);
        expect(BS.hit()).toBe("hit")
    });
    it("should have a isSunk method", () => {
        const BS = new Ship(2);
        expect(BS.isSunk()).toBeFalsy();
       
    })

    

})