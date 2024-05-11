import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js'; 
import {loadFromStorage, cart} from '../../data/cart.js'

// describe('test suite: renderOrderSummary', () => {
//     const productId1 = 'ac2847e9-4444-403f-b7cf-57fde044a944';
//     const productId2 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    
//     const productName1 = 'Warrior, Programmer, Hardworker, And Just a Cool Boy To Hang Out With'; 
//     const productName2 = 'Black and Gray Athletic Cotton Socks - 6 Pairs'; 
//     beforeEach(() => {
//         spyOn(localStorage, 'setItem'); 

//         document.querySelector('.js-test-container').innerHTML = `<div class="js-order-summary"></div>
//         <div class="js-checkout-header"></div>
//         <div class="js-payment-salary"></div>`;
 
//         spyOn(localStorage, 'getItem').and.callFake(() => {
//             return JSON.stringify([{
//                 productId: productId1,
//                 quantity: 2,
//                 deliveryOptionId: '1'
//         }, {
//             productId: productId2, 
//             quantity: 2, 
//             deliveryOptionId: '2'
//         }]); 
//         }); 
//         loadFromStorage();

//         renderOrderSummary(); 
//     });

//     afterEach(() => {
//         document.querySelector('.js-test-container').innerHTML = '';
//     })

//     it('displays the cart', () => {
//         expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2); 
//         expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toEqual(productName1);
//         expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual(productName2);
//         expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2'); 
//         expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 2');  
//         expect(document.querySelector(`.js-product-price`).innerText).toContain('$');
//     });

//     it('removes a product', () => {
//         document.querySelector(`.js-delete-link-${productId1}`).click(); 
//         expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1); 
//         expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null); 
//         expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null); 
//         expect(cart.length).toEqual(1); 
//         expect(cart[0].productId).toEqual(productId2); 
//         // check if data of a warrior exists (it should not since we have deleted it):
//         expect(document.querySelector(`.js-product-name-${productId1}`)).toBeNull(); 
//         // data of the socks (should exists since we did not delete it):
//         expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual(productName2); 

//         expect(document.querySelector(`.js-product-price`).innerText).toContain('$');
//     });

//     it('updates the delivery option', () => {
//         document.querySelector(`.js-delivery-option-${productId1}-3`).click(); 
//         expect(document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked).toEqual(true); 
//         expect(cart.length).toEqual(2); 
//         expect(cart[0]).toEqual({
//             productId: productId1,
//             quantity: 2,
//             deliveryOptionId: '3'}
//         ); 
//         expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$14.98');
//         expect(document.querySelector('.js-payment-summary-total').innerText).toEqual('$22040.46');  
//     });
// });