// @flow

import test from 'ava';

import ViewerResolver from 'chekt-api/graphql/types/Viewer/ViewerResolver';

test('ViewerResolver', (t: AssertContext): Promise<> => {
    const input = {
        viewer: {
            sub: 'abc123',
            username: 'testUser'
        }
    };

    return ViewerResolver({}, input)
        .then((value: Object) => {
            t.is(input.viewer.sub, value.sub);
            t.is(input.viewer.username, value.username);
        });
});
