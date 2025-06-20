import { Sequelize } from "sequelize";

const db = new Sequelize('uquals', 'root', '',{
    host: "localhost",
    dialect: "mysql",
});

export default db;