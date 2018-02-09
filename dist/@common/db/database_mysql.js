"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
// MySQL数据库联接配置
var config = [{
        host: '115.159.157.177',
        user: 'data',
        password: 'Paic1234',
        database: 'sf_test',
        port: 3306,
        acquireTimeout: '60 * 6 * 24'
    }];
var poolCluster = mysql.createPoolCluster();
if (Array.isArray(config)) {
    config.forEach(function (itemConfig, i) {
        poolCluster.add("cg" + i, itemConfig);
    });
}
else {
    poolCluster.add(config);
}
exports.execute = function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    var sql = arg[0], param = arg[1], cb = arg[2];
    if (typeof param == 'function') {
        cb = param;
        param = [];
    }
    return new Promise(function (resolve, reject) {
        if (!sql) {
            if (typeof cb == 'function') {
                reject({ message: "\u7CFB\u7EDF\u5F02\u5E38\u3002msg:sql\u8BED\u53E5\u4E0D\u5B58\u5728, code:10200" });
            }
            return true;
        }
        // let timeStr = sql.indexOf('call') !== -1 ? sql : sql.match(/from +([^ ]+)/)[1];
        // console.time(`sql execute time: ${timeStr}: `)
        poolCluster.getConnection(function (err, connection) {
            if (err) {
                reject({ message: "\u7CFB\u7EDF\u5F02\u5E38\u3002msg:" + err.message + ", code:10201" });
            }
            try {
                connection.query(sql, param, function (err, result) {
                    // console.timeEnd(`sql execute time: ${timeStr}: `)
                    if (err) {
                        reject({ message: "\u7CFB\u7EDF\u5F02\u5E38\u3002msg:" + err.message + ", code:10203" });
                    }
                    if (Object.prototype.toString.call(result) == '[object Object]') {
                        resolve(!!result.affectedRows);
                    }
                    else {
                        resolve(result);
                    }
                    connection.release();
                });
            }
            catch (e) {
                reject({ message: "\u7CFB\u7EDF\u5F02\u5E38\u3002msg:" + err.message + ", code:10202" });
            }
        });
    });
};
/**
 * 字段验证
 * @param {*} item
 */
var __checkPrototype = function (item) {
    if (!item)
        return false;
    // 修饰器的initializer， 所以要执行
    var _item = item();
    // 自增长key不参与任何增改
    if (_item._isPrimaryColumn)
        return false;
    // 不是表字段  放在所有if最后面
    if (!_item._isColumn)
        return false;
    return true;
};
