// @flow

import jwt from 'jsonwebtoken';

import BaseModel from '<%= name %>/shared/models/BaseModel';
import dataLoaders from './dataloaders';

export default class ViewerModel extends BaseModel {
    _id: string;
    dataLoaders: Object;

    static fromJWT(jwtToken: string): ViewerModel {
        const decoded = jwt.decode(jwtToken);

        return new ViewerModel({
            sub: decoded.sub,
            username: decoded.username
        });
    }

    constructor(payload: Object) {
        super(payload);

        this.dataLoaders = dataLoaders();
    }
}
