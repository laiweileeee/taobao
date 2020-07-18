import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

//Setting up middleware, availble on redux documentation

//Dynamic array to add more middlewares as we scale
const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// create new persisted version of our store
export const persistor = persistStore(store);

export default { store, persistor };
