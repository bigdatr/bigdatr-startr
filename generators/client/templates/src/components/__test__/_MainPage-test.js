import React from 'react';
import test from 'ava';
import {shallow} from 'enzyme';
import store from '../../store';

const proxyquire = require('proxyquire').noCallThru();

const MainPage = proxyquire('../MainPage', {
    '<%= name %>/assets/15.png': '/path/to/an/image.png',
    '<%= name %>/components/User': () => <div>User Component</div>
}).default;


test('MainPage', tt => {
    const page = shallow(<MainPage store={store}/>);

    tt.true(
        page.html().indexOf('/path/to/an/image.png') !== -1,
        'renders the image loaded with file-loader'
    );

    tt.true(
        page.html().indexOf('User Component') !== -1,
        'renders user component'
    );

});
