import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Periode = db.define("periode", {
  id_periode: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_jenis_audit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  periode: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  tgl_mulai: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  tgl_selesai: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(50),
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
    defaultValue: Sequelize.NOW,
  },
}, {
    freezeTableName: true,         
    tableName: "periode_audit",  
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'modified_at'
});

export default Periode;
