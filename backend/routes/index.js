import express from "express";
import { 
    getPegawais, 
    getPegawaiById, 
    createPegawai, 
    updatePegawai, 
    deletePegawai, 
    createRolePegawai,
    getPegawaiNama,
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
import { 
    getRolePegawai, 
    getRoleByPegawai, 
    updateRolePegawai,
    deleteRolePegawai,
    changeRolePegawai} from '../controller/RolePegawaiController.js';

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
router.get('/pegawais-data', getPegawaiNama);
router.post('/pegawais', createPegawai);
router.post('/role-pegawai', createRolePegawai);
router.get('/pegawais/:id_pegawai', getPegawaiById);
router.patch("/pegawais/:id", updatePegawai);
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

// Role Pegawai 
router.get('/role-pegawai', getRolePegawai);
router.get('/role-pegawai/:id_pegawai', getRoleByPegawai);
router.patch('/role-pegawai/:id', updateRolePegawai);
router.delete("/role-pegawai/:id", deleteRolePegawai);
router.post("/change-role", verifyToken, changeRolePegawai);

export default router;