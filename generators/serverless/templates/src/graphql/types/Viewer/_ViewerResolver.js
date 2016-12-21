// @flow

import UserModel from '<%= name %>/graphql/types/User/UserModel';

export default function viewer(args: Object, context: Object): UserModel {
    return new UserModel(context.viewer);
}
