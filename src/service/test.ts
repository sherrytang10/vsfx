import { Service } from '../@common';
import { Test } from '../entity/test';
@Service()
export class TestService {
    getRepository: Function;
    async getOne() {
        return await this.getRepository(Test).findOneById(1);
    }
    async update(id: number) {
        return await this.getRepository(Test).updateById(id, { sex: 2 });
    }
    async save(test: Test) {
        return await this.getRepository(Test).save(test);
    }
}