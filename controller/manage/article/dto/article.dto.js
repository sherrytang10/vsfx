import { IsInterger, IsNotEmpty, IsEmail, IsPhone, IsCompleteDate, Length, Entity } from '../../../../lib/@common';

@Entity('article')
export class ArticleCreateDto {
    @Length(1, 50, '标题长度为1-50个字符')
    title;

    @IsInterger(false)
    authorUserId;

    docreader;

    picture;

    @IsNotEmpty({ message: '内容不能为空' })
    content;


    labelIds;

    @IsInterger()
    articleTypeId;

    //赞
    @IsInterger(false)
    praise;

    // 访问量
    @IsInterger(false)
    visitors

    @IsInterger(false)
    disabled;

    @IsCompleteDate(false)
    publishTime;
}

@Entity('article')
export class ArticleUpdateDto {
    @IsInterger()

    id;
    @Length(1, 50, '标题长度为1-50个字符')
    title;

    @IsInterger(false)
    authorUserId;


    docreader;

    picture;
    @IsNotEmpty({ message: '内容不能为空' })

    content;

    labelIds;

    @IsInterger({ message: '类型不能为空' })
    articleTypeId;

    //赞
    @IsInterger(false)
    praise;

    // 访问量
    @IsInterger(false)
    visitors

    @IsInterger(false)
    disabled;

    @IsCompleteDate(false)
    publishTime;
}