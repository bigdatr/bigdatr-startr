/* @flow */

import {Schema} from 'redux-blueflag';

var UserSchema = new Schema('user', {idAttribute: 'id'});

const EntitySchema = {
    user: UserSchema
};

export default EntitySchema;
