import { __DefinePrivateProperty } from '../utils/property';
export const Controller = path => {
    function _setPrototype(tar, _path) {
        __DefinePrivateProperty(tar.prototype, '_basePath', _path);
        __DefinePrivateProperty(tar.prototype, '_isRoute', true);
        __DefinePrivateProperty(tar.prototype, '_identity', 'controller');
        // return new tar();
        return tar;
    }
    if (typeof path == 'function') { return _setPrototype(path, '/'); }
    return target => _setPrototype(target, path || '/');
}
