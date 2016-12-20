import test from 'ava';
import reducers from '../reducers';

test('reducers exports a function', tt => {
    tt.is(typeof reducers, 'function');
});

test('reducers returns an object when called', tt => {
    const state = reducers({}, {
        type: 'NONE_OF_YOUR_BUSINESS'
    });

    tt.is(typeof state, 'object');
});