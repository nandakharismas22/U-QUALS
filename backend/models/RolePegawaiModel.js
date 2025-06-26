import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const RolePegawai = db.define('role_pegawai', {
  id_role_pegawai: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_pegawai: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_role: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  modified_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  modified_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  freezeTableName: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'modified_at'
});

export default RolePegawai;
