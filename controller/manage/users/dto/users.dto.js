import { IsInterger, IsNotEmpty, IsEmail, IsPhone, IsHttp, Entity } from '../../../../lib/@common';

@Entity('users')
export class UsersCreateDto {
    userName;

    @IsEmail()
    email;

    @IsNotEmpty()
    password;

    @IsNotEmpty()
    roleId;

    @IsNotEmpty()
    nickName;

    createTime;

    headimg;

    @IsPhone(false)
    phone;

    motto;

    @IsHttp(false)
    juejin;

    @IsHttp(false)
    zhihu;

    @IsHttp(false)
    github;

    @IsHttp(false)
    jianshu;

    @IsInterger(false)
    disabled;
}

@Entity('users')
export class UsersUpdateDto {
    @IsInterger()
    id;

    userName;

    @IsEmail()
    email;

    @IsNotEmpty()
    password;

    @IsInterger()
    roleId;

    @IsNotEmpty()
    nickName;

    createTime;

    headimg;

    @IsPhone(false)
    phone;


    motto;

    @IsHttp(false)
    juejin;

    @IsHttp(false)
    zhihu;

    @IsHttp(false)
    github;

    @IsHttp(false)
    jianshu;

    @IsInterger(false)
    disabled;
}