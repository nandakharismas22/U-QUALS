import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Pegawais = db.define('pegawai', {
      id_pegawai: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nama_pegawai: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      prodi: {
        type: DataTypes.STRING,
        allowNull: false
      },
      terakhir_login: {
        type: DataTypes.DATE,
        allowNull: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true
      },
      refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true
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
      tableName: 'pegawai',
      timestamps: false,
      createdAt: 'created_at',
      updatedAt: 'modified_at'
    }); 

export default Pegawais;