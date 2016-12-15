import test from 'ava';
import getJwtToken from '../getJwtToken';

test('getJwtToken', tt => {
    tt.is(typeof getJwtToken(), 'string', 'It returns a string');
});