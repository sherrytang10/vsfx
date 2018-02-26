import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
@Entity('article_type')
export class ArticleType {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('int', { default: 1, comment: '1可用，0禁用' })
    disabled: number;
    @Column('int', { default: 0 })
    parentId: number;
    @Column('varchar', { length: 225, comment: '类型名称' })
    name: string;
}