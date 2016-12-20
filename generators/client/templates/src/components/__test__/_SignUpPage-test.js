import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';

const proxyquire = require('proxyquire').noCallThru();


const SignUpPage = proxyquire('../SignUpPage', {
    'react-cognito-forms': {
        SignUpForm : (props) => <div></div>
    }
}).default;




test('Sign up page renders a signup form', tt => {
    const page = shallow(<SignUpPage/>);

    tt.is(
        page.name(),
        'SignUpForm'
    );
});
