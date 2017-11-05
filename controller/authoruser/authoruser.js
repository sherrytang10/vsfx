import { TestfindDto } from './dto/authoruser.find.dto';
import { Controller, Get, Validation } from '../../lib/@common';

@Controller('/authoruser')
export class authorUserController {
    @Get('/all')
    @Validation(TestfindDto)
    async testfn() {
        return 'authoruser success';
    }
}