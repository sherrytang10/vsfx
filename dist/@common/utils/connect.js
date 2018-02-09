"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var express = require("express");
var validate_1 = require("./validate");
exports.DefineEntity = function (entityPath) {
    try {
        var entityList = __explorer(entityPath);
        entityList.forEach(function (item) {
            for (var key in item) {
                var entity = item[key];
                if (entity._tableName) {
                    // global.TableMetadata.push(entity._tableName, entity);
                }
            }
        });
    }
    catch (e) {
        console.log(e);
        console.log("\u6709Entity\u6302\u8F7D\u5931\u8D25\u5566:~err:" + e.message);
    }
};
exports.DefineRoute = function (controllersPath) {
    var router = express.Router();
    /**
     * 补齐path
     *
     * @param {any} path
     * @returns
     */
    function _validatePath(path) {
        if (validate_1.isUndefined(path))
            return '/';
        if (path.indexOf('/') !== 0)
            return "/" + path;
        return path;
    }
    /**
     * 填充router
     *
     * @param {any} controller
     */
    function _defineMetadata(Controller) {
        try {
            var controller = new Controller();
            var _basePath_1 = controller._basePath, _isRoute = controller._isRoute;
            if (!_isRoute)
                return;
            _basePath_1 = _validatePath(_basePath_1);
            if (_basePath_1 == '/')
                _basePath_1 = '';
            var _loop_1 = function (key) {
                var handler = controller[key];
                var method = handler.method, paths = handler.paths, _validation = handler._validation;
                if (paths) {
                    if (!Array.isArray(paths)) {
                        paths = [paths];
                    }
                    paths.forEach(function (path) {
                        path = _basePath_1 + _validatePath(path);
                        path = path.replace(/(\w+)\/$/, '');
                        if (method) {
                            router[method](path, function (req, res, next) {
                                res.sendError = function (errmsg, status) {
                                    if (errmsg === void 0) { errmsg = '接口返回异常'; }
                                    if (status === void 0) { status = 0; }
                                    res.send({
                                        status: status,
                                        errmsg: errmsg
                                    });
                                    res.end();
                                };
                                res.sendSuccess = function (results, status) {
                                    if (results === void 0) { results = '操作成功'; }
                                    if (status === void 0) { status = 1; }
                                    res.send({
                                        status: status,
                                        results: results
                                    });
                                    res.end();
                                };
                                handler(req, res, next);
                            });
                        }
                    });
                }
            };
            for (var key in controller) {
                _loop_1(key);
            }
        }
        catch (e) {
            console.warn("\u6709controller\u6CE8\u5165\u5931\u8D25");
        }
    }
    if (!Array.isArray(controllersPath)) {
        controllersPath = [controllersPath];
    }
    var controllers = [];
    // 遍历文件获取controller对象
    try {
        controllersPath.forEach(function (cpaths) {
            controllers.push.apply(controllers, __explorer(cpaths));
        });
    }
    catch (e) {
        console.log("\u6709\u8DEF\u7531\u6302\u8F7D\u5931\u8D25\u5566:~err:" + e.message);
    }
    // 遍历controller对象
    controllers.forEach(function (controller) {
        if (typeof controller == 'function') {
            validate_1.isNotUndefined(controller) && _defineMetadata(controller);
        }
        else {
            for (var ckey in controller) {
                if (ckey && typeof controller[ckey] == 'function') {
                    _defineMetadata(controller[ckey]);
                }
            }
        }
    });
    return router;
};
function __explorer(cpaths) {
    var fileArr = [];
    try {
        var files = fs.readdirSync(cpaths);
        files.forEach(function (file) {
            var _path = path.join(cpaths, file);
            try {
                var statInfo = fs.statSync(_path);
                if (statInfo.isDirectory()) {
                    fileArr.push.apply(fileArr, __explorer(_path));
                }
                else {
                    fileArr.push(require(_path));
                }
            }
            catch (e) {
                throw e;
            }
        });
    }
    catch (e) {
        console.log(e);
        console.log("connect\u83B7\u53D6\u6587\u4EF6\u5931\u8D25\u5566~err:" + e.message);
    }
    return fileArr;
}
