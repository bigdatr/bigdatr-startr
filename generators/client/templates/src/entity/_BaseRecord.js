/* @flow */

import {Record, fromJS} from 'immutable';

export default (defaultProps: Object) => class extends Record(defaultProps) {
    constructor(props: Object): Record<*> {
        super(fromJS(props));
        return this;
    }
};