export const isInterger = (num: string | any) => {
    return /^[-+]?\d+$/.test(num) /* && typeof num == 'number' */;
}
export const isNotInterger = (num: string | any) => {
    return !isInterger(num);
}
export const isCompleteDate = (date: string) => {
    return /^[12][0-9]{3}-(([0][1-9])|([1][0-2]))-[0-3]\d( [0-2]\d:[0-5]\d:[0-5]\d)?$/.test(date);
}
export const isNotCompleteDate = (date: string) => {
    return !isCompleteDate(date);
}
export const isUndefined = (variable: string) => {
    return typeof variable === 'undefined';
}
export const isNotUndefined = (variable: string) => {
    return !isUndefined(variable);
}
export const isEmpty = (variable: string) => {
    return variable == null || variable === undefined || variable === '';
}
export const isNotEmpty = (variable: string) => {
    return !isEmpty(variable)
}
export const isFalse = (variable: string | boolean | any) => {
    if (typeof variable == 'string') {
        variable = variable.replace(/\s/g, '')
    }
    return (isEmpty(variable) || variable == false || variable == 0);
}
export const isNotFalse = (variable: string) => {
    return !isFalse(variable);
}
export const isEmail = (email: string) => {
    return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email);
}
export const isPhone = (email: string) => {
    return /^((\+86)|(86))?(1)[3458][0-9]{9}$|^0\d{2,3}-?\d{7,8}$/.test(email);
}
export const isHttp = (variable: string) => {
    return /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/.test(variable)
}
export const isNotHttp = (variable: string) => {
    return !isHttp(variable)
}
export const isObject = (obj: any) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
export const isString = (obj: any) => {
    return typeof obj == 'string';
}
export const isBoolean = (obj: any) => {
    return typeof obj == 'boolean';
}
export const isFunction = (obj: any) => {
    return typeof obj == 'function';
}
export default {
    isInterger,
    isNotInterger,
    isCompleteDate,
    isNotCompleteDate,
    isUndefined,
    isNotUndefined,
    isEmpty,
    isNotEmpty,
    isFalse,
    isNotFalse,
    isEmail,
    isPhone,
    isHttp,
    isNotHttp,
    isObject,
    isString,
    isBoolean,
    isFunction
}