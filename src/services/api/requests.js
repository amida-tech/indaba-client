import 'whatwg-fetch';

/**
 * Executes a GET + Auth-Basic request on the given URI
 * @param {String} fullURI
 * @param {Function} callback
 * @return {Any} handled by callback. Generally the response data.
**/
export function apiAuthGetRequest(fullURI, authHash, callback) {
    fetch(fullURI, {
        method: 'GET',
        // credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Basic ${authHash}`,
        },
    })
  .then(res => handleResponse(res, callback));
}

// ////////////////
// Private Helpers
// ////////////////
function handleResponse(res, callback) {
  // successful http response
    if (res.status >= 200 && res.status < 300) {
        decodeResponse(res).then(data => callback(null, data));
    } else {
        decodeResponse(res).then(data => callback(data));
    }
}

function decodeResponse(res) {
  // res.json() will crash on empty responses so we manually check for them
    return res.text().then((text) => {
        if (text) return JSON.parse(text);
        return ''; // Was else return;
    });
}
