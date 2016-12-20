import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';

const proxyquire = require('proxyquire').noCallThru();


const AppHandler = proxyquire('../AppHandler', {
    'react-cognito-forms': {
        LoginForm : (props) => <div>{props.children}</div>
    }
}).default;


const page = shallow(<AppHandler><div>Child Component</div></AppHandler>);

<% if(!cognito) { %>
test('App handler wraps app in a div', tt => {
    tt.is(
        page.name(),
        'div'
    );
});
<% } else { %>
test('App handler wraps app in a Login Form component', tt => {
    tt.is(
        page.name(),
        'LoginForm'
    );
});
<% } %>

test('App Handler renders passed children', tt => {
    tt.true(
        page.html().indexOf('Child Component') !== -1,
        'Renders passed children'
    );
});
