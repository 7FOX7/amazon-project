// Save data inside the java script: 

let productsHTML = '';

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

            <div class="added-to-cart">
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
            const productId = button.dataset.productId; 

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
                    productId: productId, 

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