/* @flow */

import {combineReducers} from 'redux';
import {createEntityReducer} from 'redux-blueflag';
import EntitySchema from '<%= name %>/entity/EntitySchema';
import EntityConstructor from '<%= name %>/entity/EntityConstructor';

export default combineReducers({
    entity: createEntityReducer({
        schemaMap: {
            ENTITY_RECEIVE: EntitySchema
        },
        afterNormalize: EntityConstructor
    })
});

