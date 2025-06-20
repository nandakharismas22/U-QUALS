import express from "express";
import { getPegawais, getPegawaiById, Register, Login, Logout } from "../controller/PegawaiController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";

const router = express.Router();

router.get('/pegawais', verifyToken, getPegawais);

router.get('/pegawais/:id_pegawai', getPegawaiById);

router.post('/pegawais', Register);

router.post('/login', Login);

router.get('/token', refreshToken);

router.delete('/logout', Logout);

export default router;