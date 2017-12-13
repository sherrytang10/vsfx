const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const Middleware = require('../middleware');
const argv = require('minimist')(process.argv.slice(2));

const { DefineRoute, DefineEntity } = require('../lib/@common/connect');
require('../lib/extend');
require('../lib/defineGlobal');
DefineEntity(path.join(__dirname, '../entity'))

/**
 * 设置views路径
 */
// app.set('views', './views');
// app.use('/static', express.static('static'));
app.use(bodyParser.json());
app.use(session({
    secret: 'pazq-node-website',
    // name: 'testapp', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: { maxAge: 80000 }, //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));

app.use(function(req, res, next) {
    console.log('Time:', Date.now());
    next();
});

app.use(Middleware.interceptors('/controller/manage'));
app.use('/restapi', DefineRoute(path.join(__dirname, '../controller/blog')));
app.use('/manage', DefineRoute(path.join(__dirname, '../controller/manage')));

app.use(function(req, res, next) {
    console.log('Time last:', Date.now());
    next();
});
/**
 * 错误处理
 */
app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Something broke!');
});

var server = app.listen(argv.port || 7779, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});