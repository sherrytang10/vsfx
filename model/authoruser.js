import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class AuthorUser {
    // 自增长主键列
    @PrimaryGeneratedColumn()
    id;

    @Column()
    userName;

    @Column()
    nickName;

    @Column()
    passWord;

    @Column()
    phone;

    @Column()
    email;

    @Column()
    headimg;

    @Column()
    roleId;

    @Column()
    motto;

    @Column()
    juejin;

    @Column()
    zhihu;

    @Column()
    github;

    @Column()
    jianshu;

    @Column()
    disabled;

    @Column()
    createTime;
}