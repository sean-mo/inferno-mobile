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
    }, options || {})).checkHttpError().fetchJSON()
}


// // POST

export function POST(url, parameter, options) {
    return createApi(url, parameter, Object.assign({}, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: fetchHeader
    }, options || {})).checkHttpError().fetchJSON()
}


// // DELETE
export function DELETE(url, parameter, options) {
    return createApi(url, parameter, Object.assign({}, {
        method: 'DELETE',
        credentials: 'include',
        mode: 'cors',
        headers: fetchHeader
    }, options || {})).checkHttpError().fetchJSON()
}


// Get JSON Http Stream
// Observable.prototype.fetchJSON = function fetchJSON<T>(): Observable<T> {
//     const input: Observable<Response> = this;
//     const output: Observable<T> = Observable.create((observer: Observer<T | IResponseBody<T>>) => {
//         input.mergeMap(res => Observable.fromPromise(res.json()))
//             .subscribe({ // Check data code
//                 next: (resBody: IResponseBody<T>) => {
//                     //  console.log(resBody)
//                     if (resBody.code === 403 || resBody.code === 401) {
//                         let jumpUrl = <string><Object>resBody.data;
//                         window.location.href = jumpUrl || '/';
//                         return;
//                     }
//                     if (resBody.code === 200 || resBody.code === 201 || resBody.code === 204) {
//                         observer.next(resBody);
//                     } else {
//                         if (resBody.msg) {
//                             Modal.error({
//                                 title: '系统错误',
//                                 content: resBody.msg
//                             })
//                         }
//                         observer.error({ code: resBody.code, msg: resBody.msg });
//                     }
//                 },
//                 error: err => {
//                     // Modal.error({
//                     //     title: '访问服务错误，请联系系统管理员，再重新登录!'
//                     // })
//                     console.log(err)
//                     observer.error({ code: -1, msg: err.message })
//                 },
//                 complete: () => observer.complete()
//             })
//     })
//     return output;
// }

// Check Http Error 
// Observable.prototype.checkHttpError = function checkHttpError(): Observable<Response> {
//     const input: Observable<Response> = this;
//     const output: Observable<Response> = Observable.create((observer: Observer<Response>) => {
//         input.subscribe({
//             next: res => observer.next(res),
//             error: err => {
//                 observer.error(err);
//             },
//             complete: () => observer.complete()
//         })
//     })
//     return output;
// }

