declare class AWSLambdaEvent {
    body: string,
    headers: {
        Authorization: string
    }
}

declare class AWSLambdaContext {
    callbackWaitsForEmptyEventLoop: boolean
}

declare class AWSLambdaResponse {
    statusCode: number,
    body: string,
    headers: Object
}

declare function AWSLambdaCallback(error: Error, response: AWSLambdaResponse): void;
