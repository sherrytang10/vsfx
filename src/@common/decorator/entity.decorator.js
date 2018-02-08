import { __DefinePrivateProperty, __returnCompa, isFunction } from '../utils';
export const Entity = entityName => {
    if (typeof entityName != 'string') {
        console.log('ModelName必须是字符串')
    }
    return target => {
        if (entityName) {
            let entity = global.TableMetadata.get(entityName);
            if (!entity) {
                throw new Error(`${entityName}模块不存在或未注入`);
            }
            __DefinePrivateProperty(target.prototype, '_isTable', true);
            __DefinePrivateProperty(target.prototype, '_tableName', entityName);
            // __DefinePrivateProperty(target.prototype, '_entityModel', entity);
        }
        return new target();
    };
}
export const Table = tableName => {
    if (typeof tableName != 'string') {
        console.log('tableName')
    }
    return target => {
        // let entity = new target();
        __DefinePrivateProperty(target.prototype, '_isTable', true);
        __DefinePrivateProperty(target.prototype, '_tableName', tableName);
        // __DefinePrivateProperty(target.prototype, '_entityModel', target.prototype);
        return new target();
    };
}
export const Column = () => {
    return (target, name, descriptor) => {
        // if (isFunction(descriptor.initializer)) {
        //     let src_method = descriptor.initializer();
        //     descriptor.initializer = () => () => {
        //         if (!isFunction(src_method)) {
        //             return {
        //                 _isColumn: true
        //             }
        //         }
        //         let result = src_method() || {};
        //         result._isColumn = true;
        //         return result;
        //     }
        // } else {
        //     descriptor.initializer = () => () => {
        //         return {
        //             _isColumn: true
        //         }
        //     }
        // }

        descriptor.initializer = () => (variable) => {
            let result = __returnCompa(descriptor)
            result._isColumn = true;
            return result;
        }
        descriptor.writable = true;
        descriptor.enumerable = true;
        return descriptor;
    }
    return
}

export const PrimaryGeneratedColumn = () => {
    return (target, name, descriptor) => {
        descriptor.initializer = () => (variable) => {
            let result = __returnCompa(descriptor)
            result._isPrimaryColumn = true;
            return result;
        }
        descriptor.writable = true;
        descriptor.enumerable = true;
        return descriptor;
    }
}

export const OneToOne = () => {

}