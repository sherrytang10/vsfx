import { Controller, Service, Get, Post } from '../../../lib/@common/decorator';
import { isEmpty, isFalse, isNotInteger, isNotUm } from '../../../lib/utils/validate';
import { formatInterfaceMap } from '../../../lib/utils/formatArray';
import { UsersInterfaceService } from '../../../service/users/usersInterface';

@Controller('/usersinterface')
export class UsersInterfaceController {

    /**
     * 获取接口列表
     * 
     * @param {any} { body } 
     * @param {any} res 
     * @returns 
     * @memberof UsersInterfaceController
     */
    @Post('/list')
    async getUserInterfaceList({ body }, res) {
        let {
            interfaceName,
            menuId,
            disabled = 1
        } = body;
        if (isNotInteger(disabled)) {
            return res.sendError('入参类型错误');
        }
        // if (isNotInteger(menuId)) {
        //     return res.sendError('menuId必须是int类型');
        // }
        let interfaceList = await UsersInterfaceService.getUsersInterfaceList({ disabled, interfaceName, menuId });
        let interfaceObj = formatInterfaceMap(interfaceList);
        res.sendSuccess(interfaceObj);
    }

    @Get('/interfacetype')
    async getInterfaceTypeList(req, res) {
        res.sendSuccess(await UsersInterfaceService.getUsersInterfaceTypeList());
    }

    /**
     * 新增或者修改接口信息
     * 
     * @param {any} req 
     * @param {any} res 
     * @param {any} next 
     * @memberof UsersController
     */
    @Post('/saveOrUpdate')
    async saveOrUpdateUsers({ body, __loginUM }, res, next) {
        let {
            id = 0, menuIds = ['0'], interfaceName, interfaceUri, interfaceType, descriptor, disabled = 1
        } = body;
        if (isNotInteger(id) || isNotInteger(disabled)) {
            return res.sendError('入参类型错误');
        }
        if (isEmpty(interfaceName)) {
            return res.sendError('接口名称不能为空');
        }
        if (interfaceName.length > 50) {
            return res.sendError('接口名称不能超过50个字符');
        }
        if (isEmpty(interfaceUri)) {
            return res.sendError('接口地址不能为空');
        }
        if (interfaceUri.length > 150) {
            return res.sendError('接口地址不能超过50个字符');
        }
        if (isEmpty(interfaceType)) {
            return res.sendError('所属模块不能为空');
        }
        if (interfaceType.length > 50) {
            return res.sendError('所属模块不能超过50个字符');
        }

        if (isEmpty(descriptor)) {
            descriptor = interfaceName;
        } else if (descriptor && descriptor > 100) {
            return res.sendError('接口描述不能超过100个字符');
        }

        menuIds = menuIds.join(',');
        if (menuIds && !/^\d+(?=)(,\d+)*$/.test(menuIds)) {
            return res.sendError('menuIds格式不正确，id只能是int');
        }
        let param = [menuIds, interfaceName, interfaceUri, interfaceType, descriptor, disabled, __loginUM]
        if (!id || id == '0') {
            param.push(__loginUM);
        }
        let results = await UsersInterfaceService.saveOrUpdateAny(param, id);
        return res.sendSuccess(results);
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
    async disabledUsersInterface({ params, __loginUM }, res, next) {
        let { id } = params;
        if (isNotInteger(+id)) {
            return res.sendError('入参类型错误')
        }

        if (isFalse(id)) {
            return res.sendError('id不能为空')
        }
        let results = await UsersInterfaceService.disabledAny(__loginUM, id);
        return res.sendSuccess(results)
    }

    /**
     * 物理删除
     * id 详情id
     * 
     * @param {any} req 
     * @param {any} res 
     * @param {any} next 
     * @returns 
     * @memberof SoftDownController
     */
    @Get('/delete/:id')
    async deleteUsersInterface({ params }, res, next) {
        let { id } = params;
        if (isNotInteger(+id)) {
            return res.sendError('入参类型错误')
        }

        if (isFalse(id)) {
            return res.sendError('id不能为空')
        }
        let results = await UsersInterfaceService.deleteAny(id);
        return res.sendSuccess(results)
    }
}