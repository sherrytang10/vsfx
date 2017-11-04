const express = require('express');
const app = express();
const router = express.Router();
const Routes = require('../router');
const Middleware = require('../middleware');
const argv = require('minimist')(process.argv.slice(2));



/**
 * 设置views路径
 */
// app.set('views', './views');
// app.use('/static', express.static('static'));


app.use(function(req, res, next) {
    console.log('Time:', Date.now());
    next();
});

app.use('/restapi', Routes);
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

var server = app.listen(argv.port || 3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});