import { Controller, Get } from '../../../@common';
import { isNotInterger } from '../../../@common';
import { UsersService } from '../../../service/users/users';
@Controller('/users')
export class UsersController {
    @Get('/findOne/:id')
    async findOneById({ params: { id } }, res) {
        if (isNotInterger(+id)) {
            return res.sendError('入参类型错误')
        }
        let usersService = new UsersService();
        res.sendSuccess(await usersService.getUsersById(id));
    }
    @Get('/test')
    test(req, res, next) {
        console.log('~~~~~~');
    }
}