/* @flow */

import React from 'react';
import {Route, IndexRoute} from 'react-router';

// Use require and relative path here so that proxyquire is happy
// routeHandlers are kept in separate file so that they can be easily
// stubbed and allow for routes to be passed to static site builder
const routeHandlers = require('./routeHandlers');

var routes = (
    <Route component={routeHandlers.AppHandler} path="/">
        <IndexRoute component={routeHandlers.MainPage} />
        <% if(cognito) { %>
        <Route path="signup" component={routeHandlers.SignUpPage} />
        <Route path="logout" component={routeHandlers.LogoutPage} />
        <% } %>
        <Route path="*" component={routeHandlers.ErrorHandler}/>
    </Route>
);

module.exports = routes;
