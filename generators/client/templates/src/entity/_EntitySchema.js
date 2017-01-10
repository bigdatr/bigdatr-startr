/* @flow */

import {Schema} from 'redux-blueflag';

var ViewerSchema = new Schema('viewer', {idAttribute: 'username'});

const EntitySchema = {
    viewer: ViewerSchema
};

export default EntitySchema;
