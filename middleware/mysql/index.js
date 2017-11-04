var mysql = require('mysql');
var config = require('./config');

module.exports = function() {
    var poolCluster = mysql.createPoolCluster();
    if (Array.isArray(config)) {
        config.forEach((itemConfig, i) => {
            poolCluster.add(`cg${i}`, itemConfig);
        });
    } else {
        poolCluster.add(config);
    }
    var execute = (...arg) => {

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
    return async function(req, res, next) {
        if (req.poolCluster) return await next();
        Object.assign(req, {
            poolCluster,
            execute
        })
        await next();
    }
}