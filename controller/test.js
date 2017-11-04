import { TestfindDto } from './dto/test.find.dto';
import { Controller, Get, Validation } from '../lib/@common/decorator';
@Controller('/test')
export class TestController {
    @Get('/t')
    @Validation(TestfindDto)
    async testfn() {
        return 'success';
    }
}