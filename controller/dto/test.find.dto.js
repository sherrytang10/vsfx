import { isNotInterger } from '../../lib/@common';

export class TestfindDto {
    @isNotInterger()
    pro1;
    pro2;
}