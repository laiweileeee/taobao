import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
//getting the localStorage object as default storage, not session storage
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
    // key: from where in reducer object do you want store everything  
    key: 'root',
    storage,
    //array of string names of reducers that we want to store
    whitelist: ['cart'] 
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
})

//modify rootReducer with the persistConfig on top of it
export default persistReducer(persistConfig, rootReducer);