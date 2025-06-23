import express from "express";
import { getPegawais, getPegawaiById, createPegawai, updatePegawai, deletePegawai, Register, Login, Logout } from "../controller/PegawaiController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";

const router = express.Router();

router.get('/pegawais', verifyToken, getPegawais);

router.post('/pegawais', createPegawai);

router.get('/pegawais/:id_pegawai', getPegawaiById);

router.patch('/pegawais/:id_pegawai', updatePegawai);

router.delete('/pegawais/:id_pegawai', deletePegawai);

router.post('/pegawais', Register);

router.post('/login', Login);

router.get('/token', refreshToken);

router.delete('/logout', Logout);

export default router;