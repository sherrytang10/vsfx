import { isObject, isFunction } from './validate';
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

/**
 * 统一兼容部分 属性修饰
 * 
 * @param {any} cb 
 */
export const __returnCompa = (src_method) => {
    // return new Promise((resolve, reject) => {
    if (isFunction(src_method)) {
        let _result = {};
        if (isFunction(src_method)) {
            _result = src_method() || {};
        }
        // resolve(_result)
        return _result;
    } else {
        // resolve({})
        return {};
    }
    // })
}

