import { isNotEmpty } from '../../lib/@common/decorator/validation';

export class TestfindDto {
    @isNotEmpty()
    pro1;
    pro2;
}