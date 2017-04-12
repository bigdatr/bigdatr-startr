/* @flow */

import {schema} from 'normalizr';

var ViewerSchema = new schema.Entity('viewer', {}, {idAttribute: 'username'});

const EntitySchema = {
    viewer: ViewerSchema
};

export default EntitySchema;
