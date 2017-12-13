import { __DefinePrivateProperty } from '../utils';
const methods = ['Get', 'Post', 'All'];
methods.forEach(method => {
    exports[method] = (paths = '/') => {
        return (target, name, descriptor) => {
            let src_method = descriptor.value;
            descriptor.value = (req, res, next) => {
                console.log('------decorator-1')
                console.time('timer-');
                let data = __getData(req, method),
                    vali = {};
                // 验证
                if (src_method._validation) {
                    vali = src_method._validation;
                    let valiObj = true,
                        modelData = {};
                    for (var key in vali) {
                        if (typeof vali[key] === 'function') {
                            valiObj = vali[key](data[key]);
                        }
                        if (valiObj.vali === false) {
                            res.send({ status: 0, errmsg: valiObj.message });
                            res.end();
                            return false;
                        }
                        // modelData[key] = data[key];
                        vali[key] = data[key];
                    }
                    console.log('------decorator-2')
                    console.timeEnd('timer-');
                    // if (vali._modelName) {
                    //     modelData._modelName = vali._modelName;
                    // }
                    // if (vali._isModel) {
                    //     modelData._isModel = vali._isModel;
                    // }
                    // req.modelData = modelData;
                    req.modelData = vali;
                }
                console.log('------decorator-3')
                console.timeEnd('timer-');
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