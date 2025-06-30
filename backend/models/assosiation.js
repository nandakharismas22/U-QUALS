import Pegawais from './PegawaiModel.js';
import Roles from './RoleModel.js';
import RolePegawai from './RolePegawaiModel.js';

export default function setupAssociations() {
  Pegawais.hasMany(RolePegawai, { foreignKey: 'id_pegawai' });
  RolePegawai.belongsTo(Pegawais, { foreignKey: 'id_pegawai' });

  Roles.hasMany(RolePegawai, { foreignKey: 'id_role' });
  RolePegawai.belongsTo(Roles, { foreignKey: 'id_role' });
}