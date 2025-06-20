import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import { ArrowUpDown, Circle, Edit, Trash2 } from "lucide-react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import React, {useState} from "react";
import { useAuth } from "../../components/auth/AuthContext";
import axios from "axios";

interface Pegawai {
  id_pegawai: number;
  nama_pegawai: string;
  email: string;
  role: "Admin PLMPP";
  prodi: string;
  terakhir_login: string;
  status: "Aktif" | "Nonaktif";
}

// const tableData: User[] = [
//   {
//     id: 1,
//     name: "Nanda Safitri",
//     email: "nanda@example.com",
//     role: "Tim Penjaminan Mutu Prodi",
//     prodi: "Sistem Informasi",
//     lastLogin: "12 Mei 2025",
//     status: "Aktif",
//   },
//   {
//     id: 2,
//     name: "Talia Aprianti",
//     email: "safitri@example.com",
//     role: "Dosen",
//     prodi: "Teknik Informatika",
//     lastLogin: "10 Mei 2025",
//     status: "Nonaktif",
//   },
// ];

export default function PenggunaTables() {
  const [tableData, setTableData] = React.useState<Pegawai[]>([]);
  const { token } = useAuth();
  const { isOpen: isEditOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();
  const { isOpen: isDeleteOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const [selectedPegawai, setSelectedPegawai] = React.useState<Pegawai | null>(null);
  // const [, setToken] = useState('');

  const fetchPegawai = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pegawais", {
        withCredentials: true,
      });
      setTableData(response.data);
    } catch (error) {
      console.error("Gagal fetch data pegawai:", error);
    }
  };

  React.useEffect(() => {
    const fetchPegawai = async () => {
      try {
        const response = await axios.get("http://localhost:5000/pegawais", {
          headers: {
            Authorization: `Bearer ${token}`, // ambil dari context
          },
          withCredentials: true,
        });
  
        // Data dari database langsung dipakai tanpa map
        setTableData(response.data);
      } catch (error) {
        console.error("Gagal fetch data pegawai:", error);
      }
    };  
    fetchPegawai();    
  }, [token]);

  const handleEditClick = (pegawai: Pegawai) => {
    setSelectedPegawai(pegawai);
    openEditModal();
  };

  const handleDeleteClick = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/pegawais/${id}`, {
        withCredentials: true,
      });
  
      // Setelah berhasil hapus, perbarui data di tabel
      setTableData(prev => prev.filter(p => p.id_pegawai !== id));
    } catch (error) {
      console.error("Gagal menghapus pegawai:", error);
    }
  };

  const handleSaveChanges = async () => {
    if (!selectedPegawai) return;
  
    try {
      await axios.patch(
        `http://localhost:5000/pegawais/${selectedPegawai.id_pegawai}`,
        {
          nama_pegawai: selectedPegawai.nama_pegawai,
          email: selectedPegawai.email,
          password: "",
          prodi: selectedPegawai.prodi,
          status: selectedPegawai.status,
        },
        {
          withCredentials: true,
        }
      );
  
      console.log("Pegawai berhasil diupdate!");
      fetchPegawai(); // untuk refresh data
      closeEditModal(); 
    } catch (error: any) {
      console.error("Gagal update pegawai:", error.response?.data || error.message);
    }
  };
  

  const handleConfirmDelete = () => {
    // Handle delete logic here
    console.log("Deleting pegawai:", selectedPegawai);
    closeDeleteModal();
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {["No", "Nama", "Email", "Peran", "Prodi", "Terakhir Login", "Status", "Aksi"].map((header, index) => (
                  <TableCell
                    key={index}
                    isHeader
                    className="px-4 py-3 font-medium text-gray-600 text-start text-theme-sm dark:text-gray-400"
                  >
                    <div className="flex items-center gap-1 cursor-pointer">
                      {header}
                      {["Nama", "Email", "Peran", "Prodi", "Terakhir Login"].includes(header) && (
                        <ArrowUpDown className="w-3 h-3" />
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((pegawai, index) => (
                <TableRow key={pegawai.id_pegawai}>
                  <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {index + 1}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {pegawai.nama_pegawai}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {pegawai.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {pegawai.role}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {pegawai.prodi}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {pegawai.terakhir_login}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Circle
                        className={`w-3 h-3 ${pegawai.status === "Aktif" ? "text-green-500" : "text-gray-400"}`}
                        fill={pegawai.status === "Aktif" ? "currentColor" : "none"}
                      />
                      {pegawai.status}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      {/* Edit */}
                      <div
                        className="p-2 rounded-full bg-orange-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 cursor-pointer"
                        onClick={() => handleEditClick(pegawai)}
                      >
                        <Edit className="w-4 h-4 text-orange-500 dark:text-orange-300" />
                      </div>
                      {/* Delete */}
                      <div
                        className="p-2 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 cursor-pointer"
                        onClick={() => handleDeleteClick(pegawai.id_pegawai)}
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

      {/* Edit User Modal */}
      <Modal isOpen={isEditOpen} onClose={closeEditModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Pengguna
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update pegawai details to keep information up-to-date.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-y-5">
                {/* Nama */}
                <div>
                  <Label>Nama</Label>
                  <Input
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    className="w-full"
                    value={selectedPegawai?.nama_pegawai || ""}
                    onChange={(e) =>
                      setSelectedPegawai({ ...selectedPegawai!, nama_pegawai: e.target.value })
                    }
                  />
                </div>

                {/* Email */}
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="Masukkan email"
                    className="w-full"
                    value={selectedPegawai?.email || ""}
                    onChange={(e) =>
                      setSelectedPegawai({ ...selectedPegawai!, email: e.target.value })
                    }
                  />
                </div>

                {/* Peran */}
                <div className="relative">
                  <Label>Peran</Label>
                  <select
                    className="w-full dark:bg-dark-900 h-11 rounded-lg border border-gray-200 py-2.5 pl-4 pr-10 text-sm text-gray-800 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
                    value={selectedPegawai?.role || ""}
                    onChange={(e) =>
                      setSelectedPegawai({ ...selectedPegawai!, role: e.target.value as Pegawai["role"] })
                    }
                  >
                    <option value="">Semua Peran</option>
                    <option>Admin LPMPP</option>
                    <option>Auditor LPM</option>
                    <option>Koprodi</option>
                    <option>Tim Penjaminan Mutu Prodi</option>
                  </select>
                </div>

                {/* Status */}
                <div className="relative">
                  <Label>Status Pengguna</Label>
                  <select
                    className="w-full dark:bg-dark-900 h-11 rounded-lg border border-gray-200 py-2.5 pl-4 pr-10 text-sm text-gray-800 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
                    value={selectedPegawai?.status || ""}
                    onChange={(e) =>
                      setSelectedPegawai({ ...selectedPegawai!, status: e.target.value as Pegawai["status"] })
                    }
                  >
                    <option value="">Pilih Status</option>
                    <option>Aktif</option>
                    <option>Nonaktif</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tombol Bawah */}
            <div className="flex items-center justify-between px-2 mt-6">
              <Button
                size="sm"
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => openDeleteModal()}
              >
                Hapus
              </Button>

              <div className="flex items-center gap-3">
                <Button size="sm" variant="outline" onClick={closeEditModal}>
                  Batal
                </Button>
                <Button
                  size="sm"
                  className="bg-orange-500 text-white hover:bg-orange-700"
                  onClick={handleSaveChanges}
                >
                  Simpan
                </Button>
              </div>
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
              Apakah Anda yakin ingin menghapus pengguna {selectedPegawai?.nama_pegawai}?
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