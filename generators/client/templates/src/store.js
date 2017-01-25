/* @flow */

import thunk from 'redux-thunk';
import reducers from '<%= name %>/reducers';
import {compose, createStore, applyMiddleware} from 'redux';

// create middleware
var middleware = applyMiddleware(
    thunk
);

// hook up redux devtool
const composeEnhancers = (
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const store = createStore(reducers, {}, composeEnhancers(middleware));

// create and export the store
export default store;
