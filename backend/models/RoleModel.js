import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Pegawais from "./PegawaiModel.js";
import RolePegawai from "./RolePegawaiModel.js";

const {DataTypes} = Sequelize;
  
const Roles = db.define('roles', {
      id_role: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nama_role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
      },
      modified_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      modified_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
      }
    }, {
      freezeTableName: true,
      tableName: 'role',
      timestamps: false,
      createdAt: 'created_at',
      updatedAt: 'modified_at'
    });     

    Pegawais.hasMany(RolePegawai, { foreignKey: 'id_pegawai', as: 'RolePegawais' });
    Roles.hasMany(RolePegawai, { foreignKey: "id_role" });

export default Roles;