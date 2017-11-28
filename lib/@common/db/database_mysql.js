const mysql = require('mysql');
// MySQL数据库联接配置
const config = [{
    host: '127.0.0.1',
    user: 'root',
    password: 'Paic1234',
    database: 'sf', // 前面建的user表位于这个数据库中
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
                reject({ message: `系统异常。msg:${err.message}, code:10200` });
            }
            return true;
        }
        poolCluster.getConnection((err, connection) => {
            if (err) {
                reject({ message: `系统异常。msg:${err.message}, code:10201` });
            }
            try {
                connection.query(sql, param, (err, result) => {
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

export const repository = (model) => {
    if (typeof model == 'string') {
        let _modelName = model;
        model = {};
        model._isModel = true;
        model._modelName = _modelName
    }
    if (!model._isModel) {
        console.log(`对象不是model`);
        return {};
    }
    Object.defineProperty(repository.prototype, '_model', { value: model })
    Object.defineProperty(repository.prototype, '_modelName', { value: model._modelName })
    return repository.prototype;
}

/**
 * 保存单例对象
 */
repository.prototype.save = async function() {
    let _model = this._model,
        _modelName = this._modelName,
        intoList = [],
        valueList = [],
        sql = '';
    for (let key in _model) {
        if (!_model[key]) continue;
        if (key == 'id') continue;
        intoList.push(key);
        let val = _model[key];
        if (typeof val == 'string') {
            val = `'${val}'`;
        }
        valueList.push(val);
    }
    if (intoList.length === 0) { return true };
    sql = `insert into ${_modelName}(${intoList.join(',')}) value(${valueList.join(',')})`;
    console.log(`repository---save---${_modelName}----: ${sql}: `);
    let exe = await execute(sql);;
    return exe ? '添加成功' : '添加失败';
}

/**
 * 修改单例对象
 */
repository.prototype.update = async function() {
    let _model = this._model,
        _modelName = this._modelName,
        updateList = [],
        sql = '';
    if (!_model.id) return 'id不能为空';
    for (let key in _model) {
        if (!_model[key]) continue;
        if (key == 'id') continue;
        let val = _model[key];
        if (typeof val == 'string') {
            val = `'${val}'`;
        }
        updateList.push(`${key}=${val}`);
    }
    if (updateList.length === 0) { return true };
    sql = `update ${_modelName} set ${updateList.join(',')} where id = ${_model.id}`;
    console.log(`repository---update---${_modelName}----: ${sql}: `);
    let exe = await execute(sql);;
    return exe ? '修改成功' : '修改失败';
}

/**
 * 修改单例对象
 */
repository.prototype.findAll = async function({ column = [], where = {} }) {
    let _model = this._model,
        _modelName = this._modelName,
        whereList = [],
        sql = `select ${column.join(',')|| '*' } from ${_modelName}`;
    for (let key in where) {
        if (!where[key]) continue;
        let val = where[key];
        if (typeof val == 'string') {
            val = `'${val}'`;
        }
        whereList.push(`${key}=${val}`);
    }
    if (whereList.length > 0) {
        sql += ' where ' + whereList.join(' and ');
    }
    console.log(`repository---findAll---${_modelName}----: ${sql}: `);
    return await execute(sql);;
}