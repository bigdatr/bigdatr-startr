/* @flow */
import {Record} from 'immutable';
import UserRecord from '<%= name %>/entity/user/UserRecord';

export default function(value: Map<string, any>, key: string): Record<*> | Map<string, any> {
    switch(key) {
        case 'user':
            return new UserRecord(value);
        default:
            return value;
    }
}