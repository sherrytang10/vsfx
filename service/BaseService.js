/**
 * BaseService
 * 
 * @export
 * @class BaseService
 */
export class BaseService {
    constructor($sql) {
        this.$sql = $sql;
    }

    /**
     * 根据id获取单挑数据
     * 
     * @param {any} id 
     * @returns Any
     * @memberof BaseService
     */
    async getAnyInfoById(id) {
        if (!id || id == 0) { return 'id异常' }
        let [Any] = await this.execute(`selec * from ${this.model} where id = ?`, id);
        return Any;
    }

    /**
     * 获取所有对象
     * 
     * @memberof BaseService
     */
    async getAnyAll(any, option = {}) {
        return await this.repository(any).findAll(option);
    }

    /**
     * 恢复逻辑删除并更新publishDate
     * 
     * @param {any} id 
     * @returns string
     * @memberof BaseService
     */
    async publishAny(id) {
        if (!id || id == 0) { return 'id异常' }
        let exe = await this.execute(`update ${this.model} set disable = 1 where id = ?`, id);
        return exe ? '操作成功' : '操作失败';
    }

    /**
     * 逻辑删除
     * 
     * @param {any} id 
     * @returns string
     * @memberof BaseService
     */
    async disabledAny(id) {
        if (!id || id == 0) { return 'id异常' }
        let exe = await this.execute(`update ${this.model} set disable = 0 where id = ?`, id);
        return exe ? '操作成功' : '操作失败';
    }

    /**
     * 物理删除
     * 
     * @param {any} id 
     * @returns string
     * @memberof BaseService
     */
    async deleteAny(id) {
        if (!id || id == 0) { return 'id异常' }
        let exe = await this.execute(`delete from ${this.model} where id = ?`, id);
        return exe ? '删除成功' : '删除失败';
    }

    /**
     * 保存对象 test
     * 
     * @param {any} any 
     * @returns 
     * @memberof BaseService
     */
    async saveAny(any) {
        return await this.repository(any).save();
    }

    /**
     * 修改对象
     * 
     * @param {any} any 
     * @returns 
     * @memberof BaseService
     */
    async updateAny(any) {
        return await this.repository(any).update();
    }


}