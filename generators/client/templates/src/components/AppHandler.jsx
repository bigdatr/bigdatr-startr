/* @flow */

import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import AppHandler from '<%= name %>/components/AppHandler';
import ErrorHandler from '<%= name %>/components/ErrorHandler';
import MainPage from '<%= name %>/components/MainPage';
<% if(cognito) { %>
import {LoginForm, Logout} from 'react-cognito-forms';
import SignUpPage from '<%= name %>/components/SignUpPage';
<% } %>

export default (): React.Element<any> => {
    return <BrowserRouter>
        <Route path="/" render={(props: Object): React.Element<any> =>{
            <% if(cognito) { %>return <LoginForm
                location={props.location}
                cognitoGatewayHost={process.env.COGNITO_GATEWAY_HOST}
                exclude={['/logout', '/signup']}
            >
                <h1><%= name %></h1>
                <Route exact path="/" component={MainPage} />
                <% if(cognito) { %>
                <Route path="/signup" component={SignUpPage} />
                <Route path="/logout" component={Logout} />
                <% } %>
                <Route component={ErrorHandler}/>
            </LoginForm>;<% } else { %>return <div>
                <h1><%= name %></h1>
                <Route exact path="/" component={MainPage} />
                <% if(cognito) { %>
                <Route path="/signup" component={SignUpPage} />
                <Route path="/logout" component={Logout} />
                <% } %>
                <Route component={ErrorHandler}/>
            </div>;<% } %>
        }}/>
    </BrowserRouter>;
};


