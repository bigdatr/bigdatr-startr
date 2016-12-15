import test from 'ava';

global.window = {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: function(){}
}

const store = require('../store').default;

test('store', tt => {
    tt.is(typeof store.dispatch, 'function', 'It has a dispatch function');
    tt.is(typeof store.getState, 'function', 'It has a getState function');
    tt.is(typeof store.subscribe, 'function', 'It has a subscribe function');
});