import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table/index";
import { Calendar,ArrowUpDown, Circle, Edit, Trash2 } from "lucide-react";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import React, {useState} from "react";
import { useAuth } from "../../../components/auth/AuthContext";
import axios from "axios";

interface ProdiAkre{
  id: number;
  fakultas: string;
  prodi: string;
  level: string;
  lembaga: string;
  nilai: string;
  mulai: string;
  berakhir: string;
}

const tableData: ProdiAkre[] = [
  {
    id: 1,
    fakultas: "Ilmu Komputer",
    prodi: "Informatika", 
    level: "S1",         
    lembaga: "BAN-PT",
    nilai: "B/Baik Sekali",
    mulai: "23 Mei 2025",
    berakhir: "27 Juni 2025",
  },

  {
    id: 2,
    fakultas: "Ilmu Komputer",
    prodi: "Sistem Informasi", 
    level: "S1",          
    lembaga: "BAN-PT",
    nilai: "A/Unggul",
    mulai: "23 Mei 2025",
    berakhir: "27 Juni 2025",
  },

  {
    id: 3,
    fakultas: "Ilmu Komputer",
    prodi: "Sistem Informasi", 
    level: "S1",          
    lembaga: "BAN-PT",
    nilai: "A/Unggul",
    mulai: "23 Mei 2025",
    berakhir: "27 Juni 2025",
  },

  {
    id: 4,
    fakultas: "Teknik",
    prodi: "Teknik Kimia", 
    level: "S1",          
    lembaga: "BAN-PT",
    nilai: "B/Baik Sekali",
    mulai: "23 Mei 2025",
    berakhir: "27 Juni 2025",
  },
  
  {
    id: 5,
    fakultas: "Teknik",
    prodi: "Teknik Industri", 
    level: "S1",          
    lembaga: "BAN-PT",
    nilai: "B/Baik Sekali",
    mulai: "23 Mei 2025",
    berakhir: "27 Juni 2025",
  },

];

export default function BasicTableOne() {
  const [data, setData] = useState<ProdiAkre[]>(tableData);
  const [selectedProdi, setSelectedProdi] = useState<ProdiAkre | null>(null);

  const {
    isOpen: isEditOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();
  const {
    isOpen: isDeleteOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const handleEditClick = (item: ProdiAkre) => {
    setSelectedProdi(item);
    openEditModal();
  };

  const handleDeleteClick = (item: ProdiAkre) => {
    setSelectedProdi(item);
    openDeleteModal();
  };

  const handleSaveChanges = () => {
    if (!selectedProdi) return;
    setData((prev) =>
      prev.map((item) => (item.id === selectedProdi.id ? selectedProdi : item))
    );
    closeEditModal();
  };

  const handleConfirmDelete = () => {
    if (!selectedProdi) return;
    setData((prev) => prev.filter((item) => item.id !== selectedProdi.id));
    closeDeleteModal();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!selectedProdi) return;
    setSelectedProdi({
      ...selectedProdi,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                No
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                <div className="flex items-center gap-1 cursor-pointer">
                  Fakultas
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                <div className="flex items-center gap-1 cursor-pointer">
                  Prodi
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                <div className="flex items-center gap-1 cursor-pointer">
                  Level
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                <div className="flex items-center gap-1 cursor-pointer">
                  Lembaga
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                <div className="flex items-center gap-1 cursor-pointer">
                  Nilai
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                <div className="flex items-center gap-1 cursor-pointer">
                  Mulai
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                <div className="flex items-center gap-1 cursor-pointer">
                  Berakhir
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                Sertifikat
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400">
                Aksi
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {index + 1}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.fakultas}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.prodi}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.level}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.lembaga}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.nilai}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.mulai}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.berakhir}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <span className="text-blue-600 hover:underline cursor-pointer">Lihat</span>
                </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      {/* Edit */}
                      <div
                        className="p-2 rounded-full bg-orange-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 cursor-pointer"
                        onClick={() => handleEditClick(item)}
                      >
                        <Edit className="w-4 h-4 text-orange-500 dark:text-orange-300" />
                      </div>
                      {/* Delete */}
                      <div
                        className="p-2 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 cursor-pointer"
                        onClick={() => {
                          openDeleteModal();
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-red-500 dark:text-red-300" />
                      </div>
                    </div>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
    {/* Edit for adding */}
      <Modal isOpen={isEditOpen} onClose={closeEditModal} className="max-w-[600px] m-2">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-5">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Tambah Akreditasi Prodi Baru
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Masukkan detail akreditasi prodi baru.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-y-5">
                
                {/* Baris 1: fakultas (Dropdown) */}
                <div className="relative">
                  <Label>Fakultas</Label>
                  <select name="fakultas" value={selectedProdi?.fakultas || ""} onChange={handleInputChange}
                  className="w-full dark:bg-dark-900 h-11 rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-10 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 appearance-none">
                    <option value="">Pilih Fakultas</option>
                    <option>Fakultas Ilmu Komputer</option>
                    <option>Fakultas Hukum</option>
                    <option>Fakultas Ekonomi dan Bisnis</option>
                    <option>Fakultas Arsitektur dan Desain</option>
                    <option>Fakultas Pertanian</option>
                    <option>Fakultas Teknik</option>
                    <option>Fakultas Kedokteran</option>
                    <option>Fakultas Ilmu Sosial dan Ilmu Politik</option>
                  </select>
                <div className="pointer-events-none absolute inset-y-12 right-3 flex items-center text-gray-500 dark:text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>

                {/* Baris 2: prodi (Dropdown) */}
                <div className="relative">
                  <Label>Prodi</Label>
                  <select name="prodi" value={selectedProdi?.prodi || ""} onChange={handleInputChange}
                  className="w-full dark:bg-dark-900 h-11 rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-10 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 appearance-none">
                    <option value="">Pilih Prodi</option>
                    <option>Sistem Informasi</option>
                    <option>Teknik Informatika</option>
                    <option>Sains Data</option>
                    <option>Bisnis Digital</option>
                    <option>Ilmu Hukum</option>
                    <option>Ekonomi Pembangunan</option>
                    <option>Manajemen</option>
                    <option>Akuntansi</option>
                    <option>Kewirausahaan</option>
                    <option>Arsitektur</option>
                    <option>Desain Komunikasi Visual</option>
                    <option>Desain Interior</option>
                    <option>Fakultas Agroteknologi</option>
                    <option>Fakultas Agribisnis</option>
                    <option>Teknik Industri</option>
                    <option>Teknik Kimia</option>
                    <option>Teknologi Pangan</option>
                    <option>Teknik Sipil</option>
                    <option>Teknik Lingkungan</option>
                    <option>Teknik Mesin</option>
                    <option>Fisika</option>
                    <option>Pendidikan Dokter</option>
                    <option>Profesi Dokter</option>
                   
                  </select>
                <div className="pointer-events-none absolute inset-y-12 right-3 flex items-center text-gray-500 dark:text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                
                {/* Baris 3: Level (Dropdown) */}
                <div className="relative">
                  <Label>Level</Label>
                  <select name="level" value={selectedProdi?.level || ""} onChange={handleInputChange}
                  className="w-full dark:bg-dark-900 h-11 rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-10 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 appearance-none">
                    <option value="">Pilih Level</option>
                    <option>Nasional</option>
                    <option>Internasional</option>
                  </select>
                <div className="pointer-events-none absolute inset-y-12 right-3 flex items-center text-gray-500 dark:text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex gap-4">
                {/* Dropdown Lembaga */}
                <div className="relative w-1/2">
                  <Label>Lembaga</Label>
                  <select name="lembaga" value={selectedProdi?.lembaga || ""} onChange={handleInputChange}
                  className="w-full dark:bg-dark-900 h-11 rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-10 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 appearance-none">
                    <option value="">Pilih Lembaga</option>
                    <option>BAN-PT</option>
                    <option>KAN</option>
                    <option>IABEE</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-12 right-3 flex items-center text-gray-500 dark:text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>

                {/* Dropdown Nilai */}
                <div className="relative w-1/2">
                  <Label>Nilai</Label>
                  <select name="nilai" value={selectedProdi?.nilai || ""} onChange={handleInputChange}
                  className="w-full dark:bg-dark-900 h-11 rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-10 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 appearance-none">
                    <option value="">Nilai</option>
                    <option>A</option>
                    <option>B</option>
                    <option>Unggul</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-12 right-3 flex items-center text-gray-500 dark:text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                {/* Input Tanggal Mulai */}
                <div className="relative w-1/2">
                  <Label>Tanggal Mulai</Label>
                  <input
                    type="date" name="mulai" value={selectedProdi?.mulai || ""} onChange={handleInputChange}
                    className="w-full pr-10 dark:bg-dark-900 h-11 rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                  <div className="pointer-events-none absolute right-3 top-10 text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                </div>

                {/* Input Tanggal Berakhir */}
                <div className="relative w-1/2">
                  <Label>Tanggal Berakhir</Label>
                  <input
                    type="date" name="berakhir" value={selectedProdi?.berakhir || ""} onChange={handleInputChange}
                    className="w-full pr-10 dark:bg-dark-900 h-11 rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                  <div className="pointer-events-none absolute  right-3 top-10 text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Sertifikat</label>
                <div className="flex items-center justify-between w-full h-14 px-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-white/[0.03]">
                  <span className="text-sm text-gray-400">Seret file di sini untuk mulai mengunggah</span>
                  <button
                    type="button"
                    className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-white/[0.06] dark:border-gray-600"
                  >
                    Unggah file
                  </button>
                </div>
              </div>

              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 justify-end">
              <Button size="sm" variant="outline" onClick={closeEditModal}>
                Batal
              </Button>
              <Button size="sm" onClick={handleSaveChanges}>
                Simpan
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={closeDeleteModal} className="max-w-[500px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Hapus Akreditasi
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Apakah Anda yakin ingin menghapus Akteditasi? {selectedProdi?.prodi}?
            </p>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={closeDeleteModal}>
              Batal
            </Button>
            <Button
              size="sm"
              className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
              onClick={handleConfirmDelete}
            >
              Hapus
            </Button>
          </div>
        </div>
      </Modal>
      </>
  );
}
