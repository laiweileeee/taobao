const INITIAL_STATE = {
    currentUser: null
}

//weird syntax in parameter is for DEFAULT VALUE. ES6 syntax
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER' :
            return {
                ...state,
                currentUser: action.payload            
            }
        default:
            return state;
    }
}

export default userReducer;