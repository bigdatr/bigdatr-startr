// @flow

import test from 'ava';

import ViewerModel from 'chekt-api/graphql/types/Viewer/ViewerModel';
import UserModel from 'chekt-api/graphql/types/User/UserModel';

test('UserModel.gen should create an instance for the specified user_id', (t) => {
    const viewer = new ViewerModel({});

    return UserModel.gen(viewer, '123')
        .then((u: ?UserModel): UserModel => {
            if (!u) {
                t.fail();
            }

            t.is('fakeuser-123', u.sub);
        });
});
