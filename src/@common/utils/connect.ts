import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import { isUndefined, isNotUndefined } from './validate';
export const DefineEntity = (entityPath: string) => {
    try {
        let entityList = __explorer(entityPath);
        entityList.forEach(item => {
            for (var key in item) {
                let entity = item[key];
                if (entity._tableName) {
                    // global.TableMetadata.push(entity._tableName, entity);
                }
            }
        });
    } catch (e) {
        console.log(e)
        console.log(`有Entity挂载失败啦:~err:${e.message}`);
    }
}
export const DefineRoute = (controllersPath: string | string[]) => {
    let router = express.Router();
    /**
     * 补齐path
     *
     * @param {any} path
     * @returns
     */
    function _validatePath(path: string) {
        if (isUndefined(path)) return '/';
        if (path.indexOf('/') !== 0) return `/${path}`;
        return path;
    }
    /**
     * 填充router
     *
     * @param {any} controller
     */
    function _defineMetadata(Controller: any) {
        try {
            let controller = new Controller();
            let { _basePath, _isRoute } = controller;
            if (!_isRoute) return;
            _basePath = _validatePath(_basePath);
            if (_basePath == '/') _basePath = '';
            for (let key in controller) {
                let handler = controller[key];
                let { method, paths, _validation } = handler;
                if (paths) {
                    if (!Array.isArray(paths)) {
                        paths = [paths];
                    }
                    paths.forEach((path: string) => {
                        path = _basePath + _validatePath(path);
                        path = path.replace(/(\w+)\/$/, '');
                        if (method) {
                            router[method](path, function (req: any, res: any, next: any) {
                                res.sendError = (errmsg = '接口返回异常', status = 0) => {
                                    res.send({
                                        status,
                                        errmsg
                                    });
                                    res.end();
                                };
                                res.sendSuccess = (results = '操作成功', status = 1) => {
                                    res.send({
                                        status,
                                        results
                                    });
                                    res.end();
                                };
                                handler(req, res, next)
                            });
                        }
                    });
                }
            }
        } catch (e) {
            console.warn(`有controller注入失败`);
        }
    }

    if (!Array.isArray(controllersPath)) {
        controllersPath = [controllersPath];
    }
    let controllers: any[] = [];
    // 遍历文件获取controller对象
    try {
        controllersPath.forEach(cpaths => {
            controllers.push(...__explorer(cpaths))
        });
    } catch (e) {
        console.log(`有路由挂载失败啦:~err:${e.message}`);
    }
    // 遍历controller对象
    controllers.forEach(controller => {
        if (typeof controller == 'function') {
            isNotUndefined(controller) && _defineMetadata(controller);
        } else {
            for (let ckey in controller) {
                if (ckey && typeof controller[ckey] == 'function') {
                    _defineMetadata(controller[ckey]);
                }
            }
        }
    });
    return router;
}

function __explorer(cpaths: string) {
    let fileArr: any[] = [];
    try {
        let files = fs.readdirSync(cpaths);
        files.forEach(function (file) {
            let _path = path.join(cpaths, file);
            try {
                let statInfo = fs.statSync(_path);
                if (statInfo.isDirectory()) {
                    fileArr.push(...__explorer(_path))
                } else {
                    fileArr.push(require(_path));
                }

            } catch (e) {
                throw e;
            }
        });
    } catch (e) {
        console.log(e)
        console.log(`connect获取文件失败啦~err:${e.message}`);
    }
    return fileArr;
}