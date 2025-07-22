import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios, { AxiosError } from "axios";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import { useAuth } from '../auth/AuthContext';
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

interface Pegawai {
  id_pegawai: number;
  nama_pegawai: string;
  email: string;
  role: string;        
  prodi: string;
  terakhir_login: string;
  status: "Aktif" | "Nonaktif";
}

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [tableData, setTableData] = React.useState<Pegawai[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorMessage] = useState("");
  const [pegawais, setPegawais] = useState<Pegawai[]>([]);
  const [msg, setMsg] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();
  const { setToken, getPegawai } = useAuth();
  const [selectedRole, setSelectedRole] = useState("");
  const [availableRoles, setAvailableRoles] = useState<{ id: number; nama_role: string }[]>([]); 
  // Removed unused roles state

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', {
        email,
        password, 
      }, {
        withCredentials: true
      });

      setToken(res.data.accessToken); // simpan ke context
      navigate('/home');
      window.location.reload(); 
    } catch (err) {
      const error = err as AxiosError<{ msg: string }>;
          if (error.response) {
            setMsg(error.response?.data?.msg || "Terjadi kesalahan");
          }
    }
  }

  React.useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/roles", {
          withCredentials: true,
        });
        setAvailableRoles(res.data);
      } catch (error) {
        console.error("Gagal ambil role:", error);
      }
    };
    fetchRoles();
  }, [token]);

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Selamat Datang!
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Silahkan masuk dengan akun Anda
            </p>
          </div>
          <div>           
            <form onSubmit={handleSignIn}>
              <div className="space-y-4">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="Masukkan email anda" 
                  value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password anda"
                      value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>         
                </div>
                <p className="text-error-500 mt-4 text-center">{msg}</p>
                <div>
                <Button className="w-full" size="sm">
                  Sign in
                </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
