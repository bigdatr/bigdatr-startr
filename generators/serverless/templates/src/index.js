// @flow
<% if(graphql) { %>

import {Resolver, Schema} from './graphql';
import {graphql} from 'graphql';
import {formatError} from 'graphql/error';
import ViewerModel from '<%= name %>/graphql/types/Viewer/ViewerModel';

export const graphqlApi = async function(
    httpEvent: AWSLambdaEvent,
    lambdaContext: AWSLambdaContext,
    callback: AWSLambdaCallback
): Promise<void> {

    const baseResponse = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' // Required for CORS support to work
        }
    };

    try {
        const token = getTokenFromHeaders(httpEvent.headers);

        const context = {
            viewer: ViewerModel.fromJWT(token)
        };

        const graphqlRequest = parseRequest(httpEvent.body);
        const result = await runQuery(graphqlRequest, context);
        const formattedResult = formatResultErrors(result);

        if(formattedResult.data) {
            callback(null, Object.assign({}, baseResponse, {
                body: JSON.stringify(formattedResult),
                statusCode: 200
            }));
        } else {
            callback(null, Object.assign({}, baseResponse, {
                body: JSON.stringify(formattedResult),
                statusCode: 400
            }));
        }
    } catch(err) {
        callback(null, Object.assign({}, baseResponse, {
            body: JSON.stringify(err.body || {errors: [formatError(err)]}),
            statusCode: err.statusCode || 500
        }));
    }

};

const formatResultErrors = (
    result: {data: ?Object, errors: ?Array<GraphQLError>}
): {data: ?Object, errors: ?Array<GraphQLFormattedError>} => {

    if(result.errors && result.errors.length > 0) {
        return Object.assign({}, result, {
            errors: result.errors.map(formatError)
        });
    }
    return result;
};

const getTokenFromHeaders = (headers: Object): string => {
    if(
        headers.Authorization &&
        typeof headers.Authorization === 'string' &&
        headers.Authorization.indexOf('JWT ') === 0
    ) {
        return headers.Authorization.substr(4);
    } else {
        throw {
            statusCode: 400,
            body: {
                errors: ['Authorization header not present or malformed']
            }
        };
    }
};

const parseRequest = (body: string): {query: string, variables: Object} => {
    try {
        let graphqlRequest = JSON.parse(body);
        if(typeof graphqlRequest.query === 'undefined') {
            throw new Error('Not a graphql query');
        }

        if(typeof graphqlRequest.variables === 'string' && graphqlRequest.variables !== '') {
            graphqlRequest.variables = JSON.parse(graphqlRequest.variables);
        }

        return graphqlRequest;
    } catch(err) {
        throw {
            statusCode: 400,
            body: {
                errors: [formatError(err)]
            }
        };
    }
};

const runQuery = async function(
    graphqlRequest: {query: string, variables: Object},
    context: Object
): Promise<Object> {
    const {query, variables} = graphqlRequest;
    return await graphql(Schema, query, Resolver, context, variables || {});
};

<% } else { %>

export const demo = (
    httpEvent: AWSLambdaEvent,
    lambdaContext: AWSLambdaContext,
    callback: AWSLambdaCallback
) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: httpEvent
        })
    };

    callback(null, response);
};
<% } %>
