import test from 'ava';
import getJwtToken from '../getJwtToken';

test('getJwtToken returns a string', tt => {
    tt.is(typeof getJwtToken(), 'string');
});