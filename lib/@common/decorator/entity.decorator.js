import { __DefinePrivateProperty } from '../utils';
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