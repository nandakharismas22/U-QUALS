import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const JenisAudit = db.define("jenis_audit", {
  id_jenis_audit: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama_jenis: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  modified_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  modified_at: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  freezeTableName: true,  
  tableName: 'jenis_audit',
  timestamps: true,   
  createdAt: 'created_at',
  updatedAt: 'modified_at'
});

export default JenisAudit;
