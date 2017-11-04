exports.formatBusinessMap = (arr) => {
    let citys = {},
        resultsCitys = [];
    arr.forEach(item => {
        let cityItem = citys[item.city];
        // 不存在
        if (!cityItem) {
            cityItem = {};
            cityItem.city = item.cityName;
            cityItem.deptList = [item];
            citys[item.city] = cityItem;
        } else {
            cityItem.deptList.push(item);
        }
    });
    for (let key in citys) {
        resultsCitys.push(citys[key]);
    }
    return resultsCitys;
}