import { __DefinePrivateProperty } from '../utils/property';
const methods = ['Get', 'Post', 'All'];
let methodHandlers: any = {};
methods.forEach((method: string) => {
    methodHandlers[method] = (paths = '/') => {
        return (target: any, name: string, descriptor: PropertyDescriptor) => {
            let src_method = descriptor.value;
            descriptor.value = (req: any, res: any, next: any) => {
                let data = __getData(req, method),
                    vali: any = {};
                // 验证
                if (src_method._validation) {
                    vali = src_method._validation;
                    let valiObj: any = {},
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
                        vali[key] = data[key];
                    }
                    req.modelData = vali;
                }
                src_method.apply(target, [req, res, next])
                    .then((results: any) => {
                        if (results) {
                            res.send(results);
                            res.end();
                        }
                    })
                    .catch((err: Error) => {
                        console.log(err)
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
function __getData(req: any, method: string) {
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

export const Get = methodHandlers['Get'];
export const Post = methodHandlers['Post'];
export const All = methodHandlers['All'];