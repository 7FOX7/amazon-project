import {addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption} from '../../data/cart.js';

describe('test suite: addToCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem'); 
    })
    it('add an existing product to the cart', () => {
         spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1, 
                deliveryOptionId: '1'
            }]); 
         });

         loadFromStorage(); 

         
        loadFromStorage(); 
        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart.length).toEqual(1); 
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); 
        expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart[0].quantity).toEqual(2); 
         // 16c: 
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', `${JSON.stringify(cart)}`); 
    }); 

    it('adds a new product to the cart', () => {
        
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]); 
        });

        loadFromStorage(); 
        addToCart('cc2847e9-4444-403f-b7cf-57fde044a955');
        expect(cart.length).toEqual(1); 
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); 
        expect(cart[0].productId).toEqual('cc2847e9-4444-403f-b7cf-57fde044a955');
        expect(cart[0].quantity).toEqual(1); 

        // 16d:
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', `${JSON.stringify([{
            productId: 'cc2847e9-4444-403f-b7cf-57fde044a955',
            quantity: 1, 
            deliveryOptionId: '1'
        }])}`); 
    });  
});

describe('test suite: removeFromCart(...)', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem'); 
    });
    it('remove a productId that is in the cart', () => {

        // once it reaches the below code, the content of the cart is only one element 
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1, 
                deliveryOptionId: '1'
            }]);
        }); 

        loadFromStorage(); 

        removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(0); 
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); 
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([])); 
    }); 
    it('remove a productId that is not in the cart', () => {
        // expect().nothing(); 
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1, 
                deliveryOptionId: '1'
            }]);
        });

        loadFromStorage(); 

        removeFromCart(''); 
        expect(cart.length).toEqual(1); 
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); 
        expect(cart[0].quantity).toEqual(1); 
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1, 
            deliveryOptionId: '1'
        }]));
    }); 
});

describe('test suite: updateDeliveryOption(...)', () => {
    const productId1 = 'ac2847e9-4444-403f-b7cf-57fde044a944';
    beforeEach(() => {
        spyOn(localStorage, 'setItem'); 
    });

    it('updates the delivery option of a product in the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 1, 
                deliveryOptionId: '1'
            }]);
        });

        loadFromStorage();
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(updateDeliveryOption(productId1, '3'));
        expect(cart.length).toEqual(1); 
        expect(cart[0].deliveryOptionId).toEqual('3'); 
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); 

        // after updateDeliveryOption(productId, deliveryOptionId) from the cart.js has been called, 
        // it is saved with the 'deliveryOptionId = 3' by using the localStorage.setItem; 
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: productId1, 
            quantity: 1, 
            deliveryOptionId: '3'
        }])); 
    });
})

describe('test suite: updateDeliveryOption(...)', () => {
    const productId1 = 'ac2847e9-4444-403f-b7cf-57fde044a944';
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });

    it('updates the delivery option of the product in the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1, 
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        
        loadFromStorage();
        expect(cart.length).toEqual(1); 
        expect(updateDeliveryOption(productId1, '3'));
        expect(cart[0].deliveryOptionId).toEqual('3'); 
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); 
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: productId1,
            quantity: 1, 
            deliveryOptionId: '3'
        }])); 
    }); 
   
    // it('Updates the cart even when invalid deliveryOptionId is passed', () => {
    //     spyOn(localStorage, 'getItem').and.callFake(() => {
    //         return JSON.stringify([{
    //             productId: productId1, 
    //             quantity: 2, 
    //             deliveryOptionId: '2'
    //         }]);
    //     });

    //     loadFromStorage(); 

    //     // using without 'isValidDeliveryOptionId(...)'. Here it reaches localStorage.setItem even 
    //     // if we pass invalid deliveryOptionId like 4, 5, 10 (that is not within deliveryOption array):  
    //     expect(cart.length).toEqual(1); 
    //     expect(cart[0].deliveryOptionId).toEqual('2'); 
    //     expect(updateDeliveryOption(productId1, '10')); 
    //     expect(localStorage.setItem).toHaveBeenCalledTimes(1); 
    //     expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
    //         productId: productId1, 
    //         quantity: 2, 
    //         deliveryOptionId: '10'
    //     }])); 
    // });
    
    it('Does NOT update the cart when the invalid deliveryOptionId is passed', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1, 
                quantity: 2, 
                deliveryOptionId: '2'
            }]);
        });

        loadFromStorage(); 
        // using 'isValidDeliveryOptionId(...)'. Here it does not reach localStorage.setItem 
        // if we pass invalid deliveryOptionId like 4, 5, 10 (it just returns):
        expect(cart.length).toEqual(1); 
        expect(cart[0].deliveryOptionId).toEqual('2'); 
        expect(updateDeliveryOption(productId1, '10')); 
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
        // expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        //     productId: productId1, 
        //     quantity: 2, 
        //     deliveryOptionId: '10'
        // }])); 
    })
})