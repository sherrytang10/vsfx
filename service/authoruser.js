import { Service } from '../lib/@common';
import { AuthorUser } from '../model/authoruser';

import { getRepository, getConnection, getManager } from "typeorm";
const path = require('path');
@Service()
export class UserService {
    async findAllUser() {
        // const a = await getRepository(AuthorUser).find();
        // console.log(a)



        // return await getConnection().query('select * from author_user');
        let a = await getManager().createQueryBuilder(AuthorUser, 'u').printSql().getMany();
        return a;
    }
}