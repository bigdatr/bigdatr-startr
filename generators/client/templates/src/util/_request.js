/* @flow */

<% if(cognito) { %>import {getJwtToken} from 'react-cognito-forms';<% } else { %>import getJwtToken from '<%= name %>/util/getJwtToken.js';<% } %>

class HttpError extends Error {
    response: Object;
    body: Object;
    status: number;

    constructor(
        message: string,
        response: Object,
        body: Object,
        status: number
    ) {
        super(message);
        this.response = response;
        this.body = body;
        this.status = status;
    }
}

async function checkStatus(response: Response): Object {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const body = await response.json();

    const message = body && body.errorMessage
        ? body.errorMessage
        : response.statusText;

    throw new HttpError(message, response, body, response.status);
}

function parseJSON(response: Response): Object {
    return response.json();
}

export default function request(
    url: string,
    options?: Object = {},
    ignoreToken: bool = false
): Promise<Response> {
    const token = getJwtToken();

    if(!token && !ignoreToken) {
        return Promise.reject(new Error('Unauthorized'));
    }

    const requestOptions = Object.assign({}, options, {
        headers: Object.assign({}, options.headers || {}, ignoreToken ? {} : {
            Authorization: `JWT ${token}`
        })
    });

    // Handle retries here!
    return fetch(url, requestOptions)
        .then(checkStatus)
        .then(parseJSON);
}
