// import { formatArrayToMenu } from '../../../lib/utils/format';

import { Controller, Get, Post, isNotInteger, isEmpty, Format } from '../../../@common';
import { UsersMenuService } from '../../../service/users/usersMenu';
import { Users } from '../../../entity/users';
const usersMenuService = new UsersMenuService();
@Controller('/usersmenu')
export class usersController {
    /**
     * 获取登录用户列表
     * @param {*} req 
     * @param {*} res 
     */
    @Get('/getMenuList')
    async getMenuListByParam(req, res) {
        let roleId = (req.session.users || {}).roleId || 1;
        let results = formatArrayToMenu(await usersMenuService.getMenuListByParam({ roleId }));
        res.sendSuccess(results);
    }

    /**
     * 获取所有列表
     * @param {*} param0 
     * @param {*} res 
     * @param {*} next 
     */
    @Post('/list')
    async getUsersMenuList({ body }, res, next) {
        let {
            menuName,
            isMenu = null,
            parentId = null,
            disabled = 1
        } = body;
        if (isNotEmpty(parentId) && isNotInteger(parentId)) {
            return res.sendError('parentId入参类型错误');
        }
        if (isNotInteger(disabled)) {
            return res.sendError('入参类型错误');
        }
        let menuList = await usersMenuService.getUsersMenuList({ menuName, parentId, isMenu, disabled });
        menuList = formatMenuMap(menuList);
        res.sendSuccess(menuList)
    }

    /**
     * 添加或者是修改菜单
     */
    @Post('/saveOrUpdate')
    async saveOrUpdateUsersMenu({ body, __loginUM }, res, next) {
        let {
            id,
            parentId,
            menuKey,
            menuName,
            menuUri,
            isMenu = 1,
            descriptor,
        } = body;

        if (isEmpty(parentId)) {
            return res.sendError('请关联父级菜单');
        }
        if (isNotInteger(parentId) || isNotInteger(isMenu)) {
            return res.sendError('入参类型错误');
        }
        if (isEmpty(menuName)) {
            return res.sendError('请输入菜单名称');
        }
        if (parentId != 0 && parentId == id) {
            return res.sendError('不能选自身作为父级菜单');
        }
        // if (menuUri && isNotHttp(menuUri)) {
        //     return res.sendError('菜单地址格式不正确,https?://xxx.xxx');
        // }
        //验证通过
        let params = [parentId, menuKey, menuName, menuUri, isMenu, descriptor, __loginUM],
            results = null;
        if (id && id != '0') {
            if (isNotInteger(id)) {
                return res.sendError('id入参类型错误');
            }
            //修改操作
            params = params.concat(id);
            results = await usersMenuService.saveOrUpdateAny(params, +id);
        } else {
            //添加操作
            params = params.concat(__loginUM);
            results = await usersMenuService.saveUsersMenu(params);
        }
        // let results = await UsersMenuService.saveOrUpdateAny(params, +id);
        return res.sendSuccess(results)
    }

    /**
     * 发布  未用
     * 回复逻辑删除，修改publishDate为当前时间
     * 
     * @param {any} req 
     * @param {any} res 
     * @param {any} next 
     * @returns 
     * @memberof SoftDownController
     */
    @Get('/publish/:id')
    async publishUsersMenu({ __loginUM, params }, res, next) {
        let { id } = params;
        if (isNotInteger(+id)) {
            return res.sendError('入参类型错误');
        }

        if (isFalse(id)) {
            return res.sendError('id不能为空');
        }
        let results = await usersMenuService.publishAny(__loginUM, id);
        return res.sendSuccess(results)
    }

    /**
     * 逻辑删除
     * id 详情id
     * 
     * @param {any} req 
     * @param {any} res 
     * @param {any} next 
     * @returns 
     * @memberof SoftDownController
     */
    @Get('/disabled/:id')
    async disabledUsersMenu({ params, __loginUM }, res, next) {
        let { id } = params;
        if (isNotInteger(+id)) {
            return res.sendError('入参类型错误')
        }
        if (isFalse(id)) {
            return res.sendError('id不能为空')
        }
        let usersMenus = await usersMenuService.getUsersMenuList({ parentId: id });
        if (usersMenus.length > 0) {
            return res.sendError('当前菜单项存在子菜单，请先重新为子菜单分配菜单项后在删除')
        }
        let results = await usersMenuService.disabledAny(__loginUM, id);
        return res.sendSuccess(results)
    }

    /**
     * 物理删除  未用
     * id 详情id
     * 
     * @param {any} req 
     * @param {any} res 
     * @param {any} next 
     * @returns 
     * @memberof SoftDownController
     */
    @Get('/delete/:id')
    async deleteUsersMenu({ params }, res, next) {
        let { id } = params;
        if (isNotInteger(+id)) {
            return res.sendError('入参类型错误')
        }
        if (isFalse(id)) {
            return res.sendError('id不能为空')
        }
        let usersMenus = await usersMenuService.getUsersMenuList({ parentId: +id });
        if (usersMenus.length > 0) {
            return res.sendError('当前菜单项存在子菜单，请先重新为子菜单分配菜单项后在删除')
        }
        let results = await usersMenuService.deleteAny(id);
        return res.sendSuccess(results)
    }

    /**
     * 菜单排序
     * 
     * @param {any} { body, __loginUM } 
     * @param {any} res 
     * @param {any} next 
     * @memberof UserMenuController
     */
    @Post('/savesort')
    async saveSortUsersMenu({ body, __loginUM }, res, next) {
        let { arr } = body;
        if (!Array.isArray(arr)) {
            return res.sendError('入参arr类型错误');
        }
        console.log(arr.join('|'))
        if (!/^\d+\,\d+(\|\d+\,\d+)?/.test(arr.join('|'))) {
            return res.sendError('入参格式错误,[[int]]');
        }
        let results = await usersMenuService.saveSortUsersMenu(arr, __loginUM);
        return res.sendSuccess(results);
    }
}