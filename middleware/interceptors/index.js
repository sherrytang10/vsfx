/**
 * options 配置
 *      prefix: 要过滤的url前缀 string||array
 * 
 * 后期完善校验规则
 */
module.exports = function(options) {
    if (!options) {
        options = []
    }
    if (typeof options == 'string') {
        options = [options]
    }
    if (Array.isArray(options)) {
        options = {
            prefix: options
        }
    }
    global.__globalUserInfo = {
        userInfo: null,
        menuList: null
    };
    return async function(req, res, next) {
        try {
            let { url } = req;
            return next();
            let interceptor = options.prefix.some(item => url.indexOf(item) === 0);
            if (!interceptor) {
                return next();
            }
            // let { userInfo, menuList } = global.__globalUserInfo;
            // // 未登录重定向到登录
            // if (!userInfo) {
            //     res.redirect('/login');
            //     return next();
            // }
            // if (!menuList) {
            //     // menuList = await req.execute(`call getMenuList(${userInfo.id})`);
            //     console.log(global.__globalUserInfo)
            // }
            next();
        } catch (e) {
            console.log(e)
        }
        next();
    }
}