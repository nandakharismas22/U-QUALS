import Pegawais from "../models/PegawaiModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const pegawai = await Pegawais.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!pegawai[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, docoded) => {
            if(err) return res.sendStatus(403);
            const id_pegawai = pegawai[0].id_pegawai;
            const nama_pegawai = pegawai[0].nama_pegawai;
            const email = pegawai[0].email;
            const prodi = pegawai[0].prodi;
            const terakhir_login = pegawai[0].terakhir_login;
            const status = pegawai[0]. status;
            const accessToken = jwt.sign({id_pegawai, nama_pegawai, email, prodi, terakhir_login, status}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });
            res.json({accessToken});
        });
    } catch (error) {
        
    }
}