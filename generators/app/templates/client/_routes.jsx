import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppHandler from '<%= name %>/client/components/AppHandler';
import ErrorHandler from '<%= name %>/client/components/ErrorHandler';
import MainPage from '<%= name %>/client/components/MainPage';
import OtherPage from '<%= name %>/client/components/OtherPage';

var routes = (
    <Route component={AppHandler} path="/">
        <IndexRoute component={MainPage} />
        <Route path="other" component={OtherPage} />
        <Route path="*" component={ErrorHandler}/>
    </Route>
);

module.exports = routes;
