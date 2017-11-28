import { isInterger, isNotEmpty, isEmail, isPhone, isHttp, Model } from '../../../../lib/@common';

@Model('users')
export class UsersCreateDto {
    @isInterger(false)
    id;
    userName;
    @isEmail()
    email;
    @isNotEmpty()
    password;
    @isInterger()
    roleId;
    @isNotEmpty()
    nickName;
    createTime;

    headimg;
    @isPhone(false)
    phone;
    motto;
    @isHttp(false)
    juejin;
    @isHttp(false)
    zhihu;
    @isHttp(false)
    github;
    @isHttp(false)
    jianshu;
    disabled;
}