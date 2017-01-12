import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import store from '../../store';
import UserRecord from '../../entity/user/UserRecord';

const proxyquire = require('proxyquire').noCallThru();


const Viewer = proxyquire('../Viewer', {
    '<%= name %>/EntityQuery': proxyquire('../../entity/EntityQuery', {
        '<%= name %>/util/request': function() {return Promise.resolve()}
    }).default
}).default;

process.env.<%= nameConstant %>_GRAPHQL_SERVER = 'http://localhost:3000';


const ViewerWithData = shallow(<Viewer store={store} viewer={new UserRecord({
    username: 'Test Testerson'
})}/>); // note that store is passed here for testing purposes, normally the app would be
        // wrapped in a provider which would provide the store to react-redux

const html = ViewerWithData.html();


test('Viewer component can render loading/initial state without requested data', tt => {
    tt.notThrows(
        () => shallow(<Viewer store={store}/>).html()
    );
});

test('Viewer component Renders user\'s name', tt => {
    tt.true(
        html.indexOf('Test Testerson') !== -1
    );

});
