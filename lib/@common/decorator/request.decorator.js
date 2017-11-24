import { __DefinePrivateProperty } from '../utils';
const methods = ['Get', 'Post', 'All'];
methods.forEach(method => {
    exports[method] = (paths = '/') => {
        return (target, name, descriptor) => {
            let src_method = descriptor.value;
            descriptor.value = (req, res, next) => {
                let data = __getData(req, method);
                // 验证
                if (src_method._validation) {
                    let vali = src_method._validation,
                        valiObj = true;
                    for (var key in vali) {
                        if (typeof vali[key] === 'function') {
                            valiObj = vali[key](data[key]);
                        }
                        if (valiObj.vali === false) {
                            res.send({ status: 0, errmsg: valiObj.msg });
                            res.end();
                            return false;
                        }
                    }
                }
                src_method.apply(target, [req, res, next])
                    .then(results => {
                        if (results) {
                            res.send(results);
                            res.end();
                        }
                    })
                    .catch(err => {
                        // 接入logger
                        console.log(err.message);
                        res.send({ status: 0, errmsg: '接口返回异常' });
                        res.end();
                    });
            };
            // Object.assign(descriptor.value, src_method);
            __DefinePrivateProperty(descriptor.value, 'paths', paths);
            __DefinePrivateProperty(descriptor.value, 'method', method.toLocaleLowerCase());
            descriptor.enumerable = true;
            return descriptor;
        };
    }
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