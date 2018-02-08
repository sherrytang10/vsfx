"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("./validate");
exports.__DefinePrivateProperty = (target, name, value, opt = {}) => {
    if (!validate_1.isObject(opt)) {
        opt = { opt };
    }
    Object.defineProperty(target, name, Object.assign({
        configurable: false,
        writable: false,
        enumerable: false,
        value
    }, opt));
};
/**
 * 统一兼容部分 属性修饰
 *
 * @param {any} cb
 */
exports.__returnCompa = (src_method) => {
    // return new Promise((resolve, reject) => {
    if (validate_1.isFunction(src_method)) {
        let _result = {};
        if (validate_1.isFunction(src_method)) {
            _result = src_method() || {};
        }
        // resolve(_result)
        return _result;
    }
    else {
        // resolve({})
        return {};
    }
    // })
};
