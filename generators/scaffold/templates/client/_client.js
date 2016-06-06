import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from '<%= name %>/client/store';
import routes from '<%= name %>/client/routes';
import clientStyles from '<%= name %>/client/sass/styles.scss';

var appElement = document.getElementById('<%= name %>');

function renderDevtools() {
    if (process.env.NODE_ENV === 'development') {
        var Devtools = require('<%= name %>/client/devtools');
        return <Devtools store={store} />;
    }
}

//
// Render Town
//
ReactDOM.render((
    <div>
        <Provider store={store}>
            <Router history={browserHistory} routes={routes}/>
        </Provider>
        {renderDevtools()}
    </div>
), appElement);
