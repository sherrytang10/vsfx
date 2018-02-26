import { Controller, Get, Post, Validation, Crypto } from '../../../lib/@common';
import { isNotInterger, isEmpty } from '../../../lib/@common/validate';
import { UsersMenuService } from '../../../service/users/usersMenu';
import { formatArrayToMenu } from '../../../lib/utils/format';
@Controller('/usersgroup')
export class usersController {
    @Get('/getUsersGroupList')
    async getUsersGroupList(req, res) {
        res.sendSuccess([{ name: '管理员', id: 1 }, { name: '笔者', id: 2 }]);
    }
}