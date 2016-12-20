import test from 'ava';
import EntityConstructor from '../EntityConstructor';
import {Map, Record} from 'immutable';

test('EntityConstructor returns Record when key matches', tt => {
    const userRecord = EntityConstructor(Map({username: 'foo@bar.com', id: '123'}), 'user');
    tt.true(userRecord instanceof Record);
});

test('EntityConstructor returns value directly when key doesn\'t match', tt => {
    const value = Map({username: 'foo@bar.com', id: '123'});
    tt.is(value, EntityConstructor(value, 'asdfiasdkjaslf'));
});
