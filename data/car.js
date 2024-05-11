// 17a: 

/*
class Car {
    brand; 
    model; 

    constructor(brand, model) {
        this.brand = brand;
        this.model = model; 
    }
}

const car1 = new Car('Toyota', 'Corolla'); 
const car2 = new Car('Tesla', 'Model 3'); 


class Car {
    brand; 
    model; 

    constructor(carDetails) {
        this.brand = carDetails.brand; 
        this.model = carDetails.model; 
    }
}

const car1 = new Car({
    brand: 'Toyota', 
    model: 'Corolla'
});

const car2 = new Car({
    brand: 'Tesla', 
    model: 'Model 3'
});

console.log(car1);
console.log(car2); 
*/


// 17b: 
// class Car {
//     brand; 
//     model; 

//     constructor(carDetails) {
//         this.brand = carDetails.brand; 
//         this.model = carDetails.model; 
//     }

//     displayInfo() {
//         console.log(`${this.brand} ${this.model}`); 
//     }
// }

// const car1 = new Car({
//     brand: 'Toyota', 
//     model: 'Corolla'
// });

// const car2 = new Car({
//     brand: 'Tesla', 
//     model: 'Model 3'
// });

// car1.displayInfo(); 
// car2.displayInfo();

// 17c: 
/*
class Car {
    brand; 
    model; 
    speed; 

    constructor(carDetails) {
        this.brand = carDetails.brand; 
        this.model = carDetails.model; 
        this.speed = 0; 
    }

    go() {
        this.speed = this.speed < 200 ? this.speed += 5 : this.speed; 
    }

    brake() {
        this.speed = this.speed > 5 ? this.speed -= 5 : this.speed; 
    }

    displayInfo() {
        console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h`); 
    }
}

const car1 = new Car({
    brand: 'Toyota', 
    model: 'Carolla'
}); 
const car2 = new Car({
    brand: 'Tesla', 
    model: 'Model 3'
});

car1.go(); 
car1.go(); 
car1.go(); 
car1.go(); 
car1.go(); 
car1.go(); 
car1.go(); 
car1.go(); 
car1.brake(); 

car2.go(); 
car2.go(); 
car2.go(); 
car2.go(); 
car2.go(); 
car2.go(); 
car2.go(); 
car2.go(); 
car2.go(); 
car2.brake(); 

car1.displayInfo();
car2.displayInfo(); 
*/

export class Car {
    brand; 
    model; 
    speed; 
    isTrunkOpen; 

    constructor(carDetails) {
        this.brand = carDetails.brand; 
        this.model = carDetails.model; 
        this.speed = 0; 
        this.isTrunkOpen = false; 
    }

    go() {
        if(this.isTrunkOpen === false && this.speed < 200) {
            this.speed += 5; 
        }
        else {
            this.speed; 
        }
    }

    brake() {
        this.speed = this.speed >= 5 ? this.speed -= 5 : this.speed;     
    }

    openTrunk() {
        if(this.speed === 0) {
            this.isTrunkOpen = true; 
        } 
    }

    closeTrunk() {
        this.isTrunkOpen = false; 
    }

    getSpeed() {
        return this.speed; 
    }

    getTrunk() {
        return this.isTrunkOpen; 
    }

    displayInfo() {
        console.log(`${this.brand} ${this.model} Speed: ${this.speed} km/h
        
        Trunk is open: ${this.isTrunkOpen}`); 
    }
}

const car1 = new Car({
    brand: 'Toyota', 
    model: 'Corrola'
}); 

const car2 = new Car({
    brand: 'Tesla', 
    model: 'Model 3'
}); 

car1.go(); 
car1.openTrunk(); 
car1.displayInfo(); 

car2.go(); 
car2.brake(); 
car2.openTrunk(); 
car2.displayInfo(); 