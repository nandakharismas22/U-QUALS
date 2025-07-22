import React, { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { EnvelopeIcon, BuildingOfficeIcon, UserCircleIcon, IdentificationIcon } from '@heroicons/react/24/outline';

interface PegawaiData {
  id_pegawai: number;
  nama_pegawai: string;
  email: string;
  prodi?: string;
  unit?: string;
  status: string;
  Roles?: Array<{
    id: number;
    nama_role: string;
  }>;
}

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const { token, pegawai, setPegawai, currentRole } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nama_pegawai: '',
    email: ''
  });
  
  useEffect(() => {
    if (pegawai) {
      setFormData({
        nama_pegawai: pegawai.nama_pegawai || '',
        email: pegawai.email || ''
      });
    }
  }, [pegawai]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const decoded: any = jwtDecode(token || '');
        if (!decoded?.id_pegawai) throw new Error("Invalid token");

        const response = await axios.get(`http://localhost:5000/pegawais/${decoded.id_pegawai}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });

        const data: PegawaiData = response.data;
        setPegawai({
          ...data,
          prodi: data.prodi || "Belum ditentukan",
          unit: data.unit || "Belum ditentukan"
        } as any);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate("/signin");
        }
        setLoading(false);
      }
    };

    if (token) fetchUserData();
  }, [token, setPegawai, navigate]);

  const handleSave = async () => {
    try {
      const decoded: any = jwtDecode(token || '');
      const idPegawai = decoded?.id_pegawai;
      
      if (!idPegawai) {
        throw new Error("ID Pegawai tidak valid");
      }
  
      const updateData = {
        nama_pegawai: formData.nama_pegawai,
        email: formData.email,
        prodi: pegawai?.prodi || null,
        status: pegawai?.status || null,
      };
  
      const response = await axios.patch(
        `http://localhost:5000/pegawais/${idPegawai}`,
        updateData,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
  
      if (response.data.msg === "Pegawai berhasil diupdate") {
        console.log("Data berhasil diupdate");
        const refreshedData = await axios.get(
          `http://localhost:5000/pegawais/${idPegawai}`
        );
        setPegawai(refreshedData.data);
      } else {
        console.error("Update gagal:", response.data);
      }
  
      closeModal();
      
    } catch (error) {
      console.error("Gagal mengupdate data:", error);
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response?.data);
      }
    }
  };

  if (loading) {
    return (
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-4 w-1/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Profil Pengguna
          </h3>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div className="flex items-start gap-3">
              <UserCircleIcon className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Nama</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {pegawai?.nama_pegawai || "Belum ditentukan"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {pegawai?.email || "Belum ditentukan"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Unit</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Prodi {pegawai?.prodi || "Belum ditentukan"} 
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <IdentificationIcon className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Role</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {pegawai?.Roles?.[0]?.nama_role || currentRole?.nama_role || "Belum ditentukan"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Edit
        </button>
      </div>

      <Modal 
        isOpen={isOpen} 
        onClose={closeModal} 
        className="max-w-[700px] mx-auto my-4"
      >
        <div className="relative w-full max-w-[700px] rounded-2xl bg-white dark:bg-gray-900">
          <div className="p-6 lg:p-8">
            <div className="mb-6">
              <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
                Edit Informasi Pribadi
              </h4>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Perbarui detail informasi Anda
              </p>
            </div>

            <form className="flex flex-col gap-6">
              <div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Nama Lengkap</Label>
                    <Input
                      id="nama_pegawai"
                      name="nama_pegawai"
                      type="text"
                      value={formData.nama_pegawai}
                      onChange={(e) => setFormData({...formData, nama_pegawai: e.target.value})}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Unit</Label>
                    <Input 
                      type="text" 
                      value={pegawai?.prodi || ""} 
                      className="w-full" 
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input 
                      type="text" 
                      value={pegawai?.Roles?.[0]?.nama_role || currentRole?.nama_role || ""} 
                      className="w-full" 
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button size="sm" variant="outline" onClick={closeModal}>
                  Close
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
