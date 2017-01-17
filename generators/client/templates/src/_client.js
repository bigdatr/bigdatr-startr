/* @flow */

// A fix for style-loader issue #96, #55, #124
if(process.env.NODE_ENV === 'development') {
    /* eslint-disable */
    __webpack_public_path__ = window.location.protocol + "//" + window.location.host + "/";
    /* eslint-enable */
}

import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import {browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import store from '<%= name %>/store';
import routes from '<%= name %>/routes';
import '<%= name %>/meta';
<% if(segment) { %>import tracking from '<%= name %>/tracking';<% } %>

// Needs to be required rather than imported for above fix to work
require('<%= name %>/sass/styles.scss');

const appElement = document.getElementById('<%= name %>');

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>
), appElement);

<% if(segment) { %>
// Set up tracking
tracking();
<% } %>