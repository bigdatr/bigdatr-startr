import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import {browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import store from '<%= name %>/client/store';
import routes from '<%= name %>/client/routes';
import clientStyles from '<%= name %>/client/sass/styles.scss';

const appElement = document.getElementById('<%= name %>');

ReactDOM.render((
    <div>
        <Provider store={store}>
            <Router history={browserHistory} routes={routes}/>
        </Provider>
    </div>
), appElement);
