import { createConnection } from "typeorm";

createConnection({
    driver: {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "admin",
        database: "test"
    },
    entities: [
        __dirname + "/model/*.js"
    ],
    autoSchemaSync: true,
}).then(connection => {
    // here you can start to work with your entities
}).catch(error => console.log(error));