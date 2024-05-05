export const cart = [];

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
}