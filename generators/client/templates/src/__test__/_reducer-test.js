import test from 'ava';
import reducers from '../reducers';

test('reducers', tt => {
    tt.is(typeof reducers, 'function', 'It exports a function');


    const state = reducers({}, {
        type: 'NONE_OF_YOUR_BUSINESS'
    });

    tt.is(typeof state, 'object', 'It returns an object when called');

});