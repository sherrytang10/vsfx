
import { Controller, Get, isNotInteger } from '../../@common';
import { TestService } from '../../service/test';
import { Test } from '../../entity/test';
@Controller('/test')
export class usersController {
    @Get('/one')
    async findOneById({ params: { id } }, res) {
        let testService = new TestService();
        res.sendSuccess(await testService.getOne());
    }

    @Get('/update/:id')
    async update({ params: { id } }, res) {
        let testService = new TestService();
        res.sendSuccess(await testService.update(id));
    }
    @Get('/save/:sex')
    async save({ params: { sex } }, res) {
        let testService = new TestService();
        let test = new Test();
        test.sex = sex;
        res.sendSuccess(await testService.save(test));
    }
}