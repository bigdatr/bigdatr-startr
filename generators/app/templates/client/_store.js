import thunk from 'redux-thunk';
import reducers from '<%= name %>/client/reducers';
import { compose, createStore, applyMiddleware } from 'redux';

// create middleware
var middleware = applyMiddleware(
    thunk
);

// Construct the store creator
var createApplicationStore;
if(process.env.NODE_ENV === 'development') {
	var Devtools = require('<%= name %>/client/devtools');
    var {persistState} = require('redux-devtools');

    createApplicationStore = compose(
        middleware,
		Devtools.instrument(),
        persistState(getDebugSessionKey())
    )(createStore);

    function getDebugSessionKey(){
        const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
		return (matches && matches.length > 0)? matches[1] : null;
    }
} else {
    createApplicationStore = middleware(createStore);
}

// create and export the store
export default createApplicationStore(reducers);
