/* @flow */

import {createAction} from 'redux-actions';
import {createEntityQuery} from 'redux-blueflag';
import request from '<%= name %>/util/request';

const ENTITY_FETCH = 'ENTITY_FETCH';
const ENTITY_RECEIVE = 'ENTITY_RECEIVE';
const ENTITY_ERROR = 'ENTITY_ERROR';

const payloadCreator = payload => payload;
const metaCreator = (payload, meta) => meta;

const entityFetch = createAction(ENTITY_FETCH, payloadCreator, metaCreator);
const entityReceive = createAction(ENTITY_RECEIVE, payloadCreator, metaCreator);
const entityError = createAction(ENTITY_ERROR, payloadCreator, metaCreator);

function fetchGraphQL(url: string, query: Object): Promise<any> {
    return request(url, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(query)
    });
}

export const graphQLRequestAction = (
    payload: {query: string, variables: ?Object},
    meta: {resultKey: number}
): Function => {
    return (dispatch: Function) => {
        // Don't try to make queries on server/prerender
        if(typeof window === 'undefined') return;

        if(payload.query) {
            payload.query = payload.query
                .split('\n')
                .map(qq => qq.trim())
                .join(' ')
                .trim();
        } else {
            throw new Error('No graphql query specified');
        }

        dispatch(entityFetch(null, meta));

        if(!process.env.<%= nameConstant %>_GRAPHQL_SERVER) {
            throw new Error('Graphql server address is not defined');
        }

        fetchGraphQL(process.env.<%= nameConstant %>_GRAPHQL_SERVER, payload)
            .then(data => dispatch(entityReceive(data.data, meta)))
            .catch(err => dispatch(entityError(err, meta)));
    };
};


export default createEntityQuery(graphQLRequestAction);
