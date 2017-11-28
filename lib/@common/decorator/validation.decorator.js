import { __DefinePrivateProperty, isObject } from '../utils';
import * as __Validate from '../validate';
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
 * 修饰器中 没有value、get、set，只有initializer()
 */
export const isNotEmpty = (option) => {
    return (target, name, descriptor) => {
        descriptor.writable = true;
        descriptor.enumerable = true;
        descriptor.initializer = () => (variable) => __returnResult(variable, 'isNotEmpty', { option, _default: `'${name}'不能为空`, });
        return descriptor;
    }
};
export const isInterger = (option) => {
    return (target, name, descriptor) => {
        descriptor.writable = true;
        descriptor.enumerable = true;
        descriptor.initializer = () => (variable) => __returnResult(variable, 'isInterger', { option, _default: `'${name}'必须是int类型`, });
        return descriptor;
    }
};
export const isEmail = (option) => {
    return (target, name, descriptor) => {
        descriptor.writable = true;
        descriptor.enumerable = true;
        descriptor.initializer = () => variable => __returnResult(variable, 'isEmail', { option, _default: `email格式不正确,xxx@xx.xxx`, });
        return descriptor;
    }
}
export const isPhone = (option) => {
    return (target, name, descriptor) => {
        descriptor.writable = true;
        descriptor.enumerable = true;
        descriptor.initializer = () => variable => __returnResult(variable, 'isPhone', { option, _default: `phone格式不正确`, });
        return descriptor;
    }
}
export const isHttp = (option) => {
    return (target, name, descriptor) => {
        descriptor.writable = true;
        descriptor.enumerable = true;
        descriptor.initializer = () => variable => __returnResult(variable, 'isHttp', { option, _default: `'${name}'格式不正确,https?://xxx.xxx`, });
        return descriptor;
    }
}

function __returnResult(variable, valiFn, params) {
    let { option, _default } = params;
    if (!option && option != false) {
        option = { msg: _default };
    }
    if (typeof option == 'boolean') {
        option = { required: option, msg: _default };
    }
    if (typeof option == 'string') {
        option = { msg: option };
    }
    if (isObject(option)) {
        let { msg, required = true } = option;
        return !required && !variable ? true : __Validate[valiFn](variable) ? true : { vali: false, msg };
    }
    return { vali: false, msg: '验证体入参格式错误' };
}