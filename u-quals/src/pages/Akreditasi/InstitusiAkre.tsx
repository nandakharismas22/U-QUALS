import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/Akreditasi/institusi/AkreInstitusi"
import { useModal } from "../../hooks/useModal"; 
import { Modal } from "../../components/ui/modal"
import { Plus } from "lucide-react";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import React, { useState } from 'react';
import { useAuth } from "../../components/auth/AuthContext";



interface Pegawai {
  id_pegawai: number;
  nama_pegawai: string;
  email: string;
  role: "Admin PLMPP";
  prodi: string;
  terakhir_login: string;
  status: "Aktif" | "Nonaktif";
}

export default function TabelsInstitusi() {
const { isOpen, openModal, closeModal } = useModal();
  const [tableData, setTableData] = React.useState<Pegawai[]>([]);
  const { token } = useAuth();
  const [selectedPegawai, setSelectedPegawai] = React.useState<Pegawai | null>(null);

    const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };


  return (
    <>
      <PageMeta
        title="U-Quals - Pengguna"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Akreditasi Institusi" />
      
      <div className="space-y-6">
        <ComponentCard
          title = { <div className="flex items-center justify-between w-full">
            <span className="text-base font-medium text-gray-800 dark:text-white/90">
                Semua Akreditasi institusi : 4
            </span>
            <button
                onClick={openModal}
                className="ml-auto relative w-auto bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg text-sm transition duration-200 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Tambah Akreditasi
            </button>
          </div> 
          } >
          <div className="mb-4">
            <div className="flex items-center justify-between w-full gap-4">
              

            {/* Search + Dropdown Container */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Search Bar */}
              <form action="https://formbold.com/s/unique_form_id" method="POST">
                <div className="relative">
                  <button className="absolute -translate-y-1/2 left-4 top-1/2">
                    <svg
                      className="fill-gray-500 dark:fill-gray-400"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                        fill=""
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    placeholder=" Cari disini"
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[230px]"
                  />
                </div>
              </form>

              {/* Dropdown Peran */}
              <div className="relative">
                <select
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-10 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[230px] appearance-none"
                >
                  <option>Semua lembaga</option>
                  <option>BAN-PT</option>
                  <option>IABEE</option>
                  <option>DLL..</option>
                  <option>DLL..</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>



            {/* Dropdown Max Data */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Menampilkan</span>
              <div className="relative w-20">
                <select className="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-200 bg-transparent pl-4 pr-10 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 appearance-none">
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">data</span>
            </div>

            </div>
          </div>
          
          <BasicTableOne />
        </ComponentCard>
      </div>

      {/* Modal for adding new user */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Tambah Institusi Akreditasi Baru
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Masukkan detail institusi akreditasi baru.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-y-5">
                
                {/* Baris 3: Peran (Dropdown) */}
                <div className="relative">
                  <Label>Peran</Label>
                  <select className="w-full dark:bg-dark-900 h-11 rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-10 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 appearance-none">
                    <option value="">Semua Peran</option>
                    <option>Admin LPMPP</option>
                    <option>Auditor LPM</option>
                    <option>Koprodi</option>
                    <option>Tim Penjaminan Mutu Prodi</option>
                  </select>
                <div className="pointer-events-none absolute inset-y-12 right-3 flex items-center text-gray-500 dark:text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                
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
                
               {/* Baris 4: Status (Dropdown) */}
                <div className="relative">
                  <Label>Status Pengguna</Label>
                  <select className="w-full dark:bg-dark-900 h-11 rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-10 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 appearance-none">
                    <option value="">Pilih Status</option>
                    <option>Aktif</option>
                    <option>Nonaktif</option>
                  </select>
                <div className="pointer-events-none absolute inset-y-12 right-3 flex items-center text-gray-500 dark:text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
 
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Batal
              </Button>
              <Button size="sm" onClick={handleSave}>
                Simpan
              </Button>
            </div>
          </form>
        </div>
        
      </Modal>
    </>
  );
}