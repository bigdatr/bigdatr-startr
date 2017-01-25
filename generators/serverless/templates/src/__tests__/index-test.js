// @flow

import test from 'ava';
import jwt from 'jsonwebtoken';

import {graphqlApi} from '<%= name %>';

const TOKEN_PAYLOAD = {
    sub: 'fakeuser-1',
    username: 'thisismyusername'
};

const JWT = 'JWT ' + jwt.sign(TOKEN_PAYLOAD, 'shhhhh');
const LAMBDA_CONTEXT = {
    callbackWaitsForEmptyEventLoop: false
};

test('graphqlApi should execute the graphql query', (t: AssertContext): Promise<void> => {
    const httpEvent = {
        body: JSON.stringify({
            query: 'query { viewer { username } }',
            variables: '{}'
        }),
        headers: {
            Authorization: JWT
        }
    };

    const callback = (err: Error, result: Object): void => {
        if (err) {
            return t.fail();
        }

        t.is(TOKEN_PAYLOAD.username, JSON.parse(result.body).data.viewer.username);
    };
    return graphqlApi(httpEvent, LAMBDA_CONTEXT, callback);
});

test('graphqlApi should execute the graphql query even if no variables are provided', (t: AssertContext): Promise<void> => {
    const httpEvent = {
        body: JSON.stringify({
            query: 'query { viewer { username } }'
        }),
        headers: {
            Authorization: JWT
        }
    };

    const callback = (err: Error, result: Object): void => {
        if (err) {
            return t.fail();
        }

        t.is(TOKEN_PAYLOAD.username, JSON.parse(result.body).data.viewer.username);
    };

    return graphqlApi(httpEvent, LAMBDA_CONTEXT, callback);
});

test('graphqlApi should stringify body', (t: AssertContext): Promise<void> => {
    const httpEvent = {
        body: '{}',
        headers: {
            Authorization: JWT
        }
    };

    const callback = (err: Error, result: Object) => {
        t.is(typeof result.body, 'string');
    };

    return graphqlApi(httpEvent, LAMBDA_CONTEXT, callback);
});


test('graphqlApi handles malformed or missing auth header', (t: AssertContext): Promise<void> => {
    const httpEvent = {
        body: '{}',
        headers: {
            Authorization: 'NOTAJWT asfdlkasdlasdfkjhasi8yw3498y2sfd'
        }
    };

    const callback = (err: Error, result: Object) => {
        t.true(result.statusCode >= 400);
    };

    return graphqlApi(httpEvent, LAMBDA_CONTEXT, callback);
});


test('graphqlApi should complain if no data is able to be returned due to a invalid query', (t: AssertContext): Promise<void> => {
    const httpEvent = {
        body: JSON.stringify({
            query: 'query { notarealquery { somethingwrong } }'
        }),
        headers: {
            Authorization: JWT
        }
    };

    const callback = (err: Error, result: Object) => {
        t.true(result.statusCode >= 400);
        t.true(JSON.parse(result.body).errors.length > 0);
    };

    return graphqlApi(httpEvent, LAMBDA_CONTEXT, callback);
});


test('graphqlApi should complain if no query is provided', (t: AssertContext): Promise<void> => {
    const httpEvent = {
        body: '{}',
        headers: {
            Authorization: JWT
        }
    };

    const callback = (err: Error, result: Object) => {
        t.ifError(err);
        t.true(result.statusCode >= 400);
        t.true(JSON.parse(result.body).errors.length > 0);
    };

    return graphqlApi(httpEvent, LAMBDA_CONTEXT, callback);
});

test('graphqlApi should catch any graphql errors', (t: AssertContext): Promise<void> => {
    const httpEvent = {
        body: JSON.stringify({
            query: 'query { viewer { username } }'
        }),
        headers: {
            Authorization: JWT
        }
    };

    const callback = (err: Error, result: Object) => {
        if (result.statusCode === 500) {
            t.pass();
        }
        else {
            throw new Error('Fail the request on purpose!!');
        }
    };

    return graphqlApi(httpEvent, LAMBDA_CONTEXT, callback);
});
