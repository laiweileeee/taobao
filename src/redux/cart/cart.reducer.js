import { CartActionTypes } from './cart.types';
import { addItemToCart } from './cart.utils';

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}

//weird syntax in parameter is for DEFAULT VALUE. ES6 syntax
const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden        
            };
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                //this has to return a new array! TO TRIGGER RE-RENDER FOR REACT
                cartItems: addItemToCart(state.cartItems, action.payload)
            };
        default:
            return state;
    }
}

export default cartReducer;