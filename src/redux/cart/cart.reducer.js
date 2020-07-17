import { CartActionTypes } from './cart.types';

const INITIAL_STATE = {
    hidden: true
}

//weird syntax in parameter is for DEFAULT VALUE. ES6 syntax
const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN :
            return {
                ...state,
                hidden: !state.hidden        
            }
        default:
            return state;
    }
}

export default cartReducer;