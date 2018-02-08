export default class Utils {
    static data = '1';
    static getDate() {
        console.log('123')
    }
}

class base {
    abc = 12333333;
}

export class sub extends base {
    abc = 111;
}

let s = new sub();
console.log(s.abc)