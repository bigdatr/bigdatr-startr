import test from 'ava';
import store from '../store';

test('store', tt => {
    tt.is(typeof store.dispatch, 'function', 'It has a dispatch function');
    tt.is(typeof store.getState, 'function', 'It has a getState function');
    tt.is(typeof store.subscribe, 'function', 'It has a subscribe function');
});