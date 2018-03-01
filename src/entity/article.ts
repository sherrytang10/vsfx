import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Users } from './users';
import { ArticleType } from './articleType';
@Entity('article')
export class Article extends BaseEntity {
    @Column('varchar', { length: 225, comment: '标题' })
    title: string;

    @OneToOne(type => Users)
    @JoinColumn()
    users: Users;

    // @Column('int', { length: 11, comment: '分类' })
    // articleTypeId: number;
    @OneToOne(type => ArticleType)
    @JoinColumn()
    articleType: ArticleType;

    @Column('varchar', { length: 255, comment: '概要' })
    docreader: string;

    @Column('datetime', { comment: '角色' })
    publishDate: Date;

    @Column('varchar', { length: 255, comment: '文图', nullable: true })
    picture: string;

    @Column('blob', { comment: '内容' })
    content: string;

    @Column('varchar', { length: 2555, comment: '标签', nullable: true })
    labelIds: string;


    @Column('int', { length: 11, comment: '赞', nullable: true, default: 0 })
    praise: number;

    @Column('int', { length: 11, comment: '访问量', nullable: true, default: 0 })
    visitors: number;

    @Column('int', { length: 225, comment: '1 文章 2是短记', nullable: true })
    type: number;

}