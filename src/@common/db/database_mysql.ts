import { createQuery } from './createQuery';
import * as mysql from 'mysql';
// MySQL数据库联接配置
const config = [{
    host: '115.159.157.177',
    user: 'data',
    password: 'Paic1234',
    database: 'sf_test', // 前面建的user表位于这个数据库中
    port: 3306,
    acquireTimeout: '60 * 6 * 24'
}];
const poolCluster = mysql.createPoolCluster();
if (Array.isArray(config)) {
    config.forEach((itemConfig, i) => {
        poolCluster.add(`cg${i}`, itemConfig);
    });
} else {
    poolCluster.add(config);
}
export const execute = (...arg) => {
    let [sql, param, cb] = arg;
    if (typeof param == 'function') {
        cb = param;
        param = [];
    }
    return new Promise((resolve, reject) => {
        if (!sql) {
            if (typeof cb == 'function') {
                reject({ message: `系统异常。msg:sql语句不存在, code:10200` });
            }
            return true;
        }
        // let timeStr = sql.indexOf('call') !== -1 ? sql : sql.match(/from +([^ ]+)/)[1];
        // console.time(`sql execute time: ${timeStr}: `)
        poolCluster.getConnection((err, connection) => {
            if (err) {
                reject({ message: `系统异常。msg:${err.message}, code:10201` });
            }
            try {
                connection.query(sql, param, (err, result) => {
                    // console.timeEnd(`sql execute time: ${timeStr}: `)
                    if (err) {
                        reject({ message: `系统异常。msg:${err.message}, code:10203` });
                    }
                    if (Object.prototype.toString.call(result) == '[object Object]') {
                        resolve(!!result.affectedRows);
                    } else {
                        resolve(result);
                    }
                    connection.release();
                });
            } catch (e) {
                reject({ message: `系统异常。msg:${err.message}, code:10202` });
            }
        });
    })
}



/**
 * 字段验证
 * @param {*} item 
 */
const __checkPrototype = function (item) {
    if (!item) return false;
    // 修饰器的initializer， 所以要执行
    let _item = item();
    // 自增长key不参与任何增改
    if (_item._isPrimaryColumn) return false;
    // 不是表字段  放在所有if最后面
    if (!_item._isColumn) return false;
    return true;
}
