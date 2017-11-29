import { Table, Column } from '../lib/@common';

@Table('users')
export class Users {
    @Column()
    id;

    @Column()
    userName;

    @Column()
    email;

    @Column()
    password;

    @Column()
    roleId;

    @Column()
    nickName;

    @Column()
    createTime;

    @Column()
    headimg;

    @Column()
    phone;

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
}