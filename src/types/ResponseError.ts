type ResponseError = {
    message: string;
    errors: Error[];
}

export function instanceOfResponseError(object: object): object is ResponseError {
    let isResponseError = true;
    isResponseError = "message" in object;
    isResponseError = "errors" in object;

    return isResponseError;
}

export default ResponseError;