import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';

const proxyquire = require('proxyquire').noCallThru();


const AppHandler = proxyquire('../AppHandler', {
    'react-cognito-forms': {
        LoginForm : (props) => <div>{props.children}</div>
    }
}).default;




test('App Handler', tt => {
    const page = shallow(<AppHandler><div>Child Component</div></AppHandler>);
    tt.is(
        page.name(),
        <% if(cognito) { %>'LoginForm',
        'Wraps in a Login Form component'<% } else { %>'div',
        'Wraps iwith a div'<% } %>
    );

    tt.true(
        page.html().indexOf('Child Component') !== -1,
        'Renders passed children'
    );
});
