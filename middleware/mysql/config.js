// MySQL数据库联接配置
module.exports = (global.config || {}).mysql ? global.config.mysql : [{
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database:'edu', // 前面建的user表位于这个数据库中
    port: 3306,
    acquireTimeout: '60 * 6 * 24'
}];