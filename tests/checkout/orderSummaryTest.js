import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js'; 
import {loadFromStorage, cart} from '../../data/cart.js'

describe('test suite: renderOrderSummary', () => {
    const productId1 = 'ac2847e9-4444-403f-b7cf-57fde044a944';
    const productId2 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    
    beforeEach(() => {
        spyOn(localStorage, 'setItem'); 

        document.querySelector('.js-test-container').innerHTML = `<div class="js-order-summary"></div>
        <div class="js-checkout-header"></div>
        <div class="js-payment-salary"></div>`;
 
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'
        }, {
            productId: productId2, 
            quantity: 2, 
            deliveryOptionId: '2'
        }]); 
        }); 
        loadFromStorage();

        renderOrderSummary(); 
    });

    it('displays the cart', () => {
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2); 
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2'); 
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 2'); 

        document.querySelector('.js-test-container').innerHTML = '';
    });

    it('removes a product', () => {
        

        document.querySelector(`.js-delete-link-${productId1}`).click(); 
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1); 
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null); 
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null); 
        expect(cart.length).toEqual(1); 
        expect(cart[0].productId).toEqual(productId2); 

        document.querySelector('.js-test-container').innerHTML = '';
    });
})