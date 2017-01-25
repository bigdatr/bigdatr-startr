import thunk from 'redux-thunk';
import reducers from '<%= name %>/client/reducers';
import {compose, createStore, applyMiddleware} from 'redux';

// create middleware
var middleware = applyMiddleware(
    thunk
);

// Construct the store creator
var createApplicationStore;
if(process.env.NODE_ENV === 'development') {
    createApplicationStore = compose(
        middleware,
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore);
} else {
    createApplicationStore = middleware(createStore);
}

// create and export the store
export default createApplicationStore(reducers);
