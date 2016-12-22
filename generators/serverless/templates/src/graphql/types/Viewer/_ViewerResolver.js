// @flow

import UserModel from '<%= name %>/graphql/types/User/UserModel';

export default async function viewer(args: Object, context: Object): Promise<UserModel> {
    return new UserModel(context.viewer);
}
