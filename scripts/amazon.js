/*

Challenge: 
We'll create the 'Added' message. 
The HTML element for this already exists: 
<div class="added-to-cart">
However, in the CSS, this element has opacity: 0 (it's invisible).


13i-challenge: Add a unique class to this element (like we did in exercise 13b) 
to indentify which product it is for: 
*/
import {cart, addToCart} from '../data/cart.js';
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

// Update the cart quantity:
function updateCartQuantity() {
    let cartQuantity = 0; 
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;   
    });

    document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
}

// Makes the 'Added' icon pop up: 
function displayAddedToCartIcon(productId) {
    const addedToCartElement = document.querySelector(`.js-added-to-cart-${productId}`); 

    if(addedToCartElement.classList.contains('added-to-cart-visible')) {
        clearTimeout(timeout); 
        addedToCartElement.classList.add('added-to-cart-visible'); 
        timeout = setTimeout(() => {
            addedToCartElement.classList.remove('added-to-cart-visible'); 
        }, 2000);
    }
    else {
        addedToCartElement.classList.add('added-to-cart-visible'); 
        timeout = setTimeout(() => {
            addedToCartElement.classList.remove('added-to-cart-visible');
        }, 2000); 
    }
}

document.querySelectorAll('.js-add-to-cart-button') 
    .forEach((button) => {
        button.addEventListener('click', () => {
            const {productId} = button.dataset; 
            
            displayAddedToCartIcon(productId); 
            addToCart(productId); 
            updateCartQuantity(); 
        });
    });