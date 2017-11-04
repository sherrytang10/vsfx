const mysql = require('mysql');
// 会优先编译，不能直接引用global中的config
const gConfig = {}; //require('../../config/configration');
// MySQL数据库联接配置
const config = (gConfig || {}).mysql ? gConfig.mysql : [{
    host: '127.0.0.1',
    user: 'managedata1',
    password: 'Paic1234',
    database: 'managementdb', // 前面建的user表位于这个数据库中
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
const execute = (...arg) => {
    let [sql, param, cb] = arg;
    if (typeof param == 'function') {
        cb = param;
        param = [];
    }
    return new Promise((resolve, reject) => {
        if (!sql) {
            if (typeof cb == 'function') {
                // cb(new Error('sql must be'));
                reject({ message: '系统异常。code:10200' });
            }
            return true;
        }
        poolCluster.getConnection((err, connection) => {
            if (err) {
                logger2(null, 'Middleware - mysql - connection code:10201 err ' + err.message)
                    // logger.info('Middleware - mysql - connection code:10201 err ' + err.message)
                reject({ message: '系统异常。code:10201' });
            }
            try {
                connection.query(sql, param, (err, result) => {
                    if (err) {
                        console.log(err.message)
                        reject({ message: '系统异常。code:10203' });
                        // logger2(null, 'Middleware - mysql - analysis code:10203 err ' + err.message)
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
                // logger2(null, 'Middleware - mysql - query code:10202 err ' + e.message);
            }
        });
    })
}

module.exports = execute;