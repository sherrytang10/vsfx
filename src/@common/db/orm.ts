//typeorm
require("reflect-metadata");
import * as path from 'path';
import * as typeorm from 'typeorm';

const optTypeOrm: any = {
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
}
typeorm.createConnection(optTypeOrm).catch(err => {
    console.log(err)
});