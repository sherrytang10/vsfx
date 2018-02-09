"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var property_1 = require("../utils/property");
exports.Controller = function (path) {
    function _setPrototype(tar, _path) {
        property_1.__DefinePrivateProperty(tar.prototype, '_basePath', _path);
        property_1.__DefinePrivateProperty(tar.prototype, '_isRoute', true);
        property_1.__DefinePrivateProperty(tar.prototype, '_identity', 'controller');
        // return new tar();
        return tar;
    }
    if (typeof path == 'function') {
        return _setPrototype(path, '/');
    }
    return function (target) { return _setPrototype(target, path || '/'); };
};
