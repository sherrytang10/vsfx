const router = require('express').Router();
const execute = function() {}; //require('../utils/database');

export const Controller = path => {
    function _setPrototype(tar, _path) {
        tar.prototype.basePath = _path;
        tar.prototype.isRoute = true;
        tar.prototype.identity = 'controller';
        return new tar();
    }
    if (typeof path == 'function') { return _setPrototype(path, '/'); }
    return target => _setPrototype(target, path || '/');
}
export const Validation = (...arg) => {
    console.log('---')
    console.log(arg);
    return (target, name, descriptor) => {
        console.log('###')
        console.log(target);
        return descriptor;
    }
}

/**
 * 
 * @param {*} service   如果service为空或者undefined， 则标记当前class为service，controller使用时谨慎
 * @param {*} serviceName 
 */
export const Service = (service, serviceName = 'DefineService') => {
    if (service && service.identity == 'service') {
        return target => {
            target.prototype[serviceName] = service;
            return target;
        }
    }
    if (!service) {
        return target => {
            target.prototype.identity = 'service';
            target.prototype.execute = execute;
            return new target();
        }
    }
    return target;
}


const methods = ['Get', 'Post', 'All'];
methods.forEach(method => {
    exports[method] = (paths = '/') => {
        return (target, name, descriptor) => {
            let src_method = descriptor.value;
            descriptor.value = (req, res, next) => {
                src_method.apply(target, [req, res, next])
                    .then(results => {
                        if (results) {
                            res.send(results);
                            res.end();
                        }
                    })
                    .catch(err => {
                        // 接入logger
                        // console.log(err.message);
                        res.send({ status: 0, errmsg: '接口返回异常' });
                        res.end();
                    });
            }

            descriptor.value.paths = paths;
            descriptor.value.method = method.toLocaleLowerCase();
            descriptor.enumerable = true;
            return descriptor;
        };
    }
});

export const Catch = () => {
    return (target, name, descriptor) => {
        let src_method = descriptor.value;
        descriptor.value = (...arg) => {
            src_method.apply(target, arg).catch(err => { throw new Error(err) });;
        }
        return descriptor
    }
}

export const Readonly = (...arg) => {
    if (arg.length == 1) {
        return (target, name, descriptor) => {
            arg = arg[0];
            descriptor.writable = typeof arg == 'boolean' ? arg : false;
            descriptor.configurable = false;
            return descriptor;
        }
    } else if (arg.length == 3) {
        let descriptor = arg[2];
        descriptor.writable = false;
        descriptor.configurable = false;
        return descriptor
    }
}

export const Enumerable = (...arg) => {
    if (arg.length == 1) {
        return (target, name, descriptor) => {
            arg = arg[0];
            descriptor.enumerable = typeof arg == 'boolean' ? arg : false;
            return descriptor;
        }
    } else if (arg.length == 3) {
        let descriptor = arg[2];
        descriptor.enumerable = false;
        return descriptor
    }
}