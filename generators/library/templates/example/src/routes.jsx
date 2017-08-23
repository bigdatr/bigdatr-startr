import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';

import AppHandler from 'component/AppHandler';
import ErrorHandler from 'component/ErrorHandler';
import HomePage from 'component/HomePage';

export const routesList = <Switch>
    <Route exact path="/" component={HomePage} />
    {/* add routes here e.g. <Route path="/component/Button" component={ButtonExample}/> */}
    <Route component={ErrorHandler} />
</Switch>;

const Routes = <HashRouter>
    <AppHandler>
        {routesList}
    </AppHandler>
</HashRouter>;

export default Routes;
