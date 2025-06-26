import Periode from "../models/PeriodeModel.js";
import dayjs from "dayjs";

export const getPeriode = async (req, res) => {
  try {
    const list = await Periode.findAll({
      order: [["id_periode", "ASC"]],
    });
    // format tanggal pakai dayjs kalau diperlukan
    const formatted = list.map(p => {
      const plain = p.toJSON();
      return {
        ...plain,
        tgl_mulai: dayjs(plain.tgl_mulai).format("YYYY-MM-DD"),
        tgl_selesai: dayjs(plain.tgl_selesai).format("YYYY-MM-DD"),
      };
    });
    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

export const getPeriodeById = async (req, res) => {
  try {
    const { id_periode } = req.params;
    const periode = await Periode.findByPk(id_periode);
    if (!periode) return res.status(404).json({ msg: "Periode tidak ditemukan" });
    const plain = periode.toJSON();
    res.json({
      ...plain,
      tgl_mulai: dayjs(plain.tgl_mulai).format("YYYY-MM-DD"),
      tgl_selesai: dayjs(plain.tgl_selesai).format("YYYY-MM-DD"),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

export const createPeriode = async (req, res) => {
  try {
    const {
      id_jenis_audit,
      periode,
      tgl_mulai,
      tgl_selesai,
      status,
      created_by,
    } = req.body;

    const newPeriode = await Periode.create({
      id_jenis_audit,
      periode,
      tgl_mulai,
      tgl_selesai,
      status,
      created_by,
    });

    res.status(201).json({ msg: "Periode berhasil ditambahkan", data: newPeriode });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};

export const updatePeriode = async (req, res) => {
  try {
    const { id_periode } = req.params;
    const {
      id_jenis_audit,
      periode,
      tgl_mulai,
      tgl_selesai,
      status,
      modified_by,
    } = req.body;

    const [updated] = await Periode.update(
      {
        id_jenis_audit,
        periode,
        tgl_mulai,
        tgl_selesai,
        status,
        modified_by,
      },
      { where: { id_periode } }
    );

    if (!updated) return res.status(404).json({ msg: "Periode tidak ditemukan" });
    res.json({ msg: "Periode berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};

export const deletePeriode = async (req, res) => {
  try {
    const { id_periode } = req.params;
    const deleted = await Periode.destroy({ where: { id_periode } });
    if (!deleted) return res.status(404).json({ msg: "Periode tidak ditemukan" });
    res.json({ msg: "Periode berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};
