// @flow

import test from 'ava';

import BaseModel from 'chekt-api/shared/models/BaseModel';

test('BaseModel should set input data to its own properties', (t: AssertContext) => {
    const input = {someKey: 'someValue'};
    const value = new BaseModel(input);

    Object.keys(input).forEach((k: string) => t.is(input[k], value[k]));
});

test('BaseModel should create getter for `viewer` if the option is provided', (t: AssertContext) => {
    const input = {
        viewer: {
            sub: 'viewerSub',
            username: 'viewerUsername'
        }
    };

    const value = new BaseModel({}, input);

    t.truthy(value.getViewer);

    const viewer = value.getViewer();

    Object.keys(input.viewer).forEach((k: string) => t.is(input.viewer[k], viewer[k]));
});

test('BaseModel should not throw and error if no data is passed in', (t: AssertContext) => {
    const fn = () => new BaseModel();

    t.notThrows(fn);
});
