// @flow

import test from 'ava';

import * as UserLoader from '<%= name %>/graphql/types/User/UserLoader';

test('UserLoader should return a fake user', (t: AssertContext): Promise<> => {
    return UserLoader.loadUserByID([1])
            .then((values: Array<Object>) => {
                t.is('fakeuser-1', values[0].sub);
            });
});
