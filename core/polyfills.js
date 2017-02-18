// For IE 11
if (typeof Promise === 'undefined') {
    window.Promise = require('promise-polyfill')
}

require('whatwg-fetch');
