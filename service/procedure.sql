
DROP PROCEDURE IF EXISTS `getArticleList`;
CREATE PROCEDURE `getArticleList`(in ArticleTypeId int, in type int, in disabled int, in nickName varchar(20), in pn int, in ps int)
begin 
    set pn = (pn - 1) * ps;
    if pn < 0 then
        set pn = 0;
    end if; 
    if ps <= 0 then
        set ps = 10;
    end if;
    set @sql = concat('select a.id, a.title,case a.type when "1" then "文章" else "短记" end typeName, a.type,a.articleTypeId,at.name articleTypeName,au.nickName,a.docreader,a.labelIds,a.picture,a.praise,a.visitors, date_format(a.publishTime, "%Y-%m-%d %H:%I:%S") publishTime,  case a.disabled when "1" then "发布" else "下线" end disabledStr, a.disabled from article a, article_type at, users au where at.id = a.articleTypeId and au.id = a.authorUserId');
    set @sqlCount = concat('select count(a.id) total from article a, article_type at, users au where at.id = a.articleTypeId and au.id = a.authorUserId');
    set @param = '';


    if ArticleTypeId is not null and ArticleTypeId !=0 then 
        set@param = concat(@param, ' and a.ArticleTypeId=',ArticleTypeId);
    end if;
    if type is not null and type !=0 then 
        set@param = concat(@param, ' and a.type=',type);
    end if;
    if disabled is not null and disabled != '' then
        set@param = concat(@param, ' and a.disabled=',disabled);
    end if;
    if nickName is not null and nickName != '' then
        set @param = concat(@param, ' and a.nickName like "%', nickName, '%"');
    end if;


    set @param = concat(@param, ' order by a.publishTime desc');
    set @sqlCount = concat(@sqlCount, @param);

    set @param = concat(@param, ' limit ', pn, ' ,', ps);
    set @sql = concat(@sql, @param);
    prepare stmt from @sql;
    execute stmt;
    prepare stmt from @sqlCount;
    execute stmt;
    -- select @sql as sqlstr;
    deallocate prepare stmt;
end;
