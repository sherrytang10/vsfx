import { Service } from '../../lib/@common';
import { BaseService } from '../BaseService';
import { isInterger } from '../../lib/@common/validate';
@Service()
export class ArticleLableService extends BaseService {
    constructor() {
        super('article_lable');
    }
    async findAllGroupLable({ userId } = { userId: null }) {
        let query = `select count(*) as num, al.name as classify, al.id as id from article a left join article_lable al on FIND_IN_SET(al.id,a.labelIds) left join users au on au.id=a.authorUserId where a.disabled = 1`;
        if (userId) {
            query += ` and au.id=` + userId;
        }
        query += ` GROUP BY al.id`
        return this.execute(query);
    }

    // async findAll({ disabled }) {
    //     let query = 'select id, name from article_type where 1=1';
    //     if (isInterger(disabled)) {
    //         query += ` and disabled=${disabled}`;
    //     }
    //     return this.execute(query);
    // }
}