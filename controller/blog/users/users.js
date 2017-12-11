import { Controller, Get, Validation } from '../../../lib/@common';
import { isNotInterger } from '../../../lib/@common/validate';
import { UsersService } from '../../../service/users/users';
@Controller('/users')
export class usersController {
    @Get('/findOne/:id')
        // @Validation(TestfindDto)
    async findOneById({ params: { id } }, res) {
        if (isNotInterger(+id)) {
            return res.sendError('入参类型错误')
        }
        return await UsersService.getUsersByParams({ id });
    }
}