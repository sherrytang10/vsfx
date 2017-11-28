export function formatArrayToMenu(arr) {
    try {
        arr = arr.reverse();
        // 所有非最低子集对象
        let obj = {},
            // 返回对象
            rResult = [];

        for (let item of arr) {
            let pid = item.parentId;
            if (pid != 0) {
                let temp = [];
                if (!obj[pid]) {
                    let fObj = obj[pid] = {};
                    temp = fObj.children = [];
                } else {
                    Object.assign(item, obj[item.id])
                    temp = obj[pid].children;
                }
                temp.unshift(item);
            } else {
                obj[item.id] = Object.assign(obj[item.id] || {}, item)
                rResult.unshift(obj[item.id])
            }
        }
        return rResult;
    } catch (e) {
        console.log(e)
    }
}