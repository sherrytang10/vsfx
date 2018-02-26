import { __DefinePrivateProperty, __returnCompa, isObject, isBoolean, isString, isFunction } from '../utils';
import * as __Validate from '../utils/validate';
import { BasicsOption, LengthOption, CheckResult } from './validation.decorator.d';
export const Validation = (Dto) => {
    return (target, name, descriptor) => {
        let dto = typeof Dto === 'function' ? new Dto() : Dto;
        if (isObject(dto)) {
            __DefinePrivateProperty(descriptor.value, '_validation', dto);
        }
        return descriptor;
    }
};

/**
 * 修饰器中，静态属性(没有值的属性) 没有value、get、set，只有initializer()
 */
export const IsNotEmpty = (option) => {
    return (target, name, descriptor) => {
        console.log(target, name, descriptor)
            // if (isFunction(descriptor.initializer)) {
            //     let src_method = descriptor.initializer();
            //     descriptor.initializer = () => (variable) => {
            //         let result = {};
            //         if (isFunction(src_method)) {
            //             result = src_method() || {};
            //         }
            //         return Object.assign(result, __returnResult(variable, 'isNotEmpty', { option, _default: `'${name}'不能为空`, name }));
            //     };
            // } else {
            //     descriptor.initializer = () => (variable) => {
            //         return __returnResult(variable, 'isNotEmpty', { option, _default: `'${name}'不能为空`, name });
            //     };
            // }
            // return descriptor;
        descriptor.initializer = () => (variable) => {
            let result = __returnCompa(descriptor)
            return Object.assign(result, __returnResult(variable, 'isNotEmpty', { option, _default: `'${name}'不能为空`, name }));
        }
        descriptor.writable = true;
        descriptor.enumerable = true;
        return descriptor;
    }
};
export const isInteger = function(option) {
    return function(target, name, descriptor) {
        // descriptor.initializer = () => (variable) => __returnResult(variable, 'isInteger', { option, _default: `'${name}'必须是int类型`, name });
        // return descriptor;
        descriptor.initializer = () => (variable) => {
            let result = __returnCompa(descriptor)
            return Object.assign(result, __returnResult(variable, 'isInteger', { option, _default: `'${name}'必须是int类型`, name }));
        }
        descriptor.writable = true;
        descriptor.enumerable = true;
        return descriptor;
    }
};
export const IsEmail = (option ? ) => {
    return (target: any, name: string, descriptor) => {
        descriptor.initializer = () => (variable) => {
            let result = __returnCompa(descriptor)
            return Object.assign(result, __returnResult(variable, 'isEmail', { option, _default: `email格式不正确,xxx@xx.xxx`, name }));
        }
        descriptor.writable = true;
        descriptor.enumerable = true;
        return descriptor;
    }
}
export const IsPhone = (option) => {
    return (target, name, descriptor) => {
        // descriptor.initializer = () => variable => __returnResult(variable, 'isPhone', { option, _default: `phone格式不正确`, name });
        // return descriptor;
        descriptor.initializer = () => (variable) => {
            let result = __returnCompa(descriptor)
            return Object.assign(result, __returnResult(variable, 'isPhone', { option, _default: `phone格式不正确`, name }));
        }
        descriptor.writable = true;
        descriptor.enumerable = true;
        return descriptor;
    }
}
export const IsHttp = (option) => {
    return (target, name, descriptor) => {
        // descriptor.initializer = () => variable => __returnResult(variable, 'isHttp', { option, _default: `'${name}'格式不正确,https?://xxx.xxx`, name });
        // return descriptor;
        descriptor.initializer = () => (variable) => {
            let result = __returnCompa(descriptor)
            return Object.assign(result, __returnResult(variable, 'isHttp', { option, _default: `'${name}'格式不正确,https?://xxx.xxx`, name }));
        }
        descriptor.writable = true;
        descriptor.enumerable = true;
        return descriptor;
    }
}

export const IsCompleteDate = option => {
    return (target, name, descriptor) => {
        let src_method = descriptor.initializer;
        descriptor.initializer = () => (variable) => {
            let result = __returnCompa(src_method)
            return Object.assign(result, __returnResult(variable, 'isCompleteDate', { option, _default: `'${name}'格式不正确,yyyy-MM-dd hh:mm:ss?`, name }));
        }
        descriptor.writable = true;
        descriptor.enumerable = true;
        return descriptor;
    }
}

/**
 * 1 长度
 * 2 [长度|最小长度] [最大长度|message|boolean|obj]
 * 3 最小长度  最大长度 [message|boolean|obj]
 * @param {*} arg 
 */
export const Length = (...arg) => {
    let option: LengthOption = { message: '' },
        argErr = true;

    let [arg1, arg2, arg3] = arg;

    if (!arg1 || __Validate.isNotInteger(arg1)) {
        argErr = false;
        option = { message: `validate @Length argument type is err` };
    } else if (__Validate.isInteger(arg1) && __Validate.isInteger(arg2)) {
        option.minLength = arg1;
        option.maxLength = arg2;
        if (__Validate.isNotEmpty(arg3)) {
            if (isString(arg3)) {
                option.message = arg3;
            } else if (isBoolean(arg3)) {
                option.required = arg3;
            } else if (isObject(arg3)) {
                option = Object.assign(option, arg3);
            } else {
                argErr = false;
                option = { message: `validate @Length argument 3 type is err` };
            }
        }
    } else if (__Validate.isInteger(arg1)) {
        option.length = arg1;
        if (__Validate.isNotEmpty(arg2)) {
            if (isString(arg2)) {
                option.message = arg2;
            } else if (isBoolean(arg2)) {
                option.required = arg2;
            } else if (isObject(arg2)) {
                option = Object.assign(option, arg2);
            } else {
                argErr = false;
                option = { message: `validate @Length argument 2 type is err` };
            }
        }
    } else {
        argErr = false;
        option = { message: `validate @Length argument type is undefined err` };
    }
    // if (arg.length > 2) {
    //     if (isString(arg3)) {
    //         option.message = arg3;
    //     } else if (isBoolean(arg2)) {
    //         option.required = arg3;
    //     } else if (isObject(arg2)) {
    //         option = { length: arg1, option: arg2 };
    //     } else {
    //         argErr = false;
    //         option = { message: `validate @Length argument 2 type is err` };
    //         console.log(__errmsg(`validate @Length argument 2 type is err`));
    //     }
    //     option = __getOptions({ maxLength: arg2, minLength: arg1, message: arg3 });
    // } else if (arg.length == 2) {
    //     let [arg1, arg2] = arg;
    //     if (__Validate.isInteger(arg1) && __Validate.isInteger(arg2)) {
    //         option = { maxLength: arg2, minLength: arg1 };
    //     } else if (__Validate.isInteger(arg1)) {
    //         if (isString(arg2)) {
    //             arg2 = { message: arg2 };
    //             option = { length: arg1, message: arg2 };
    //         } else if (isBoolean(arg2)) {
    //             option = { length: arg1, required: arg2 };
    //         } else if (isObject(arg2)) {
    //             option = { length: arg1, option: arg2 };
    //         } else {
    //             argErr = false;
    //             option = { message: `validate @Length argument 2 type is err` };
    //             console.log(__errmsg(`validate @Length argument 2 type is err`));
    //         }
    //     }
    // } else if (arg.length == 1) {
    //     arg1 = arg[0];
    //     if (__Validate.isInteger(arg1)) {
    //         option = { length: arg1 };
    //     } else {
    //         option = { message: `validate @Length argument 1 type is err` };
    //         console.log(__errmsg(`validate @Length argument 1 type is err`));
    //     }
    // } else {
    //     argErr = false;
    //     option = { message: `validate @Length argument type is err` };
    //     console.log(__errmsg(`validate @Length argument type is err`));
    // }
    option = __getOptions({ option });
    return (target, name, descriptor) => {
        // descriptor.initializer = () => {
        //     variable => {
        //         if (argErr == false) {
        //             return __errmsg(option);
        //         }
        //         let result = __publicCheck(variable, option, name);
        //         if (result.vali === false && option.message) {
        //             result.message = option.message;
        //         }
        //         return result;
        //     }
        // }
        // return descriptor;


        function _getResultOnLength(variable) {
            if (argErr == false) {
                return __errmsg(option.message);
            }
            let result: CheckResult = __publicCheck(variable, option, name);
            if (!result) {
                return true;
            }
            if (result.vali == false && option.message) {
                result.message = option.message;
            }
            return result;
        }
        descriptor.initializer = () => (variable) => {
            let result = __returnCompa(descriptor)
            return Object.assign(result, _getResultOnLength(variable));
        }

        descriptor.writable = true;
        descriptor.enumerable = true;
        return descriptor;
    }

}



/**
 * 公共验证部分
 * 
 * @param {any} variable 
 * @param {any} option 
 * @returns 
 */
function __publicCheck(variable, option, name): CheckResult {
    let { message, required = true, maxLength, minLength, length } = option;
    // 空值可以不验证
    if (!required && !variable) {
        return { vali: true };
    }
    // 条件验证 通过后还需进行函数验证，所以验证通过不返回true
    if (__Validate.isNotEmpty(length)) {
        // 存在长度
        if (__Validate.isNotInteger(length)) {
            return __errmsg(`length 必须是int类型`);
        }
        if (variable.toString().length != length) {
            return __errmsg(`'${name}'字符长度必须为${length}`);
        }
    } else if (__Validate.isNotEmpty(maxLength) && __Validate.isNotEmpty(minLength)) {
        // 不存在长度 但是存在最大和最小长度
        if (__Validate.isNotInteger(maxLength)) {
            return __errmsg(`maxLength 必须是int类型`);
        }
        if (__Validate.isNotInteger(minLength)) {
            return __errmsg(`minLength 必须是int类型`);
        }
        let _length = variable.toString().length;
        if (_length > maxLength || _length < minLength) {
            return __errmsg(`${name}'字符长度必须为${minLength}到${maxLength}之间`);
        }
    }
    return { vali: true };
}


/**
 * 默认验证对象体
 */
const _option = {
    message: '',
    required: true,
    maxLength: null,
    minLength: 0,
    length: null
}

function __getOptions(params) {
    let { option, _default } = params;
    if (!option && option != false) {
        option = { message: _default };
    }
    if (typeof option == 'boolean') {
        option = { required: option, message: _default };
    }
    if (typeof option == 'string') {
        option = { message: option };
    }
    return Object.assign({}, _option, option);
}



/**
 * 统一调用../validate.js 部分
 * 
 * @param {any} variable 
 * @param {any} valiFn 
 * @param {any} params 
 * @returns 
 */
function __returnResult(variable, valiFn, params): CheckResult {
    let option = __getOptions(params),
        name = params.name;
    if (isObject(option)) {
        // 只会返回true 或者err对象
        let checkVal: CheckResult = __publicCheck(variable, option, name);
        if (checkVal.vali) {
            return checkVal;
        }
        if (__Validate[valiFn](variable)) {
            return { vali: true };
        }
        return __errmsg(option.message);
        // return !required && !variable ? true : __Validate[valiFn](variable) ? true : { vali: false, message };
    }
    return __errmsg();
}

/**
 * 同意返回异常提示
 * 
 * @param {string} [message='验证体入参格式错误'] 
 * @returns 
 */
function __errmsg(message = '验证体入参格式错误'): CheckResult {
    return { vali: false, message };
}