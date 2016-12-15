import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import store from '../../store';
import {Map} from 'immutable';

const proxyquire = require('proxyquire').noCallThru();


const User = proxyquire('../User', {
    '<%= name %>/EntityQuery': proxyquire('../../EntityQuery', {
        '<%= name %>/util/request': function() {return Promise.resolve()}
    }).default
}).default;

process.env.<%= nameConstant %>_GRAPHQL_SERVER = 'http://localhost:3000';

test('User component', tt => {

    tt.notThrows(
        () => shallow(<User store={store}/>).html(),
        'Can render loading/initial state without requested data'
    );


    const UserWithData = shallow(<User store={store} user={Map({
        username: 'Test Testerson',
        id: '1234567890'
    })}/>); // note that store is passed here for testing purposes, normally the app would be
            // wrapped in a provider which would provide the store to react-redux

    const html = UserWithData.html();

    tt.true(
        html.indexOf('Test Testerson') !== -1,
        'Renders user\'s name'
    );


    tt.true(
        html.indexOf('1234567890') !== -1,
        'Renders user\'s ID'
    );
});