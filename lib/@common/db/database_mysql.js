import { __DefinePrivateProperty } from '../utils';
import { createQuery } from './createQuery';
import mysql from 'mysql';
// MySQL数据库联接配置
const config = [{
    host: '115.159.157.177',
    user: 'data',
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
const __checkPrototype = function(item) {
    if (!item) return false;
    // 修饰器的initializer， 所以要执行
    let _item = item();
    // 自增长key不参与任何增改
    if (_item._isPrimaryColumn) return false;
    // 不是表字段  放在所有if最后面
    if (!_item._isColumn) return false;
    return true;
}

export const repository = (table) => {
    let entityModel = null;
    if (typeof table == 'string') {
        entityModel = global.TableMetadata.get(table);
        if (!table) {
            throw new Error(`${table}模块不存在或未注入`);
        }
        __DefinePrivateProperty(repository.prototype, '_tableName', table);
    } else if (!table._isTable) {
        console.log(`对象不是table`);
        return {};
    } else {
        entityModel = global.TableMetadata.get(table._tableName)
        __DefinePrivateProperty(repository.prototype, '_table', table);
        __DefinePrivateProperty(repository.prototype, '_tableName', table._tableName);
    }
    __DefinePrivateProperty(repository.prototype, '_entityModel', entityModel);
    return repository.prototype;
}

/**
 * 保存单例对象
 */
repository.prototype.save = async function(obj) {
    let _table = this._table || obj,
        _entityModel = this._entityModel,
        _tableName = this._tableName,
        intoList = [],
        valueList = [],
        sql = '';
    if (!_table) { return '没有有效可执行数据'; }
    for (let key in _table) {
        let val = _table[key],
            checkCloumnVal = _entityModel[key];
        if (!__checkPrototype(checkCloumnVal) || !val) {
            continue;
        }
        intoList.push(key);
        if (typeof val == 'string') {
            val = `'${val.replace(/(\'|\")/g, '\\$1')}'`;
        }
        valueList.push(val);
    }
    if (intoList.length === 0) { return '添加失败,没有要添加的字段' };
    sql = `insert into ${_tableName}(${intoList.join(',')}) value(${valueList.join(',')})`;
    console.log(`repository---save---${_tableName}----: ${sql} `);
    let exe = await execute(sql);

    return exe ? '添加成功' : '添加失败';
}

/**
 * 修改单例对象
 */
repository.prototype.update = async function(obj) {
    let _table = this._table || obj,
        _entityModel = this._entityModel,
        _tableName = this._tableName,
        updateList = [],
        sql = '';
    if (!_table) { return '没有有效可执行数据'; }
    if (!_table.id) return 'id不能为空';
    for (let key in _table) {
        let val = _table[key],
            checkCloumnVal = _entityModel[key];
        if (!__checkPrototype(checkCloumnVal) || !val) {
            continue;
        }
        if (typeof val == 'string') {
            val = `'${val.replace(/(\'|\")/g, '\\$1')}'`;
        }
        updateList.push(`${key}=${val}`);
    }
    if (updateList.length === 0) { return '修改失败,没有需要更新的字段' };
    sql = `update ${_tableName} set ${updateList.join(',')} where id = ${_table.id}`;
    console.log(`repository---update---${_tableName}----: ${sql}: `);
    let exe = await execute(sql);;
    return exe ? '修改成功' : '修改失败';
}

/**
 * 修改单例对象
 */
repository.prototype.findAll = async function({ column = [], where = {} }) {
    let _tableName = this._tableName,
        whereList = [],
        sql = `select ${column.join(',')|| '*' } from ${_tableName}`;
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
    console.log(`repository---findAll---${_tableName}----: ${sql}: `);
    return await execute(sql);;
}

// 创建query
repository.prototype.createQuery = async function(alias) {
    let _tableName = this._tableName;
    if (!alias) {
        alias = _tableName;
    }
    return createQuery(this.table, _tableName, alias);
}