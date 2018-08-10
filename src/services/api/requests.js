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
 * Executes a POST request specific to auth on the given URI
 * @param {String} fullURI
 * @param {Object} requestBody
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

/**
 * Executes a GET request on the given URI
 * @param {String} fullURI
* */
export function apiGetRequest(fullURI) {
    return fetch(fullURI, {
        method: 'GET',
        headers: {
            Authorization: cookie.load('indaba-auth'),
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache,no-store,must-revalidate', // ,max-age=-1,private'
            Pragma: 'no-cache',
        },
    })
    .then(handleResponse);
}

/**
 * Executes a POST request on the given URI
 * @param {String} fullURI
 * @param {Object} requestBody
* */
export function apiPostRequest(fullURI, requestBody) {
    return fetch(fullURI, {
        method: 'POST',
        headers: {
            Authorization: cookie.load('indaba-auth'),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(handleResponse);
}

/**
 * Executes a PATCH request on the given URI
 * @param {String} fullURI
 * @param {Object} requestBody
* */
export function apiPatchRequest(fullURI, requestBody) {
    return fetch(fullURI, {
        method: 'PATCH',
        headers: {
            Authorization: cookie.load('indaba-auth'),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(handleResponse);
}

/**
 * Executes a PUT request on the given URI
 * @param {String} fullURI
 * @param {Object} requestBody
* */
export function apiPutRequest(fullURI, requestBody) {
    return fetch(fullURI, {
        method: 'PUT',
        headers: {
            Authorization: cookie.load('indaba-auth'),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(handleResponse);
}

/**
 * Executes a DELETE request on the given URI
 * @param {String} fullURI
 * @param {Object} requestBody
* */
export function apiDeleteRequest(fullURI, requestBody) {
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

    return fetch(fullURI, call).then(handleResponse);
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

/**
 * Blindly put a body object to a given url
* */
export function putObjectRequest(file, fullURI) {
    return fetch(fullURI, {
        method: 'PUT',
        body: file,
    })
    .then(handleResponse);
}

// ////////////////
// Private Helpers
// ////////////////

function checkAuth() {
    console.log('Checking time.');
    const timeLeft = cookie.load('indaba-expire') - Date.now();
    console.log(`${new Date(timeLeft)} is cut off time.`);
    if (timeLeft < 120000) {
        console.log('Two minute warning.');
        if (cookie.load('indaba-refresh') !== undefined) {
            // Call to the auth service.
        }
    }
}

function handleResponse(response) {
    if (response.ok) {
        return decodeResponse(response);
    }
    return decodeResponse(response).then(body =>
        Promise.reject({ response, body }),
    );
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
