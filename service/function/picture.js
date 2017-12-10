import { Service } from '../../lib/@common';
import { BaseService } from '../BaseService';
@Service()
export class PictureService extends BaseService {
    constructor() {
        super('picture');
    }
}