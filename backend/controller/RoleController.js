import Roles from "../models/RoleModel.js";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

const sekarang = dayjs().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm");
console.log(sekarang);

export const getRoles = async (req, res) => {
    try {
      const roles = await Roles.findAll({
        attributes: ['nama_role']
      });
      res.json(roles); // ✅ kirim hasil ke client
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Gagal mengambil data roles" });
    }
};

export const getRoleById = async (req, res) => {
    try {
      const role = await Roles.findOne({
        where: {
          id_role: req.params.id  // ✅ gunakan nama param sesuai di route
        }
      });
      res.json(role);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };