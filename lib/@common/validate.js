const isInterger = exports.isInterger = num => {
    return /^[-+]?\d+$/.test(num);
}
const isNotInterger = exports.isInterger = num => {
    return !isInterger(num);
}
const isCompleteDate = exports.isCompleteDate = date => {
    return /^[12][0-9]{3}-(([0][1-9])|([1][0-2]))-[0-3]\d( [0-2]\d:[0-5]\d:[0-5]\d)?$/.test(date);
}
const isNotCompleteDate = exports.isCompleteDate = date => {
    return !isCompleteDate(date);
}
const isUndefined = exports.isUndefined = variable => {
    return typeof variable === 'undefined';
}
const isNotUndefined = exports.isUndefined = variable => {
    return !isUndefined(variable);
}
const isEmpty = exports.isEmpty = variable => {
    return variable == null || variable === undefined || variable === '';
}
const isNotEmpty = exports.isEmpty = variable => {
    return !isEmpty(variable)
}
const isFalse = exports.isFalse = variable => {
    if (typeof variable == 'string') {
        variable = variable.replace(/\s/g, '')
    }
    return (isEmpty(variable) || variable == false || variable == 0);
}
const isNotFalse = exports.isFalse = variable => {
    return !isFalse(variable);
}
const isEmail = exports.isEmail = email => {
    return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email);
}
const isPhone = exports.isPhone = email => {
    return /^((\+86)|(86))?(1)[3458][0-9]{9}$|^0\d{2,3}-?\d{7,8}$/.test(email);
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
    isPhone
}