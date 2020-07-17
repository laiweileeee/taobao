import { CartActionTypes } from './cart.types';

//Creating user ACTION
export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
});