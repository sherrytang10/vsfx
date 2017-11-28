import { __DefinePrivateProperty } from '../utils';
import { repository, execute } from '../db/database_mysql';

/**
 * 
 * @param {*} service   如果service为空或者undefined， 则标记当前class为service，controller使用时谨慎
 * @param {*} serviceName 
 */
export const Service = (service, serviceName = 'DefineService') => {
    // if (service && service._identity == 'service') {
    //     return target => {
    //         __DefinePropertyFalse(tar.prototype, serviceName, service);
    //         return target;
    //     }
    // }
    return target => {
        __DefinePrivateProperty(target.prototype, '_identity', 'service');
        __DefinePrivateProperty(target.prototype, 'execute', execute);
        __DefinePrivateProperty(target.prototype, 'repository', repository);
        return new target();
    }
    return target;
}