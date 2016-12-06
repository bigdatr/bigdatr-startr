import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import {browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import store from '<%= name %>/store';
import routes from '<%= name %>/routes';
import '<%= name %>/sass/styles.scss';

const appElement = document.getElementById('<%= name %>');

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>
), appElement);
