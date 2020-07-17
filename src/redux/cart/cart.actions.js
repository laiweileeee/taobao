import { CartActionTypes } from './cart.types';

//Creating user ACTION
export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
});

//Creating additem ACTION
export const addItem = (item) => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
});