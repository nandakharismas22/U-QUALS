import React, { useEffect, useState } from "react";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { UsersIcon, EnvelopeIcon, BuildingLibraryIcon } from '@heroicons/react/24/solid';

interface PegawaiData {
  id_pegawai: number;
  nama_pegawai: string;
  email: string;
  prodi?: string;
  status: string;
  Roles?: Array<{
    id: number;
    nama_role: string;
  }>;
}

export default function UserMetaCard() {
  const { token, setToken, pegawai, setPegawai, currentRole } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>("");
  const [userProdi, setUserProdi] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1. Decode token untuk mendapatkan ID
        const decoded: any = jwtDecode(token || '');
        if (!decoded?.id_pegawai) throw new Error("Invalid token");

        // 2. Fetch data pegawai
        const response = await axios.get(`http://localhost:5000/pegawais/${decoded.id_pegawai}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });

        const data: PegawaiData = response.data;

        // 3. Update state
        setPegawai({
          id_pegawai: data.id_pegawai,
          nama_pegawai: data.nama_pegawai,
          email: data.email,
          status: data.status,
          prodi: data.prodi
        } as any);

        // 4. Set role dan prodi
        setUserRole(
          data.Roles?.[0]?.nama_role || 
          currentRole?.nama_role || 
          "Belum memiliki role"
        );
        
        setUserProdi(data.prodi || "Tidak ada prodi");

      } catch (error) {
        console.error("Failed to fetch user data:", error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate("/signin");
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchUserData();
  }, [token, setToken, setPegawai, navigate, currentRole]);

  if (loading) {
    return <div className="p-5 rounded-2xl border border-gray-200 animate-pulse">Loading...</div>;
  }

  const getRoleBadgeStyle = (roleName?: string) => {
    const baseStyle = "px-2 py-0.5 text-xs font-medium";
    
    if (!roleName) return `${baseStyle} bg-gray-100 text-gray-800`;
  
    const normalizedRole = roleName.toLowerCase().trim();
  
    switch(normalizedRole) {
      case 'admin lpmpp':
        return `${baseStyle} bg-blue-500 text-white`;
      case 'korprodi':
        return `${baseStyle} bg-green-500 text-white`;
      case 'tim gkm':
        return `${baseStyle} bg-purple-500 text-white`; 
      case 'auditor':
        return `${baseStyle} bg-yellow-500 text-white`;
      default:
        return `${baseStyle} bg-gray-500 text-white`; 
    }
  };

  return (
    <div className="relative rounded-lg shadow-sm overflow-hidden">
        {/* Header background */}
        <div
          className="h-32 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/background.jpeg)' }}
        />

        {/* Wrapper untuk avatar dan info */}
        <div className="flex items-center gap-6 px-6 pt-4 pb-6">
          {/* Avatar */}
          <div className="w-28 h-28 -mt-14 border-4 border-white rounded-full overflow-hidden shadow-md dark:border-black/60">
            <img
              src="/images/user/owner.jpg"
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Info Section */}
          <div>
          {/* Nama dan Role sejajar */}
          <div className="flex items-center gap-2">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white/90">
              {pegawai?.nama_pegawai || "Ryan Taylor"}
            </h4>

            {userRole && (
              <span className={`px-3 py-1 text-xs font-medium rounded ${getRoleBadgeStyle(userRole)}`}>
                {userRole}
              </span>
            )}
            {/* <span className="px-3 py-1 text-xs font-medium text-white bg-yellow-500 rounded">
              {pegawai?.nama_role || "Tim Penjaminan Mutu"}
            </span> */}
          </div>

          {/* Email */}
          <p className="mt-1 text-sm text-gray-500">
            {pegawai?.email || "ryantaylor@upnjatim.ac.id"}
          </p>
        </div>
      </div>
    </div>


  );
}