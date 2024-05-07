import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js'; 
import {formatCurrency} from './utils/money.js';
import isSatSun from '../weekend.js'; 
let productsHTML = '';

// 15a: Using DayJS, get the date 5 days after today and display 
// it in the format: '<Month><Day of Month>':
const today =  dayjs(); 
const fiveDaysFromToday = today.add(5, 'day'); 
console.log(fiveDaysFromToday.format('<MMMM><D>' )); 

// 15b: Calculate 1 month after today and display in the same format as 15a: 
const oneMonthFromToday = today.add(1, 'month'); 
console.log(oneMonthFromToday.format('<MMMM><D>')); 

// 15c: Get a date from DayJS has a .subtract(...) method which subtracts time
// from a date. Calculate 1 month before today and display in the same format as 15a: 
const oneMonthBeforeToday = today.subtract(1, 'month'); 
console.log(oneMonthBeforeToday.format('<MMMM><D>')); 

// 15d: Get a date from DayJS and display it in this format: '<Day of Week>'
// (The format should be 'Monday', 'Tuesday', etc.):
const nameOfTodayWeek = today.format('dddd'); 
console.log(nameOfTodayWeek); 

// 15e: Create a function isWeekend(date) that takes a DayJS object, and
// returns whether the date is 'Saturday' or 'Sunday' 
// Hint: use solution from 15d. Test this function with a few different dates:

const yesterdayDate = today.subtract(1, 'day'); 
function _isWeekend(date) {
    if(date === 0 || date === 6) {
        return 'Weekend'; 
    }
    else {
        return 'NOT Weekend'; 
    }
}
console.log(_isWeekend(yesterdayDate.day())); 

// 15f: Move is Weekend() into a separate file and use export 
// default. Import this function in another file and run it:
const todayDate = today.day(); 
// console.log(isWeekend(todayDate)); 

// 15h: We can also rename a default export when we import. In 15f, when we 'import isWeekend', 
// change the name to something else like 'import isSatSun' and use this new name 
// to run the function: 
console.log(isSatSun(todayDate)); 





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
                $${formatCurrency(product.priceCents)}
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
            <!-- product.id = id of the product that we get by looping through the array 'products' -->
            <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
  `;
});

// updateCartQuantity(); 
document.querySelector('.js-cart-quantity')
    .innerHTML = calculateCartQuantity(); 

document.querySelector('.js-products-grid')
    .innerHTML = productsHTML; 


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
            // updateCartQuantity();
            document.querySelector('.js-cart-quantity')
                .innerHTML = calculateCartQuantity();  
        });
    });


// Update the cart quantity:
// function updateCartQuantity() {
//     let cartQuantity = 0; 
//     cart.forEach((cartItem) => {
//         cartQuantity += cartItem.quantity;   
//     });

//     document.querySelector('.js-cart-quantity')
//         .innerHTML = cartQuantity;
// }
