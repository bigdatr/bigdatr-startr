/* @flow */

import {combineReducers} from 'redux';
import {createEntityReducer} from 'redux-blueflag';
import EntitySchema from '<%= name %>/EntitySchema';

export default combineReducers({
    entity: createEntityReducer({
        schemaMap: {
            ENTITY_RECEIVE: EntitySchema
        }
    })
});

