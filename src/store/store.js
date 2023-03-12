import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import logger from "redux-logger";
import createSagaMiddleWare from 'redux-saga'
import { rootSaga } from "./root-saga";
import { rootReducer } from "./root-reducer";

//persist的配置对象
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const sagaMiddleWare = createSagaMiddleWare();

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleWare
].filter(Boolean);


const persistedReducer = persistReducer(persistConfig, rootReducer);


const composeEnhancer = (process.env.NODE_ENV !== 'production'
  && window
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));


export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);