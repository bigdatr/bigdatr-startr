// @flow

import BaseModel from '<%= name %>/shared/models/BaseModel';
// import ViewerModel from '<%= name %>/graphql/types/Viewer/ViewerModel';

export default class UserModel extends BaseModel {
    // static async gen(viewer: ViewerModel, user_id: string): Promise<?UserModel> {
    //     const {loadUserByID} = viewer.dataLoaders;
    //
    //     const rawData = await loadUserByID.load(user_id);
    //     const canSee = hasPermission(viewer, rawData);
    //
    //     return canSee === true ? new UserModel(rawData) : null;
    // }
}

// function hasPermission(viewer: ViewerModel, rawData: Object): bool {
//     // Add business logic for permissions here
//     return rawData !== undefined ? true : false;
// }
