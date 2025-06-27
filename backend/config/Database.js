import { Sequelize } from "sequelize";

const db = new Sequelize('uquals', 'root', '21122003',{
    host: "localhost",
    dialect: "mysql",
});

export default db;