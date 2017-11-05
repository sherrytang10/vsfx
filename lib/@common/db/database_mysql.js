const mysql = require('mysql');
// MySQL数据库联接配置
const config = [{
    host: '127.0.0.1',
    user: 'test',
    password: 'test1234',
    database: 'testdb', // 前面建的user表位于这个数据库中
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
                reject({ message: '系统异常。code:10200' });
            }
            return true;
        }
        poolCluster.getConnection((err, connection) => {
            if (err) {
                reject({ message: '系统异常。code:10201' });
            }
            try {
                connection.query(sql, param, (err, result) => {
                    if (err) {
                        reject({ message: '系统异常。code:10203' });
                    }
                    if (Object.prototype.toString.call(result) == '[object Object]') {
                        resolve(!!result.affectedRows);
                    } else {
                        resolve(result);
                    }
                    connection.release();
                });
            } catch (e) {
                console.log(e.message)
                reject({ message: '系统异常。code:10202' });
            }
        });
    })
}