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
import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  prodi: string;
  lastLogin: string;
  status: "Aktif" | "Nonaktif";
}

const tableData: User[] = [
  {
    id: 1,
    name: "Nanda Safitri",
    email: "nanda@example.com",
    role: "Tim Penjaminan Mutu Prodi",
    prodi: "Sistem Informasi",
    lastLogin: "12 Mei 2025",
    status: "Aktif",
  },
  {
    id: 2,
    name: "Talia Aprianti",
    email: "safitri@example.com",
    role: "Dosen",
    prodi: "Teknik Informatika",
    lastLogin: "10 Mei 2025",
    status: "Nonaktif",
  },
];

export default function StandartTables() {
  const { isOpen: isEditOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();
  const { isOpen: isDeleteOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    openEditModal();
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    openDeleteModal();
  };

  const handleSaveChanges = () => {
    // Handle save logic here
    console.log("Saving changes for:", selectedUser);
    closeEditModal();
  };

  const handleConfirmDelete = () => {
    // Handle delete logic here
    console.log("Deleting user:", selectedUser);
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
              {tableData.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {index + 1}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.role}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.prodi}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.lastLogin}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Circle
                        className={`w-3 h-3 ${user.status === "Aktif" ? "text-green-500" : "text-gray-400"}`}
                        fill={user.status === "Aktif" ? "currentColor" : "none"}
                      />
                      {user.status}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      {/* Edit */}
                      <div
                        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 cursor-pointer"
                        onClick={() => handleEditClick(user)}
                      >
                        <Edit className="w-4 h-4 text-blue-500 dark:text-blue-300" />
                      </div>
                      {/* Delete */}
                      <div
                        className="p-2 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 cursor-pointer"
                        onClick={() => handleDeleteClick(user)}
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
              Apakah Anda yakin ingin menghapus pengguna {selectedUser?.name}?
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