"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInterger = (num) => {
    return /^[-+]?\d+$/.test(num) /* && typeof num == 'number' */;
};
exports.isNotInterger = (num) => {
    return !exports.isInterger(num);
};
exports.isCompleteDate = (date) => {
    return /^[12][0-9]{3}-(([0][1-9])|([1][0-2]))-[0-3]\d( [0-2]\d:[0-5]\d:[0-5]\d)?$/.test(date);
};
exports.isNotCompleteDate = (date) => {
    return !exports.isCompleteDate(date);
};
exports.isUndefined = (variable) => {
    return typeof variable === 'undefined';
};
exports.isNotUndefined = (variable) => {
    return !exports.isUndefined(variable);
};
exports.isEmpty = (variable) => {
    return variable == null || variable === undefined || variable === '';
};
exports.isNotEmpty = (variable) => {
    return !exports.isEmpty(variable);
};
exports.isFalse = (variable) => {
    if (typeof variable == 'string') {
        variable = variable.replace(/\s/g, '');
    }
    return (exports.isEmpty(variable) || variable == false || variable == 0);
};
exports.isNotFalse = (variable) => {
    return !exports.isFalse(variable);
};
exports.isEmail = (email) => {
    return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email);
};
exports.isPhone = (email) => {
    return /^((\+86)|(86))?(1)[3458][0-9]{9}$|^0\d{2,3}-?\d{7,8}$/.test(email);
};
exports.isHttp = (variable) => {
    return /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/.test(variable);
};
exports.isNotHttp = (variable) => {
    return !exports.isHttp(variable);
};
exports.isObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
};
exports.isString = (obj) => {
    return typeof obj == 'string';
};
exports.isBoolean = (obj) => {
    return typeof obj == 'boolean';
};
exports.isFunction = (obj) => {
    return typeof obj == 'function';
};
exports.default = {
    isInterger: exports.isInterger,
    isNotInterger: exports.isNotInterger,
    isCompleteDate: exports.isCompleteDate,
    isNotCompleteDate: exports.isNotCompleteDate,
    isUndefined: exports.isUndefined,
    isNotUndefined: exports.isNotUndefined,
    isEmpty: exports.isEmpty,
    isNotEmpty: exports.isNotEmpty,
    isFalse: exports.isFalse,
    isNotFalse: exports.isNotFalse,
    isEmail: exports.isEmail,
    isPhone: exports.isPhone,
    isHttp: exports.isHttp,
    isNotHttp: exports.isNotHttp,
    isObject: exports.isObject,
    isString: exports.isString,
    isBoolean: exports.isBoolean,
    isFunction: exports.isFunction
};
