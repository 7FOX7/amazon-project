// All render functions are executed here, 
// so, new functions created, do not forget to export them!

import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import {renderOrderSummary} from './checkout/orderSummary.js'; 
import {renderPaymentSummary} from './checkout/paymentSummary.js'; 
import '../data/cart-class.js';

renderCheckoutHeader(); 
renderOrderSummary(); 
renderPaymentSummary(); 