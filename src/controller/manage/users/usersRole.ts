import { Controller, Get, Post, isNotInteger, isEmpty, isFalse, Format, isNotEmpty, isInteger } from '../../../@common';
import { UsersRoleService } from '../../../service/users/usersRole';
import { UsersRole } from '../../../entity/usersRole';

/**
 * 文章controller
 * 
 * @export
 * @class ArticleController
 */
const usersRoleService = new UsersRoleService();
@Controller('/usersrole')
export class UsersRoleController {
    /**
     * 获取文章类型列表
     * 
     * @param {any} { query } 
     * @param {any} res 
     * @memberof UsersRoleController
     */
    @Get('/findAll')
    async findAllUsersRole({ body }, res) {
        let { desabled = 1 } = body;
        if (isNotInteger(desabled)) {
            return res.sendError('入参类型异常');
        }
        res.sendSuccess(await usersRoleService.findAllUsersRole(desabled));
    }

    @Post('/saveOrUpdate')
    // @Validation(ArticleCreateDto)
    async saveUsersRoleInfo({ body, session }, res) {
        var usersRole = <UsersRole>{};
        if (isNotEmpty(body.id)) {
            if (isInteger(body.id)) {
                usersRole.id = body.id;
            } else {
                return res.sendError('id入参类型异常');
            }
        }
        if (isEmpty(body.name) || (body.name.length > 25)) {
            return res.sendError('标题长度必须为1-25个字符');
        }
        usersRole.name = body.name;
        res.sendSuccess(await usersRoleService.saveOrUpdateUsersRole(usersRole));
    }

    @Get('/delete')
    async deleteUsersRole({ query }, res) {
        let { id } = query;
        if (isNotInteger(id)) {
            return res.sendError('入参类型错误');
        }
        if (isFalse(id)) {
            return res.sendError('id不能为空');
        }
        res.sendSuccess(await usersRoleService.deletedUsersRole(id));
    }
}