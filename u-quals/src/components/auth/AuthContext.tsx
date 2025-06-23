import { createContext, useContext, useState, ReactNode } from 'react';

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
  }

type AuthContextType = {
  token: string;
  setToken: (token: string) => void;
};


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState("");
  const [pegawai, setPegawai] = useState<PegawaiData | null>(null);

  return (
    <AuthContext.Provider value={{ token, setToken, pegawai, setPegawai }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};