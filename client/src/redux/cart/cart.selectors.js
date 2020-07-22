//selectors for when u need to pull state values 

import { createSelector } from 'reselect';

 //input selector 
 const selectCart = (state) => state.cart;

 //create selector
export const selectCartItems = createSelector(
    // 1st argument: array of input selectors
    [selectCart],
    // 2nd argument: function which takes in cart and returns the cartItems 
    (cart) => cart.cartItems
)

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (accumulatedQuantity, cartItem) => 
        accumulatedQuantity + cartItem.quantity, 
        0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (accumulatedPrice, cartItem) => 
        accumulatedPrice + cartItem.quantity * cartItem.price, 
        0)
)