// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from "axios";

interface PegawaiData {
  id_pegawai: number;
  nama_pegawai: string;
  email: string;
  status: string;
}

interface RoleData {
  id_role: number;
  nama_role: string;
}

interface AuthContextProps {
  token: string;
  setToken: (token: string) => void;
  pegawai: PegawaiData | null;
  setPegawai: (user: PegawaiData | null) => void;
  getPegawai: () => Promise<void>;
  currentRole: RoleData | null;
  setCurrentRole: (role: RoleData | null) => void;
  availableRoles: RoleData[];
  setAvailableRoles: (roles: RoleData[]) => void;
  refreshUserData: () => Promise<void>;
}



const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState("");
  const [pegawai, setPegawai] = useState<PegawaiData | null>(null);
  const [currentRole, setCurrentRole] = useState<RoleData | null>(null);
  const [availableRoles, setAvailableRoles] = useState<RoleData[]>([]);

  const refreshUserData = async () => {
    try {
      const [userRes, rolesRes] = await Promise.all([
        axios.get('http://localhost:5000/me', { withCredentials: true }),
        axios.get(`http://localhost:5000/role-pegawai/${pegawai?.id_pegawai}`, { 
          withCredentials: true 
        })
      ]);
  
      setPegawai(userRes.data);
      setAvailableRoles(rolesRes.data);
      
      // Set role aktif jika belum ada
      if (!currentRole && rolesRes.data.length > 0) {
        setCurrentRole(rolesRes.data[0]);
      }
    } catch (error) {
      console.error('Gagal refresh data:', error);
    }
  };
  

  const getPegawai = async () => {
    try {
      const res = await axios.get("http://localhost:5000/me", {
        withCredentials: true,
      });
      setPegawai(res.data);
    } catch (err) {
      setPegawai(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ 
        token, 
        setToken, 
        pegawai, 
        setPegawai, 
        getPegawai, 
        currentRole, 
        setCurrentRole,
        availableRoles,
        setAvailableRoles, 
        refreshUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};