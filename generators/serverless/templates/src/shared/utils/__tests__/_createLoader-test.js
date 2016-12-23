// @flow

import test from 'ava';

import createLoader from 'chekt-api/shared/utils/createLoader';

test('createLoader should return an instance of DataLoader', (t: AssertContext): Promise<> => {
    const myLoader = createLoader((ids: Array<number>): Promise<Array<number>> => {
        return Promise.all(ids.map((i) => Promise.resolve(i * 10)));
    });

    return myLoader.load(1)
        .then((value: number) => {
            t.is(10, value);
        });
});

test('createLoader should handle errors', (t: AssertContext): Promise<> => {
    const myLoader = createLoader((ids: Array<number>): Promise<Array<number>> => {
        return Promise.all(ids.map(() => Promise.reject(new Error('Some error'))));
    });

    return myLoader.load(1)
        .then(() => {
            t.fail();
        })
        .catch(() => {
            t.pass();
        });
});
