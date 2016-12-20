import test from 'ava';
import sinon from 'sinon';

global.window = {};
const proxyquire = require('proxyquire').noCallThru();
let failing = false;

const EntityQueryModule = proxyquire('../EntityQuery', {
    '<%= name %>/util/request': function(url, options) {
        return new Promise((resolve, reject) => {
            if(failing) {
                reject({});
            } else {
                resolve({});
            }
        });
    }
});


const EntityQuery = EntityQueryModule.default;
const graphQLRequestAction = EntityQueryModule.graphQLRequestAction;

process.env.<%= nameConstant %>_GRAPHQL_SERVER = 'http://localhost:3000';

const requestActionThunk = graphQLRequestAction({
    query : `
        query {
          user {
            id
            username
          }
        }
    `,
    variables : {}
}, {
    resultKey: 1000
});

test('graphQLRequestAction returns a thunk', tt => {
    tt.is(
        typeof requestActionThunk,
        'function'
    );
});

test('EntityQuery fires fetch action first', tt => {
    const dispatch = sinon.spy();

    requestActionThunk(dispatch);

    tt.is(
        dispatch.firstCall.args[0].type,
        'ENTITY_FETCH'
    );
});


test('EntityQuery throws error if no request payload specified', tt => {
    const badRequestActionThunk = graphQLRequestAction({});
    tt.throws(
        () => badRequestActionThunk(()=>{}),
        'No graphql query specified'
    );
});

test('EntityQuery catches errors from request', tt => {
    // Testing failing requests
    failing = true;

    const failingDispatch = sinon.spy();

    tt.notThrows(
        () => requestActionThunk(failingDispatch)
    );
});


test('EntityQuery Throws error if <%= nameConstant %>_GRAPHQL_SERVER env var isn\'t set', tt => {
    process.env.<%= nameConstant %>_GRAPHQL_SERVER = '';
    tt.throws(
        () => requestActionThunk(()=>{}),
        'Graphql server address is not defined',
        ''
    );
});




