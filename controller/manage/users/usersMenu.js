import { Controller, Get, Post, Validation, Crypto } from '../../../lib/@common';
import { isNotInterger, isEmpty } from '../../../lib/@common/validate';
import { UsersMenuService } from '../../../service/users/usersMenu';
@Controller('/usersmenu')
export class usersController {
    @Get('/getMenuList')
    async getMenuListByParam(req, res) {
        let roleId = (req.session.users || {}).roleId || 1;
        return UsersMenuService.getMenuListByParam({ roleId });
    }
}