// @flow

import test from 'ava';

import dataloaders from 'chekt-api/graphql/types/Viewer/dataloaders';

test('dataloaders', (t: AssertContext) => {
    const dl = dataloaders();

    t.truthy(dl.UserLoader);
    t.truthy(dl.UserLoader.loadUserByID);
});
