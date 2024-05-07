/*
14f-Challenge: In checkout.js, get all the 'Update' links from the page 
and add a 'click' event listener to each link. Also, attach the productId
to each link. When clicking the link, get the productId and console.log() it:


14g-Challenge: Add 2 HTML elements after the 'Update' link: 
1. An <input class="quantity-input"> (for entering a new quantity)
2. A <span class="save-quantity-link">Save</span> (to save the quantity)
3. Style the <input> and set its width to 30px (put the styles in the file: styles/pages/checkout/checkout.css)
4. Add the class "link-primary" to the <span> 


14h-Challenge: Make 'Save' appear when clicking "Update"
1. When clicking 'Update', get the cart-item-container for the product, and add the class 
'is-editing-quantity' to the container (use .classList).
2. In checkout.css, style the <input> and "save" link and add
display: none; (they will be invisible at the start)
3. The CSS ".is-editing-quantity .quantity-input {...}" styles elements with class
"quantity-input" inside an element with class 'is-editing-quantity'
4. Use this, and "display: initial;" (resets the display property) to make 
the <input> appear when editing the quantity. Same for the 'Save' link


14i-Challenge: Using similar CSS selectors as 14h, make 
the quantity and 'Update' link disappear when editing the quantity


14j-Challenge: Now we'll implement switching between 'Update' and 'Save'
Add 'click' event listeners to all 'Save' links. When clicking 'Save', 
do the opposite of 'Update': get the cart-item-container for the product,
and remove the class 'is-editing-quantity'. This should reverse
all the styling that's applied when editing the quantity.


14k-Challenge: When clicking 'Save', use the DOM to get the quantity <input>
for the product, and get the value inside (remember to convert this value to a number).
This will be the new quantity of the product in the cart. 


14l-Challenge: In cart.js, create a function updateQuantity(productId, newQuantity) which 
will find a matching productId in the cart, and update its quantity to the new quantity
(remember to save to storage after). 
1. Then, import and use this function when clicking a 'Save' link:

14m-Challenge: Now that we've updated the quantity in the cart, the last step is to 
update the quantity in the HTML. Update these 2 places: 
1. Inside the product 
2. In the header at the top
*/

import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import formatCurrency from '../utils/money.js'; 
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';


export function renderOrderSummary() {

  let cartSummaryHTML = ''; 

  cart.forEach((cartItem) => {
      const productId = cartItem.productId; 

      const matchingProduct = getProduct(productId); 

      const deliveryOptionId = cartItem.deliveryOptionId;

      const deliveryOption = getDeliveryOption(deliveryOptionId); 
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );

      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );
      
      cartSummaryHTML +=
      `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">Delivery date: ${dateString}</div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="js-quantity-label-${matchingProduct.id} quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link js-save-quantity-link link-primary" data-product-id=${matchingProduct.id}>Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>

          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
  `;
  });


  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = ''; 
    const today = dayjs();
    deliveryOptions.forEach((deliveryOption) => {
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );

      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );
      
      const priceString = deliveryOption.priceCents === 0 ? 'FREE ' : `$${formatCurrency(deliveryOption.priceCents)} - `; 

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId; 
      html +=
      `
      <div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
      <input type="radio" ${isChecked ? 'checked' : ''}  class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString}Shipping
        </div>
      </div>
      </div>
      `
    });
    return html; 
  }
  document.querySelector('.js-order-summary')
      .innerHTML = cartSummaryHTML; 
      
  document.querySelectorAll('.js-delete-link') 
      .forEach((link) => {
          link.addEventListener('click', () => {
              const productId = link.dataset.productId;
              removeFromCart(productId); 

              const container = document.querySelector(
                  `.js-cart-item-container-${productId}` 
              );

              container.remove();  
              document.querySelector('.js-return-to-home-link')
                .innerHTML = calculateCartQuantity(); 

              renderPaymentSummary(); 
          });
      });

  document.querySelectorAll('.js-delivery-option')
      .forEach((element) => {
        element.addEventListener('click', () => {
          // const productId = element.dataset; 
          // const deliveryOptionId = element.dataset; 
          const {productId, deliveryOptionId} = element.dataset; 
          updateDeliveryOption(productId, deliveryOptionId);
          renderOrderSummary(); 
          renderPaymentSummary(); 
        }); 
      }) 

  document.querySelectorAll('.js-update-link')
      .forEach((link) => {
        link.addEventListener('click', () => {
          const productId = link.dataset.productId; 
          const cartItemContainerElement = document.querySelector(`.js-cart-item-container-${productId}`); 
          cartItemContainerElement.classList.add('is-editing-quantity'); 
        });
      });

  document.querySelectorAll('.js-save-quantity-link') 
      .forEach((link) => {
        link.addEventListener('click', () => {
          const productId = link.dataset.productId; 
          const inputQuantityElement = document.querySelector(`.js-quantity-input-${productId}`); 

          const cartItemContainerElement = document.querySelector(`.js-cart-item-container-${productId}`); 
          cartItemContainerElement.classList.remove('is-editing-quantity'); 

          const newQuantity = Number(inputQuantityElement.value);  

          if(newQuantity >= 15) {
            alert('You cannot put to the cart more than 15 of the same item!');
            return; 
          }
          else {
            updateQuantity(productId, newQuantity);
          }
          document.querySelector('.js-return-to-home-link')
              .innerHTML = calculateCartQuantity(); 

          document.querySelector(`.js-quantity-label-${productId}`)
              .innerText = newQuantity;
        });
      }); 

  // 14b: In checkout.js, when the page loads, calculate the actual quantity of products
  // in the cart, and display it in the header: `${quantity} items`
  // Hints: 

  // 1. In amazon.js, inside the function updateCartQuantity(), we wrote 
  // some code to calculate teh cart quantity. Reuse this code. 
  // 2. In checkout.html, you'll need to add a class to the element so you 
  // can select it with the DOM and change the innerHTML:


  // 14c: Continuing from 14b, also calculate and display the quantity in the 
  // header when clicking 'delete'.

  // 1. First, create a function updateCartQuantity() and put
  // the code from 14b inside. 
  // 2. Run this function when loading the page and when clicking delete (notice that this function
  // doesn't conflict with updateCartQuantity() in amazon.js because we're using modules):


  document.querySelector('.js-return-to-home-link')
    .innerHTML = calculateCartQuantity(); 
}