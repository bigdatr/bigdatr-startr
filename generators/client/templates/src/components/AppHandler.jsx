/* @flow */

import React from 'react';
<% if(cognito) { %>
import {LoginForm} from 'react-cognito-forms';
<% } %>

export default (props: Object): React.Element<any> => {
    <% if(cognito) { %>return <LoginForm
        location={props.location}
        cognitoGatewayHost={process.env.COGNITO_GATEWAY_HOST}
        exclude={['/logout', '/signup']}
    >
        <h1><%= name %></h1>
        {props.children}
    </LoginForm>;<% } else { %>return <div>
        <h1><%= name %></h1>
        {props.children}
    </div>;<% } %>
};
