export const __DefinePrivateProperty = (target, name, value, opt = {}) => {
    if (!isObject(opt)) {
        opt = { opt };
    }
    Object.defineProperty(target, name, Object.assign({
        configurable: false,
        writable: false,
        enumerable: false,
        value
    }, opt))
}

export const isObject = obj => {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

// Object.defineProperty(target, '_basePath', {
//     configurable: false,
//     writable: false,
//     enumerable: false,
//     value: _path
// });
// Object.defineProperties(tar.prototype, {
//     _basePath: {
//         configurable: false,
//         writable: false,
//         enumerable: false,
//         value: _path
//     },
//     _isRoute: {
//         configurable: false,
//         writable: false,
//         enumerable: false,
//         value: true
//     },
//     _identity: {
//         configurable: false,
//         writable: false,
//         enumerable: false,
//         value: 'controller'
//     }
// });