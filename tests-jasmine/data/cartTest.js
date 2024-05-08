import {addToCart, cart} from '../../data/cart.js';
// import {products} from '../../data/products.js';  

describe('test suite: addToCart', () => {
    it('add an existing product to the cart', () => {
        expect(1).toEqual(1); 
    }); 

    it('adds a new product to the cart', () => {
        addToCart('ac2847e9-4444-403f-b7cf-57fde044a944');
        expect(cart.length).toEqual(1); 
    }); 
});