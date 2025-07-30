import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import { ArrowUpDown, Circle, Edit, Trash2, FileText } from "lucide-react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import React from "react";

interface ViewMonitoring {
  id: number;
  periode: string;
  prodi: string;
  auditor: string;
  status: string;
  nilai: string;
  tgl_mulai: string;
  tgl_selesai: string;
}

const tableData: ViewMonitoring[] = [
  {
    id: 1,
    periode: "Periode 2025/2026",
    prodi: "Sistem Informasi",
    auditor: "Tim Penjaminan Mutu Prodi",
    status: "Selesai",
    nilai: "100",
    tgl_mulai: "12 Mei 2025",
    tgl_selesai: "12 Mei 2025",
  },
  {
    id: 2,
    periode: "Periode 2024/2025",
    prodi: "Teknik Informatika",
    auditor: "Tim Penjaminan Mutu Prodi",
    status: "Diproses",
    nilai: "",
    tgl_mulai: "15 Mei 2024",
    tgl_selesai: "15 Mei 2024",
  },
  {
    id: 3,
    periode: "Periode 2023/2024",
    prodi: "Teknik Informatika",
    auditor: "Tim Penjaminan Mutu Prodi",
    status: "Diajukan",
    nilai: "90",
    tgl_mulai: "15 Mei 2024",
    tgl_selesai: "15 Mei 2024",
  },
  {
    id: 3,
    periode: "Periode 2022/2023",
    prodi: "Teknik Informatika",
    auditor: "Tim Penjaminan Mutu Prodi",
    status: "Draf",
    nilai: "",
    tgl_mulai: "15 Mei 2024",
    tgl_selesai: "15 Mei 2024",
  },
];

export default function MonitoringTables() {
  const { isOpen: isEditOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();
    const { isOpen: isDeleteOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
    const [selectedRiwayat, setSelectedRiwayat] = React.useState<ViewMonitoring | null>(null);
  
    const handleEditClick = (riwayat: ViewMonitoring) => {
      setSelectedRiwayat(riwayat);
      openEditModal();
    };
  
    const handleDeleteClick = (riwayat: ViewMonitoring) => {
      setSelectedRiwayat(riwayat);
      openDeleteModal();
    };
  
    const handleSaveChanges = () => {
      // Handle save logic here
      console.log("Saving changes for:", selectedRiwayat);
      closeEditModal();
    };
  
    const handleConfirmDelete = () => {
      // Handle delete logic here
      console.log("Deleting user:", selectedRiwayat);
      closeDeleteModal();
    };

    const getStatusBadgeStyle = (roleName?: string) => {
      const baseStyle = "px-2 py-0.5 font-medium";
      
      if (!roleName) return `${baseStyle} bg-gray-100 text-gray-800`;
    
      const normalizedRole = roleName.toLowerCase().trim();
    
      switch(normalizedRole) {
        case 'diajukan':
          return `${baseStyle} bg-blue-100 text-blue-600`;
        case 'selesai':
          return `${baseStyle} bg-green-100 text-green-600`;
        case 'diproses':
          return `${baseStyle} bg-yellow-100 text-yellow-600`;
        default:
          return `${baseStyle} bg-gray-100 text-gray-600`; 
      }
    };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {["No", "Periode", "Prodi", "Auditor", "Status", "Nilai", "Tanggal Mulai", "Tanggal Selesai", "Aksi"].map((header, index) => (
                    <TableCell
                      key={index}
                      isHeader
                      className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400"
                    >
                      <div className="flex items-center gap-1 cursor-pointer">
                        {header}
                        {["Periode", "Prodi", "Auditor", "Status", "Nilai", "Tanggal Mulai", "Tanggal Selesai"].includes(header) && (
                          <ArrowUpDown className="w-3 h-3" />
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>
  
              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {tableData.map((riwayat, index) => (
                  <TableRow key={riwayat.id}>
                    <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {riwayat.periode}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {riwayat.prodi}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {riwayat.auditor}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <span className={`px-3 py-1 font-medium rounded-full ${getStatusBadgeStyle(riwayat.status)}`}>
                        {riwayat.status}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {riwayat.nilai}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {riwayat.tgl_mulai}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {riwayat.tgl_selesai}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        {/* Edit */}
                        <div 
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer"
                          onClick={() => console.log("FileText clicked")}
                        >
                          <FileText className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
  
        {/* Edit User Modal */}
        <Modal isOpen={isEditOpen} onClose={closeEditModal} className="max-w-[700px] m-4">
          <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Edit Pengguna
              </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                Update user details to keep information up-to-date.
              </p>
            </div>
            <form className="flex flex-col">
              <div className="px-2 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 gap-y-5">
                   {/* Baris 1: Nama */}
                  <div>
                    <Label>Nama</Label>
                    <Input 
                      type="text" 
                      placeholder="Masukkan nama lengkap" 
                      className="w-full"
                    />
                  </div>
                  
                  {/* Baris 2: Email */}
                  <div>
                    <Label>Email</Label>
                    <Input 
                      type="email" 
                      placeholder="Masukkan email" 
                      className="w-full"
                    />
                  </div>
                  
                  {/* Baris 3: Peran (Dropdown) */}
                  <div>
                    <Label>Peran</Label>
                    <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      <option value="">Semua Peran</option>
                      <option>Admin LPMPP</option>
                      <option>Auditor LPM</option>
                      <option>Koprodi</option>
                      <option>Tim Penjaminan Mutu Prodi</option>
                    </select>
                  </div>
                  
                  {/* Baris 4: Status (Dropdown) */}
                  <div>
                    <Label>Status</Label>
                    <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      <option value="">Pilih Status</option>
                      <option>Aktif</option>
                      <option>Nonaktif</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button size="sm" variant="outline" onClick={closeEditModal}>
                  Batal
                </Button>
                <Button size="sm" onClick={handleSaveChanges}>
                  Simpan Perubahan
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
                Hapus Pengguna
              </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                Apakah Anda yakin ingin menghapus pengguna {selectedRiwayat?.periode}?
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