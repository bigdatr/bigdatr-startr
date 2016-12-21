// @flow

import jwt from 'jsonwebtoken';

import BaseModel from '<%= name %>/shared/models/BaseModel';

// import dataLoaders from '<%= name %>/graphql/dataLoaders/dataLoaders';

export default class ViewerModel extends BaseModel {
    _id: string;
    dataLoaders: Object;

    static fromJWT(jwtToken: string): ViewerModel {
        const token = jwtToken.substr(4, jwtToken.length);
        const decoded = jwt.decode(token);

        return new ViewerModel({
            sub: decoded.sub,
            username: decoded.username
        });
    }

    constructor(payload: Object) {
        super(payload);

        // this.dataLoaders = dataLoaders();
    }
}