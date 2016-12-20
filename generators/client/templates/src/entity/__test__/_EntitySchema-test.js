import test from 'ava';
import EntitySchema from '../EntitySchema';

test('EntitySchema exports an object', tt => {
    tt.is(typeof EntitySchema, 'object');
});