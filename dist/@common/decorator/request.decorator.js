"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_1 = require("../utils/property");
const methods = ['Get', 'Post', 'All'];
let methodHandlers = {};
methods.forEach((method) => {
    methodHandlers[method] = (paths = '/') => {
        return (target, name, descriptor) => {
            let src_method = descriptor.value;
            descriptor.value = (req, res, next) => {
                let data = __getData(req, method), vali = {};
                // 验证
                if (src_method._validation) {
                    vali = src_method._validation;
                    let valiObj = {}, modelData = {};
                    for (var key in vali) {
                        if (typeof vali[key] === 'function') {
                            valiObj = vali[key](data[key]);
                        }
                        if (valiObj.vali === false) {
                            res.send({ status: 0, errmsg: valiObj.message });
                            res.end();
                            return false;
                        }
                        vali[key] = data[key];
                    }
                    req.modelData = vali;
                }
                src_method.apply(target, [req, res, next])
                    .then((results) => {
                    if (results) {
                        res.send(results);
                        res.end();
                    }
                })
                    .catch((err) => {
                    console.log(err);
                    // 接入logger
                    console.log(err.message);
                    res.send({ status: 0, errmsg: '接口返回异常' });
                    res.end();
                });
            };
            // Object.assign(descriptor.value, src_method);
            property_1.__DefinePrivateProperty(descriptor.value, 'paths', paths);
            property_1.__DefinePrivateProperty(descriptor.value, 'method', method.toLocaleLowerCase());
            descriptor.enumerable = true;
            return descriptor;
        };
    };
});
function __getData(req, method) {
    switch (method) {
        case 'Get':
            return req.query;
        case 'Post':
            return req.body;
        case 'All':
            return Object.assign(req.query || {}, req.body || {}, req.param || {});
        default:
            return {};
    }
}
exports.Get = methodHandlers['Get'];
exports.Post = methodHandlers['Post'];
exports.All = methodHandlers['All'];
