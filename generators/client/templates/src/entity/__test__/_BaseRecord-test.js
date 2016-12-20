import test from 'ava';
import BaseRecord from '../BaseRecord';
import {Map, Record} from 'immutable';

class MyRecord extends BaseRecord({
    prop1: 'prop1',
    prop2: 'prop2',
    prop3: 'prop3'
}) {}

test('BaseRecord applies default props', tt => {
    const myRecordInstance = new MyRecord();
    tt.is(myRecordInstance.prop1, 'prop1');
});


test('BaseRecord can be customized', tt => {
    const myRecordInstance = new MyRecord({prop1: 'notProp1'});
    tt.is(myRecordInstance.prop1, 'notProp1');
});
