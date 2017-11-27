import { Service } from '../lib/@common';
import { AuthorUser } from '../model/authoruser';

import { getRepository, getConnection, getManager } from "typeorm";
const path = require('path');
@Service()
export class UserService {
    async findAllUser() {
        // const a = await getRepository(AuthorUser).find();
        // console.log(a)
        console.log('1111')
        try {
            let r = getManager().getRepository(AuthorUser);
            let a = '';
            await r.findOneById(1);
            // return await getConnection().query('select * from author_user');
            // let a = await getManager().createQueryBuilder(AuthorUser, 'u').printSql().getMany();
            return a;
        } catch (e) {
            console.log(e)
            return e;
        }
    }
}