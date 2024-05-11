import {Car} from '../../data/car.js'; 

describe('test suite: car.js', () => {
    var car1; 
    var car2; 
    beforeEach(() => {
        car1 = new Car({
            brand: 'Toyota', 
            model: 'Carolla'
        });
    
        car2 = new Car({
            brand: 'Tesla', 
            model: 'Model 3'
        }); 

        spyOn(car1, 'go').and.callThrough(); 
        spyOn(car1, 'brake').and.callThrough(); 
        spyOn(car1, 'openTrunk').and.callThrough(); 
        spyOn(car1, 'closeTrunk').and.callThrough(); 
        spyOn(car1, 'getSpeed').and.callThrough(); 
        spyOn(car1, 'getTrunk').and.callThrough(); 
    });
    
    it('checks if we can open trunk if the car is moving', () => {
        car1.go(); 
        expect(car1.go).toHaveBeenCalledTimes(1); 
        expect(car1.getSpeed()).toEqual(5); 
        car1.openTrunk(); 
        expect(car1.openTrunk).toHaveBeenCalledTimes(1); 
        expect(car1.getTrunk()).toBe(false); 
    });

    it('checks if the max possibe speed is 200 and the trunk will still be close if we try to open it', () => {
        car1.go(); 
        expect(car1.getSpeed()).toEqual(5); 
        car1.go(); 
        expect(car1.getSpeed()).toEqual(10); 
        car1.go(); 
        car1.go(); 
        expect(car1.getSpeed()).toEqual(20); 
        car1.openTrunk(); 
        expect(car1.openTrunk).toHaveBeenCalledTimes(1); 
        expect(car1.getTrunk()).toBe(false); 
    }); 
})