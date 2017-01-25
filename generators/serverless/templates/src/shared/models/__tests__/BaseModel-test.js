// @flow

import test from 'ava';

import BaseModel from '<%= name %>/shared/models/BaseModel';

test('BaseModel should set input data to its own properties', (t: AssertContext): void => {
    const input = {someKey: 'someValue'};
    const value: {[key: string]: string} = new BaseModel(input);

    return Object.keys(input)
                .forEach((k: string) => t.is(input[k], value[k]));
});

test('BaseModel should create getter for `viewer` if the option is provided', (t: AssertContext): void => {
    const input = {
        viewer: {
            sub: 'viewerSub',
            username: 'viewerUsername'
        }
    };

    const value = new BaseModel({}, input);

    t.truthy(value.getViewer);

    const viewer = value.getViewer();

    return Object.keys(input.viewer)
                .forEach((k: string) => t.is(input.viewer[k], viewer[k]));
});

test('BaseModel should not throw and error if no data is passed in', (t: AssertContext): void => {
    const fn = () => {
        new BaseModel();
    };

    return t.notThrows(fn);
});
