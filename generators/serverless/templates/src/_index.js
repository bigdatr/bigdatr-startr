<% if(graphql) { %>

import {Resolver, Schema} from './graphql';
import {graphql} from 'graphql';
import {locatedError, formatError} from 'graphql/error';

export const graphqlApi = (httpEvent: AWSLambdaEvent, lambdaContext: AWSLambdaContext, callback: AWSLambdaCallback) => {
    const baseResponse = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
        }
    };

    let graphqlRequest = '';

    try {
        graphqlRequest = JSON.parse(httpEvent.body);
        if(typeof graphqlRequest.query === 'undefined') {
            throw new Error('[400] Not a graphql query');
        }
    } catch(err) {
        return callback(null, {
            statusCode: 400,
            body: {
                errors: [
                    formatError(locatedError(err))
                ]
            }
        });
    }

    const {query, variables} = graphqlRequest;
    const _variables = typeof variables === 'string' ? JSON.parse(variables) : {};

    const context = {
        headers: httpEvent.headers
    };

    graphql(
        Schema,
        query,
        Resolver,
        context,
        _variables
    ).then((result) => {
        callback(null, Object.assign({}, baseResponse, {
            body: result,
            statusCode: result.errors ? 400 : 200
        }));
    })
    .catch(err => {
        callback(null, Object.assign({}, baseResponse, {
            statusCode: 500
        }));
    });
};

<% } else { %>
export const demo = (httpEvent, lambdaContext, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: httpEvent,
        })
    };

    callback(null, response);
};
<% } %>
