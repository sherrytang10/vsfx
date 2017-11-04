const express = require('express');
import { isUndefined, isNotUndefined } from './validate';
export const DefineRoute = controllers => {
    let router = express.Router();
    /**
     * 补齐path
     *
     * @param {any} path
     * @returns
     */
    function _validatePath(path) {
        if (isUndefined(path)) return '/';
        if (path.indexOf('/') !== 0) return `/${path}`;
        return path;
    }
    /**
     * 填充router
     *
     * @param {any} controller
     */
    function _defineMetadata(controller) {
        try {
            let { basePath, isRoute } = controller;

            if (!isRoute) return;
            basePath = _validatePath(basePath);
            if (basePath == '/') basePath = '';
            for (let key in controller) {
                let handler = controller[key];
                let { method, paths } = handler;
                if (paths) {
                    if (!Array.isArray(paths)) {
                        paths = [paths];
                    }
                    paths.forEach(path => {
                        path = basePath + _validatePath(path);
                        // 去掉最后面的“多余”的/
                        //      /path/ => /paht
                        //      / => / 
                        path = path.replace(/(\w+)\/$/, '');
                        // if (path == '/') path = '';
                        if (method) {
                            router[method](path, handler);
                        }
                    });
                }
            }
        } catch (e) {
            console.warn(`有controller注入失败`);
        }
    }
    if (!Array.isArray(controllers)) {
        controllers = [controllers];
    }
    controllers.forEach(controller => {
        isNotUndefined(controller) && _defineMetadata(controller);
    });
    return router;
}