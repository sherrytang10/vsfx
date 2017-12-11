import { Table, Column, PrimaryGeneratedColumn } from '../lib/@common';
@Table('article')
export class Article {
    @PrimaryGeneratedColumn()
    id;
    @Column()
    title;
    @Column()
    authorUserId;
    @Column()

    docreader;
    @Column()

    picture;

    @Column()
    content;

    @Column()
    labelIds;

    @Column()
    articleTypeId;

    //赞
    @Column()
    praise;

    // 访问量
    @Column()
    visitors

    @Column()
    disabled;

    @Column()
    publishTime;

    /**
     * 文章或者短记
     * 
     * @memberof Article
     */
    @Column()
    type;

    @Column()
    createTime;
}