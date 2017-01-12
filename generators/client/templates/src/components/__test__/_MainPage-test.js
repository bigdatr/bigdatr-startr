import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import store from '../../store';

const proxyquire = require('proxyquire').noCallThru();

const MainPage = proxyquire('../MainPage', {
    '<%= name %>/assets/15.png': '/path/to/an/image.png',
    '<%= name %>/components/Viewer': () => <div>Viewer Component</div>
}).default;

const page = shallow(<MainPage store={store}/>);

test('MainPage renders the image loaded with file-loader', tt => {
    tt.true(
        page.html().indexOf('/path/to/an/image.png') !== -1
    );
});


test('MainPage renders user component', tt => {
    tt.true(
        page.html().indexOf('Viewer Component') !== -1
    );
});