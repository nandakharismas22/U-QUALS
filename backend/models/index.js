import Pegawais from "./PegawaiModel.js";
import Roles from "./RoleModel.js";
import RolePegawai from "./RolePegawaiModel.js";

Pegawais.hasMany(RolePegawai, { foreignKey: "id_pegawai" });
Roles.hasMany(RolePegawai, { foreignKey: "id_role" });

RolePegawai.belongsTo(Pegawais, { foreignKey: "id_pegawai" });
RolePegawai.belongsTo(Roles, { foreignKey: "id_role" });

export {
  Pegawais,
  Roles,
  RolePegawai,
};
