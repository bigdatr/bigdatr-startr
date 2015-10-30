import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from '<%= name %>/client/reducers';
import routes from '<%= name %>/client/routes';

var developerToolsComponent;
var createApplicationStore;
var appElement = document.getElementById('<%= name %>');
var history = createBrowserHistory();
var { devTools, persistState } = require('redux-devtools');
var middleware = applyMiddleware(thunk);


if(process.env.NODE_ENV === 'development') {
    createApplicationStore =  compose(
        middleware,
        devTools(),
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
} else {
    createApplicationStore = middleware(createStore);
}

var store = createApplicationStore(rootReducer);


//
// Developer Tools
//
if(process.env.NODE_ENV === 'development') {
    var { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
    var debugOverrideStyles = {
        fontSize: 14,
        WebkitFontSmoothing: 'subpixel-antialiased',
        boxShadow: 'none'
    };

    developerToolsComponent = (
        <div className="Devtools">
            <DebugPanel left top bottom style={debugOverrideStyles}>
                <DevTools store={store} monitor={LogMonitor} visibleOnLoad={false} />
            </DebugPanel>
        </div>
    );
}

//
// Render Town
//
ReactDOM.render((
    <div>
        <Provider store={store}>
            <Router history={history} routes={routes}/>
        </Provider>
        {developerToolsComponent}
    </div>
), appElement);
