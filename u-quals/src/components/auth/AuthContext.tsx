import { createContext, useContext, useState, ReactNode } from 'react';
import axios from "axios";

interface PegawaiData {
    id_pegawai: number;
    nama_pegawai: string;
    email: string;
    status: string;
  }
  
  interface AuthContextProps {
    token: string;
    setToken: (token: string) => void;
    pegawai: PegawaiData | null;
    setPegawai: (user: PegawaiData | null) => void;
    getPegawai: () => Promise<void>; // 🔧 Tambah fungsi ini
  }

type AuthContextType = {
  token: string;
  setToken: (token: string) => void;
};


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState("");
  const [pegawai, setPegawai] = useState<PegawaiData | null>(null);

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
    <AuthContext.Provider value={{ token, setToken, pegawai, setPegawai, getPegawai }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};