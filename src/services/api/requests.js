import cookie from 'react-cookies';
import 'whatwg-fetch';
import formurlencoded from 'form-urlencoded';

const makeQueryParams = (params) => {
    if (!params || Object.keys(params).length === 0) {
        return '';
    }
    return `?${Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')}`;
};

export function addQueryParams(url, params) {
    return `${url}${makeQueryParams(params)}`;
}

/**
 * Executes a POST request on the given URI
 * @param {String} fullURI
 * @param {Object} requestBody
 * @param {Function} callback
 * @return {Any} handled by callback.
* */
export function apiAuthPostRequest(fullURI, requestBodyObject) {
    const encodedRequestBodyObject = formurlencoded(requestBodyObject);

    return fetch(fullURI, {
        method: 'POST',
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodedRequestBodyObject,
    })
    .then(handleResponse);
}

const optionalCallbackSuccess = callback => response =>
    (callback ? callback(null, response) : response);
const optionalCallbackError = callback => response =>
    (callback ? callback(response) : Promise.reject(response));

/**
 * Executes a GET request on the given URI
 * @param {String} fullURI
 * @param {Function} callback
 * @return {Any} handled by callback. Generally the response data.
* */
export function apiGetRequest(fullURI, callback) {
    return fetch(fullURI, {
        method: 'GET',
        headers: {
            Authorization: cookie.load('indaba-auth'),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then(handleResponse)
    .then(res => callback(null, res), issue => callback(issue));
}

/**
 * Executes a POST request on the given URI
 * @param {String} fullURI
 * @param {Object} requestBody
 * @param {Function} callback
 * @return {Any} handled by callback.
* */
export function apiPostRequest(fullURI, requestBody, callback) {
    fetch(fullURI, {
        method: 'POST',
        headers: {
            Authorization: cookie.load('indaba-auth'),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(handleResponse)
    .then(res => callback(null, res), issue => callback(issue));
}

/**
 * Executes a PATCH request on the given URI
 * @param {String} fullURI
 * @param {Object} requestBody
 * @param {Function} callback
 * @return {Any} handled by callback.
* */
export function apiPatchRequest(fullURI, requestBody, callback) {
    fetch(fullURI, {
        method: 'PATCH',
        headers: {
            Authorization: cookie.load('indaba-auth'),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(handleResponse)
    .then(res => callback(null, res), issue => callback(issue));
}

/**
 * Executes a PUT request on the given URI
 * @param {String} fullURI
 * @param {Object} requestBody
 * @param {Function} callback
 * @return {Any} handled by callback.
* */
export function apiPutRequest(fullURI, requestBody, callback) {
    fetch(fullURI, {
        method: 'PUT',
        headers: {
            Authorization: cookie.load('indaba-auth'),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(handleResponse)
    .then(res => callback(null, res), issue => callback(issue));
}

/**
 * Executes a DELETE request on the given URI
 * @param {String} fullURI
 * @param {Object} requestBody
 * @param {Function} callback
 * @return {Any} handled by callback.
* */
export function apiDeleteRequest(fullURI, requestBody, callback) {
    const call = {
        method: 'DELETE',
        headers: {
            Authorization: cookie.load('indaba-auth'),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };

    if (requestBody) {
        call.body = JSON.stringify(requestBody);
    }

    fetch(fullURI, call)
    .then(handleResponse)
    .then(res => callback(null, res), issue => callback(issue));
}

export function multipartFormDataPostRequest(fullURI, data) {
    const formData = new FormData();
    Object.keys(data).forEach(name => formData.append(name, data[name]));

    const call = {
        method: 'POST',
        headers: {
            Authorization: cookie.load('indaba-auth'),
            Accept: 'application/json',
        },
        body: formData,
    };

    return fetch(fullURI, call).then(decodeResponse);
}

// ////////////////
// Private Helpers
// ////////////////
function handleResponse(response) {
    if (response.ok) {
        return decodeResponse(response);
    }
    return decodeResponse(response).then((body) => {
        // reject with a normalized error structure that includes the original
        // response object and the decoded body
        // currently only for 401 so the auth middleware can detect it without
        // having to change every other error handler that just expects the body
        if (response.status === 401) {
            return Promise.reject({ response, body });
        }
        return Promise.reject(body);
    });
}

function decodeResponse(res) {
    // res.json() will crash on empty responses so we manually check for them
    return res.text().then((text) => {
        if (text) {
            try {
                return JSON.parse(text);
            } catch (e) {
                return text;
            }
        }
        return '';
    });
}
