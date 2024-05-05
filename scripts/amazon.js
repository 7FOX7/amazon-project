/*

Challenge: 
We'll create the 'Added' message. 
The HTML element for this already exists: 
<div class="added-to-cart">
However, in the CSS, this element has opacity: 0 (it's invisible).


13i-challenge: Add a unique class to this element (like we did in exercise 13b) 
to indentify which product it is for: 
*/
import {cart} from '../data/cart.js';
import {products} from '../data/products.js'; 

let productsHTML = '';

// variable for 'added-to-cart'
let timeout;

products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>
        
            <div class="added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
  `;
});


document.querySelector('.js-products-grid')
    .innerHTML = productsHTML; 

document.querySelectorAll('.js-add-to-cart-button') 
    .forEach((button) => {
        button.addEventListener('click', () => {
            // document.querySelector('.js-added-to-cart').style.opacity="1"; 
            // setTimeout(() => {
            //     addedToCartElement.classList.add('added-to-cart.style.opacity="1"');
            // }, 2); 


            // 13h: in amazon.js: 
            // 1. Search for the code 'const productId = button.dataset.productId;'
            // and use the destructuring shortcut to simplify it:  
            const {productId} = button.dataset; 

            // 13j-Challenge: When clicking 'Add to Cart', use the DOM to get the 'Added' message
            // element for the product (like we did in the exercise 13c):
            const addedToCartElement = document.querySelector(`.js-added-to-cart-${productId}`); 

            if(addedToCartElement.classList.contains('added-to-cart-visible')) {
                clearTimeout(timeout); 

                // 13k-Challenge: Add a class to the message lement using .classList.add(). 
                // Then, in style/pages/amazon.css, style this class so it has opacity: 1:
                addedToCartElement.classList.add('added-to-cart-visible'); 

                // 13l-Challenge: After 2 seconds (use setTimeout), make the message 
                // disappear by removing the class:
                timeout = setTimeout(() => {
                    addedToCartElement.classList.remove('added-to-cart-visible'); 
                }, 2000);
            }
            else {
                // 13k-Challenge: Add a class to the message lement using .classList.add(). 
                // Then, in style/pages/amazon.css, style this class so it has opacity: 1;
                addedToCartElement.classList.add('added-to-cart-visible'); 

                // 13l-Challenge: After 2 seconds (use setTimeout), make the message 
                // disappear by removing the class:
                timeout = setTimeout(() => {
                    addedToCartElement.classList.remove('added-to-cart-visible');
                }, 2000); 
            }

            
            // 13c: When clicking the 'Add to Cart' button, use the DOM 
            // to get the quantity selector (the <select> element) for the product.
            // Hint: use document.querySelector(`.js-quantity-selector-${productId}`):
            const selectorId = document.querySelector(`.js-quantity-selector-${productId}`); 

            // 13d: Get the value selected in the quantity selector (to get the value out 
            // of a <select> element, you can use the property '.value'): 
            const cartValue = selectorId.value; 
 
            let matchingProduct; 

            cart.forEach((product) => {
                if(product.productId === productId) {
                    matchingProduct = product;
                }
            });

            if(matchingProduct) {
                // 13e: When updating the cart, instead of using a quantity of 1 every time, 
                // use the quantity that get from 13d.
                // Hint: in order for the math to work properly, convert the value
                // from 13d into a number first using Number()
                // (since values we get from the DOM are strings by default):
                matchingProduct.quantity += Number(cartValue); 
            }

            else {
                cart.push({
                    // 13h: in amazon.js: 
                    // 1. Search for 'cart.push({'and use shorthand property in the 2 lines below this code'})
                    productId, 

                    // 13e: When updating the cart, instead of using a quantity of 1 every time, 
                    // use the quantity that get from 13d.
                    // Hint: in order for the math to work properly, convert the value
                    // from 13d into a number first using Number()
                    // (since values we get from the DOM are strings by default):
                    quantity: Number(cartValue)
                });    
            }
            
            let cartQuantity = 0; 
            cart.forEach((item) => {
                cartQuantity += item.quantity;   
            });

            // console.log(cartQuantity); 
            // console.log(cart); 

            // console.log(`The value of in the cart is: ${cartValue}`);
            document.querySelector('.js-cart-quantity')
                .innerHTML = cartQuantity; 
        });
    });