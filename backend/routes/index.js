import express from "express";
import { 
    getPegawais, 
    getPegawaiById, 
    createPegawai, 
    updatePegawai, 
    deletePegawai, 
    createRolePegawai,
    Register, 
    Login, 
    Logout } from "../controller/PegawaiController.js";
import { getRoles, getRoleById } from "../controller/RoleController.js";
import {
    getPeriode,
    getPeriodeById,
    createPeriode,
    updatePeriode,
    deletePeriode,
  } from "../controller/PeriodeController.js";
import {
    getJenisAudit,
    createJenisAudit,
    updateJenisAudit,
    deleteJenisAudit
  } from "../controller/JenisAuditController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";

const router = express.Router();

// Auth
router.post('/pegawais', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

// Pegawai
router.get('/pegawais', getPegawais);
router.post('/pegawais', createPegawai);
router.post('/role-pegawai', createRolePegawai);
router.get('/pegawais/:id_pegawai', getPegawaiById);
router.patch("/pegawais/:id_pegawai", updatePegawai);
router.delete('/pegawais/:id_pegawai', deletePegawai);

// Role
router.get('/roles', getRoles); 
router.get('/roles/:id', getRoleById); 

// Periode 
router.get("/periode", getPeriode);
router.get("/periode/:id_periode", getPeriodeById);
router.post("/periode", createPeriode);
router.patch("/periode/:id_periode", updatePeriode);
router.delete("/periode/:id_periode", deletePeriode);

// Jenis Audit
router.get("/jenis-audit", getJenisAudit);
router.post("/jenis-audit", createJenisAudit);
router.patch("/jenis-audit/:id_jenis_audit", updateJenisAudit);
router.delete("/jenis-audit/:id_jenis_audit", deleteJenisAudit);

export default router;