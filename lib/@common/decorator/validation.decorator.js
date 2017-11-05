import { __DefinePrivateProperty } from '../utils';
import * as __Validate from '../validate';
export const Validation = (Dto) => {
    return (target, name, descriptor) => {
        let dto = typeof Dto === 'function' ? new Dto() : Dto;
        if (Object.prototype.toString.call(dto) === '[object Object]') {
            __DefinePrivateProperty(descriptor.value, '_validation', dto);
        }
        return descriptor;
    }
};
/**
 * 修饰器中 没有value、get、set，只有initializer()
 */
export const isNotEmpty = (msg = '不能为空') => {
    return (target, name, descriptor) => {
        descriptor.initializer = () => (variable) => __returnResult(variable, msg, 'isNotEmpty');
        return descriptor;
    }
};
export const isInterger = (msg = '必须是int类型') => {
    return (target, name, descriptor) => {
        descriptor.initializer = () => (variable) => __returnResult(variable, msg, 'isInterger');
        return descriptor;
    }
};

function __returnResult(variable, msg, valiFn) {
    return __Validate[valiFn](variable) ? true : { vali: false, msg };
}