import Pegawais from "../models/PegawaiModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

const sekarang = dayjs().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm");
console.log(sekarang);

export const getPegawais = async (req, res) => {
    try {
        const pegawais = await Pegawais.findAll({
            attributes: ['nama_pegawai', 'email', 'prodi', 'terakhir_login', 'status']
        });

        const formattedPegawais = pegawais.map(p => {
            const plain = p.toJSON();
            return {
                ...plain,
                terakhir_login: plain.terakhir_login
                    ? dayjs(plain.terakhir_login).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm")
                    : null
            };
        });

        res.json(formattedPegawais);
    } catch (error) {
        console.log(error);
    }
}

export const getPegawaiById = async(req, res) => {
    try {
        const pegawai = await Pegawais.findOne({
            attributes: ['nama_pegawai', 'email', 'terakhir_login', 'status'],
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

export const updatePegawai = async(req, res) => {
    const pegawai = await Pegawais.findOne({
        where: {
            id_pegawai: req.params.id_pegawai
        }
    });

    if (!pegawai) return res.status(404).json({ msg: "Pegawai Tidak Ditemukan!" });

    const { nama_pegawai, email, password, prodi, status } = req.body;

    let hashPassword = pegawai.password; // default: tidak ubah password
    if (password && password !== "") {
        const salt = await bcrypt.genSalt();
        hashPassword = await bcrypt.hash(password, salt);
    }

    try {
        await Pegawais.update({
            nama_pegawai,
            email,
            password: hashPassword,
            prodi,
            status
        }, {
            where: {
                id_pegawai: pegawai.id_pegawai
            }
        });

        res.status(200).json({ msg: "Pegawai Berhasil Diubah!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

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

export const Login = async (req, res) => {
    try {
        const pegawai = await Pegawais.findAll({
            where: { email: req.body.email }
        });

        if (!pegawai[0]) return res.status(404).json({ msg: "Email tidak ditemukan" });

        const match = await bcrypt.compare(req.body.password, pegawai[0].password);
        if (!match) return res.status(400).json({ msg: "Password salah" });

        const id_pegawai = pegawai[0].id_pegawai;
        const nama_pegawai = pegawai[0].nama_pegawai;
        const email = pegawai[0].email;
        const prodi = pegawai[0].prodi;
        const status = pegawai[0].status;

        // Format tanggal login
        const nowFormatted = dayjs().format("YYYY-MM-DD HH:mm");

        // Simpan waktu login ke DB
        await Pegawais.update({
            refresh_token: null,
            terakhir_login: nowFormatted
        }, {
            where: { id_pegawai }
        });

        const accessToken = jwt.sign({ id_pegawai, nama_pegawai, email, prodi, status }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "20s"
        });

        const refreshToken = jwt.sign({ id_pegawai, nama_pegawai, email, prodi, status }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d"
        });

        await Pegawais.update({ refresh_token: refreshToken }, {
            where: { id_pegawai }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,       // true kalau pakai HTTPS
            sameSite: 'Lax',     // atau 'Strict' jika perlu
            maxAge: 24 * 60 * 60 * 1000 // 1 hari
          });

        res.json({ accessToken });

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
