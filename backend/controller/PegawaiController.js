import Pegawais from "../models/PegawaiModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import Roles from "../models/RoleModel.js";
import RolePegawai from "../models/RolePegawaiModel.js";

dayjs.extend(utc);
dayjs.extend(timezone);

const sekarang = dayjs().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm");
console.log(sekarang);

export const getPegawais = async (req, res) => {
  try {
    const pegawais = await Pegawais.findAll({
      attributes: ['id_pegawai', 'nama_pegawai', 'email', 'prodi', 'terakhir_login', 'status'],
      include: [
        {
          model: RolePegawai,
          as: "role_pegawais",
          required: true, 
          include: [
            {
              model: Roles,
              as: "role",
              attributes: ["nama_role"],
            },
          ],
        },
      ],
      order: [["id_pegawai", "ASC"]],
    });

    const formatted = pegawais.flatMap(p => {
      const plain = p.toJSON();
      const baseData = {
        id_pegawai: plain.id_pegawai,
        nama_pegawai: plain.nama_pegawai,
        email: plain.email,
        prodi: plain.prodi,
        status: plain.status,
        terakhir_login: plain.terakhir_login
          ? dayjs(plain.terakhir_login).format("YYYY-MM-DD HH:mm")
          : null,
      };
    
      if (plain.role_pegawais && plain.role_pegawais.length > 0) {
        return plain.role_pegawais.map(rp => ({
          ...baseData,
          role: rp.role?.nama_role || "Belum ditentukan",
          id_role_pegawai: rp.id_role_pegawai,
          id_role: rp.id_role,
        }));
      } else {
        return [{
          ...baseData,
          role: "Belum ditentukan",
          id_role_pegawai: null,
          id_role: null,
        }];
      }
    });
    
    const filtered = formatted.filter(p => p.role !== "Belum ditentukan");
    res.json(filtered);    

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPegawaiNama = async (req, res) => {
  try {
    const pegawais = await Pegawais.findAll({
      attributes: [
        'id_pegawai',
        'nama_pegawai',
        'email',
        'prodi',
        'status',
        'terakhir_login'
      ],
      order: [["id_pegawai", "ASC"]],
    });

    const formatted = pegawais.map(p => ({
      id_pegawai: p.id_pegawai,
      nama_pegawai: p.nama_pegawai,
      email: p.email,
      prodi: p.prodi,
      status: p.status,
      terakhir_login: p.terakhir_login
        ? dayjs(p.terakhir_login).format("YYYY-MM-DD HH:mm")
        : null,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



export const getPegawaiById = async(req, res) => {
    try {
        const pegawai = await Pegawais.findOne({
            attributes: ['id_pegawai', 'nama_pegawai', 'email', 'terakhir_login', 'status'],
            where: {
                id_pegawai: req.params.id_pegawai
            }
        });

        if (!pegawai) return res.status(404).json({ msg: "Pegawai tidak ditemukan" });

        // Format terakhir_login sebelum dikirim
        const formattedData = {
            ...pegawai.toJSON(),
            terakhir_login: pegawai.terakhir_login
                ? dayjs(pegawai.terakhir_login).format("YYYY-MM-DD HH:mm")
                : null
        };

        res.status(200).json(formattedData);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const Register = async (req, res) => {
    const {nama_pegawai, email, password, confPassword, prodi, status} = req.body;
    if(password!==confPassword) return res.status(400).json({msg: "Password dan Confirm Password Tidak Cocok"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Pegawais.create({
            nama_pegawai: nama_pegawai,
            email: email,
            password: hashPassword,
            prodi: prodi,
            status: status
        });
        res.json({msg: "Pegawai Berhasil Dibuat"});
    } catch (error) {
        console.log(error);
    }
}

export const createPegawai = async(req, res) => {
    const {nama_pegawai, email, password, prodi, status} = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Pegawais.create({
            nama_pegawai: nama_pegawai,
            email: email,
            password: hashPassword,
            prodi: prodi,
            status: status,
        });
        res.status(200).json({msg: "Pegawai Berhasil Ditambahkan!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updatePegawai = async (req, res) => {
  const idPegawai = req.params.id;
  const {
    nama_pegawai,
    email,
    prodi,
    status,
    id_role,
    id_role_pegawai, // <- relasi yang akan diubah
  } = req.body;

  try {
    // Update data pegawai
    await Pegawais.update(
      { nama_pegawai, email, prodi, status },
      { where: { id_pegawai: idPegawai } }
    );

    // Jika id_role dan id_role_pegawai diberikan, update role di tabel relasi
    if (id_role && id_role_pegawai) {
      await RolePegawai.update(
        { id_role },
        { where: { id_role_pegawai } }
      );
    }

    res.json({ msg: "Pegawai berhasil diupdate" });
  } catch (error) {
    console.error("Gagal update pegawai:", error);
    res.status(500).json({ msg: error.message });
  }
};


export const deletePegawai = async(req, res) => {
    const pegawai = await Pegawais.findOne({
        where: {
            id_pegawai: req.params.id_pegawai
        }
    });
    if(!pegawai) return res.status(404).json({msg: "Pegawai Tidak Ditemukan!"});
    try {
        await Pegawais.destroy({
            where: {
                id_pegawai: pegawai.id_pegawai
            }
        });
        res.status(200).json({msg: "Pegawai Berhasil Dihapus!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const createRolePegawai = async (req, res) => {
  const { id_pegawai, id_role } = req.body;

  try {
    const existing = await RolePegawai.findOne({
      where: { id_pegawai, id_role },
    });

    if (existing) {
      return res.status(400).json({ msg: "Role sudah ada untuk pegawai ini" });
    }

    await RolePegawai.create({ id_pegawai, id_role });
    res.status(201).json({ msg: "Role berhasil ditambahkan ke pegawai" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const pegawai = await Pegawais.findOne({
      where: { email }
    });

    if (!pegawai) return res.status(404).json({ msg: "Email tidak ditemukan" });

    const match = await bcrypt.compare(password, pegawai.password);
    if (!match) return res.status(400).json({ msg: "Password salah" });

    const payload = {
      id_pegawai: pegawai.id_pegawai,
      nama_pegawai: pegawai.nama_pegawai,
      email: pegawai.email,
      prodi: pegawai.prodi,
      status: pegawai.status,
      // Jika tetap ingin kirim role, bisa dikosongkan atau default
      role: null
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "20s"
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d"
    });

    const nowFormatted = dayjs().format("YYYY-MM-DD HH:mm");

    await Pegawais.update({
      refresh_token: refreshToken,
      terakhir_login: nowFormatted
    }, {
      where: { id_pegawai: pegawai.id_pegawai }
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ accessToken });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const getRolesByEmail = async (req, res) => {
  const { email } = req.query;

  try {
    const pegawai = await Pegawais.findOne({
      where: { email },
      include: [{
        model: RolePegawai,
        include: [Roles]
      }]
    });

    if (!pegawai) return res.status(404).json({ msg: "Email tidak ditemukan" });

    const roles = pegawai.role_pegawais.map(rp => rp.role?.nama_role);
    res.json({ roles });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
  
    const pegawai = await Pegawais.findAll({
      where: {
        refresh_token: refreshToken
      }
    });
  
    if (!pegawai[0]) return res.sendStatus(204);
  
    await Pegawais.update({ refresh_token: null }, {
      where: {
        id_pegawai: pegawai[0].id_pegawai
      }
    });
  
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
  };
