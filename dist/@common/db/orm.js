"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//typeorm
require("reflect-metadata");
var path = require("path");
var typeorm = require("typeorm");
var optTypeOrm = {
    type: "mysql",
    host: '115.159.157.177',
    username: 'data',
    password: 'Paic1234',
    database: 'sf_test',
    port: '3306',
    acquireTimeout: '60 * 6 * 24',
    synchronize: true,
    logging: true,
    entities: [
        path.join(__dirname, '../../entity/*.js')
    ]
};
typeorm.createConnection(optTypeOrm).catch(function (err) {
    console.log(err);
});
