import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import store from '../../store';
import UserRecord from '../../entity/user/UserRecord';

const proxyquire = require('proxyquire').noCallThru();


const User = proxyquire('../User', {
    '<%= name %>/EntityQuery': proxyquire('../../entity/EntityQuery', {
        '<%= name %>/util/request': function() {return Promise.resolve()}
    }).default
}).default;

process.env.<%= nameConstant %>_GRAPHQL_SERVER = 'http://localhost:3000';


const UserWithData = shallow(<User store={store} user={new UserRecord({
    username: 'Test Testerson',
    id: '1234567890'
})}/>); // note that store is passed here for testing purposes, normally the app would be
        // wrapped in a provider which would provide the store to react-redux

const html = UserWithData.html();


test('User component can render loading/initial state without requested data', tt => {
    tt.notThrows(
        () => shallow(<User store={store}/>).html()
    );
});

test('User component Renders user\'s name', tt => {
    tt.true(
        html.indexOf('Test Testerson') !== -1
    );

});

test('User component Renders user\'s ID', tt => {
    tt.true(
        html.indexOf('1234567890') !== -1
    );
});