import { Service } from '../../lib/@common';
import { BaseService } from '../BaseService';
import { isInterger } from '../../lib/@common/validate';
@Service()
export class ArticleTypeService extends BaseService {
    constructor() {
        super('article_ype');
    }
    async findAllGroupType({ userId } = { userId: null }) {
        let query = `SELECT count(a.articleTypeId) as num, at.id as id, at.name classify 
        FROM article a LEFT JOIN article_type at ON at.id=a.articleTypeId 
        LEFT JOIN users au ON au.id=a.authorUserId 
        WHERE a.disabled=1`
        if (userId) {
            query += ` and au.id=` + userId;
        }
        query += ' GROUP BY a.articleTypeId';
        return this.execute(query);
    }
    async findAll({ disabled }) {
        let query = 'select id, name from article_type where 1=1';
        if (isInterger(disabled)) {
            query += ` and disabled=${disabled}`;
        }
        return this.execute(query);
    }
}