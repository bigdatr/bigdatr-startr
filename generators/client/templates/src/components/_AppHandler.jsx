import React from 'react';
import {Link} from 'react-router';
<% if(cognito) { %>
import {LoginForm} from 'react-cognito-forms';
<% } %>

export default (props) => {
    <% if(cognito) { %>
    return <LoginForm
        location={props.location}
        exclude={['/auth', '/auth/signup']}
    >
        <h1><%= name %></h1>
        {props.children}
    </LoginForm>
    <% } else { %>
    return <div>
        <h1><%= name %></h1>
        {props.children}
    </div>
    <% } %>
}
