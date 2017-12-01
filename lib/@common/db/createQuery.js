export const createQuery = (table, tableName, alias) => {
    // return createQuery.prototype;
}
createQuery.prototype.createQuery = async function(alias) {
    let _table = table,
        _tableName = this._tableName;
    if (!alias) {
        alias = _tableName;
    }
    this.isCreateQuery = true;
    this._sql = '';
    this._alias = alias;
}
createQuery.prototype.leftJoin = async function(table, alias) {
    if (typeof table == 'string') {
        let table = global.TableMetadata.get(table);
        if (!table) {
            throw new Error(`${table}模块不存在或未注入`);
        }
    }
    if (!table._isTable) {
        console.log(`对象不是table`);
        return {};
    }
}