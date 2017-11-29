import { __DefinePrivateProperty, isFunction } from '../utils';
export const Model = modelName => {
    if (typeof modelName != 'string') {
        console.log('ModelName必须是字符串')
    }
    return target => {
        __DefinePrivateProperty(target.prototype, '_isModel', true);
        __DefinePrivateProperty(target.prototype, '_modelName', modelName);
        return new target();
    };
}
export const Table = tableName => {
    if (typeof tableName != 'string') {
        console.log('tableName')
    }
    return target => {
        __DefinePrivateProperty(target.prototype, '_isTable', true);
        __DefinePrivateProperty(target.prototype, '_tableName', tableName);
        return new target();
    };
}
export const Column = () => {
    return (target, name, descriptor) => {
        if (isFunction(descriptor.initializer)) {
            let src_method = descriptor.initializer();
            descriptor.initializer = () => () => {
                if (!isFunction(src_method)) {
                    return {
                        _isColumn: true
                    }
                }
                let result = src_method() || {};
                result._isColumn = true;
                return result;
            }
        } else {
            descriptor.initializer = () => () => {
                return {
                    _isColumn: true
                }
            }
        }
        descriptor.writable = true;
        descriptor.enumerable = true;
        return descriptor;
    }
    return
}