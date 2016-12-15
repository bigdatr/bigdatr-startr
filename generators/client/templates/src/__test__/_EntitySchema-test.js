import test from 'ava';
import EntitySchema from '../EntitySchema';

test('EntitySchema', tt => {
    tt.is(typeof EntitySchema, 'object', 'It exports an object');
});