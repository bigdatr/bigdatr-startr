// @flow

import test from 'ava';

import dataloaders from '<%= name %>/graphql/types/Viewer/dataloaders';

test('dataloaders', (t: AssertContext): void => {
    const dl = dataloaders();

    t.truthy(dl.UserLoader);
    return t.truthy(dl.UserLoader.loadUserByID);
});
