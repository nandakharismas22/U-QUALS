import Pegawais from '../models/PegawaiModel.js';
import Roles from '../models/RoleModel.js';
import RolePegawai from '../models/RolePegawaiModel.js';

Pegawais.belongsToMany(Roles, {
  through: RolePegawai,
  foreignKey: 'id_pegawai',
  otherKey: 'id_role',
});

Roles.belongsToMany(Pegawais, {
  through: RolePegawai,
  foreignKey: 'id_role',
  otherKey: 'id_pegawai',
});
