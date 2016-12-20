/* @flow */

import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import {browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import store from '<%= name %>/store';
import routes from '<%= name %>/routes';
<% if(segment) { %>import tracking from '<%= name %>/tracking';<% } %>
import '<%= name %>/sass/styles.scss';

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