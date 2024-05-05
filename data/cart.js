export let cart = JSON.parse(localStorage.getItem('cart')) 

if(!cart) {
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 10
    }] 
} 


function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Adds item to cart:
export function addToCart(productId) {
    let matchingProduct; 

    cart.forEach((product) => {
        if(product.productId === productId) {
            matchingProduct = product;
        }
    });
    const selectorId = document.querySelector(`.js-quantity-selector-${productId}`); 
    const cartValue = selectorId.value;

    if(matchingProduct) {
        matchingProduct.quantity += Number(cartValue); 
    }

    else {
        cart.push({
            productId, 

            quantity: Number(cartValue)
        });    
    }

    saveToStorage(); 
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId != productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveToStorage(); 
}