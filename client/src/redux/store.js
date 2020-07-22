import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

//Setting up middleware, availble on redux documentation

//Dynamic array to add more middlewares as we scale
const middlewares = [thunk];

//if statement to hide logger in console for production, env cane be 'production', development' or 'test'
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// create new persisted version of our store
export const persistor = persistStore(store);

export default { store, persistor };
