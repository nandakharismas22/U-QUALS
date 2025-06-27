import JenisAudit from "../models/JenisAuditModel.js";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

const sekarang = dayjs().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm");
console.log(sekarang);

// GET semua data
export const getJenisAudit = async (req, res) => {
  try {
    const result = await JenisAudit.findAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ msg: "Gagal mengambil data jenis audit" });
  }
};

// POST (tambah) data baru
export const createJenisAudit = async (req, res) => {
    const { nama_jenis, created_by } = req.body;
    try {
      await JenisAudit.create({
        nama_jenis,
        created_by,
        created_at: new Date(),
      });
      res.status(201).json({ msg: "Jenis audit berhasil ditambahkan" });
    } catch (error) {
      console.error("❌ ERROR:", error);
      res.status(500).json({ msg: "Gagal menambahkan data jenis audit", error: error.message });
    }
};
  

// PATCH (update) data
export const updateJenisAudit = async (req, res) => {
  const { id } = req.params;
  const { nama_jenis, modified_by } = req.body;
  try {
    const updated = await JenisAudit.update(
      {
        nama_jenis,
        modified_by,
        modified_at: new Date(),
      },
      {
        where: { id_jenis_audit: id },
      }
    );

    if (updated[0] === 0) return res.status(404).json({ msg: "Data tidak ditemukan" });

    res.json({ msg: "Jenis audit berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ msg: "Gagal memperbarui data jenis audit" });
  }
};

// DELETE data
export const deleteJenisAudit = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await JenisAudit.destroy({
      where: { id_jenis_audit: id },
    });

    if (!deleted) return res.status(404).json({ msg: "Data tidak ditemukan" });

    res.json({ msg: "Jenis audit berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: "Gagal menghapus data jenis audit" });
  }
};