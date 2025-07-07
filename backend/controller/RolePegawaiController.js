import RolePegawai from "../models/RolePegawaiModel.js";
import Pegawais from "../models/PegawaiModel.js";
import Roles from "../models/RoleModel.js";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

const sekarang = dayjs().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm");
console.log(sekarang);

export const getRolePegawai = async (req, res) => {
  try {
    const list = await RolePegawai.findAll({
      include: [
        {
          model: Pegawais,
          as: "pegawai",
          attributes: ["id_pegawai", "nama_pegawai", "email", "prodi", "terakhir_login", "status"]
        },
        {
          model: Roles,
          as: "role",
          attributes: ["nama_role"]
        }
      ]
    });

    const formatted = list.map(item => ({
      id_role_pegawai: item.id_role_pegawai,
      id_pegawai: item.pegawai?.id_pegawai,
      nama_pegawai: item.pegawai?.nama_pegawai,
      email: item.pegawai?.email,
      prodi: item.pegawai?.prodi,
      status: item.pegawai?.status,
      terakhir_login: item.pegawai?.terakhir_login
        ? dayjs(item.pegawai.terakhir_login).format("YYYY-MM-DD HH:mm")
        : null,
      nama_role: item.role?.nama_role ?? "Belum ditentukan"
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getRoleByPegawai = async (req, res) => {
    try {
      const roles = await RolePegawai.findAll({
        where: { id_pegawai: req.params.id_pegawai },
        include: [Roles], // join ke tabel role
      });
  
      const mapped = roles.map(rp => ({
        id: rp.role.id_role,
        nama_role: rp.role.nama_role,
      }));
  
      res.json(mapped);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  export const createRolePegawai = async (req, res) => {
    const { id_pegawai, id_role } = req.body;
  
    if (!id_pegawai || !id_role) {
      return res.status(400).json({ msg: "ID Pegawai dan ID Role wajib diisi" });
    }
  
    try {
      // Cek apakah kombinasi pegawai & role sudah ada
      const existing = await RolePegawai.findOne({
        where: { id_pegawai, id_role }
      });
  
      if (existing) {
        return res.status(409).json({ msg: "Role Pegawai sudah ada" });
      }
  
      const newRole = await RolePegawai.create({
        id_pegawai,
        id_role
      });
  
      res.status(201).json({
        msg: "Role pegawai berhasil ditambahkan",
        data: newRole
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Gagal menambahkan role pegawai", error: error.message });
    }
  };

  export const updateRolePegawai = async (req, res) => {
    const id = req.params.id; // id_role_pegawai
    const { id_role } = req.body;
  
    try {
      await RolePegawai.update(
        { id_role },
        { where: { id_role_pegawai: id } }
      );
      res.json({ msg: "Role pegawai berhasil diupdate" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };  

  export const deleteRolePegawai = async (req, res) => {
    const { id } = req.params; 
    try {
      const deleted = await RolePegawai.destroy({
        where: { id_role_pegawai: id }
      });
  
      if (!deleted) {
        return res.status(404).json({ msg: "Data role pegawai tidak ditemukan" });
      }
  
      res.status(200).json({ msg: "Role pegawai berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ msg: "Gagal menghapus role pegawai", error: error.message });
    }
  };
  