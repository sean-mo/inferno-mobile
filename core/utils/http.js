import 'whatwg-fetch';
import * as URL from 'url';
import * as queryString from 'querystring';


// Base createApi
export function createApi(url, parameter, options) {
    let opts = options || parameter;
    let params = parameter, urls = '' ;
    url = typeof url === 'string' ? `/${url}` : url;
    opts = opts || { method: 'GET' };
    if ( opts.method === 'POST' || opts.method === 'PUT') {
        urls = parseUrl(url);
        opts.body = JSON.stringify(params);
    } else {
        urls = parseUrl(url, params);
    }
    return fetch(urls, opts)
}

// Parse Url
export function parseUrl(url, parameter) {
    let u = typeof url === 'string' ? URL.parse(url) : url;
    if ( parameter ) {
        u.search = '';
        u.query = Object.assign({}, queryString.parse(u.query),  parameter)
    }
    return URL.format(u);
}

// dispose response

function disposeResponse(res) {
    return res.json().then(resbody => {
        if ([401, 403].indexOf(resbody.code) >= 0 ) {
            window.location.href = resbody.data || '/';
            return;
        }
        if ([200, 201, 204].indexOf(resbody.code) >= 0 ) {
            return new Promise(resolve => {
                return resolve(resbody)
            })
        } else {
            return new Promise((_, reject) => {
                return reject({ code: resbody.code, msg: resbody.msg })
            })
        }
    }).catch(err => {
        alert(err.msg)
    })
}
const fetchHeader = new Headers();
fetchHeader.append('Accept', 'application/json')
fetchHeader.append('Content-Type', 'application/json');


// GET
export function GET(url, parameter, options) {
    return createApi(url, parameter, Object.assign({}, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
    }, options || {})).then(disposeResponse)
}

// PUT

export function PUT(url, parameter, options) {
    return createApi(url, parameter, Object.assign({}, {
        method: 'PUT',
        credentials: 'include',
        mode: 'cors',
        headers: fetchHeader
    }, options || {})).then(disposeResponse)
}


// // POST

export function POST(url, parameter, options) {
    return createApi(url, parameter, Object.assign({}, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: fetchHeader
    }, options || {})).then(disposeResponse)
}


// // DELETE
export function DELETE(url, parameter, options) {
    return createApi(url, parameter, Object.assign({}, {
        method: 'DELETE',
        credentials: 'include',
        mode: 'cors',
        headers: fetchHeader
    }, options || {})).then(disposeResponse)
