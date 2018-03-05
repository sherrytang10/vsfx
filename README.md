
# vsfx
> 抱着学习的态度，自己对express做了一个简单的加强封装。<br/>
> node 6.3.1

express模式基本不变

### 安装
执行命令：
```
$ git clone https://github.com/qualc/vsfx.git
$ cd vsfx && npm install
```

### 运行
然后，执行命令：
```
$ node website.js
```
***
### 一、挂载路由
```
const express = require('express');
const app = express();

// 引入DefineRoute
import { DefineRoute } from '../lib/@common/connect';
// 用DefineRoute挂载controller， 把controller解析成路由地址并use到express
app.use('/restapi', DefineRoute(path.join(__dirname, '../controller')));

... coding
```

### 二、Controller中的猫腻

```
import { TestfindDto } from './dto/test.find.dto';
import { Controller, Get, Validation } from '../lib/@common';

@Controller('/test')
export class TestController {
    @Get('/find')
    @Validation(TestfindDto)
    async testfn() {
        return 'success';
    }
}
```
##### @Controller(string) 修饰controller类
`标记修饰类为controller。 在DefineRoute中告诉系统这个是Controller,未修饰的class不会被解析成路由`
`参数是这个class模块的路由，只能是字符串,不传默认为"/"`
#####  @Get(string|[string])  request请求方式
`标记这个class的属性是一个get请求响应函数，如上所例子，当客户端发起get请求http://host:prot/rest/test/find时，服务器会执行这个函数并返回success到客户端`
`忘了， 只支持Get、Post、All`
`参数为属性路由，可以是字符串和字符串数组(多个路由访问同一个handle)`
##### @Validation([object Dto]) 拦截请求进行验证
`对入参做拦截验证`
`参数是一个dto对象。(其实就是一个做了属性修饰处理的class对象)`

### 三、Dto文件里面是什么
```
import { isInteger } from '../../lib/@common';

export class TestfindDto {
    @isInteger()
    pro1;
    pro2;
}
```
`如代码就是一个普通的class， 重点在于@isNotInteger()对属性的修饰,告诉程序这个属性需要验证，并且他必须是interger类型，当你的请求入参对象中包含相同名称的入参，则会进行验证。如果验证不通过会直接返回{status:0,errmsg:'必须是int类型'}`
`{status:0,errmsg:'必须是int类型'} 格式是个人自己定义的`
`以isInterger为例： '必须是int类型'是isInterger的默认提示，也可以自定义提示文案@isInteger('自定义的文案')`
`如上所例子，当客户端发起get请求http://host:prot/rest/test/find?pro1=a时，会返回验证失败`


### 四、下一步打算干哈呢？
1. `coding...`

[源码github](https://github.com/qualc/vsfx)


var buf = crypto.randomBytes(5);
    name = buf.toString('hex');