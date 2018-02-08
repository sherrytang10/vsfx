import { __DefinePrivateProperty } from '../utils/property';
import { execute } from '../db/database_mysql';
import { getRepository, getManager, getConnection } from 'typeorm';

export const Service = () => {
    return (target: any) => {
        __DefinePrivateProperty(target.prototype, '_identity', 'service');
        __DefinePrivateProperty(target.prototype, 'execute', execute);
        __DefinePrivateProperty(target.prototype, 'getRepository', getRepository);
        __DefinePrivateProperty(target.prototype, 'getManager', getManager);
        __DefinePrivateProperty(target.prototype, 'getConnection', getConnection);
        // return new target();
        return target;
    }
}