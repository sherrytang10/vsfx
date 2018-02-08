"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//typeorm
require("reflect-metadata");
const path = require("path");
const typeorm = require("typeorm");
const optTypeOrm = {
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
typeorm.createConnection(optTypeOrm).catch(err => {
    console.log(err);
});
