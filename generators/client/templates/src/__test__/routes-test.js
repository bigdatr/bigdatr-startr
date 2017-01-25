import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
const proxyquire = require('proxyquire').noCallThru();
const routes = proxyquire('<%= name %>/routes', {'./routeHandlers': {}});

test('routes exports a route', tt => {
    tt.is(
        routes.type.displayName,
        'Route'
    );
});

