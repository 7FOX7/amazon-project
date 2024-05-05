export const cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
    quantity: 2
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 10
}];

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