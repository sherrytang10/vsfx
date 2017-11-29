let _global = typeof global == 'undefined' ? {} : global;
_global.ServiceMetadata = {};
_global.TableMetadata = {};

Object.defineProperty(_global.TableMetadata, 'push', {
    value: __setValue.bind(_global.TableMetadata),
    writable: false,
    enumerable: false
})
Object.defineProperty(_global.TableMetadata, 'get', {
    value: __getValue.bind(_global.TableMetadata),
    writable: false,
    enumerable: false
})

function __setValue(key, val) {
    if (!key) {
        throw new Error(`key不能为空`);
    }
    if (this[key]) {
        throw new Error(`${key}重复`);
    }
    this[key] = val;
}

function __getValue(key) {
    if (!key) {
        throw new Error(`key不能为空`);
    }
    return this[key];
}