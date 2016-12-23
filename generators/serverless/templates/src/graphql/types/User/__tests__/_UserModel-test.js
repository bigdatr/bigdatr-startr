// @flow

import test from 'ava';

import ViewerModel from '<%= name %>/graphql/types/Viewer/ViewerModel';
import UserModel from '<%= name %>/graphql/types/User/UserModel';

test('UserModel.gen should create an instance for the specified user_id', (t: AssertContext): Promise<> => {
    const viewer = new ViewerModel({});

    return UserModel.gen(viewer, '123')
        .then((u: ?UserModel): void => {
            if (!u) {
                return t.fail();
            }

            t.is('fakeuser-123', u.sub);
        });
});
