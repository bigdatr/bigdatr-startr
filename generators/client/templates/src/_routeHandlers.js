<% if(cognito) { %>
import {SignUpForm, Logout} from 'react-cognito-forms';
<% } %>
import AppHandler from '<%= name %>/components/AppHandler';
import ErrorHandler from '<%= name %>/components/ErrorHandler';
import MainPage from '<%= name %>/components/MainPage';
import OtherPage from '<%= name %>/components/OtherPage';


// Use module exports here so it can be stubbed in webpack build.
// proxyquire doesn't like es6 exports
module.exports = {
    AppHandler,
    ErrorHandler,
    MainPage,
    <% if(cognito) { %>
    SignUpPage: SignUpForm,
    LogoutPage: Logout,
    <% } %>
    OtherPage
};
