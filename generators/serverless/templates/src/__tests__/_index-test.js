// @flow

import test from 'ava';
import jwt from 'jsonwebtoken';

import {graphqlApi} from 'chekt-api';

const TOKEN_PAYLOAD = {
    sub: 'fakeuser-1',
    username: 'thisismyusername'
};

const JWT = 'JWT ' + jwt.sign(TOKEN_PAYLOAD, 'shhhhh');

test('graphqlApi should execute the graphql query', (t: AssertContext) => {
    const httpEvent = {
        body: JSON.stringify({
            query: 'query { viewer { username } }',
            variables: '{}'
        }),
        headers: {
            Authorization: JWT
        }
    };

    const lambdaContext = {};

    const callback = (err: Error, result: Object): void => {
        if (err) {
            return t.fail();
        }

        t.is(TOKEN_PAYLOAD.username, result.body.data.viewer.username);
    };

    graphqlApi(httpEvent, lambdaContext, callback);
});

test('graphqlApi should execute the graphql query even if no variables are provided', (t: AssertContext) => {
    const httpEvent = {
        body: JSON.stringify({
            query: 'query { viewer { username } }'
        }),
        headers: {
            Authorization: JWT
        }
    };

    const lambdaContext = {};

    const callback = (err: Error, result: Object): void => {
        if (err) {
            return t.fail();
        }

        t.is(TOKEN_PAYLOAD.username, result.body.data.viewer.username);
    };

    graphqlApi(httpEvent, lambdaContext, callback);
});

test('graphqlApi should complain if no query is provided', (t: AssertContext) => {
    const httpEvent = {
        body: '{}',
        headers: {
            Authorization: JWT
        }
    };

    const lambdaContext = {};

    const callback = (err: Error, result: Object) => {
        t.ifError(err);
        t.true(result.statusCode >= 400);
        t.true(result.body.errors.length > 0);
    };

    graphqlApi(httpEvent, lambdaContext, callback);
});

test('graphqlApi should catch any graphql errors', (t: AssertContext) => {
    const httpEvent = {
        body: JSON.stringify({
            query: 'query { viewer { username } }'
        }),
        headers: {
            Authorization: JWT
        }
    };

    const lambdaContext = {};

    const callback = (err: Error, result: Object) => {
        if (result.statusCode === 500) {
            t.pass();
        }
        else {
            throw new Error('Fail the request on purpose!!');
        }
    };

    graphqlApi(httpEvent, lambdaContext, callback);
});
