import { Service } from '../../lib/@common';
import { BaseService } from '../BaseService';
import { isInterger } from '../../lib/@common/validate';
@Service()
export class ArticleTypeService extends BaseService {
    constructor() {
        super('article_ype');
    }
    async findAllGroupType() {
        return this.execute(`SELECT count(a.articleTypeId) as num, at.id articleTypeId, at.name articleTypeName 
            FROM article a LEFT JOIN article_type at ON at.id=a.articleTypeId 
            LEFT JOIN users au ON au.id=a.authorUserId 
            WHERE a.disabled=1 GROUP BY a.articleTypeId`);
    }
    async findAll({ disabled }) {
        let query = 'select id, name from article_type where 1=1';
        if (isInterger(disabled)) {
            query += ` and disabled=${disabled}`;
        }
        return this.execute(query);
    }
}