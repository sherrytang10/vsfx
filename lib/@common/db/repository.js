import { createConnection } from "typeorm";
import path from 'path';
createConnection({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "Paic1234",
    database: "sf",
    // synchronize: true, // 实体与库表同步
    // debug: true,
    entities: [
        path.join(__dirname, "../../../model/*.js")
    ],
    // autoSchemaSync: true,
}).catch(error => console.log(error));