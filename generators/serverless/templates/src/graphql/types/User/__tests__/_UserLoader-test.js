// @flow

import test from 'ava';

import * as UserLoader from 'chekt-api/graphql/types/User/UserLoader';

test('UserLoader should return a fake user', t => {
    return UserLoader.loadUserByID([1])
            .then((values: Array<Object>) => {
                t.is('fakeuser-1', values[0].sub);
            });
});
