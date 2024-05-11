import { isValidDeliveryOptionId } from "./deliveryOptions.js";

function Cart(localStorageKey) {
    
    const cart = {
        cartItems: undefined,
        
        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)); 
        
            if(!this.cartItems) {
                this.cartItems = [{
                    productId: 'ac2847e9-4444-403f-b7cf-57fde044a944',
                    quantity: 2,
                    deliveryOptionId: '1'
            }, {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
                quantity: 3, 
                deliveryOptionId: '2'
            }
        ]; 
        }
        },

        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },

        addToCart(productId, cartValue) {
            let matchingProduct; 

            this.cartItems.forEach((product) => {
                if(product.productId === productId) {
                    matchingProduct = product;
                }
            });
            // const cartValue = this.updateQuantitySelector(productId); 

            if(matchingProduct) {
                matchingProduct.quantity += Number(cartValue);
            }
            // const placeholder = deliveryOptionElement.innerHTML 
            else {
                this.cartItems.push({
                    productId, 
                    quantity: Number(cartValue),
                    deliveryOptionId: '1'
                });    
            }

            this.saveToStorage(); 
        },

        updateQuantity(productId, newQuantity) {
            let matchingProduct = ''; 
            this.cartItems.forEach((cartItem) => {
                if(cartItem.productId === productId) {
                    matchingProduct = cartItem; 
                    matchingProduct.quantity = newQuantity; 
                }
            });
        
            this.saveToStorage(); 
        }, 

        calculateCartQuantity() {
            let cartQuantity = 0; 
        
            this.cartItems.forEach((cartItem) => {
                cartQuantity += cartItem.quantity;
            });
        
            return cartQuantity; 
        },

        updateDeliveryOption(productId, deliveryOptionId) {
            let matchingItem; 

            // assuming we use 'isValidDeliveryOptionId()' function: 
            // 1. if it fails (return) it should not reach localStorage.setItem(); 
            // 2. otherwise (if it NOT return) it should reach localStorage.setItem();

            // assuming we do NOT use 'isValidDeliveryOptionId()' function: 
            // 1. it should reach localStorage.setItem() whether the deliveryOptionId is valid or invalid
            if(!isValidDeliveryOptionId(deliveryOptionId)) {
                return;
            }
            this.cartItems.forEach((cartItem) => {
                if(cartItem.productId === productId) {
                    matchingItem = cartItem; 
                }
            });

            if(!matchingItem) {
                return; 
            }
            matchingItem.deliveryOptionId = deliveryOptionId;

            this.saveToStorage(); 
        }
    };

    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart); 