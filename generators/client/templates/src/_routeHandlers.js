/* @flow */

// NOTE: This file cannot be tested so don't put any logic in here
import AppHandler from '<%= name %>/components/AppHandler';
import ErrorHandler from '<%= name %>/components/ErrorHandler';
import MainPage from '<%= name %>/components/MainPage';
<% if(cognito) { %>import {Logout} from 'react-cognito-forms';
import SignUpPage from '<%= name %>/components/SignUpPage';<% } %>


// Use module exports here so it can be stubbed in webpack build.
// proxyquire doesn't like es6 exports
module.exports = {
    AppHandler,
    ErrorHandler,
    MainPage<% if(cognito) { %>,
    SignUpPage,
    LogoutPage: Logout<% } %>
};
