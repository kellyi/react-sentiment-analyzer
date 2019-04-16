import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import isObject from 'lodash/isObject';

import rootReducer from './reducers';

const isDevelopment = process.env.NODE_ENV === 'development';

const devtoolsExtensionCompose =
    isObject(window) &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const middleware = isDevelopment
    ? [thunkMiddleware, createLogger({ diff: true, collapsed: true })]
    : [thunkMiddleware];

const composeEnhancers = devtoolsExtensionCompose || compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));

export default createStore(rootReducer, enhancer);
