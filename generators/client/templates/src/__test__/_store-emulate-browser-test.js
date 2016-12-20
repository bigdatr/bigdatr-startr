import test from 'ava';

global.window = {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: function(){}
}

const store = require('../store').default;

test('store has a dispatch function', tt => {
    tt.is(typeof store.dispatch, 'function', 'It ');
});

test('store has a getState function', tt => {
    tt.is(typeof store.getState, 'function');
});

test('store has a subscribe function', tt => {
    tt.is(typeof store.subscribe, 'function');
});