<% if(graphql) { %>

// @flow

import {Resolver, Schema} from './graphql';
import {graphql} from 'graphql';
import {formatError} from 'graphql/error';

import ViewerModel from '<%= name %>/graphql/types/Viewer/ViewerModel';

export const graphqlApi = (httpEvent: AWSLambdaEvent, lambdaContext: AWSLambdaContext, callback: AWSLambdaCallback): void => {
    const baseResponse = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
        }
    };

    let graphqlRequest = '';

    try {
        graphqlRequest = JSON.parse(httpEvent.body);

        if (typeof graphqlRequest.query === 'undefined') {
            throw new Error('[400] Not a graphql query');
        }
    } catch(err) {
        return callback(null, {
            statusCode: 400,
            body: {
                errors: [
                    // formatError(locatedError(err))
                    formatError(err)
                ]
            }
        });
    }

    const {query, variables} = graphqlRequest;
    const _variables = typeof variables === 'string' && variables !== ''
                        ? JSON.parse(variables)
                        : {};

    const context = {
        viewer: ViewerModel.fromJWT(httpEvent.headers.Authorization)
    };

    graphql(
        Schema,
        query,
        Resolver,
        context,
        _variables
    ).then((result: Object) => {
        callback(null, Object.assign({}, baseResponse, {
            body: result
        }));
    })
    .catch(() => {
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
