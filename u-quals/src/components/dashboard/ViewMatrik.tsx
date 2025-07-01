
import { UsersIcon, AcademicCapIcon, BuildingLibraryIcon } from '@heroicons/react/24/solid'
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

interface MyToken {
  id_pegawai: number;
  nama_pegawai: string;
  email: string;
  exp: number;
  status: string;
}

export default function ViewMatrics() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { token, setToken, pegawai, setPegawai } = useAuth();
  const [expire, setExpire] = useState('');
  const [pegawais, setPegawais] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await axios.get("http://localhost:5000/token", {
          withCredentials: true,
        });
        const newToken = res.data.accessToken;
        setToken(newToken);

        setPegawai({
          id_pegawai: decoded.id_pegawai,
          nama_pegawai: decoded.nama_pegawai,
          email: decoded.email,
          status: decoded.status,
        });
      } catch (error) {
        navigate("/signin");
      }
    };

    if (!token) {
      refreshToken();
    }
  }, [token, setToken, setPegawai, navigate]);

  return (
  <>
    <div className="w-full">
      <h1 className="text-xl font-bold text-brand-500 dark:text-white/90 mb-4">
        Selamat Datang di U-Quals
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">

      </p>
    </div>

    <div className="flex flex-wrap gap-4 w-full">
      {[
        { label: "Fakultas", value: 7, icon: <BuildingLibraryIcon className="size-7" /> },
        { label: "Prodi", value: 25, icon: <AcademicCapIcon className="size-7" /> },
        { label: "Auditor", value: 50, icon: <UsersIcon className="size-7" /> },
        { label: "Text", value: 50, icon: <UsersIcon className="size-7" /> },
      ].map((item, index) => (
        <div
          key={index}
          className="flex flex-1 items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] shadow-sm"
        >
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-yellow-300 to-yellow-500 text-white">
            {item.icon}
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{item.label}</div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white/90">{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  </>
);
}
